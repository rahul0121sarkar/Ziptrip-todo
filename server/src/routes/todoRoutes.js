import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "../controllers/todoController.js";

const router = Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);
router.patch("/:id/toggle", toggleTodo);

export default router;
