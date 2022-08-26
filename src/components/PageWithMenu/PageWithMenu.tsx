import React from 'react';
import { MainMenu } from '../MainMenu';

interface PageWithMenuProps {
  children?: React.ReactNode;
}

const PageWithMenu: React.FC<PageWithMenuProps> = ({ children }) => (
  <>
    <MainMenu />
    {children}
  </>
);

PageWithMenu.defaultProps = {
  children: null,
};

export default PageWithMenu;
