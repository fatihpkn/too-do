import * as React from 'react';

interface ITodoCheckboxProps {
}

const TodoCheckbox: React.FunctionComponent<ITodoCheckboxProps> = (props) => {
  return <input {...props}/>;
};

export default TodoCheckbox;
