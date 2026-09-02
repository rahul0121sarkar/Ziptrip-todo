# API Documentation

Base URL:

```text
http://localhost:5000/api
```

## Todo object

```json
{
  "_id": "ObjectId",
  "title": "Task title",
  "description": "Task details",
  "completed": false,
  "priority": "medium",
  "dueDate": "2026-09-10T00:00:00.000Z",
  "createdAt": "2026-09-02T00:00:00.000Z",
  "updatedAt": "2026-09-02T00:00:00.000Z"
}
```

## Endpoints

### POST /todos

Creates a todo.

Required:

- `title`

Optional:

- `description`
- `completed`
- `priority`: `low | medium | high`
- `dueDate`

Returns `201`.

### GET /todos

Returns all todos, newest first.

Returns `200`.

### GET /todos/:id

Returns one todo.

Returns:

- `200` if found
- `400` for an invalid MongoDB ObjectId
- `404` if the todo does not exist

### PUT /todos/:id

Updates the supported fields:

- `title`
- `description`
- `completed`
- `priority`
- `dueDate`

Returns:

- `200` if updated
- `400` for invalid ID or validation error
- `404` if not found

### PATCH /todos/:id/toggle

Flips `completed` between `true` and `false`.

### DELETE /todos/:id

Deletes a todo.

Returns:

- `200` if deleted
- `400` for invalid ID
- `404` if not found

## Error format

```json
{
  "success": false,
  "message": "Todo not found"
}
```
