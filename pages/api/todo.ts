import { TodoItemModel } from "models/todo";
import type { NextApiRequest, NextApiResponse } from "next";
import { AddTodo, DeleteCompletedTodos, GetTodos, UpdateTodo } from "services/todo";
import { API } from "SupabaseAPI";

export default async (req: NextApiRequest, res: NextApiResponse<TodoItemModel[]>) => {
  const todo = JSON.parse(req.body) as TodoItemModel;

  // API.auth.api.setAuthCookie(req, res);

  // console.log("req.body", JSON.parse(req.body));

  /**
   * Belki daha iyi bir yöntem ile yönetilebilir ?
   * Şimdilik böyle kalsın.
   */

  try {
    switch (req.method) {
      case "PATCH":
        await UpdateTodo(todo);
        break;
      case "POST":
        await AddTodo({ title: todo.title, completed: false });
        break;
      case "DELETE":
        await DeleteCompletedTodos();
      default:
        break;
    }
  } catch (error) {
    console.log("Error on todo API", error);
  }

  const todos = await GetTodos();

  res.status(200).json(todos || []);
};
