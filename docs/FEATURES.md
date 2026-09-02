# Features and Functionalities

## Todo management

### Create

Users can create a todo with:

- title
- description
- priority
- due date

### Read

The list page retrieves all todos from the backend.

The detail page retrieves one todo based on the `id` query parameter.

Example:

```text
todo.html?id=66c123...
```

### Update

Users can edit a todo from the list page or from the detail page.

### Delete

Users can delete a todo after a confirmation dialog.

### Completion

Users can toggle completion from the list page and detail page.

## List productivity features

- Search by title/description
- Active/completed filtering
- Priority filtering
- Sorting
- Completion count
- Empty states
- Loading state
- Error state

## Validation

The backend validates:

- title required
- title length
- description length
- priority enum

The API also checks MongoDB ObjectId validity before database operations.

## Responsive design

The UI adapts from desktop to mobile layouts using CSS media queries.

## Documentation

The repository contains Markdown documentation for:

- project setup and features
- API behavior
- architecture
