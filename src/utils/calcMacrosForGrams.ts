import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';
import { getValueOrZero } from './getValueOrZero';

export const calcMacrosForGrams = (sourceFood: FoodDetailsTd, grams: number) =>
  (Object.keys(sourceFood.macronutrients) as PossibleMacrosTd[]).reduce(
    (prev, cur) => ({
      ...prev,
      [cur]: {
        ...sourceFood.macronutrients[cur],
        amount: getValueOrZero(
          ((getValueOrZero(
            sourceFood.macronutrients[cur].amount,
            true,
          ) as number) /
            100) *
            grams,
        ) as string,
      },
    }),
    {},
  ) as FoodDetailsTd['macronutrients'];
