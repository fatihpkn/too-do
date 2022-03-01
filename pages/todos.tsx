import Todo from "components/Todo";
import { TodoItemModel } from "models/todo";
import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import { GetTodos, TODO_URL_KEY } from "services/todo";
import { API } from "SupabaseAPI";
import useSWR, { useSWRConfig } from "swr";

interface HomeProps {}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div className='container max-w-7xl mx-auto'>
      <Todo />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const user = await API.auth.api.getUserByCookie(req);

  if (user.token) {
    API.auth.setAuth(user.token);
  } else {
    return { props: {}, redirect: { destination: "login", permanent: false } };
  }

  const queryClient = new QueryClient();

  const todos = await queryClient.prefetchQuery("todos", GetTodos);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      context: {
        auth: {
          user: user.user,
        },
      },
    },
  };
};
