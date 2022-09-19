import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMockJest from 'fetch-mock-jest';

import { FoodSelector } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';
import { mockedFoodList } from '../../../testUtils/mocks/foodList';
import { mockedFoodDetails } from '../../../testUtils/mocks/foodDetails';

describe('Component FoodSelector', () => {
  const defaultProps = {
    onSelectFood: jest.fn(),
  };

  fetchMockJest.mock(
    /\/api\/food\/search/,
    { body: mockedFoodList, status: 200 },
    {
      overwriteRoutes: true,
    },
  );

  fetchMockJest.mock(
    /\/api\/food\/getDetails/,
    { body: mockedFoodDetails, status: 200 },
    {
      overwriteRoutes: true,
    },
  );

  const renderWithProps = (props: any = {}) =>
    renderComponent(<FoodSelector {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('food-selector')).toBeInTheDocument();
  });

  it('renders SearchFood as first step by default', () => {
    renderWithProps();
    expect(screen.getByTestId('search-food')).toBeInTheDocument();
  });

  it('renders ShowFoodDetails when a food is selected and Next button is clicked', async () => {
    renderWithProps();

    userEvent.type(screen.getByTestId('input-control'), 'test');
    userEvent.click(await screen.findByText(mockedFoodList[0].name));

    await waitFor(() => {
      expect(
        screen.getByText(mockedFoodList[0].name).closest('li'),
      ).toHaveClass('foodList__item--selected');
    });

    userEvent.click(screen.getByText('T_next'));

    await waitFor(() =>
      expect(screen.getByTestId('food-details')).toBeInTheDocument(),
    );
  });

  it('does not render ShowFoodDetails if Next button is clicked but no food is selected', async () => {
    renderWithProps();

    userEvent.type(screen.getByTestId('input-control'), 'test');
    await screen.findByText(mockedFoodList[0].name);

    userEvent.click(screen.getByText('T_next'));

    expect(screen.getByText(mockedFoodList[0].name)).toBeInTheDocument();
  });

  it('goes to SearchFood step if Back button is clicked', async () => {
    renderWithProps();

    userEvent.type(screen.getByTestId('input-control'), 'test');
    userEvent.click(await screen.findByText(mockedFoodList[0].name));

    await waitFor(() => {
      expect(
        screen.getByText(mockedFoodList[0].name).closest('li'),
      ).toHaveClass('foodList__item--selected');
    });

    userEvent.click(screen.getByText('T_next'));

    await waitFor(() =>
      expect(screen.getByTestId('food-details')).toBeInTheDocument(),
    );

    userEvent.click(screen.getByText('T_back'));

    await waitFor(() =>
      expect(screen.getByTestId('search-food')).toBeInTheDocument(),
    );
  });

  it('executes the provided onSelectFood method when a food is finally selected', async () => {
    renderWithProps();

    userEvent.type(screen.getByTestId('input-control'), 'test');
    userEvent.click(await screen.findByText(mockedFoodList[0].name));

    await waitFor(() => {
      expect(
        screen.getByText(mockedFoodList[0].name).closest('li'),
      ).toHaveClass('foodList__item--selected');
    });

    userEvent.click(screen.getByText('T_next'));

    await waitFor(() =>
      expect(screen.getByTestId('food-details')).toBeInTheDocument(),
    );

    userEvent.click(screen.getByText('T_select'));

    expect(defaultProps.onSelectFood).toBeCalledWith(mockedFoodDetails);
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('food-selector')).toHaveClass('test-class');
  });
});
