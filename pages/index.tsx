import { TodoItemModel } from "models/todo";
import type { GetServerSideProps, NextPage } from "next";
import { GetTodos } from "services/todo";
import { API } from "SupabaseAPI";
import useSWR, { useSWRConfig } from "swr";

interface HomeProps {
  todos?: TodoItemModel[];
}

const TODO_KEY = "/api/todo";

const Home: NextPage<HomeProps> = (props) => {
  const { mutate } = useSWRConfig();

  const { data } = useSWR<TodoItemModel[]>(TODO_KEY);

  const handleCompleteClick = async (todo: TodoItemModel) => {
    let newTodos = (data && [...data]) || [todo];

    const index = newTodos?.findIndex((d) => d.id === todo.id);

    newTodos[index] = todo;

    mutate(TODO_KEY, newTodos);

    const res = await fetch("/api/todo", { method: "PATCH", body: JSON.stringify(todo) });

    newTodos = await res.json();
  };

  return (
    <div className='container max-w-7xl mx-auto'>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className='flex flex-col'>
        {data?.map((todo) => (
          <div key={todo.id} onClick={() => handleCompleteClick({ ...todo, completed: !todo.completed })} className='flex my-2 px-2 py-1 rounded border-gray-300 border justify-between items-center'>
            {todo.title}
            <input type='checkbox' checked={todo.completed} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const todos = await GetTodos();

  return {
    props: {
      fallback: {
        [TODO_KEY]: todos,
      },
    },
  };
};
