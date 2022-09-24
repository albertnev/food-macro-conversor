import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FoodEquivalence } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';
import {
  mockedOpenFoodDetails,
  mockedBedcaFoodDetails,
} from '../../../testUtils/mocks/foodDetails';
import { getFoodEquivalence } from '../../../utils/getFoodEquivalence';

describe('Component FoodEquivalence', () => {
  const defaultProps = {
    foodsToCompare: [mockedOpenFoodDetails, mockedBedcaFoodDetails],
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<FoodEquivalence {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('food-equivalence')).toBeInTheDocument();
  });

  it('renders the provided foods correctly', () => {
    renderWithProps();

    expect(
      screen.getByText(defaultProps.foodsToCompare[0].name, {
        selector: '.foodEquivalence__foodName',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.foodsToCompare[0].name, {
        selector: '.foodDetails__nameTitle',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(defaultProps.foodsToCompare[1].name, {
        selector: '.foodEquivalence__foodName',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.foodsToCompare[1].name, {
        selector: '.foodDetails__nameTitle',
      }),
    ).toBeInTheDocument();
  });

  it('displays the correct equivalence description with the correct names and amount input', () => {
    renderWithProps();
    const { getByTestId, getByText } = within(
      screen.getByTestId('food-equivalence-calculated-description'),
    );

    expect(getByTestId('input-food-quantity')).toBeInTheDocument();
    expect(getByText(defaultProps.foodsToCompare[0].name)).toBeInTheDocument();
    expect(getByText(defaultProps.foodsToCompare[1].name)).toBeInTheDocument();
  });

  it('recalculates food equivalences when the source food grams amount is changed', async () => {
    renderWithProps();
    const { getByTestId, getByText } = within(
      screen.getByTestId('food-equivalence-calculated-description'),
    );

    const input = getByTestId(
      'input-food-quantity-control',
    ) as HTMLInputElement;
    input.setSelectionRange(0, input.value.length);

    userEvent.type(input, '50');
    await waitFor(() => {
      expect(input).toHaveDisplayValue('50');
    });

    const equivalence = getFoodEquivalence(
      defaultProps.foodsToCompare[0],
      50,
      defaultProps.foodsToCompare[1],
    );
    await waitFor(() => {
      expect(getByText(`${equivalence.grams}g`)).toBeInTheDocument();
    });
  });

  it('executes the provided onQuantityChange method when source food grams amount changes', async () => {
    const onQuantityChange = jest.fn();
    renderWithProps({ onQuantityChange });
    onQuantityChange.mockReset();

    const { getByTestId } = within(
      screen.getByTestId('food-equivalence-calculated-description'),
    );

    const input = getByTestId(
      'input-food-quantity-control',
    ) as HTMLInputElement;
    input.setSelectionRange(0, input.value.length);

    userEvent.type(input, '50');
    await waitFor(() => {
      expect(onQuantityChange).toHaveBeenCalledWith(50);
    });
  });

  it('executes the provided onSwitchFoods method when "Switch foods" button is pressed', () => {
    const onSwitchFoods = jest.fn();
    renderWithProps({ onSwitchFoods });
    onSwitchFoods.mockReset();

    userEvent.click(screen.getByText('T_switchFoods'));
    expect(onSwitchFoods).toBeCalled();
  });

  it('displays all macro checkboxes', () => {
    renderWithProps();
    ['kcals', 'carbs', 'fat', 'protein'].forEach((macro) => {
      expect(screen.getByTestId(`checkbox-${macro}`)).toBeInTheDocument();
      expect(
        screen.getByText(`T_${macro}`, { selector: 'label span' }),
      ).toBeInTheDocument();
    });
  });

  it('recalculates food equivalences when clicking a macro checkbox', async () => {
    renderWithProps();

    const { getByText } = within(
      screen.getByTestId('food-equivalence-calculated-description'),
    );

    userEvent.click(screen.getByTestId('checkbox-carbs'));
    userEvent.click(screen.getByTestId('checkbox-fat'));

    const equivalence = getFoodEquivalence(
      defaultProps.foodsToCompare[0],
      100,
      defaultProps.foodsToCompare[1],
      ['carbs', 'fat'],
    );

    await waitFor(() => {
      expect(getByText(`${equivalence.grams}g`)).toBeInTheDocument();
    });
  });

  it('executes the provided onMacrosChange method when a macro checkbox is toggled', () => {
    const onMacrosChange = jest.fn();
    renderWithProps({ onMacrosChange });
    onMacrosChange.mockReset();

    userEvent.click(screen.getByTestId('checkbox-carbs'));
    expect(onMacrosChange).toBeCalledWith(['carbs']);

    userEvent.click(screen.getByTestId('checkbox-fat'));
    expect(onMacrosChange).toBeCalledWith(['carbs', 'fat']);

    userEvent.click(screen.getByTestId('checkbox-carbs'));
    expect(onMacrosChange).toBeCalledWith(['fat']);
  });

  it('renders the provided selectedMacros and quantity properly in stead of default values', () => {
    const props = { quantity: 150, selectedMacros: ['protein', 'kcals'] };
    renderWithProps(props);
    const { getByDisplayValue } = within(
      screen.getByTestId('food-equivalence-calculated-description'),
    );

    expect(getByDisplayValue(`${props.quantity}`)).toBeInTheDocument();
    props.selectedMacros.forEach((macro) => {
      expect(screen.getByTestId(`checkbox-${macro}`)).toBeInTheDocument();
    });
  });

  it('executes the provided onChangeFood method when "Change food" button is clicked', () => {
    const onChangeFood = jest.fn();
    renderWithProps({ onChangeFood });

    userEvent.click(screen.getAllByText('T_changeFood')[0]);
    expect(onChangeFood).toBeCalledWith(
      expect.objectContaining({ id: defaultProps.foodsToCompare[0].id }),
    );

    userEvent.click(screen.getAllByText('T_changeFood')[1]);
    expect(onChangeFood).toBeCalledWith(
      expect.objectContaining({ id: defaultProps.foodsToCompare[1].id }),
    );
  });

  it('displays the food amounts correctly for source and calculated food', async () => {
    renderWithProps();
    const { getByTestId } = within(
      screen.getByTestId('food-equivalence-calculated-description'),
    );
    const sourceGrams = 150;

    const input = getByTestId(
      'input-food-quantity-control',
    ) as HTMLInputElement;
    input.setSelectionRange(0, input.value.length);

    userEvent.type(input, `${sourceGrams}`);
    await waitFor(() => {
      expect(input).toHaveDisplayValue(`${sourceGrams}`);
    });

    const equivalence = getFoodEquivalence(
      defaultProps.foodsToCompare[0],
      sourceGrams,
      defaultProps.foodsToCompare[1],
    );

    await waitFor(() => {
      expect(
        screen.getByText(`T_forEachNGrams--count:${sourceGrams}`),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(`T_forEachNGrams--count:${equivalence.grams}`),
      ).toBeInTheDocument();
    });
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('food-equivalence')).toHaveClass('test-class');
  });
});
