import React from 'react';
import { screen } from '@testing-library/react';

import { FoodDetails } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component FoodDetails', () => {
  const defaultProps = {
    food: {
      brand: 'Hacendado',
      datasource: 'openfoodfacts',
      grams: 100,
      id: '8710445020878',
      imageUrl: 'https://images.com/myimage.jpg',
      ingredients:
        'Harina integral de centeno (gluten) 85%, semillas de sésamo 11%, sal, Contiene: centeno, granos de sésamo,',
      kcals: '391',
      macronutrients: {
        alcohol: {
          amount: '0',
          name: 'alcohol',
          units: 'g',
        },
        carbs: {
          amount: '60.1',
          name: 'carbs',
          units: 'g',
        },
        fat: {
          amount: '7.6',
          name: 'fat',
          units: 'g',
        },
        protein: {
          amount: '13',
          name: 'protein',
          units: 'g',
        },
      },
      name: 'Pan de Fibra y Sésamo',
    },
  };

  const renderWithProps = (props: any = {}) =>
    renderComponent(<FoodDetails {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('food-details')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.food.name)).toBeInTheDocument();
    expect(screen.getByTestId('food-details-image')).toHaveStyle({
      backgroundImage: defaultProps.food.imageUrl,
    });
  });

  it('renders a Not Found image if no image is provided', () => {
    renderWithProps({ food: { ...defaultProps.food, imageUrl: undefined } });
    expect(screen.getByTestId('food-details-image')).toHaveStyle({
      backgroundImage: '/images/foodNotFound.png',
    });
  });

  it('displays the food brand if it is available', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.food.brand)).toBeInTheDocument();
  });

  it('renders the provided titleDecorator if any', () => {
    renderWithProps({ titleDecorator: <span>Test decorator</span> });
    expect(screen.getByText('Test decorator')).toBeInTheDocument();
  });

  it('displays the MacroDisplay component with the correct data', () => {
    renderWithProps();
    expect(screen.getByTestId('macro-display')).toBeInTheDocument();
    expect(
      screen.getByText(`${defaultProps.food.macronutrients.carbs.amount}g`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${defaultProps.food.macronutrients.fat.amount}g`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${defaultProps.food.macronutrients.protein.amount}g`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${defaultProps.food.kcals} Kcals`),
    ).toBeInTheDocument();
  });

  it('displays the alcohol data chart if it has value', () => {
    renderWithProps({
      food: {
        ...defaultProps.food,
        macronutrients: {
          ...defaultProps.food.macronutrients,
          alcohol: {
            amount: '18',
            name: 'alcohol',
            units: 'g',
          },
        },
      },
    });

    expect(screen.getByTestId('macro-display')).toBeInTheDocument();
    expect(screen.getByText('T_alcohol')).toBeInTheDocument();
    expect(screen.getByText('18g')).toBeInTheDocument();
  });

  it('displays the ingredients and other information by default', () => {
    renderWithProps();
    expect(screen.getByText(defaultProps.food.ingredients)).toBeInTheDocument();
  });

  it('displays a "Without information" text if no ingredients are found', () => {
    renderWithProps({ food: { ...defaultProps.food, ingredients: '' } });
    expect(screen.getByText('T_withoutInformation')).toBeInTheDocument();
  });

  it('hides the ingredients and other information if isSummary is provided as true', () => {
    renderWithProps({ isSummary: true });

    expect(
      screen.queryByText(defaultProps.food.ingredients),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('T_withoutInformation')).not.toBeInTheDocument();
  });

  it('adds specific classes to the element if verticalDisplay prop is provided', () => {
    renderWithProps({ verticalDisplay: true });

    expect(screen.getByTestId('food-details')).toHaveClass(
      'foodDetails__verticalDisplay',
    );
  });

  it('adds the provided className to the element', () => {
    renderWithProps({ className: 'test-class' });
    expect(screen.getByTestId('food-details')).toHaveClass('test-class');
  });
});
