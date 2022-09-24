import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FoodCalculator } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';
import { mockedFoodDetails } from '../../../testUtils/mocks/foodDetails';
import { getFoodAmountForMacros } from '../../../utils/getFoodAmountForMacros';

describe('Component FoodCalculator', () => {
  const defaultProps = { selectedFood: mockedFoodDetails };
  const defaultSelectedMacro = 'carbs';

  const renderWithProps = (props: any = {}) =>
    renderComponent(<FoodCalculator {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('food-calculator')).toBeInTheDocument();
  });

  it('renders the components to calculate the macro quantities', () => {
    renderWithProps();
    const { getByTestId, getByText } = within(
      screen.getByTestId('food-calculated-description'),
    );

    expect(getByTestId('select-macro-selector')).toBeInTheDocument();
    expect(getByTestId('input-food-quantity')).toBeInTheDocument();

    expect(getByText(mockedFoodDetails.name)).toBeInTheDocument();

    const foodQuantity = getFoodAmountForMacros(
      mockedFoodDetails,
      defaultSelectedMacro,
      50,
    );
    expect(getByText(`${foodQuantity}g`)).toBeInTheDocument();
  });

  it('recalculates food quantity when changing selected macro', () => {
    renderWithProps();
    const { getByTestId, getByText } = within(
      screen.getByTestId('food-calculated-description'),
    );

    userEvent.click(
      getByTestId('select-macro-selector').querySelector('.select__control')!,
    );
    userEvent.click(getByText('T_fat'));

    const foodQuantity = getFoodAmountForMacros(mockedFoodDetails, 'fat', 50);

    expect(getByText(`${foodQuantity}g`)).toBeInTheDocument();
  });

  it('recalculates food quantity when macro quantity is changed', async () => {
    renderWithProps();
    const { getByTestId, getByText } = within(
      screen.getByTestId('food-calculated-description'),
    );

    const input = getByTestId(
      'input-food-quantity-control',
    ) as HTMLInputElement;
    input.setSelectionRange(0, input.value.length);
    userEvent.type(input, '150');

    await waitFor(() => {
      expect(input).toHaveDisplayValue('150');
    });

    const foodQuantity = getFoodAmountForMacros(
      mockedFoodDetails,
      defaultSelectedMacro,
      150,
    );

    await waitFor(() => {
      expect(getByText(`${foodQuantity}g`)).toBeInTheDocument();
    });
  });

  it('displays food details for the selected quantities', () => {
    renderWithProps();
    const { getByText } = within(screen.getByTestId('food-details'));

    const foodQuantity = getFoodAmountForMacros(
      mockedFoodDetails,
      defaultSelectedMacro,
      50,
    );

    expect(
      getByText(`T_forEachNGrams--count:${foodQuantity}`),
    ).toBeInTheDocument();
  });
});
