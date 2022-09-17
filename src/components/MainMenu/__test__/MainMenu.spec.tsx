import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

import { MainMenu } from '..';
import navigation from '../../../constants/navigation';
import { renderComponent } from '../../../testUtils/renderComponent';

let mockIsSmallerThanWidth = false;
jest.mock('../../../hooks/useMediaQuery', () =>
  jest.fn(() => mockIsSmallerThanWidth),
);

// Skipping this tests until someone in NextJS gives some docs on how to mock navigation with next/link and next/router
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Component MainMenu', () => {
  const defaultProps = {
    label: 'Test button',
    onChange: jest.fn(),
  };

  const menuOptions = [
    {
      iconTestId: 'menu-icon-equivalence',
      label: 'T_equivalence',
      url: navigation.equivalence,
    },
    {
      iconTestId: 'menu-icon-comparator',
      label: 'T_comparator',
      url: navigation.comparator,
    },
    {
      iconTestId: 'menu-icon-calculator',
      label: 'T_calculator',
      url: navigation.calculator,
    },
    {
      iconTestId: 'menu-icon-about',
      label: 'T_aboutApp',
      url: navigation.about,
    },
  ];

  const renderWithProps = (props: any = {}) =>
    renderComponent(<MainMenu {...defaultProps} {...props} />);

  describe('Desktop mode', () => {
    it('renders the component successfully', () => {
      renderWithProps();
      expect(screen.getByTestId('main-menu')).toBeInTheDocument();
    });

    it('renders all the page options correctly', () => {
      renderWithProps();

      menuOptions.forEach(({ label, url }) => {
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(label)).toHaveAttribute('href', url);
      });
    });

    it('redirects to the clicked page', async () => {
      renderWithProps();

      await Promise.all(
        menuOptions.map(async ({ label, url }) => {
          userEvent.click(screen.getByText(label));
          await waitFor(() => expect(useRouter().push).toBeCalledWith(url));
        }),
      );
    });
  });

  describe('Mobile mode', () => {
    beforeAll(() => {
      mockIsSmallerThanWidth = true;
    });

    afterAll(() => {
      mockIsSmallerThanWidth = false;
    });

    const toggleMenu = () => {
      userEvent.click(screen.getByTestId('main-menu-drawer-icon'));
    };

    it('renders the component hidden by default', () => {
      renderWithProps();
      expect(screen.getByTestId('main-menu')).toBeInTheDocument();
      expect(screen.getByTestId('main-menu-drawer-icon')).toBeInTheDocument();
    });

    it('renders all the page options correctly', () => {
      renderWithProps();
      toggleMenu();

      menuOptions.forEach(({ iconTestId, label, url }) => {
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(label)).toHaveAttribute('href', url);
        expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
      });
    });
  });
});
