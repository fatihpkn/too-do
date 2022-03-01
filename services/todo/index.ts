import { TodoItemModel } from "models/todo";
import { API } from "SupabaseAPI";

export const TODO_URL_KEY = "/api/todo";

export async function GetTodos() {
  return (await API.from<TodoItemModel>("todo").select("*").order("id", { ascending: false })).data;
}

export async function UpdateTodo(todo: Partial<TodoItemModel>) {
  return await API.from<TodoItemModel>("todo").upsert(todo);
}

export async function AddTodo(todo: TodoItemModel) {
  return (await API.from<TodoItemModel>("todo").insert(todo)).data;
}

export async function DeleteCompletedTodos() {
  return await API.from<TodoItemModel>("todo").delete().eq("completed", true);
}

export async function DeleteSelectedTodos(todos: TodoItemModel[]) {
  return (
    await API.from<TodoItemModel>("todo")
      .delete()
      .in(
        "id",
        todos.map((t) => t.id)
      )
  ).data;
}

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
