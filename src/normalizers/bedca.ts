import { getKcalFromKj } from '../utils/conversors/energy';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../types/FoodSearchResultTd';

export const normalizeSearchResponse = (
  response: any,
): FoodSearchResultTd[] => {
  const foodArray = Array.isArray(response.foodresponse.food)
    ? response.foodresponse.food
    : [response.foodresponse.food];

  return foodArray.map(
    (food: any) =>
      ({
        id: food.f_id,
        name: food.f_ori_name,
      } as FoodSearchResultTd),
  ) as FoodSearchResultTd[];
};

export const normalizeFoodDetailsResponse = (response: any): FoodDetailsTd => {
  const { food } = response.foodresponse;
  const { foodvalue: nutritionalInfo } = food;

  return {
    id: food.f_id,
    kcals: `${getKcalFromKj(
      nutritionalInfo.find(
        (nut: any) =>
          nut.c_id === '409' && Object.keys(nut.best_location).length,
      )?.best_location || '0',
    )}`,
    macronutrients: {
      alcohol: {
        amount:
          nutritionalInfo.find(
            (nut: any) =>
              nut.c_id === '404' && Object.keys(nut.best_location).length,
          )?.best_location || '0',
        name: 'alcohol',
        units: 'g',
      },
      carbs: {
        amount:
          nutritionalInfo.find(
            (nut: any) =>
              nut.c_id === '53' && Object.keys(nut.best_location).length,
          )?.best_location || '0',
        name: 'carbs',
        units: 'g',
      },
      fat: {
        amount:
          nutritionalInfo.find(
            (nut: any) =>
              nut.c_id === '410' && Object.keys(nut.best_location).length,
          )?.best_location || '0',
        name: 'fat',
        units: 'g',
      },
      protein: {
        amount:
          nutritionalInfo.find(
            (nut: any) =>
              nut.c_id === '416' && Object.keys(nut.best_location).length,
          )?.best_location || '0',
        name: 'protein',
        units: 'g',
      },
    },
    name: food.f_ori_name,
    others: { ...food },
  } as FoodDetailsTd;
};
