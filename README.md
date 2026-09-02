# Ziptrrip Todo Application

A full-stack Todo application built for the Ziptrrip backend engineer technical assignment.

## Stack

- **Frontend:** React + Vite + JavaScript
- **Architecture:** Multi Page Application (MPA), not a React SPA
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Testing:** Jest + Supertest
- **API testing:** Postman collection
- **Styling:** Plain CSS

The assignment asks for a React MPA with a todo-list page, a separate todo-detail page using a query parameter, CRUD APIs, persistence, documentation, and backend unit tests/Postman files for a backend developer. This project includes all of those items.

## Features

### Todo list page

- Create a todo
- View all todos
- Search todos
- Filter by All / Active / Completed
- Filter by priority
- Sort by newest / oldest / priority / due date
- Mark a todo complete/incomplete
- Delete a todo
- Open a dedicated todo detail page
- Responsive UI

### Todo detail page

- Reads the todo ID from the `?id=` query parameter
- Displays title, description, status, priority, due date, creation/update dates
- Edit title, description, priority and due date
- Toggle completion
- Delete todo

### Backend

REST CRUD endpoints:

- `POST /api/todos`
- `GET /api/todos`
- `GET /api/todos/:id`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

Additional endpoint:

- `PATCH /api/todos/:id/toggle`

The backend uses Mongoose validation and centralized error handling.

## Project Structure

```text
ziptrrip-todo-app/
├── client/
│   ├── index.html
│   ├── todo.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── TodoList.jsx
│   │   │   └── TodoDetail.jsx
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── TodoFilters.jsx
│   │   │   └── Loading.jsx
│   │   ├── api/
│   │   │   └── todos.js
│   │   ├── styles/
│   │   │   └── app.css
│   │   ├── main.jsx
│   │   └── todo-detail.jsx
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── todoController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   └── Todo.js
│   │   ├── routes/
│   │   │   └── todoRoutes.js
│   │   └── app.js
│   └── tests/
│       └── todos.test.js
├── postman/
│   └── Ziptrrip-Todo.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB 6+ running locally, or a MongoDB Atlas connection string
- npm

## Installation

From the project root:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Copy the environment file:

```bash
cp .env.example server/.env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example server/.env
```

Set `MONGO_URI` in `server/.env`.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ziptrrip_todos
```

## Run the project

Start frontend and backend together:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Todo detail example:

```text
http://localhost:5173/todo.html?id=TODO_ID
```

Backend:

```text
http://localhost:5000
```

The Vite development server proxies `/api` requests to Express.

## Production build

```bash
npm run build
npm run start
```

The Express server serves the built React MPA from `client/dist`.

## Test

Run backend tests:

```bash
npm test
```

The test suite covers:

- Create todo
- Get all todos
- Get one todo
- Update todo
- Toggle completion
- Delete todo
- Validation/error behavior

Tests use `mongodb-memory-server`, so a local MongoDB instance is not required for the test suite.

## Postman

Import:

```text
postman/Ziptrrip-Todo.postman_collection.json
```

The collection contains examples for all CRUD operations and toggle.

The collection uses:

```text
{{baseUrl}} = http://localhost:5000
```

## MPA implementation

This is intentionally implemented as a **Multi Page Application**.

There are two independent HTML entry points:

- `client/index.html` → todo list
- `client/todo.html` → single todo detail

Each page has its own React entry file:

- `src/main.jsx`
- `src/todo-detail.jsx`

There is no React Router and no client-side route switching. Opening the detail page performs a real page navigation to `todo.html?id=<id>`, satisfying the MPA requirement.

## API examples

### Create

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Prepare assignment",
  "description": "Finish the Ziptrrip technical assignment",
  "priority": "high",
  "dueDate": "2026-09-10"
}
```

### Update

```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Prepare assignment",
  "description": "Review APIs and tests",
  "priority": "medium",
  "dueDate": "2026-09-12"
}
```

### Toggle

```http
PATCH /api/todos/:id/toggle
```

## Design decisions

1. **Separate frontend and backend:** keeps responsibilities clear and makes the API independently testable.
2. **Mongoose model:** provides schema validation and a clean MongoDB abstraction.
3. **Controller/service separation:** route definitions remain small while request logic lives in controllers.
4. **Centralized error middleware:** API errors use one consistent JSON response format.
5. **MPA instead of SPA:** separate Vite HTML entry points are used instead of React Router.
6. **Backend tests:** API behavior is verified with Supertest against an in-memory MongoDB instance.
7. **No TypeScript:** the implementation intentionally uses JavaScript as requested.

## Submission checklist

- [x] React application
- [x] Multi Page Application
- [x] Todo list page
- [x] Separate todo detail page
- [x] Query parameter for todo ID
- [x] JavaScript backend
- [x] CRUD APIs
- [x] MongoDB database
- [x] Unit/API tests
- [x] Postman collection
- [x] Markdown documentation
- [x] Organized file structure
