import { getRequestConfig } from "next-intl/server";

export const locales = ["ru", "en", "kaz"] as const;
export const defaultLocale = "ru" as const;
export const localePrefix = "always";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale ?? defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`./src/messages/${currentLocale}.json`)).default,
  };
});
