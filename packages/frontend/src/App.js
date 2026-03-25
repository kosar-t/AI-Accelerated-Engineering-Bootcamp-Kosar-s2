import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './todoApi';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (fields) => {
    try {
      const newTodo = await createTodo(fields);
      setTodos((prev) => [newTodo, ...prev]);
      setError(null);
    } catch (err) {
      setError('Error adding task: ' + err.message);
    }
  };

  const handleSaveEdit = async (fields) => {
    try {
      const updated = await updateTodo(editingTodo.id, fields);
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      setError('Error updating task: ' + err.message);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setError(null);
    } catch (err) {
      setError('Error updating task: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      setError('Error deleting task: ' + err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight={700}>
        To Do App
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Keep track of your tasks
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)} data-testid="error-alert">
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
        <Typography variant="h6" gutterBottom>
          {editingTodo ? 'Edit Task' : 'Add New Task'}
        </Typography>
        <TodoForm
          key={editingTodo ? editingTodo.id : 'new'}
          initialValues={editingTodo}
          onSubmit={editingTodo ? handleSaveEdit : handleAdd}
          onCancel={() => setEditingTodo(null)}
        />
      </Paper>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="h6" gutterBottom>
        Tasks
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress data-testid="loading-spinner" />
        </Box>
      ) : (
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onEdit={setEditingTodo}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
}

export default App;
