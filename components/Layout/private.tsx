import Header from "components/Header";
import { useAuth } from "context/auth";
import * as React from "react";

interface IPrivateLayoutProps {}

const PrivateLayout: React.FunctionComponent<IPrivateLayoutProps> = (props) => {
  const { user } = useAuth();

  return (
    <div>
      <div className='container max-w-lg mx-auto'>
        {user && <Header></Header>}
        {props.children}
      </div>
    </div>
  );
};

export default PrivateLayout;
