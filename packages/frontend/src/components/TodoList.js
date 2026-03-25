import React from 'react';
import { Divider, List, Paper, Typography } from '@mui/material';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleComplete, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" data-testid="empty-state">
        No tasks found. Add some!
      </Typography>
    );
  }

  return (
    <Paper variant="outlined">
      <List disablePadding data-testid="todo-list">
        {todos.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <TodoItem
              todo={todo}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {index < todos.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default TodoList;
