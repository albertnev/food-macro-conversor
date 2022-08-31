import React from 'react';
import cx from 'classnames';
import { AppContainer } from '../AppContainer';
import { MainMenu } from '../MainMenu';

import { StPageWithMenuContainer } from './PageWithMenu.styled';

interface PageWithMenuProps {
  children?: React.ReactNode;
}

const PageWithMenu: React.FC<PageWithMenuProps> = ({ children }) => (
  <AppContainer>
    <MainMenu />
    <StPageWithMenuContainer
      className={cx('pageWithMenuContent', 'width-container')}
    >
      {children}
    </StPageWithMenuContainer>
  </AppContainer>
);

PageWithMenu.defaultProps = {
  children: null,
};

export default PageWithMenu;
