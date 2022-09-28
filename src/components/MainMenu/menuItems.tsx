// import { signIn, signOut } from 'next-auth/react';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { FaBalanceScale } from 'react-icons/fa';
import { BiGitCompare } from 'react-icons/bi';
import { CgCalculator, CgInfo } from 'react-icons/cg';
import { GoStar } from 'react-icons/go';
import { MdSettings } from 'react-icons/md';
import { GiForkKnifeSpoon } from 'react-icons/gi';

import navigation from '../../constants/navigation';

export const menuItems = [
  {
    icon: <FaBalanceScale data-testid="menu-icon-equivalence" />,
    label: 'equivalence',
    url: navigation.equivalence,
  },
  {
    icon: <BiGitCompare data-testid="menu-icon-comparator" />,
    label: 'comparator',
    url: navigation.comparator,
  },
  {
    icon: <CgCalculator data-testid="menu-icon-calculator" />,
    label: 'calculator',
    url: navigation.calculator,
  },
  {
    accessLevel: 'signed',
    icon: <GoStar data-testid="menu-icon-favourites" />,
    label: 'favouriteEquivalences',
    url: navigation.underDevelopment,
  },
  {
    accessLevel: 'signed',
    icon: <GiForkKnifeSpoon data-testid="menu-icon-my-foods" />,
    label: 'myFoods',
    url: navigation.foods.list,
  },
  {
    accessLevel: 'signed',
    icon: <MdSettings data-testid="menu-icon-settings" />,
    label: 'settings',
    url: navigation.underDevelopment,
  },
  {
    icon: <CgInfo data-testid="menu-icon-about" />,
    label: 'aboutApp',
    url: navigation.about,
  },
  {
    accessLevel: 'signed',
    icon: <IoMdLogOut data-testid="menu-icon-logout" />,
    label: 'logout',
    onClick: () => null,
  },
  {
    accessLevel: 'unsigned',
    icon: <IoMdLogIn data-testid="menu-icon-login" />,
    label: 'login',
    onClick: () => null,
  },
];
