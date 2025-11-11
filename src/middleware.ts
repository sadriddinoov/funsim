// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { locales } from "./messages/config";

export default createMiddleware({
  locales,
  defaultLocale: "ru",
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};