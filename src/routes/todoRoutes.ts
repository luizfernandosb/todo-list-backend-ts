import { Router } from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleComplete,
} from "../controllers/TodoController";

const router = Router();

router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.delete("/todos/:id", deleteTodo);
router.patch("/todos/:id", toggleComplete);


export default router;
