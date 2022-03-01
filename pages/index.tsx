import { TodoItemModel } from "models/todo";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { GetTodos, TODO_URL_KEY } from "services/todo";
import { API } from "SupabaseAPI";

interface HomeProps {
  fallback?: {
    [TODO_URL_KEY]: TodoItemModel[];
  };
}

const Home: NextPage<HomeProps> = (props) => {

  const router = useRouter()

  React.useEffect(() => {
    API.auth.refreshSession().then((res) => {
      if(res.error) {
        router.replace('/login');
      }
    });
  }, []);

  return <div className='container max-w-7xl mx-auto'></div>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const user = await API.auth.api.getUserByCookie(req);

  console.log("User on home->", user);

  if (user.token) {
    API.auth.setAuth(user.token);
    return { props: {}, redirect: { destination: "todos" } };
  } else {
    return { props: { context: { auth: { user: user } } } };
  }
};
