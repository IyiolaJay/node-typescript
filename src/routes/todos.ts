import { Router, Request, Response, NextFunction } from "express";
import { Todo } from "../models/todos";

const router = Router();

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

router.get("/all", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ todos });
});

router.post("/create", (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;

  if (!body.text) {
    return res
      .status(400)
      .json({ error: "Missing text field in request body" });
  }

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);

  res.status(200).json({ todos, todo: newTodo });
});

router.put(
  "/edit/:todoId",
  (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;
    const body = req.body as RequestBody;

    if (!body.text) {
      return res
        .status(400)
        .json({ error: "Missing text field in request body" });
    }

    const todoIndex = todos.findIndex((todo) => todo.id === params.todoId);
    if (todoIndex >= 0) {
      todos[todoIndex].text = body.text;
      return res.status(200).json({ editedTodo: todos[todoIndex], todos });
    }
    res.status(400).json({ error: "Todo not found" });
  }
);

router.delete(
  "/delete/:todoId",
  (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;
    const todoIndex = todos.findIndex((todo) => todo.id === params.todoId);
    if (todoIndex >= 0) {
      todos.splice(todoIndex, 1);
      return res.status(200).json({ todos });
    }
    res.status(400).json({ error: "Todo not found" });
  }
);

export default router;
