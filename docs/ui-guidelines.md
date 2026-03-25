# UI Guidelines: TODO App

## Color Theme

The app uses a blue and green color palette throughout.

- **Primary color**: Blue — used for the main actions, headers, and active states
- **Secondary color**: Green — used for success states, completion indicators, and accents
- Backgrounds should be light/neutral to keep the interface clean and readable

## Buttons

- Buttons should be simple and uncluttered
- Button colors must match the primary/secondary color theme:
  - Primary actions (e.g. Add Task, Save) → blue
  - Positive/confirm actions (e.g. Mark Complete) → green
  - Destructive actions (e.g. Delete) → use a muted/neutral style to avoid visual noise
- Avoid heavy shadows or complex gradients; keep buttons flat or subtly elevated

## Component Library

- Use **Material UI (MUI)** components throughout the app
- Rely on MUI's built-in theming to apply the blue and green palette consistently across all components
- Prefer standard MUI components such as:
  - `Button` for all actions
  - `Checkbox` for task completion toggles
  - `TextField` for name, description, and due date inputs
  - `Card` or `List` / `ListItem` for displaying todo items
  - `IconButton` with MUI icons for edit and delete actions
