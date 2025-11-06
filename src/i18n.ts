// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// import ru from "./locales/ru/translation.json";
// import en from './locales/en/translation.json'

// const savedLang = localStorage.getItem("lang") || "ru";

// i18n.use(initReactI18next).init({
//   resources: {
//     ru: { translation: ru },
//     en: { translation: en }
//   },
//   lng: savedLang,
//   fallbackLng: "ru",
//   interpolation: {
//     escapeValue: false,
//   },
// });

// i18n.on("languageChanged", (lng) => {
//   localStorage.setItem("lang", lng);
// });

// export default i18n;

import { getRequestConfig } from "next-intl/server";

import ru from "@/messages/ru.json";
import uz from "@/messages/uz.json";
import en from "@/messages/en.json";

const messagesMap = {
  ru,
  uz,
  en,
};

export default getRequestConfig(({ locale }) => {
  const fallbackLocale = "ru";

  const currentLocale = messagesMap[locale as keyof typeof messagesMap]
    ? locale
    : fallbackLocale;

  return {
    locale: currentLocale, // ✅ shu qatorda xatolik bo'lgan
    messages: messagesMap[currentLocale as keyof typeof messagesMap],
    timeZone: "Asia/Tashkent",
  };
});
