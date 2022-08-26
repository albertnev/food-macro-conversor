import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';

export const getMacrosRatio = (
  sourceFood: FoodDetailsTd,
  targetFood: FoodDetailsTd,
) =>
  (Object.keys(targetFood.macronutrients) as PossibleMacrosTd[]).reduce(
    (prev, cur) => ({
      ...prev,
      [cur]:
        Number.parseFloat(sourceFood.macronutrients[cur]?.amount || '0') /
        sourceFood.grams /
        (Number.parseFloat(targetFood.macronutrients[cur]?.amount || '0') /
          targetFood.grams || 1), // if there is no information, we divide by 1
    }),
    {},
  ) as { [key in PossibleMacrosTd]: number };
