import produce from 'immer';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { getMacrosForGrams } from './getMacrosForGrams';
import { getValueOrZero } from './getValueOrZero';

export const getFoodDataForGrams = (
  sourceFood: FoodDetailsTd,
  targetGrams: number,
) =>
  produce(sourceFood, (immerDraft) => {
    immerDraft.grams = targetGrams;
    immerDraft.detailedNutrients =
      sourceFood.detailedNutrients?.map((nutrient) => ({
        ...nutrient,
        amount: getValueOrZero(
          Number.parseFloat(nutrient.amount) * targetGrams,
        ) as string,
      })) || [];
    immerDraft.kcals = getValueOrZero(
      (Number.parseFloat(sourceFood.kcals) / sourceFood.grams) * targetGrams,
    ) as string;
    immerDraft.macronutrients = getMacrosForGrams(sourceFood, targetGrams);
  });
