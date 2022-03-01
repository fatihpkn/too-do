import { TodoItemModel } from "models/todo";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteCompletedTodos, DeleteSelectedTodos, GetTodos, TODO_URL_KEY } from "services/todo";
import useSWR from "swr";
import TodoActionButton from "./TodoActionButton";
import TodoItem from "./TodoItem";

interface ITodoListProps {}

const TodoList: React.FunctionComponent<ITodoListProps> = (props) => {
  const { data } = useQuery("todos", GetTodos, { refetchOnMount: false });

  const client = useQueryClient();

  const [selecteds, setSelecteds] = React.useState<TodoItemModel[]>();

  const handleTodoSelect = (todo: TodoItemModel) => {
    if (selecteds?.includes(todo)) {
      setSelecteds(selecteds.filter((t) => t.id !== todo.id));
    } else {
      setSelecteds([...(selecteds || []), todo]);
    }
  };

  const { mutate } = useMutation(DeleteSelectedTodos, {
    onMutate: () => {
      if (!selecteds || !data) return;

      const newTodos = [...data?.filter((todo) => !selecteds?.includes(todo))] || [];

      console.log("newTodos", newTodos);

      setSelecteds(undefined);

      client.setQueryData("todos", newTodos);
    },
  });

  const { mutate: deleteCompletedTodos } = useMutation(DeleteCompletedTodos, {
    onMutate: () => {
      if (!data) return;

      const newTodos = [...data?.filter((todo) => !todo.completed)] || [];

      console.log("newTodos", newTodos);

      client.setQueryData("todos", newTodos);
    },
  });

  const handleDeleteSelected = async () => {
    if (!selecteds) return;

    mutate(selecteds);
  };

  const handleDeleteCompleteds = async () => {
    deleteCompletedTodos();
  };

  const completedsCount = data?.filter((todo) => todo.completed).length || 0;
  const selectedCount = selecteds?.length || 0;

  return (
    <>
      {/* <pre>{JSON.stringify(selecteds, null, 2)}</pre> */}
      <div className='flex mb-2 justify-between items-center'>
        <h1 className='font-bold py-2'>too do list {`${data && data?.length > 0 ? `(${data?.length})` : ''}`}</h1>
        <div className='flex gap-2'>
          {completedsCount > 0 && (
            <TodoActionButton onClick={handleDeleteCompleteds} disabled={completedsCount == 0} label={`${completedsCount} completed`}>
              delete
            </TodoActionButton>
          )}
          {selectedCount > 0 && (
            <TodoActionButton onClick={handleDeleteSelected} disabled={selectedCount == 0} label={`${selectedCount} selected`}>
              delete
            </TodoActionButton>
          )}
        </div>
      </div>
      <ul>
        {data?.map((todo) => (
          <TodoItem onSelect={handleTodoSelect} key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
