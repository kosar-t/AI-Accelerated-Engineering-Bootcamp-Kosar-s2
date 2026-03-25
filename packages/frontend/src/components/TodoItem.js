import React from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  const formattedDueDate = todo.due_date
    ? new Date(todo.due_date + 'T00:00:00').toLocaleDateString()
    : null;

  return (
    <ListItem
      data-testid={`todo-item-${todo.id}`}
      disablePadding
      secondaryAction={
        <Box>
          <Tooltip title="Edit">
            <IconButton
              edge="end"
              aria-label={`edit ${todo.name}`}
              onClick={() => onEdit(todo)}
              data-testid={`btn-edit-${todo.id}`}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              edge="end"
              aria-label={`delete ${todo.name}`}
              onClick={() => onDelete(todo.id)}
              data-testid={`btn-delete-${todo.id}`}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      }
      sx={{ pr: 10 }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Checkbox
          checked={Boolean(todo.completed)}
          onChange={() => onToggleComplete(todo)}
          color="secondary"
          inputProps={{ 'aria-label': `mark ${todo.name} complete`, 'data-testid': `checkbox-${todo.id}` }}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant="body1"
            sx={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'text.disabled' : 'text.primary' }}
          >
            {todo.name}
          </Typography>
        }
        secondary={
          <>
            {todo.description && (
              <Typography variant="body2" color="text.secondary" component="span" display="block">
                {todo.description}
              </Typography>
            )}
            {formattedDueDate && (
              <Typography variant="caption" color="text.secondary" component="span">
                Due: {formattedDueDate}
              </Typography>
            )}
          </>
        }
      />
    </ListItem>
  );
}

export default TodoItem;
