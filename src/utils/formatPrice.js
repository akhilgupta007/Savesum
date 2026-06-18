export const formatPrice = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return '0';
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
};
