import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../types/FoodSearchResultTd';
import { foodDataSources } from '../constants/foodDataSources';

export const normalizeSearchResponse = (
  response: any,
): FoodSearchResultTd[] => {
  const foodArray = response;

  return foodArray.map(
    (food: any) =>
      ({
        datasource: foodDataSources.database,
        // eslint-disable-next-line no-underscore-dangle
        id: food._id,
        imageUrl: food.imageUrl,
        name: food.name,
      } as FoodSearchResultTd),
  ) as FoodSearchResultTd[];
};

export const normalizeFoodDetailsResponse = (response: any): FoodDetailsTd => {
  const food = response;
  const { _id, ...safeFoodData } = food;

  return {
    ...safeFoodData,
    id: _id,
    macronutrients: {
      alcohol: {
        amount: safeFoodData.macronutrients?.alcohol || '0',
        name: 'alcohol',
        units: 'g',
      },
      carbs: {
        amount: safeFoodData.macronutrients?.carbs || '0',
        name: 'carbs',
        units: 'g',
      },
      fat: {
        amount: safeFoodData.macronutrients?.fat || '0',
        name: 'fat',
        units: 'g',
      },
      protein: {
        amount: safeFoodData.macronutrients?.protein || '0',
        name: 'protein',
        units: 'g',
      },
    },
  } as FoodDetailsTd;
};

export const normalizeFoodForDatabase = (food: FoodDetailsTd) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { datasource, id, ...dbSafeData } = food;
  return {
    ...dbSafeData,
    macronutrients: {
      alcohol: dbSafeData.macronutrients.alcohol.amount || '0',
      carbs: dbSafeData.macronutrients.carbs.amount || '0',
      fat: dbSafeData.macronutrients.fat.amount || '0',
      protein: dbSafeData.macronutrients.protein.amount || '0',
    },
  };
};
