import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FoodList } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component FoodList', () => {
  const defaultProps: any = {
    foodList: [
      {
        datasource: 'bedca',
        id: '2260',
        name: 'Cerdo, panceta, cruda',
      },
      {
        datasource: 'openfoodfacts',
        id: '8710445020878',
        imageUrl: 'http://images.com/test-image.png',
        name: 'Pan de Fibra y Sésamo',
      },
    ],
    onSelect: jest.fn(),
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<FoodList {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();

    expect(screen.getByTestId('food-list')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.foodList[0].name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.foodList[1].name)).toBeInTheDocument();
  });

  it('selects the clicked item and highlights it', () => {
    renderWithProps();

    const item = screen.getByText(defaultProps.foodList[0].name).closest('li');
    const { getByTestId } = within(item!);

    userEvent.click(getByTestId('food-list-item-wrapper'));
    expect(item).toHaveClass('foodList__item--selected');
  });

  it('executes the provided onSelect method when an item is clicked', () => {
    renderWithProps();

    const item = screen.getByText(defaultProps.foodList[0].name).closest('li');
    const { getByTestId } = within(item!);

    userEvent.click(getByTestId('food-list-item-wrapper'));
    expect(defaultProps.onSelect).toBeCalledWith(defaultProps.foodList[0]);
  });

  it('highlights the selected item if selectedFoodId is provided and exists in the list', () => {
    renderWithProps({ selectedFoodId: defaultProps.foodList[0].id });

    expect(
      screen.getByText(defaultProps.foodList[0].name).closest('li'),
    ).toHaveClass('foodList__item--selected');
  });

  it('allows to change the selected item even if selectedFood prop is provided', () => {
    renderWithProps({ selectedFood: defaultProps.foodList[0].id });

    const item = screen.getByText(defaultProps.foodList[1].name).closest('li');
    const { getByTestId } = within(item!);

    userEvent.click(getByTestId('food-list-item-wrapper'));

    expect(
      screen.getByText(defaultProps.foodList[0].name).closest('li'),
    ).not.toHaveClass('foodList__item--selected');
    expect(item).toHaveClass('foodList__item--selected');
  });

  it('shows the food image if it is not empty', () => {
    renderWithProps();

    const item = screen
      .getByText(defaultProps.foodList[0].name)
      .closest('li')
      ?.querySelector('img');
    expect(item).toHaveAttribute('src', defaultProps.foodList[0].imageUrl);
  });

  it('shows a Food Not Found image if the food has not image', async () => {
    const foodItem = {
      id: '1',
      imageUrl: '',
      name: 'Test name',
    };
    renderWithProps({ foodList: [foodItem] });

    const item = screen
      .getByText(foodItem.name)
      .closest('li')
      ?.querySelector('img');

    await waitFor(() =>
      expect(item).toHaveAttribute('src', '/images/foodNotFound.png'),
    );
  });

  it('displays the correct source icon in the item', () => {
    renderWithProps();

    expect(screen.getByTestId('icon-openfoodfacts')).toBeInTheDocument();
    expect(screen.getByTestId('icon-bedca')).toBeInTheDocument();
  });
});
