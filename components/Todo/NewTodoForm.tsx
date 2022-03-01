import { yupResolver } from "@hookform/resolvers/yup";
import { TodoItemModel } from "models/todo";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddTodo, GetTodos } from "services/todo";
import * as Yup from "yup";

interface INewTodoFormProps {}

const NewTodoValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  completed: Yup.boolean().notRequired().default(false),
});

const NewTodoForm: React.FunctionComponent<INewTodoFormProps> = (props) => {
  const { data } = useQuery("todos", GetTodos, { refetchOnMount: false });

  const client = useQueryClient();

  const { register, reset, handleSubmit, formState } = useForm<TodoItemModel>({ resolver: yupResolver(NewTodoValidationSchema) });

  const { mutate } = useMutation(AddTodo, {
    onMutate: async (todo) => {
      console.log("todos", data);

      const previousTodos = client.getQueryData<TodoItemModel[]>("todos") || [];

      const newTodos = [todo, ...previousTodos];

      client.setQueryData("todos", newTodos);

      return { previousTodos };
    },
    onError: (err, todos, context: any) => {
      client.setQueryData("todos", context?.previousTodos);
    },
    onSettled: (data, todos, context: any) => {
      client.invalidateQueries("todos");
    },
  });

  const onFormSubmit: SubmitHandler<TodoItemModel> = async (newTodo) => {
    mutate(newTodo);

    reset();

    // await AddTodo({ ...newTodo, completed: false });
  };

  console.log("Form state -> ", formState.errors);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='border-b border-indigo-50 py-4 mb-3'>
      <input placeholder="type a new to do" className='border outline-transparent focus:outline-purple-500 border-purple-200 w-full rounded-lg py-2 px-4 transition-all' type={"text"} {...register("title")} />
      <input className="hidden" type={"submit"} />
    </form>
  );
};

export default NewTodoForm;
