import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';
import { getValueOrZero } from './getValueOrZero';

export const getFoodAmountForMacros = (
  food: FoodDetailsTd,
  macro: PossibleMacrosTd,
  targetGrams: number,
) => {
  const macroGrams =
    (getValueOrZero(food.macronutrients[macro].amount, true) as number) /
    food.grams;
  const foodGrams = macroGrams > 0 ? targetGrams / macroGrams : 0;

  return getValueOrZero(foodGrams, true) as number;
};
