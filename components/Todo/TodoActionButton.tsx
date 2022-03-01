import * as React from "react";

interface ITodoActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const TodoActionButton: React.FunctionComponent<ITodoActionButtonProps> = ({ label, disabled, ...props }) => {
  return (
    <div className={`select-none text-xs rounded-md inline-flex items-center transition-all border py-1 px-3`}>
      {label}
      <button className='bg-red-500 text-white rounded px-1 ml-2 text-[10px]' disabled={disabled} {...props} />
    </div>
  );
};

export default TodoActionButton;
