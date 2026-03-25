const request = require('supertest');
const { app, db } = require('../../src/app');

// Clean up database state between tests and close after all
beforeEach(() => {
  db.exec('DELETE FROM items');
});

afterAll(() => {
  if (db) {
    db.close();
  }
});

const createTodo = async (fields = {}) => {
  const payload = { name: 'Test Todo', ...fields };
  const res = await request(app)
    .post('/api/items')
    .send(payload)
    .set('Accept', 'application/json');
  expect(res.status).toBe(201);
  return res.body;
};

describe('TODO API Integration', () => {
  describe('Full CRUD lifecycle', () => {
    it('creates a todo and retrieves it via GET /api/items', async () => {
      await createTodo({ name: 'Integration Task', description: 'Details here', due_date: '2026-09-01' });

      const res = await request(app).get('/api/items');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);

      const todo = res.body[0];
      expect(todo.name).toBe('Integration Task');
      expect(todo.description).toBe('Details here');
      expect(todo.due_date).toBe('2026-09-01');
      expect(todo.completed).toBe(0);
    });

    it('creates, edits, and retrieves an updated todo', async () => {
      const created = await createTodo({ name: 'Original' });

      const putRes = await request(app)
        .put(`/api/items/${created.id}`)
        .send({ name: 'Edited', description: 'Updated desc', due_date: '2026-10-10' });

      expect(putRes.status).toBe(200);
      expect(putRes.body.name).toBe('Edited');
      expect(putRes.body.description).toBe('Updated desc');
      expect(putRes.body.due_date).toBe('2026-10-10');

      const getRes = await request(app).get('/api/items');
      expect(getRes.body[0].name).toBe('Edited');
    });

    it('marks a todo as complete then incomplete', async () => {
      const todo = await createTodo({ name: 'Toggle Me' });

      const completeRes = await request(app)
        .put(`/api/items/${todo.id}`)
        .send({ completed: true });
      expect(completeRes.status).toBe(200);
      expect(completeRes.body.completed).toBe(1);

      const incompleteRes = await request(app)
        .put(`/api/items/${todo.id}`)
        .send({ completed: false });
      expect(incompleteRes.status).toBe(200);
      expect(incompleteRes.body.completed).toBe(0);
    });

    it('creates a todo and deletes it, then GET returns empty list', async () => {
      const todo = await createTodo({ name: 'Delete Me' });

      const deleteRes = await request(app).delete(`/api/items/${todo.id}`);
      expect(deleteRes.status).toBe(200);

      const getRes = await request(app).get('/api/items');
      expect(getRes.body).toHaveLength(0);
    });
  });

  describe('Validation', () => {
    it('returns 400 when creating a todo without a name', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({ description: 'No name' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Item name is required');
    });

    it('returns 404 when updating a non-existent todo', async () => {
      const res = await request(app)
        .put('/api/items/99999')
        .send({ name: 'Ghost' });
      expect(res.status).toBe(404);
    });

    it('returns 404 when deleting a non-existent todo', async () => {
      const res = await request(app).delete('/api/items/99999');
      expect(res.status).toBe(404);
    });
  });
});
