# Functional Requirements: TODO App

## Todo Item Structure

Each todo item consists of:
- **Checkbox** — marks the task as complete/incomplete
- **Name** — short title for the task
- **Description** — additional detail about the task
- **Due Date** — optional date by which the task should be completed

## Core Requirements

### 1. Add a Task
- The user can add a new task to the list
- When creating a task, the user must provide a name and may optionally provide a description and due date

### 2. Edit a Task
- The user can edit an existing task
- Editable fields include the task name, description, and due date

### 3. Delete a Task
- The user can delete a task from the list
- Deleting a task removes it permanently

### 4. Complete a Task
- Each task has a checkbox that the user can toggle
- Checking the box marks the task as complete; unchecking marks it as incomplete

### 5. Add a Due Date
- The user can assign a due date to a task when creating or editing it
