import { FC } from 'react';

import Header from 'components/atoms/Header';
import Flex from 'components/atoms/Flex';
import Sidebar from 'components/atoms/Sidebar';

// eslint-disable-next-line react/prop-types
const AppTemplate: FC = ({ children }) => {
  return (
    <Flex dir="column">
      <Header />
      <Flex dir="row" justify="start">
        <Sidebar />
        {children}
      </Flex>
    </Flex>
  );
};

export default AppTemplate;
