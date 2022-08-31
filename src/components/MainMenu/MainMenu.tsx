/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import { TbChartArcs } from 'react-icons/tb';

import { StMenuContainer } from './MainMenu.styled';

const MainMenu: React.FC = () => (
  <StMenuContainer>
    <div className="menu__content width-container">
      <div className="menu__brandName">
        <Link href="/">
          <a className="menu__link">
            <span className="menu__brandIcon">
              <TbChartArcs />
            </span>
            <span>Macro Conversor</span>
          </a>
        </Link>
      </div>
      <ul className="menu__pageList">
        <li className="menu__page">
          <Link href="/food-equivalence">
            <a className="menu__link">Food conversor</a>
          </Link>
        </li>
      </ul>
    </div>
  </StMenuContainer>
);

export default MainMenu;
