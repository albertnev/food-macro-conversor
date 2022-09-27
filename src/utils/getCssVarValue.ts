export const getCssVarValue = (varName: string) =>
  (typeof getComputedStyle === 'function' &&
    getComputedStyle(document.documentElement).getPropertyValue(varName)) ||
  '';
