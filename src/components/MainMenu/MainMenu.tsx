/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { TbChartArcs } from 'react-icons/tb';

import navigation from '../../constants/navigation';
import { StMenuContainer } from './MainMenu.styled';

const MainMenu: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <StMenuContainer>
      <div className="menu__content width-container">
        <div className="menu__brandName">
          <Link href={navigation.home}>
            <a className="menu__link">
              <span className="menu__brandIcon">
                <TbChartArcs />
              </span>
              <span>Macro Conversor</span>
            </a>
          </Link>
        </div>
        <ul className="menu__pageList">
          {[
            [navigation.equivalence, 'Equivalence'],
            [navigation.comparator, 'Comparator'],
          ].map(([pageUrl, title]) => (
            <li
              key={`menu-page-${pageUrl}`}
              className={cx({
                menu__page: true,
                'menu__page--active': pathname === pageUrl,
              })}
            >
              <Link href={pageUrl}>
                <a className="menu__link">{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </StMenuContainer>
  );
};

export default MainMenu;
