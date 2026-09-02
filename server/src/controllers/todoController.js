import mongoose from "mongoose";
import Todo from "../models/Todo.js";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function createTodo(req, res, next) {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTodos(req, res, next) {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTodo(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo id",
      });
    }

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({ success: true, todo });
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo id",
      });
    }

    const allowedFields = ["title", "description", "completed", "priority", "dueDate"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
}

export async function toggleTodo(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo id",
      });
    }

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
      success: true,
      message: "Todo status updated",
      todo,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo id",
      });
    }

    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo deleted successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
}
