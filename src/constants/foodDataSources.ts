export const foodDataSources = {
  bedca: 'bedca',
  database: 'database',
  openfoodfacts: 'openfoodfacts',
};

export type FoodDataSourcesType =
  typeof foodDataSources[keyof typeof foodDataSources];
