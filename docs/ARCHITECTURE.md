# Architecture

## Overview

The application is split into two independently understandable parts:

```text
Browser
   |
   | HTTP / JSON
   v
React MPA
   |
   | /api/*
   v
Express API
   |
   | Mongoose
   v
MongoDB
```

## Frontend MPA

The frontend intentionally does not use React Router.

### Page 1

`index.html`

Loads:

`src/main.jsx`

Renders:

`TodoList`

### Page 2

`todo.html?id=<id>`

Loads:

`src/todo-detail.jsx`

Renders:

`TodoDetail`

This gives the application two actual HTML entry points, with normal browser navigation between pages.

## Backend layers

### Routes

`server/src/routes/todoRoutes.js`

Defines HTTP endpoints and maps them to controllers.

### Controllers

`server/src/controllers/todoController.js`

Contains request/response logic for CRUD operations.

### Model

`server/src/models/Todo.js`

Defines the MongoDB document schema and validation rules.

### Middleware

`server/src/middleware/errorHandler.js`

Provides consistent 404 and API error responses.

### Database

`server/src/config/db.js`

Owns the Mongoose connection lifecycle.

## Why MongoDB?

The assignment allows either a file or database. MongoDB was selected as the persistence layer because todos are naturally represented as independent documents and Mongoose provides validation, timestamps, and clean model operations.

## Testing architecture

The API tests use Supertest to call the Express application directly and MongoDB Memory Server for an isolated temporary database. This avoids coupling tests to a developer's local MongoDB data.
