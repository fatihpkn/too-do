import * as React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  return (
    <button
      className={`w-full
      select-none
      py-1 
      px-8 
      bg-gradient-to-br 
      from-purple-600 
      to-violet-600 
      text-white 
      rounded-lg 
      shadow-lg 
      duration-300 
      hover:shadow-purple-400/70 
      focus-visible:shadow-purple-400/70 
      shadow-purple-400/40 
      focus-visible:outline-indigo-600 
      outline-none 
      transition-all
      disabled:opacity-40
      disabled:pointer-events-none`}
      {...props}></button>
  );
};

export default Button;
