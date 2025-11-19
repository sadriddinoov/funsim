"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ASSETS } from "../assets";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SUPPORTED_LOCALES = ["ru", "en", "kaz"] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const languages = [
    { code: "kaz", label: "Қаз" },
    { code: "ru", label: "Рус" },
    { code: "en", label: "Eng" },
  ] as const;

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0];

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] && SUPPORTED_LOCALES.includes(segments[0] as any)) {
      segments.shift();
    }
    const newPath = `/${newLocale}${segments.length > 0 ? "/" + segments.join("/") : ""}`;
    router.replace(newPath);
    setIsOpen(false);
  };

  return (
    <header className="bg-[#282728] text-[#FFFFFF8F]">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-[15px] md:py-[30px] w-full gap-4">
          <Link className="sm:p-3 p-2 bg-white rounded-lg" href={`/${locale}`}>
            <Image
              src={ASSETS.logowhite}
              alt="logo"
              className="sm:w-[160px] w-[100px] h-auto cursor-pointer"
              priority
            />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen((p) => !p)}
              className="flex items-center gap-3 bg-[#FFFFFF38] rounded-[12px] px-2 py-2 md:px-4 md:py-2 cursor-pointer"
            >
              <h3 className="md:text-[16px] text-[14px] text-[#FFFFFF] font-medium">
                {currentLang.label}
              </h3>
              <ChevronDown
                className={`text-[#FFFFFF8F] transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-full bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden z-50"
                >
                  {languages
                    .filter((l) => l.code !== currentLang.code)
                    .map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="block w-full text-left md:px-4 md:py-2 px-2 py-2 md:text-[16px] text-[14px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {lang.label}
                      </button>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </header>
  );
}