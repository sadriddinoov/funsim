"use client";

import { APP_ROUTES } from "../router/path";
import { House, CardSim, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useAuthModal } from "@/providers/AuthModalProvider";

interface FooterNavProps {
  openAuthModal?: () => void;
}

export const FooterNav = ({ openAuthModal }: FooterNavProps) => {
  const t = useTranslations("");
  const pathname = usePathname();
  const { openAuthModal: contextOpenAuthModal } = useAuthModal();

  const normalizedPath = pathname.replace(/^\/(ru|en)(\/|$)/, "/");

  const isActiveHome = normalizedPath === APP_ROUTES.HOME;
  const isActiveMySims =
    normalizedPath === APP_ROUTES.MY_SIMS ||
    normalizedPath.startsWith(APP_ROUTES.MY_SIMS);
  const isActiveProfile =
    normalizedPath === APP_ROUTES.PROFILE ||
    normalizedPath.startsWith("/profile") ||
    normalizedPath === APP_ROUTES.LOGIN ||
    normalizedPath === APP_ROUTES.VERIFY;

  const isAuthenticated = !!localStorage.getItem("token");

  const handleIsAutheticated = (destination: string) => {
    if (!isAuthenticated) {
      if (typeof openAuthModal === "function") {
        openAuthModal();
      } else if (typeof contextOpenAuthModal === "function") {
        contextOpenAuthModal();
      } else {
        window.location.href = APP_ROUTES.LOGIN;
      }
    } else {
      window.location.href = destination;
    }
  };

  return (
    <div className="w-full flex fixed justify-center pt-[10px] pb-[15px] md:pt-[20px] md:pb-[25px] bg-[#FFFFFF] shadow-[0_1px_20px_0_rgba(0,0,0,0.18)] bottom-0 left-0 z-50">
      <div className="flex gap-[30px] md:gap-[70px]">
        {/* Home */}
        <Link
          href={APP_ROUTES.HOME}
          className={`flex flex-col justify-center items-center gap-[3px] ${
            isActiveHome ? "text-[#F06F1E]" : ""
          }`}
        >
          <House
            size={25}
            className={isActiveHome ? "text-[#F06F1E]" : "text-[#C6C6C6]"}
          />
          <p
            className={`text-center text-[12px]/[14px] md:text-[14px]/[16px] font-medium ${
              isActiveHome ? "text-[#F06F1E]" : "text-[#00000094]"
            }`}
          >
            {t("footernav.main")}
          </p>
        </Link>

        {/* My Sims */}
        <div
          onClick={() => handleIsAutheticated(APP_ROUTES.MY_SIMS)}
          className={`flex flex-col justify-center items-center gap-[3px] cursor-pointer ${
            isActiveMySims ? "text-[#F06F1E]" : ""
          }`}
        >
          <CardSim
            size={25}
            className={isActiveMySims ? "text-[#F06F1E]" : "text-[#C6C6C6]"}
          />
          <p
            className={`text-center text-[12px]/[14px] md:text-[14px]/[16px] font-medium ${
              isActiveMySims ? "text-[#F06F1E]" : "text-[#00000094]"
            }`}
          >
            {t("footernav.myesims")}
          </p>
        </div>

        {/* Profile */}
        <div
          onClick={() => handleIsAutheticated(APP_ROUTES.PROFILE)}
          className={`flex flex-col justify-center items-center gap-[3px] cursor-pointer ${
            isActiveProfile ? "text-[#F06F1E]" : ""
          }`}
        >
          <User
            size={25}
            className={isActiveProfile ? "text-[#F06F1E]" : "text-[#C6C6C6]"}
          />
          <p
            className={`text-center text-[12px]/[14px] md:text-[14px]/[16px] font-medium ${
              isActiveProfile ? "text-[#F06F1E]" : "text-[#00000094]"
            }`}
          >
            {t("footernav.profile")}
          </p>
        </div>
      </div>
    </div>
  );
};