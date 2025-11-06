export default function formatPrice(
  value: number,
  locale: string = "uz-UZ",
  currency: string = "UZS"
) {
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  return `${formattedNumber} ${currency}`;
}