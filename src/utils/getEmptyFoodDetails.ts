import { FoodDetailsTd } from '../types/FoodDetailsTd';
import { PossibleMacrosTd } from '../types/PossibleMacrosTd';

const getEmptyMacro = (name: PossibleMacrosTd) => ({
  amount: '0',
  name,
  units: 'g',
});

export const getEmptyFoodDetails = (
  datasource: string = 'database',
): FoodDetailsTd => ({
  brand: '',
  datasource,
  grams: 100,
  id: '',
  ingredients: '',
  kcals: '0',
  macronutrients: {
    alcohol: getEmptyMacro('alcohol'),
    carbs: getEmptyMacro('carbs'),
    fat: getEmptyMacro('fat'),
    protein: getEmptyMacro('protein'),
  },
  name: '',
});
