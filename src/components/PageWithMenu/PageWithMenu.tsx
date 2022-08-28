import React from 'react';
import cx from 'classnames';
import { AppContainer } from '../AppContainer';
import { MainMenu } from '../MainMenu';

import styles from './PageWithMenu.module.scss';

interface PageWithMenuProps {
  children?: React.ReactNode;
}

const PageWithMenu: React.FC<PageWithMenuProps> = ({ children }) => (
  <AppContainer>
    <MainMenu />
    <div className={cx(styles.contentContainer, 'width-container')}>
      {children}
    </div>
  </AppContainer>
);

PageWithMenu.defaultProps = {
  children: null,
};

export default PageWithMenu;
