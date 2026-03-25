import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

const baseTodo = {
  id: 1,
  name: 'Buy milk',
  description: 'Whole milk from the store',
  due_date: '2026-12-31',
  completed: 0,
};

const completedTodo = { ...baseTodo, completed: 1 };

describe('TodoItem', () => {
  test('renders name and description', () => {
    render(
      <TodoItem
        todo={baseTodo}
        onToggleComplete={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('Whole milk from the store')).toBeInTheDocument();
  });

  test('renders formatted due date', () => {
    render(
      <TodoItem
        todo={baseTodo}
        onToggleComplete={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  test('checkbox is unchecked for incomplete todo', () => {
    render(
      <TodoItem
        todo={baseTodo}
        onToggleComplete={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    const checkbox = screen.getByTestId('checkbox-1');
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is checked for completed todo', () => {
    render(
      <TodoItem
        todo={completedTodo}
        onToggleComplete={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    const checkbox = screen.getByTestId('checkbox-1');
    expect(checkbox).toBeChecked();
  });

  test('calls onToggleComplete when checkbox is clicked', () => {
    const onToggleComplete = jest.fn();
    render(
      <TodoItem
        todo={baseTodo}
        onToggleComplete={onToggleComplete}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    fireEvent.click(screen.getByTestId('checkbox-1'));
    expect(onToggleComplete).toHaveBeenCalledWith(baseTodo);
  });

  test('calls onEdit with the todo when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(
      <TodoItem
        todo={baseTodo}
        onToggleComplete={jest.fn()}
        onEdit={onEdit}
        onDelete={jest.fn()}
      />
    );
    fireEvent.click(screen.getByTestId('btn-edit-1'));
    expect(onEdit).toHaveBeenCalledWith(baseTodo);
  });

  test('calls onDelete with the id when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(
      <TodoItem
        todo={baseTodo}
        onToggleComplete={jest.fn()}
        onEdit={jest.fn()}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByTestId('btn-delete-1'));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
