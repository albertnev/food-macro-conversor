import { FoodDetailsTd } from './FoodDetailsTd';

export type PossibleMacrosTd = Extract<
  keyof FoodDetailsTd['macronutrients'],
  string
>;
