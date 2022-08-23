import produce from 'immer';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { calcMacrosForGrams } from './calcMacrosForGrams';

export const getFoodDataForGrams = (
  sourceFood: FoodDetailsTd,
  targetGrams: number,
) =>
  produce(sourceFood, (immerDraft) => {
    immerDraft.grams = targetGrams;
    immerDraft.detailedNutrients =
      sourceFood.detailedNutrients?.map((nutrient) => ({
        ...nutrient,
        amount: `${Number.parseFloat(nutrient.amount) * targetGrams}`,
      })) || [];
    immerDraft.kcals = `${
      (Number.parseFloat(sourceFood.kcals) / sourceFood.grams) * targetGrams
    }`;
    immerDraft.macronutrients = calcMacrosForGrams(sourceFood, targetGrams);
  });
