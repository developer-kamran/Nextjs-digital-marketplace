const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export function camelToReadable(camelStr: string) {
  return camelStr
    .replace(/([A-Z])/g, ' $1') // Add a space before each capital letter
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}
