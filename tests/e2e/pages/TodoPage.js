class TodoPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  // Form inputs
  nameInput() {
    return this.page.getByTestId('input-name');
  }

  descriptionInput() {
    return this.page.getByTestId('input-description');
  }

  dueDateInput() {
    return this.page.getByTestId('input-due-date');
  }

  // Form buttons
  addButton() {
    return this.page.getByTestId('btn-add');
  }

  saveButton() {
    return this.page.getByTestId('btn-save');
  }

  cancelButton() {
    return this.page.getByTestId('btn-cancel');
  }

  // Todo list helpers
  todoItem(id) {
    return this.page.getByTestId(`todo-item-${id}`);
  }

  checkboxFor(id) {
    return this.page.getByTestId(`checkbox-${id}`);
  }

  editButtonFor(id) {
    return this.page.getByTestId(`btn-edit-${id}`);
  }

  deleteButtonFor(id) {
    return this.page.getByTestId(`btn-delete-${id}`);
  }

  emptyState() {
    return this.page.getByTestId('empty-state');
  }

  todoList() {
    return this.page.getByTestId('todo-list');
  }

  // Actions
  async addTodo({ name, description = '', dueDate = '' } = {}) {
    await this.nameInput().fill(name);
    if (description) await this.descriptionInput().fill(description);
    if (dueDate) await this.dueDateInput().fill(dueDate);
    await this.addButton().click();
  }

  async getFirstTodoId() {
    const items = await this.page.locator('[data-testid^="todo-item-"]').all();
    if (items.length === 0) return null;
    const testId = await items[0].getAttribute('data-testid');
    return parseInt(testId.replace('todo-item-', ''));
  }
}

module.exports = { TodoPage };
