export const formatTotal = (amount: number): string => {
  const formattedAmount = amount.toFixed(2);

  const [integerPart, decimalPart] = formattedAmount.split(".");

  const integerWithDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${integerWithDots},${decimalPart}`;
};
