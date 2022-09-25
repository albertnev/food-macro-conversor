/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { TbChartArcs } from 'react-icons/tb';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaBalanceScale } from 'react-icons/fa';
import { BiGitCompare } from 'react-icons/bi';
import { CgCalculator, CgInfo } from 'react-icons/cg';
import { useTranslation } from 'next-i18next';
import { useSession, signIn, signOut } from 'next-auth/react';

import navigation from '../../constants/navigation';
import { StMenuContainer, StMenuDrawerContainer } from './MainMenu.styled';
import useMediaQuery from '../../hooks/useMediaQuery';

const MenuList: React.FC<{ withIcon?: boolean }> = ({ withIcon }) => {
  const { status } = useSession();
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <ul className="menu__pageList" data-testid="menu-list">
      {[
        {
          icon: <FaBalanceScale data-testid="menu-icon-equivalence" />,
          label: t('equivalence'),
          url: navigation.equivalence,
        },
        {
          icon: <BiGitCompare data-testid="menu-icon-comparator" />,
          label: t('comparator'),
          url: navigation.comparator,
        },
        {
          icon: <CgCalculator data-testid="menu-icon-calculator" />,
          label: t('calculator'),
          url: navigation.calculator,
        },
        {
          icon: <CgInfo data-testid="menu-icon-about" />,
          label: t('aboutApp'),
          url: navigation.about,
        },
        status === 'authenticated'
          ? {
              icon: <IoMdLogOut data-testid="menu-icon-logout" />,
              label: t('logout'),
              onClick: signOut,
            }
          : {
              icon: <IoMdLogIn data-testid="menu-icon-login" />,
              label: t('login'),
              onClick: signIn,
            },
      ].map(({ icon, label, onClick, url }) => (
        <li
          key={`menu-page-${url}`}
          className={cx({
            menu__page: true,
            'menu__page--active': pathname === url,
          })}
        >
          <Link href={url || ''} legacyBehavior={false} onClick={onClick}>
            <div className="menu__link">
              {withIcon && <span className="menu__pageIcon">{icon}</span>}{' '}
              {label}
            </div>
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
  const menuDrawerMode = useMediaQuery(700);

  const toggleMenuDrawer = () => {
    setIsDrawerOpened((current) => !current);
  };

  return (
    <>
      <StMenuContainer data-testid="main-menu">
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
              <GiHamburgerMenu
                data-testid="main-menu-drawer-icon"
                onClick={toggleMenuDrawer}
              />
            </div>
          )) || <MenuList />}
        </div>
      </StMenuContainer>
      {isDrawerOpened && (
        <StMenuDrawerContainer
          className="menu__drawerContainer"
          data-testid="main-menu-drawer"
        >
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
