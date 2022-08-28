import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosKcalsTd } from '../types/PossibleMacrosKcalsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';
import { getFoodDataForGrams } from './getFoodDataForGrams';
import { getValueOrZero } from './getValueOrZero';
import { getMacrosRatio } from './getMacrosRatio';

export const getFoodEquivalence = (
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
  let targetFoodGrams: number;
  // Calc ratios of kcals and macros
  const macrosRatio = getMacrosRatio(sourceFood, targetFood);
  const kcalsRatio =
    Number.parseFloat(sourceFood.kcals) /
    sourceFood.grams /
    (Number.parseFloat(targetFood.kcals) / targetFood.grams);

  // If it only takes kcals into account, avoid calculating the other ratios
  if (targetMacros.includes('kcals') && targetMacros.length === 1) {
    targetFoodGrams = kcalsRatio * sourceGrams;
  } else {
    // Get macro with lower ratio, so it will be the first to hit its maximum allowed
    const sortedEntriesByLowerRatio = Object.entries(macrosRatio)
      .filter((macro) => targetMacros.includes(macro[0] as PossibleMacrosTd))
      .sort((x, y) => x[1] - y[1]); // [['macroNameA', {FoodNutrientTd}], ['macroNameB', {FoodNutrientTd}]]
    const lowestMacroRatio = sortedEntriesByLowerRatio[0]; // ['macroNameA', {FoodNutrientTd}]

    // Calculate the target grams using the lowest ratio
    targetFoodGrams = lowestMacroRatio[1] * sourceGrams;

    // If kcals is even lower ratio, take kcals
    if (targetMacros.includes('kcals') && lowestMacroRatio[1] > kcalsRatio) {
      targetFoodGrams = kcalsRatio * sourceGrams;
    }
  }

  // Calculate data of target food with the calculated grams
  const processedTargetFood = getFoodDataForGrams(
    targetFood,
    getValueOrZero(targetFoodGrams, true) as number,
  );

  return processedTargetFood;
};
