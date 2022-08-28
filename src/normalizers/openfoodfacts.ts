import {
  getGramsFromVolume,
  getKcalsFromGrams,
} from '../utils/conversors/alcohol';
import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { FoodSearchResultTd } from '../types/FoodSearchResultTd';
import { getValueOrZero } from '../utils/getValueOrZero';
import { foodDataSources } from '../constants/foodDataSources';

export const normalizeSearchResponse = (
  response: any,
): FoodSearchResultTd[] => {
  const foodArray = response.products;

  return foodArray.map(
    (food: any) =>
      ({
        datasource: foodDataSources.openfoodfacts,
        id: food.code,
        imageUrl: food.image_url,
        name: food.generic_name_es || food.product_name,
      } as FoodSearchResultTd),
  ) as FoodSearchResultTd[];
};

export const normalizeFoodDetailsResponse = (response: any): FoodDetailsTd => {
  const food = response.products[0];
  const isAlcohol =
    food.nutriments.alcohol_100g && !food.nutriments.proteins_100g;

  return {
    brand: food.brands,
    datasource: foodDataSources.openfoodfacts,
    grams: 100,
    id: food.code,
    imageUrl: food.image_url,
    ingredients: food.ingredients_text_es || food.ingredients_text,
    kcals: `${
      isAlcohol
        ? getKcalsFromGrams(
            getGramsFromVolume(food.nutriments.alcohol_100g || 0),
          )
        : food.nutriments['energy-kcal_100g']
    }`,
    macronutrients: {
      alcohol: {
        amount: getValueOrZero(
          getGramsFromVolume(food.nutriments.alcohol_100g),
        ),
        name: 'alcohol',
        units: 'g',
      },
      carbs: {
        amount: getValueOrZero(food.nutriments.carbohydrates_100g),
        name: 'carbs',
        units: 'g',
      },
      fat: {
        amount: getValueOrZero(food.nutriments.fat_100g),
        name: 'fat',
        units: 'g',
      },
      protein: {
        amount: getValueOrZero(food.nutriments.proteins_100g),
        name: 'protein',
        units: 'g',
      },
    },
    name: food.generic_name_es || food.product_name,
    other: { ...food },
  } as FoodDetailsTd;
};
