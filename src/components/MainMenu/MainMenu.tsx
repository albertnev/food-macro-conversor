import React from 'react';
import styles from './MainMenu.module.scss';

const MainMenu: React.FC = () => {
  const a = 'Menu';
  return (
    <div className={styles.mainMenu}>
      <div className="width-container">{a}</div>
    </div>
  );
};

export default MainMenu;
