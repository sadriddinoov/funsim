"use client";

import type { FC } from "react";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_IMAGE, API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";

type PackageCardProps = {
  id?: any;
  flag?: any;
  country?: string;
  gb?: number;
  days: number;
  price?: string | number;
  createdAt?: string;
  endAt?: string;
  iccid?: string;
  balance?: number;
  variant?: "buy" | "active" | "balance";
  onCheckBalance?: () => void;
  handleRoute?: any;
  item?: any;
  loading?: boolean;
  set4g?: boolean;
  set5g?: boolean;
  regions?: any[];
  onShowAvailable?: () => void;
};

async function fetchCheckBalance(params: any) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${endpoints.checkBalance(params)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

const PackageCard: FC<PackageCardProps> = ({
  flag,
  country,
  gb,
  days,
  price,
  createdAt,
  iccid,
  balance,
  variant: initialVariant = "active",
  handleRoute, // Default to "active"
  id,
  item,
  set4g,
  set5g,
  loading = false,
  onShowAvailable,
  endAt
}) => {
  const t = useTranslations("");
  const router = useRouter();
  const [variant, setVariant] = useState<"buy" | "active" | "balance">(
    initialVariant
  ); // Manage variant state locally

  const {
    data: balanceData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["checkBalance", id],
    queryFn: () => fetchCheckBalance(id),
    enabled: false,
  });
    

  const handleCheckBalance = async () => {
    await refetch();
    setVariant("balance");
  };

  return (
    <div>
      <div
        className={`bg-[#1C1C1C0D] ${
          variant === "buy" ? "hidden md:flex" : "flex"
        } flex-col min-w-[300px] w-full max-w-[400px] rounded-[12px] pt-4 px-3 sm:px-5 pb-6`}
      >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={flag}
                alt={`${country} flag`}
                className="w-6 h-6 sm:w-8 sm:h-8  destination-flag rounded-full object-cover"
                height={32}
                width={32}
              />
              <h1 className="text-base sm:text-[16px] text-black font-medium line-clamp-2 sm:line-clamp-3">
                {country}
              </h1>
            </div>

           { id && (
             <h1 className="text-base sm:text-[16px] text-black font-medium line-clamp-2 sm:line-clamp-3">ID: {id}</h1>
           ) }
        </div>

        <div className="my-1">
          {variant === "buy" && (
            <>
              <Row
                label={t("my.tarif")}
                value={`${gb || 0}GB - ${days}${t("country.days")}`}
              />
              <Row
                label={t("auth.set")}
                value={t(`${set4g ? "4G " : ""} ${set5g ? "/ 5G" : ""}`)}
              />
              {/* <Row label={t("auth.razdacha")} value={t("auth.available")} /> */}
              <Row
                label="Минуты"
                value={item?.quantity_minute || "Недоступно"}
              />
              <Row label="Смс" value={item?.quantity_sms || "Недоступно"} />
              {/* <Row label="Смс" value={item?.quantity_sms || 0} /> */}
            </>
          )}

          {variant === "active" && (
            <>
              <Row label={t("my.tarif")} value={`${gb}GB`} />
              <Row
                label={t("my.date")}
                value={`${days} ${t("country.days")}`}
              />
              <Row label={t("my.created")} value={createdAt} />
              <Row label={t("my.end")} value={endAt} />
              <Row label="ICCID" value={iccid} />
            </>
          )}

          {variant === "balance" && (
            <>
              <Row label={t("auth.tarif")} value={`${gb}GB`} />
              <Row
                label={t("my.date")}
                value={`${days} ${t("country.days")}`}
              />
              <Row label={t("my.created")} value={createdAt} />
              <Row label="ICCID" value={iccid} />
            </>
          )}
        </div>

        {variant === "buy" && (
          <div className="flex items-center justify-between mt-auto">
            <h2 className="text-base sm:text-lg font-medium text-[#1C1C1C] truncate">
              {t("auth.price")}
            </h2>
            <h3 className="text-base sm:text-lg font-medium text-[#1C1C1C]">
              {price}
            </h3>
          </div>
        )}

        {variant === "active" && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
            <button
              className="flex-1 bg-[#F06F1E20] cursor-pointer text-[#F06F1E] py-2 rounded-lg text-sm sm:text-base"
              onClick={handleCheckBalance} // Use local handler
            >
              {isLoading ? `${t("loading")}...` : t("my.check")}
            </button>
            <div
              onClick={handleRoute}
              className="flex-1 bg-[#E4E4E4] cursor-pointer  text-[#1C1C1C] flex items-center justify-center py-2 rounded-lg text-sm sm:text-base"
            >
              {t("my.detail")}
            </div>
          </div>
        )}

        {variant === "balance" && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
            <button className="flex-1  bg-[#F06F1E] text-white py-2 rounded-lg text-sm sm:text-base truncate cursor-pointer">
              {isLoading ? `${t("loading")}...` : t("my.ostatok")}
              {balanceData?.balance?.[0]?.subOrderList?.[0]?.remainingTraffic
                ? (
                    balanceData?.balance[0]?.subOrderList[0]?.remainingTraffic /
                    1024
                  ) // ✅ KB → MB
                    .toFixed(2) + " MB"
                : t("my.check")}
            </button>
            <div
              onClick={() => router.push("/simDone")}
              className="flex-1 bg-[#E4E4E4] cursor-pointer text-[#1C1C1C] flex items-center justify-center py-2 rounded-lg text-sm sm:text-base"
            >
              {t("my.detail")}
            </div>
          </div>
        )}
      </div>

      <div
        className={`bg-[#1C1C1C0D] ${
          variant === "buy" ? "md:hidden flex flex-col" : "hidden"
        } w-full rounded-[12px] py-2 px-3 gap-2`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full justify-between pb-[15px] border-[#E4E4E4] border-b">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Image
                  width={32}
                  height={32}
                  src={flag}
                  alt={`${country} flag`}
                  className="w-7 h-7 object-cover rounded-full destination-flag"
                />
                <h1 className="text-[14px] text-black font-medium truncate">
                  {country}
                </h1>
              </div>
              <h3 className="text-[14px] font-medium text-[#F06F1E]">
                {price}
              </h3>
            </div>
          </div>
        </div>

        <div className="my-2 flex w-full justify-between">
          <div>
            <h2 className="text-[#1C1C1C] text-[14px]">
              {`${gb}GB - ${days}${t("country.days")}`}
            </h2>
            <p className="text-[#595959] text-[14px]">{t("my.tarif")}</p>
          </div>
          <div>
            <h2 className="text-[#1C1C1C] text-[14px]">4G/5G</h2>
            <p className="text-[#595959] text-[14px]">{t("auth.set")}</p>
          </div>
          <div>
            <h2 className="text-[#1C1C1C] text-[14px]">Минуты</h2>
            <p className="text-[#595959] text-[14px]">
              {item?.quantity_minute || "Недоступно"}
            </p>
          </div>
          <div>
            <h2 className="text-[#1C1C1C] text-[14px]">CMC</h2>
            <p className="text-[#595959] text-[14px]">
              {item?.quantity_sms || "Недоступно"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4] last:border-b-0">
    <p className="text-[#595959] text-sm sm:text-base font-normal max-w-[50%]">
      {label}
    </p>
    <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] max-w-[50%]">
      {value}
    </h3>
  </div>
);

export default PackageCard;
