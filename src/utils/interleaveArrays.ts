export const interleaveArrays = ([x, ...xs]: any[], ys: any[] = []): any[] =>
  x === undefined
    ? ys // base: no x
    : [x, ...interleaveArrays(ys, xs)];
