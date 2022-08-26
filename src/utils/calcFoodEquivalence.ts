import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosKcalsTd } from '../types/PossibleMacrosKcalsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';
import { getFoodDataForGrams } from './getFoodDataForGrams';
import { getMacrosRatio } from './getMacrosRatio';

export const calcFoodEquivalence = (
  sourceFood: FoodDetailsTd,
  sourceGrams: number,
  targetFood: FoodDetailsTd,
  targetMacros: PossibleMacrosKcalsTd[] = [
    'kcals',
    'protein',
    'alcohol',
    'carbs',
    'fat',
  ], // Get all by default
): FoodDetailsTd => {
  const macrosRatio = getMacrosRatio(sourceFood, targetFood);

  const sortedEntriesByLowerRatio = Object.entries(macrosRatio)
    .filter((macro) => targetMacros.includes(macro[0] as PossibleMacrosTd))
    .sort((x, y) => x[1] - y[1]); // [['macroNameA', {FoodNutrientTd}], ['macroNameB', {FoodNutrientTd}]]
  const lowestMacroRatio = sortedEntriesByLowerRatio[0]; // ['macroNameA', {FoodNutrientTd}]

  let targetFoodGrams: number = lowestMacroRatio[1] * sourceGrams;
  const kcalsRatio =
    Number.parseFloat(sourceFood.kcals) /
    sourceFood.grams /
    (Number.parseFloat(targetFood.kcals) / targetFood.grams);

  if (targetMacros.includes('kcals') && lowestMacroRatio[1] > kcalsRatio) {
    targetFoodGrams = kcalsRatio * sourceGrams;
  }

  const processedTargetFood = getFoodDataForGrams(targetFood, targetFoodGrams);

  // eslint-disable-next-line no-console
  console.log({
    counting: targetMacros,
    from: getFoodDataForGrams(sourceFood, sourceGrams),
    to: processedTargetFood,
  });

  return processedTargetFood;
};
