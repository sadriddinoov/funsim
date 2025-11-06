"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ASSETS } from "../assets";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  const languages = [
    { code: "ru", label: "Ру" },
    { code: "en", label: "En" },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <header className="bg-[#282728] text-[#FFFFFF8F]">
      <div className="container">
        <nav className="flex justify-between items-center py-[15px] md:py-[30px] w-full gap-4">
          <Link href={`/${locale}`}>
            <Image
              src={ASSETS.logowhite}
              alt="logo"
              className="sm:w-[160px] w-[120px] h-auto cursor-pointer "
            />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-3 bg-[#FFFFFF38] rounded-[12px] px-2 py-2 md:px-4 md:py-2 cursor-pointer"
            >
              <h3 className="md:text-[16px] text-[14px] text-[#FFFFFF] font-medium">
                {currentLang.label}
              </h3>
              <ChevronDown
                className={`text-[#FFFFFF8F] transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-full bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden z-1000"
                >
                  {languages
                    .filter((lang) => lang.code !== currentLang.code)
                    .map((lang) => (
                      <Link
                        key={lang.code}
                        href={`/${lang.code}${pathname.replace(
                          /^\/(ru|en)/,
                          ""
                        )}`}
                        className="block md:px-4 md:py-2 px-2 py-2 md:text-[16px] text-[14px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        {lang.label}
                      </Link>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
