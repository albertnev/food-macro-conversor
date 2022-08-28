export const getValueOrZero = (
  grams: string | number | undefined,
  asNumber: boolean = false,
) => {
  const val = Math.round(Number.parseFloat(`${grams || 0}`) * 100) / 100;
  if (asNumber) {
    return val;
  }

  return `${val}`;
};
