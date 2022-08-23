import { FoodDetailsTd } from './FoodDetailsTd';

export type PossibleMacrosKcalsTd = Extract<
  keyof FoodDetailsTd['macronutrients'] | 'kcals',
  string
>;
