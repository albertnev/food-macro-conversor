/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { TbChartArcs } from 'react-icons/tb';
import { useTranslation } from 'next-i18next';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaBalanceScale } from 'react-icons/fa';
import { BiGitCompare } from 'react-icons/bi';
import { CgCalculator } from 'react-icons/cg';

import navigation from '../../constants/navigation';
import { StMenuContainer, StMenuDrawerContainer } from './MainMenu.styled';
import useMediaQuery from '../../hooks/useMediaQuery';

const MenuList: React.FC<{ withIcon?: boolean }> = ({ withIcon }) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <ul className="menu__pageList">
      {[
        [navigation.equivalence, t('equivalence'), <FaBalanceScale />],
        [navigation.comparator, t('comparator'), <BiGitCompare />],
        [navigation.calculator, t('calculator'), <CgCalculator />],
      ].map(([pageUrl, title, icon]) => (
        <li
          key={`menu-page-${pageUrl}`}
          className={cx({
            menu__page: true,
            'menu__page--active': pathname === pageUrl,
          })}
        >
          <Link href={pageUrl as string}>
            <a className="menu__link">
              {withIcon && <span className="menu__pageIcon">{icon}</span>}{' '}
              {title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MenuList.defaultProps = {
  withIcon: false,
};

const MainMenu: React.FC = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const menuDrawerMode = useMediaQuery(540);

  const toggleMenuDrawer = () => {
    setIsDrawerOpened((current) => !current);
  };

  return (
    <>
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
          {(menuDrawerMode && (
            <div className="menu__drawerIcon">
              <GiHamburgerMenu onClick={toggleMenuDrawer} />
            </div>
          )) || <MenuList />}
        </div>
      </StMenuContainer>
      {isDrawerOpened && (
        <StMenuDrawerContainer className="menu__drawerContainer">
          <div
            className="menu__background"
            role="presentation"
            onClick={() => setIsDrawerOpened(false)}
          />
          <div className="menu__drawerMenu">
            <MenuList withIcon />
          </div>
        </StMenuDrawerContainer>
      )}
    </>
  );
};

export default MainMenu;
