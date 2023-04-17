export const formatAmount = (amount: number, currency: string) => {
  return amount.toLocaleString(navigator.language, {
    style: "currency",
    currency: currency,
  });
};
