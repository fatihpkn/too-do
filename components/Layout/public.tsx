import * as React from 'react';

interface IPublicLayoutProps {
}

const PublicLayout: React.FunctionComponent<IPublicLayoutProps> = (props) => {
  return <div {...props}></div>;
};

export default PublicLayout;
