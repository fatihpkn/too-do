import Button from "components/Button";
import { TodoItemModel } from "models/todo";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import { GetTodos, sleep, TODO_URL_KEY } from "services/todo";
import { API } from "SupabaseAPI";

interface HomeProps {
  fallback?: {
    [TODO_URL_KEY]: TodoItemModel[];
  };
}

const Home: NextPage<HomeProps> = (props) => {
  const { register, handleSubmit, formState, watch } = useForm<{ email: string }>();

  const [isSend, setIsSend] = React.useState<any>();

  const login = async (form: { email: string }) => {
    try {
      console.log(form);

      await sleep(400);

      const data = await fetch("/api/login", { body: JSON.stringify(form), method: "POST" });
      setIsSend(await data.json());
    } catch (error) {
      console.log("error", error);
      setIsSend(false);
    }
  };

  return (
    <div className='container max-w-7xl w-10/12 mx-auto'>
      <div className='flex h-screen justify-center items-center'>
        {isSend ? (
          <div className='max-w-xs w-full'>
            <h1 className='text-2xl font-bold text-purple-700 w-full mb-2'>Check your e-mail.</h1>
            <div className='italic'>{watch("email")}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(login)} className='max-w-xs w-full'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-1 flex-col'>
                <h1 className='text-lg font-bold text-purple-700 w-full'>Login via e-mail</h1>
                <span className='italic text-[10px] leading-none'>won't ask anything else</span>
              </div>
              <div className='flex flex-1'>
                <input
                  {...register("email", { required: true })}
                  type={"text"}
                  placeholder='example@email.com'
                  disabled={formState.isSubmitting}
                  className={`border tracking-wide text-center transition-all duration-300 py-3 px-6 rounded-xl outline-transparent text-sm focus:outline-purple-500 w-full disabled:opacity-50`}
                />
              </div>
              <div className='flex flex-1 justify-center'>
                <div className='w-full max-w-[180px]'>
                  <Button type='submit' disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? "sending.." : "send magic link!"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const session = await API.auth.api.getUserByCookie(req);

  const user = API.auth.user();

  if (session && session?.token) {
    API.auth.setAuth(session?.token);

    return {
      props: {
        context: {
          auth: {
            user: session.user,
          },
        },
      },
      redirect: { destination: "todos" },
    };
  }

  const todos = await GetTodos();

  return {
    props: {
      fallback: {
        [TODO_URL_KEY]: todos,
      },
      context: {
        auth: {
          user: null,
        },
      },
    },
  };
};
