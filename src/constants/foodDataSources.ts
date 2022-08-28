export const foodDataSources = {
  bedca: 'bedca',
  openfoodfacts: 'openfoodfacts',
};

export type FoodDataSourcesType =
  typeof foodDataSources[keyof typeof foodDataSources];
