import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMockJest from 'fetch-mock-jest';

import { FoodEquivalence } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';
import { mockedFoodList } from '../../../testUtils/mocks/foodList';
import { mockedOpenFoodDetails } from '../../../testUtils/mocks/foodDetails';

describe.skip('Component FoodEquivalence', () => {
  const defaultProps = {};

  fetchMockJest.mock(
    /\/api\/food\/search/,
    { body: mockedFoodList, status: 200 },
    {
      overwriteRoutes: true,
    },
  );

  const mockFetchDetails = (
    mockedFood: any = mockedOpenFoodDetails,
    opts: any = {},
  ) => {
    fetchMockJest.once(
      /\/api\/food\/getDetails/,
      { body: mockedFood, status: 200, ...opts },
      {
        overwriteRoutes: true,
      },
    );
  };

  const typeAndSelect = async (foodToSelect: any) => {
    userEvent.type(screen.getByTestId('input-control'), 'test');
    userEvent.click(await screen.findByText(foodToSelect.name));
    mockFetchDetails(foodToSelect);

    userEvent.click(screen.getByText('T_next'));
    await waitFor(() =>
      expect(screen.getByTestId('food-details')).toBeInTheDocument(),
    );
    userEvent.click(screen.getByText('T_select'));
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<FoodEquivalence {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  it('renders the provided children correctly', () => {
    renderWithProps();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });
});
