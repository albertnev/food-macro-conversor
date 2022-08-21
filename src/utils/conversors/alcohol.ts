export const getGramsFromVolume = (volume: number | string) =>
  Number.parseFloat(`${volume}`) * 0.8; // this is the density of alcohol

export const getKcalsFromGrams = (grams: number | string) =>
  Number.parseFloat(`${grams}`) * 7; // 7 Kcal per gram
