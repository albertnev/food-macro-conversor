import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';

export const calcMacrosForGrams = (sourceFood: FoodDetailsTd, grams: number) =>
  (Object.keys(sourceFood.macronutrients) as PossibleMacrosTd[]).reduce(
    (prev, cur) => ({
      ...prev,
      [cur]: {
        ...sourceFood.macronutrients[cur],
        amount: `${
          (Number.parseFloat(sourceFood.macronutrients[cur].amount || '0') /
            100) *
          grams
        }`,
      },
    }),
    {},
  ) as FoodDetailsTd['macronutrients'];
