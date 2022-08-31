import React from 'react';
import cx from 'classnames';
import { AppContainer } from '../AppContainer';
import { MainMenu } from '../MainMenu';

import { StPageWithMenuContainer } from './PageWithMenu.styled';

interface PageWithMenuProps {
  children?: React.ReactNode;
  precontent?: React.ReactNode;
}

const PageWithMenu: React.FC<PageWithMenuProps> = ({
  children,
  precontent,
}) => (
  <AppContainer>
    <MainMenu />
    {precontent}
    <StPageWithMenuContainer
      className={cx('pageWithMenuContent', 'width-container')}
    >
      {children}
    </StPageWithMenuContainer>
  </AppContainer>
);

PageWithMenu.defaultProps = {
  children: null,
  precontent: null,
};

export default PageWithMenu;
