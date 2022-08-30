import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';
import { getValueOrZero } from './getValueOrZero';

export const getMacrosRatio = (
  sourceFood: FoodDetailsTd,
  targetFood: FoodDetailsTd,
) =>
  (Object.keys(targetFood.macronutrients) as PossibleMacrosTd[]).reduce(
    (prev, cur) => {
      const sourceMacroPerGram =
        (getValueOrZero(
          sourceFood.macronutrients[cur]?.amount,
          true,
        ) as number) / sourceFood.grams;
      const targetMacroPerGram =
        (getValueOrZero(
          targetFood.macronutrients[cur]?.amount,
          true,
        ) as number) / targetFood.grams;
      const ratio = sourceMacroPerGram / (targetMacroPerGram || 1);

      return {
        ...prev,
        ...(ratio > 0 ? { [cur]: ratio } : {}),
      };
    },
    {},
  ) as { [key in PossibleMacrosTd]: number };
