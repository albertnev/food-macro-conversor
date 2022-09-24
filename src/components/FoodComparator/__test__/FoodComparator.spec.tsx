import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FoodComparator } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';
import {
  mockedOpenFoodDetails,
  mockedBedcaFoodDetails,
} from '../../../testUtils/mocks/foodDetails';

describe('Component FoodComparator', () => {
  const defaultProps = {
    foodsToCompare: [mockedOpenFoodDetails, mockedBedcaFoodDetails],
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<FoodComparator {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('food-comparator')).toBeInTheDocument();
  });

  it('renders the provided foods correctly', () => {
    renderWithProps();
    expect(screen.getByText(mockedBedcaFoodDetails.name)).toBeInTheDocument();
    expect(screen.getByText(mockedOpenFoodDetails.name)).toBeInTheDocument();
    expect(screen.getAllByTestId('food-comparator-icon')).toHaveLength(1);
  });

  it('renders the provided icon between foods if provided', () => {
    renderWithProps({ icon: <span data-testid="food-provided-icon">L</span> });
    expect(screen.queryAllByTestId('food-comparator-icon')).toHaveLength(0);
    expect(screen.getAllByTestId('food-provided-icon')).toHaveLength(1);
  });

  it('executes the provided onChangeFood method if decorator button clicked', () => {
    const onChangeFood = jest.fn();
    renderWithProps({ onChangeFood });

    userEvent.click(screen.getAllByText('T_changeFood')[0]);
    expect(onChangeFood).toBeCalledWith(defaultProps.foodsToCompare[0]);
  });

  it('sends the provided verticalDisplay prop to FoodDetails component', () => {
    renderWithProps({ verticalDisplay: true });
    expect(screen.getAllByTestId('food-details')[0]).toHaveClass(
      'foodDetails__verticalDisplay',
    );
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('food-comparator')).toHaveClass('test-class');
  });
});
