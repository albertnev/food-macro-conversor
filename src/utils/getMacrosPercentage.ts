import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';
import { getValueOrZero } from './getValueOrZero';

export const getMacrosPercentages = (food: FoodDetailsTd) => {
  if (!food.macronutrients) {
    return {
      alcohol: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    };
  }

  const totalMacros = Object.values(food.macronutrients).reduce(
    (prev, cur) => prev + Number.parseFloat(cur.amount || '0'),
    0,
  );

  return (Object.keys(food.macronutrients) as PossibleMacrosTd[]).reduce(
    (prev, cur) => ({
      ...prev,
      [cur]: getValueOrZero(
        ((getValueOrZero(food.macronutrients[cur].amount, true) as number) *
          100) /
          totalMacros,
      ) as number,
    }),
    {},
  ) as { [key in PossibleMacrosTd]: number };
};
