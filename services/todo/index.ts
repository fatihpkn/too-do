import { TodoItemModel } from "models/todo";
import { API } from "SupabaseAPI";

export async function GetTodos() {
  return (await API.from<TodoItemModel>("todo")).data;
}

export async function UpdateTodo(todo: Partial<TodoItemModel>) {
  return await API.from<TodoItemModel>("todo").upsert(todo);
}

export async function AddTodo(todo: TodoItemModel) {
  return todo;
}
