import { TodoItemModel } from "models/todo";
import type { NextApiRequest, NextApiResponse } from "next";
import { GetTodos, UpdateTodo } from "services/todo";
import { API } from "SupabaseAPI";

export default async (req: NextApiRequest, res: NextApiResponse<TodoItemModel[]>) => {
  const todo = JSON.parse(req.body) as TodoItemModel;

  switch (req.method) {
    case "PATCH":
      await UpdateTodo(todo);
      break;

    default:
      break;
  }

  const todos = await GetTodos();

  res.status(200).json(todos || []);
};
