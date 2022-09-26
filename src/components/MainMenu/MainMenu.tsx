/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { TbChartArcs } from 'react-icons/tb';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';

import navigation from '../../constants/navigation';
import { StMenuContainer, StMenuDrawerContainer } from './MainMenu.styled';
import { menuItems } from './menuItems';
import MenuList from './components/MenuList/MenuList';

const MainMenu: React.FC = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const { pathname } = useRouter();

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

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
          <div
            className="menu__toggle"
            role="presentation"
            onClick={toggleMenuDrawer}
          >
            <div className="menu__activePage">
              {t(menuItems.find(({ url }) => pathname === url)?.label || '')}
            </div>
            <div className="menu__drawerIcon">
              <GiHamburgerMenu data-testid="main-menu-drawer-icon" />
            </div>
          </div>
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
            {session?.user?.email && (
              <div className="menu__profileContainer">
                <div className="menu__profileImage">
                  <div
                    style={{ backgroundImage: `url(${session.user.image})` }}
                  />
                </div>
                <div className="menu__profileName">
                  {session.user.name || session.user.email}
                </div>
              </div>
            )}
            <MenuList withIcon />
          </div>
        </StMenuDrawerContainer>
      )}
    </>
  );
};

export default MainMenu;
