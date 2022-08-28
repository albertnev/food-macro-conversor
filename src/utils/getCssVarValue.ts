export const getCssVarValue = (varName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(varName);
