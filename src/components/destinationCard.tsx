"use client";
import Button from "./button";
import { APP_ROUTES } from "@/router/path";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import formatPrice from "@/utils/formatPrice";
import { ASSETS } from "@/assets";
import { API_IMAGE } from "@/config";

export type DestinationType = "local" | "regional" | "global";

export interface LocalDestination {
  id: number;
  type: "local";
  flag: string;
  country: string;
  price: string;
}

export interface RegionalOrGlobalDestination {
  id: number;
  type: "regional" | "global";
  flag: string;
  name: string;
  label: string;
}

export type Destination = LocalDestination | RegionalOrGlobalDestination;

interface DestinationCardProps {
  type: DestinationType;
  data: Destination[];
}

const DestinationCard: React.FC<DestinationCardProps> = ({ type, data }) => {
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const t = useTranslations("");

  const isLocal = type === "local";

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsDesktop(window.innerWidth >= 1024);
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsDesktop(window.innerWidth >= 1024);
      }
    };

    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const limit = isDesktop ? 8 : 6;
  const items: any[] = (data as any[]) ?? [];
  const filteredData: any[] = items.filter(
    (item: any) => !(item?.b2b === 1 && item?.hide_site === true)
  );
  const shouldLimit = filteredData.length > limit && !showAll;
  const visibleData: any[] = shouldLimit
    ? filteredData.slice(0, limit)
    : filteredData;

  const router = useRouter();

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-[10px] ${
          isLocal
            ? data?.length <= 2
              ? "grid-cols-2 sm:grid-cols-2"
              : "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-2 md:grid-cols-2"
        }`}
      >
        {visibleData?.map((item, index) => (
          <div
            onClick={() => {
              localStorage.setItem("selectedObject", JSON.stringify(item));
              router.push(`${APP_ROUTES.COUNTRY}/${item?.id}`);
            }}
            key={index}
            className="flex items-center gap-4 bg-[#1C1C1C0D] rounded-[12px] p-[10px] pl-0 md:p-[22px] justify-center md:justify-normal cursor-pointer"
          >
            <div className="img_wrapper shrink-0">
              <Image
                src={`${API_IMAGE}/${item?.img}` || ASSETS.noImage}
                alt="flag"
                width={50}
                height={50}
                className="destination-flag rounded-full h-[80px] w-[80px] object-cover"
              />
            </div>
            <div>
              <h1 className=" text-black md:max-w-none max-w-[100px] font-medium md:font-bold  text-[15px] md:text-[18px]">
                {item?.name}
              </h1>
              <p className=" text-[#ff7a00]  inline-block mt-2 text-[14px] font-bold md:text-[16px]">
                {`${t("from")} ${formatPrice(item?.min_price)}`} 
              </p> 
            </div>
          </div>
        ))}
      </div>

      {shouldLimit && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="mx-auto mt-0 md:mt-4 px-6 py-2 border text-black border-[#1C1C1C] rounded-lg text-[13px] md:text-base"
          >
            {t("otzives.showAll") ?? "Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationCard;
