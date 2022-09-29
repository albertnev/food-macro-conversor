import React from 'react';
import cx from 'classnames';

import { AppContainer } from '../AppContainer';
import { MainMenu } from '../MainMenu';
import { StPageWithMenuContent } from './PageWithMenu.styled';

interface PageWithMenuProps {
  children?: React.ReactNode;
  pageName?: string;
  precontent?: React.ReactNode;
}

const PageWithMenu: React.FC<PageWithMenuProps> = ({
  children,
  pageName,
  precontent,
}) => (
  <AppContainer>
    <MainMenu pageName={pageName} />
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
  pageName: '',
  precontent: null,
};

export default PageWithMenu;
