import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ru"] as const;
export const defaultLocale = "ru";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale ?? defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`./src/messages/${currentLocale}.json`)).default,
  };
});
