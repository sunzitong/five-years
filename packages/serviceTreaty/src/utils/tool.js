export const toFixed = (num, dig = 2) => {
  const val = parseFloat(num);
  if (Number.isNaN(val)) return '';
  return val.toFixed(dig);
};
