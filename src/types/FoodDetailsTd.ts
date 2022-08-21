import { FoodNutrientTd } from './FoodNutrientTd';
import { FoodSearchResultTd } from './FoodSearchResultTd';

export interface FoodDetailsTd extends FoodSearchResultTd {
  brand?: string;
  detailedNutrients?: FoodNutrientTd[];
  kcals: string;
  macronutrients: {
    alcohol: FoodNutrientTd;
    carbs: FoodNutrientTd;
    fat: FoodNutrientTd;
    protein: FoodNutrientTd;
  };
}
