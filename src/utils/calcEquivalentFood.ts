import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosKcalsTd } from '../types/PossibleMacrosKcalsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';
import { calcMacrosForGrams } from './calcMacrosForGrams';
import { getFoodDataForGrams } from './getFoodDataForGrams';

export const calcEquivalentFood = (
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
  const sourceMaxMacroGrams = calcMacrosForGrams(sourceFood, sourceGrams);

  const sortedEntriesByQuantity = Object.entries(targetFood.macronutrients)
    .filter((macro) => targetMacros.includes(macro[0] as PossibleMacrosTd))
    .sort(
      (x, y) => Number.parseFloat(y[1].amount) - Number.parseFloat(x[1].amount),
    ); // [['macroNameA', {FoodNutrientTd}], ['macroNameB', {FoodNutrientTd}]]
  const highestMacro = sortedEntriesByQuantity[0]; // ['macroNameA', {FoodNutrientTd}]
  const highestMacroKey = highestMacro[0] as PossibleMacrosTd; // macroNameA
  let targetFoodGrams: number;

  if (
    targetMacros.includes('kcals') &&
    Number.parseFloat(highestMacro[1].amount) <
      Number.parseFloat(targetFood.kcals)
  ) {
    // Calculate with Kcals
    const sourceMaxKcals =
      (Number.parseFloat(sourceFood.kcals) / sourceFood.grams) * sourceGrams;
    targetFoodGrams =
      (sourceMaxKcals / Number.parseFloat(targetFood.kcals)) * targetFood.grams;
  } else {
    // Calculate with higher macro
    targetFoodGrams =
      (Number.parseFloat(sourceMaxMacroGrams[highestMacroKey].amount) /
        Number.parseFloat(targetFood.macronutrients[highestMacroKey].amount)) *
      targetFood.grams;
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
