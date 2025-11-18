export default function formatPrice(
  value: number,
  locale: string = "kk-KZ",
  currency: string = "KZT" // можно заменить на "₸" если хочешь знак
) {
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return `${formattedNumber} ${currency}`;
}
