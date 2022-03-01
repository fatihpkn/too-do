import * as React from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

interface ITodoProps {}

const Todo: React.FunctionComponent<ITodoProps> = (props) => {
  return (
    <>
      <NewTodoForm />
      <TodoList />
    </>
  );
};

export default Todo;
