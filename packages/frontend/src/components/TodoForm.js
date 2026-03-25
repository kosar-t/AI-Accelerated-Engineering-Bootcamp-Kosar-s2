import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
} from '@mui/material';

const emptyForm = { name: '', description: '', due_date: '' };

function TodoForm({ onSubmit, initialValues, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(
      initialValues
        ? {
            name: initialValues.name || '',
            description: initialValues.description || '',
            due_date: initialValues.due_date || '',
          }
        : emptyForm
    );
  }, [initialValues]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim() || null,
      due_date: form.due_date || null,
    });
    setForm(emptyForm);
  };

  const isEditing = Boolean(initialValues);

  return (
    <Box component="form" onSubmit={handleSubmit} aria-label={isEditing ? 'Edit task form' : 'Add task form'}>
      <Stack spacing={2}>
        <TextField
          label="Task name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          fullWidth
          size="small"
          inputProps={{ 'data-testid': 'input-name' }}
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          size="small"
          multiline
          minRows={2}
          inputProps={{ 'data-testid': 'input-description' }}
        />
        <TextField
          label="Due date"
          name="due_date"
          type="date"
          value={form.due_date}
          onChange={handleChange}
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          inputProps={{ 'data-testid': 'input-due-date' }}
        />
        <Stack direction="row" spacing={1}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            data-testid={isEditing ? 'btn-save' : 'btn-add'}
          >
            {isEditing ? 'Save' : 'Add Task'}
          </Button>
          {isEditing && (
            <Button
              type="button"
              variant="outlined"
              color="inherit"
              onClick={onCancel}
              data-testid="btn-cancel"
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default TodoForm;
