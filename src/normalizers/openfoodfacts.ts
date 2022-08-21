import {
  getGramsFromVolume,
  getKcalsFromGrams,
} from '../utils/conversors/alcohol';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../types/FoodSearchResultTd';

export const normalizeSearchResponse = (
  response: any,
): FoodSearchResultTd[] => {
  const foodArray = response.products;

  return foodArray.map(
    (food: any) =>
      ({
        id: food.code,
        imageUrl: food.image_url,
        name: food.generic_name_es,
      } as FoodSearchResultTd),
  ) as FoodSearchResultTd[];
};

export const normalizeFoodDetailsResponse = (response: any): FoodDetailsTd => {
  const food = response.products[0];
  const isAlcohol =
    food.nutriments.alcohol_100g && !food.nutriments.proteins_100g;

  return {
    brand: food.brands,
    id: food.code,
    imageUrl: food.image_url,
    kcals: `${
      isAlcohol
        ? getKcalsFromGrams(
            getGramsFromVolume(food.nutriments.alcohol_100g || 0),
          )
        : food.nutriments['energy-kcal_100g']
    }`,
    macronutrients: {
      alcohol: {
        amount: `${getGramsFromVolume(food.nutriments.alcohol_100g || 0)}`,
        name: 'alcohol',
        units: 'g',
      },
      carbs: {
        amount: `${food.nutriments.carbohydrates_100g || 0}`,
        name: 'carbs',
        units: 'g',
      },
      fat: {
        amount: `${food.nutriments.fat_100g || 0}`,
        name: 'fat',
        units: 'g',
      },
      protein: {
        amount: `${food.nutriments.proteins_100g || 0}`,
        name: 'protein',
        units: 'g',
      },
    },
    name: food.product_name,
    other: { ...food },
  } as FoodDetailsTd;
};
