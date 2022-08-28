export const hexToRgba = (hexCode: string, opacity: number = 1): string => {
  let hex = hexCode.replace('#', '').trim();
  let op = opacity;

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    op = opacity / 100;
  }

  return `rgba(${r},${g},${b},${op})`;
};
