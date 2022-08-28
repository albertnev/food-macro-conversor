import React from 'react';

import styles from './AppContainer.module.scss';

interface AppContainerProps {
  children?: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => (
  <div className={styles.appContainer}>
    <div className={styles.appContent}>{children}</div>
  </div>
);

AppContainer.defaultProps = {
  children: null,
};

export default AppContainer;
