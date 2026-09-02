import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";
import Todo from "../src/models/Todo.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Todo.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Todo CRUD API", () => {
  test("POST /api/todos creates a todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({
        title: "Write tests",
        description: "Cover the todo API",
        priority: "high",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.todo.title).toBe("Write tests");
    expect(response.body.todo.completed).toBe(false);
  });

  test("POST /api/todos rejects an empty title", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({ title: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("GET /api/todos returns todos", async () => {
    await Todo.create({ title: "First task" });
    await Todo.create({ title: "Second task" });

    const response = await request(app).get("/api/todos");

    expect(response.statusCode).toBe(200);
    expect(response.body.count).toBe(2);
    expect(response.body.todos).toHaveLength(2);
  });

  test("GET /api/todos/:id returns one todo", async () => {
    const todo = await Todo.create({ title: "Find me" });

    const response = await request(app).get(`/api/todos/${todo._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.todo.title).toBe("Find me");
  });

  test("PUT /api/todos/:id updates a todo", async () => {
    const todo = await Todo.create({ title: "Old title", priority: "low" });

    const response = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({
        title: "New title",
        priority: "high",
        completed: true,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.todo.title).toBe("New title");
    expect(response.body.todo.priority).toBe("high");
    expect(response.body.todo.completed).toBe(true);
  });

  test("PATCH /api/todos/:id/toggle toggles completion", async () => {
    const todo = await Todo.create({ title: "Toggle me", completed: false });

    const response = await request(app).patch(`/api/todos/${todo._id}/toggle`);

    expect(response.statusCode).toBe(200);
    expect(response.body.todo.completed).toBe(true);
  });

  test("DELETE /api/todos/:id deletes a todo", async () => {
    const todo = await Todo.create({ title: "Delete me" });

    const response = await request(app).delete(`/api/todos/${todo._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    const deleted = await Todo.findById(todo._id);
    expect(deleted).toBeNull();
  });

  test("GET /api/todos/:id returns 404 for a missing todo", async () => {
    const id = new mongoose.Types.ObjectId();

    const response = await request(app).get(`/api/todos/${id}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Todo not found");
  });
});
