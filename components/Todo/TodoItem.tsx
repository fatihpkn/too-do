import { TodoItemModel } from "models/todo";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetTodos, TODO_URL_KEY, UpdateTodo } from "services/todo";
import useSWR from "swr";

interface ITodoItemProps {
  todo?: TodoItemModel;
  onSelect?: (todo: TodoItemModel) => void;
}

const TodoItem: React.FunctionComponent<ITodoItemProps> = (props) => {
  const { todo, onSelect } = props;

  const client = useQueryClient();

  const { mutate } = useMutation(UpdateTodo, {
    onMutate: async (todo) => {
      const previousTodos = client.getQueryData<TodoItemModel[]>("todos");

      const newTodos = (previousTodos && [...previousTodos]) || [];

      const index = newTodos?.findIndex((t) => t.id === todo?.id);

      if (!newTodos) return;

      newTodos[index].completed = !todo?.completed;

      client.setQueryData("todos", (old) => [...newTodos]);

      return { previousTodos };
    },
    onError: (err, newTodo, context: any) => {
      client.setQueryData("todos", context?.previousTodos);
    },
  });

  return (
    <div className='group flex items-center'>
      <input
        type='checkbox'
        onChange={() => onSelect && todo && onSelect(todo)}
        className='peer absolute z-10 opacity-0 group-hover:opacity-100 focus-visible:w-[auto] focus-visible:opacity-100 checked:opacity-100 outline-blue-500 transition-opacity cursor-pointer'
      />
      <div className='w-0 opacity-0 peer-checked:opacity-100 peer-checked:w-6 peer-focus-visible:w-6 group-hover:w-6 group-hover:opacity-100 items-center gap-1 right-2 text-xs h-full transition-all'></div>

      <button
        className={`flex w-full py-2 px-3 relative border border-slate-300 my-2 rounded-lg group transition-all shadow-none hover:shadow-md focus-visible:shadow-md outline-slate-400 ${todo?.completed ? "bg-gray-50 opacity-95" : "bg-white"}`}
        onClick={() => todo && mutate(todo)}>
        <span className={todo?.completed ? "line-through" : ""}>{todo?.title}</span>

        <div className='group-focus-visible:opacity-100 opacity-0 absolute top-0 inline-flex items-center gap-1 right-2 text-xs h-full transition-opacity'>
          <span className='text-[10px] bg-zinc-100 border border-zinc-200 px-1 rounded'>enter</span>
          <span>mark as</span>
          {todo?.completed ? <span className='text-red-700'>uncompleted</span> : <span className='text-green-500'>completed</span>}
        </div>
      </button>
    </div>
  );
};

export default TodoItem;
