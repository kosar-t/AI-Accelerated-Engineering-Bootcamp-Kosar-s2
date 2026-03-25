const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO App - Critical User Journeys', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('1. Add a task with name only', async ({ page }) => {
    await todoPage.addTodo({ name: 'Simple Task' });

    await expect(page.getByText('Simple Task')).toBeVisible();
  });

  test('2. Add a task with name, description, and due date', async ({ page }) => {
    await todoPage.addTodo({
      name: 'Full Task',
      description: 'This has all fields',
      dueDate: '2026-12-31',
    });

    await expect(page.getByText('Full Task')).toBeVisible();
    await expect(page.getByText('This has all fields')).toBeVisible();
    await expect(page.getByText(/Due:/)).toBeVisible();
  });

  test('3. Edit an existing task', async ({ page }) => {
    await todoPage.addTodo({ name: 'Task To Edit' });

    const id = await todoPage.getFirstTodoId();
    await todoPage.editButtonFor(id).click();

    await todoPage.nameInput().fill('Edited Task Name');
    await todoPage.saveButton().click();

    await expect(page.getByText('Edited Task Name')).toBeVisible();
    await expect(page.getByText('Task To Edit')).not.toBeVisible();
  });

  test('4. Delete a task', async ({ page }) => {
    await todoPage.addTodo({ name: 'Task To Delete' });

    const id = await todoPage.getFirstTodoId();
    await todoPage.deleteButtonFor(id).click();

    await expect(page.getByText('Task To Delete')).not.toBeVisible();
  });

  test('5. Mark a task as complete and verify strikethrough', async ({ page }) => {
    await todoPage.addTodo({ name: 'Task To Complete' });

    const id = await todoPage.getFirstTodoId();
    const checkbox = todoPage.checkboxFor(id);
    await expect(checkbox).not.toBeChecked();

    await checkbox.click();
    await expect(checkbox).toBeChecked();

    const taskText = page.getByText('Task To Complete');
    await expect(taskText).toHaveCSS('text-decoration', /line-through/);
  });

  test('6. Mark a completed task as incomplete', async ({ page }) => {
    await todoPage.addTodo({ name: 'Toggle Task' });

    const id = await todoPage.getFirstTodoId();
    const checkbox = todoPage.checkboxFor(id);

    // Mark complete
    await checkbox.click();
    await expect(checkbox).toBeChecked();

    // Mark incomplete
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();

    const taskText = page.getByText('Toggle Task');
    await expect(taskText).not.toHaveCSS('text-decoration', /line-through/);
  });
});
