import React from 'react';
import cx from 'classnames';

import { AppContainer } from '../AppContainer';
import { MainMenu } from '../MainMenu';
import { StPageWithMenuContent } from './PageWithMenu.styled';

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
    <StPageWithMenuContent
      className={cx('pageWithMenuContent', 'width-container')}
    >
      {children}
    </StPageWithMenuContent>
  </AppContainer>
);

PageWithMenu.defaultProps = {
  children: null,
  precontent: null,
};

export default PageWithMenu;
