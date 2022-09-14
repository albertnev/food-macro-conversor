import React from 'react';
import { screen } from '@testing-library/react';
import produce from 'immer';

import { MacroDisplay } from '..';
import { renderComponent } from '../../../testUtils/renderComponent';

describe('Component MacroDisplay', () => {
  const defaultProps = {
    food: {
      brand: 'Hacendado',
      datasource: 'openfoodfacts',
      grams: 150,
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
    renderComponent(<MacroDisplay {...defaultProps} {...props} />);

  it('renders the component successfully', () => {
    renderWithProps();
    expect(screen.getByTestId('macro-display')).toBeInTheDocument();
  });

  it('renders the food quantity correctly', () => {
    renderWithProps();
    expect(
      screen.getByText(`T_forEachNGrams--count:${defaultProps.food.grams}`),
    ).toBeInTheDocument();
  });

  it('does not render alcohol if its amount is 0', () => {
    renderWithProps();
    expect(screen.queryByText('T_alcohol')).not.toBeInTheDocument();
  });

  it('renders alcohol chart if its amount is greater than 0', () => {
    const propsWithAlcohol = produce(defaultProps, (immerDraft) => {
      immerDraft.food.macronutrients.alcohol.amount = '10.8';
    });
    renderWithProps(propsWithAlcohol);

    expect(screen.getByText('T_alcohol')).toBeInTheDocument();
    expect(
      screen.getByText(
        `${propsWithAlcohol.food.macronutrients.alcohol.amount}g`,
      ),
    ).toBeInTheDocument();
  });

  it('renders all macronutrients data correctly', () => {
    renderWithProps();

    Object.values(defaultProps.food.macronutrients)
      .filter((macro) => macro.name !== 'alcohol')
      .forEach((macro) => {
        expect(screen.getByText(`${macro.amount}g`)).toBeInTheDocument();
        expect(screen.getByText(`T_${macro.name}`)).toBeInTheDocument();
      });

    expect(
      screen.getByText(`${defaultProps.food.kcals} Kcals`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Kcals`)).toBeInTheDocument();
  });
});
