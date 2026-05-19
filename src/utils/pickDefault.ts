export const pickDefault = (
  codes: string[],
  preferred: string,
  fallbackIndex: number,
): string =>
  codes.includes(preferred) ? preferred : (codes[fallbackIndex] ?? '');
