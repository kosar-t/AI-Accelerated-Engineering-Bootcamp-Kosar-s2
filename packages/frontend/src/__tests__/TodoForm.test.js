import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../components/TodoForm';

describe('TodoForm', () => {
  test('renders the add form with empty fields', () => {
    render(<TodoForm onSubmit={jest.fn()} />);
    expect(screen.getByTestId('input-name')).toHaveValue('');
    expect(screen.getByTestId('input-description')).toHaveValue('');
    expect(screen.getByTestId('btn-add')).toBeInTheDocument();
    expect(screen.queryByTestId('btn-cancel')).not.toBeInTheDocument();
  });

  test('renders the edit form pre-populated with initialValues', () => {
    const initialValues = { name: 'Buy milk', description: 'Whole milk', due_date: '2026-12-31' };
    render(<TodoForm onSubmit={jest.fn()} initialValues={initialValues} onCancel={jest.fn()} />);
    expect(screen.getByTestId('input-name')).toHaveValue('Buy milk');
    expect(screen.getByTestId('input-description')).toHaveValue('Whole milk');
    expect(screen.getByTestId('btn-save')).toBeInTheDocument();
    expect(screen.getByTestId('btn-cancel')).toBeInTheDocument();
  });

  test('calls onSubmit with trimmed values when add form is submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<TodoForm onSubmit={onSubmit} />);

    await user.type(screen.getByTestId('input-name'), '  Write tests  ');
    await user.type(screen.getByTestId('input-description'), 'Cover all cases');
    await user.click(screen.getByTestId('btn-add'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Write tests',
        description: 'Cover all cases',
        due_date: null,
      });
    });
  });

  test('does not call onSubmit when name is empty', async () => {
    const onSubmit = jest.fn();
    render(<TodoForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByTestId('btn-add'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    render(
      <TodoForm
        onSubmit={jest.fn()}
        initialValues={{ name: 'Task', description: '', due_date: '' }}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByTestId('btn-cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  test('resets form fields after add submission', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<TodoForm onSubmit={onSubmit} />);

    const nameInput = screen.getByTestId('input-name');
    await user.type(nameInput, 'Temporary Task');
    await user.click(screen.getByTestId('btn-add'));

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
    });
  });
});
