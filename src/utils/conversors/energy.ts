export const getKcalFromKj = (kj: number | string) =>
  (Number.parseFloat(`${kj}`) * 0.239006).toFixed(2);
