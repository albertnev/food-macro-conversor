/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';

import { menuItems } from '../../menuItems';
import { StMenuList } from './MenuList.styled';

interface MenuListProps {
  className?: string;
  withIcon?: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ className, withIcon }) => {
  const { status } = useSession();
  const { pathname } = useRouter();
  const { t } = useTranslation();

  const isLoggedIn = status === 'authenticated';

  const isPageShown = (accessLevel?: string) => {
    const alwaysDisplayed = !accessLevel;
    const showForUnsigned = !isLoggedIn && accessLevel === 'unsigned';
    const showForSigned = isLoggedIn && accessLevel === 'signed';

    return alwaysDisplayed || showForUnsigned || showForSigned;
  };

  return (
    <StMenuList
      className={cx('menu__pageList', className)}
      data-testid="menu-list"
    >
      {menuItems.map(
        ({ accessLevel, icon, label, onClick, url }) =>
          (isPageShown(accessLevel) && (
            <li
              key={`menu-page-${label}`}
              className={cx({
                menu__page: true,
                'menu__page--active': pathname === url,
                'menu__page--restricted': accessLevel === 'signed',
              })}
            >
              <Link href={url || ''} legacyBehavior={false} onClick={onClick}>
                <div className="menu__link">
                  {withIcon && <span className="menu__pageIcon">{icon}</span>}{' '}
                  {t(label)}
                </div>
              </Link>
            </li>
          )) ||
          null,
      )}
    </StMenuList>
  );
};

MenuList.defaultProps = {
  className: '',
  withIcon: false,
};

export default MenuList;
