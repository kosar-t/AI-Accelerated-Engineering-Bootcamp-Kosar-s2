const request = require('supertest');
const { app, db } = require('../src/app');

// Close the database connection after all tests
afterAll(() => {
  if (db) {
    db.close();
  }
});

// Test helpers
const createItem = async (fields = {}) => {
  const payload = { name: 'Temp Item to Delete', ...fields };
  const response = await request(app)
    .post('/api/items')
    .send(payload)
    .set('Accept', 'application/json');

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('id');
  return response.body;
};

describe('API Endpoints', () => {
  describe('GET /api/items', () => {
    it('should return all items', async () => {
      const response = await request(app).get('/api/items');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      // Check if items have the expected structure
      const item = response.body[0];
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('due_date');
      expect(item).toHaveProperty('completed');
      expect(item).toHaveProperty('created_at');
    });
  });

  describe('POST /api/items', () => {
    it('should create a new item with name only', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ name: 'Test Item' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Item');
      expect(response.body.completed).toBe(0);
      expect(response.body).toHaveProperty('created_at');
    });

    it('should create a new item with all fields', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ name: 'Full Item', description: 'Some details', due_date: '2026-12-31' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Full Item');
      expect(response.body.description).toBe('Some details');
      expect(response.body.due_date).toBe('2026-12-31');
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({})
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Item name is required');
    });

    it('should return 400 if name is empty', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({ name: '' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Item name is required');
    });
  });

  describe('PUT /api/items/:id', () => {
    it('should update an existing item name', async () => {
      const item = await createItem({ name: 'Original Name' });

      const response = await request(app)
        .put(`/api/items/${item.id}`)
        .send({ name: 'Updated Name' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Name');
    });

    it('should update description and due date', async () => {
      const item = await createItem({ name: 'Item with Fields' });

      const response = await request(app)
        .put(`/api/items/${item.id}`)
        .send({ description: 'New description', due_date: '2026-06-15' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.description).toBe('New description');
      expect(response.body.due_date).toBe('2026-06-15');
    });

    it('should mark an item as completed', async () => {
      const item = await createItem({ name: 'Complete Me' });

      const response = await request(app)
        .put(`/api/items/${item.id}`)
        .send({ completed: true })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(1);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app)
        .put('/api/items/999999')
        .send({ name: 'Ghost' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found');
    });

    it('should return 400 for invalid id', async () => {
      const response = await request(app)
        .put('/api/items/abc')
        .send({ name: 'Bad' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Valid item ID is required');
    });

    it('should return 400 if name is set to empty string', async () => {
      const item = await createItem({ name: 'Valid Name' });

      const response = await request(app)
        .put(`/api/items/${item.id}`)
        .send({ name: '' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Item name cannot be empty');
    });
  });

  describe('DELETE /api/items/:id', () => {
    it('should delete an existing item', async () => {
      const item = await createItem('Item To Be Deleted');

      const deleteResponse = await request(app).delete(`/api/items/${item.id}`);
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toEqual({ message: 'Item deleted successfully', id: item.id });

      const deleteAgain = await request(app).delete(`/api/items/${item.id}`);
      expect(deleteAgain.status).toBe(404);
      expect(deleteAgain.body).toHaveProperty('error', 'Item not found');
    });

    it('should return 404 when item does not exist', async () => {
      const response = await request(app).delete('/api/items/999999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found');
    });

    it('should return 400 for invalid id', async () => {
      const response = await request(app).delete('/api/items/abc');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Valid item ID is required');
    });
  });
});
