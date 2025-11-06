"use client";

import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import InfoItem from "@/components/infoitem";
import Button from "@/components/button";
import { useTranslations } from "next-intl";
import QrCode from "@/components/qrCode";
import { ASSETS } from "@/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { Copy } from "lucide-react";

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

const SimReady = () => {
  const t = useTranslations();

  const [id, setId] = useState();
  const [idEsm, setEsmId] = useState<any>();

  console.log(idEsm, " id");

  const { data: balanceData, refetch } = useQuery({
    queryKey: ["checkBalance", id],
    queryFn: () => fetchCheckBalance(id),
    enabled: false,
  });
  const [object, setObject] = useState<any>(null);

  console.log(object, "object");

  useEffect(() => {
    const simKard = localStorage.getItem("simkard");
    const esimId = localStorage.getItem("esm");

    if (simKard) {
      try {
        setObject(JSON.parse(simKard));
        setEsmId(JSON.parse(esimId));
      } catch (err) {
        console.error("JSON parse error:", err);
      }
    }
  }, []);

  const handleActivate = () => {
    if (object?.qr_code) {
      const lpaPart = object.qr_code;
      console.log(lpaPart, "lpaPart");

      if (lpaPart) {
        window.location.href = `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=${lpaPart}`;
      }
    }
  };

  const handleCheckBalance = async (orderId: any) => {
    setId(orderId);
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const handleCopyQrCode = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(object.qr_code);
        toast.success(t("ready.copied"));
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = object.qr_code;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          toast.success(t("ready.copied"));
        } catch (err) {
          console.error("Ошибка копирования через execCommand:", err);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error("Ошибка копирования QR-кода:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="py-4  pb-[80px] md:pb-[120px]  container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <a
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center touch-action-manipulation"
            title={t("auth.back")}
          >
            <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
          </a>
          <h1 className="font-semibold text-lg sm:text-xl lg:text-3xl leading-tight tracking-[-0.03em] text-[#1C1C1C]">
            {t("ready.title")}
          </h1>
        </div>

        <div className="md:flex hidden  gap-[11px]">
          {/* Chap blok */}
          <div className="w-full lg:w-2/3">
            <div className="bg-[#272727] px-6 sm:px-8 sm:pt-[20px] pt-[10px] sm:pb-[32px] pb-[20px] mb-[8px] rounded-xl">
              <h3 className="text-white font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.instruction")}
              </h3>

              <div className="mt-6 sm:mt-8 space-y-4">
                <InfoItem
                  isThree={true}
                  titleKey="ready.iphone"
                  contentKey="ready.active-first"
                />
                <InfoItem
                  isThree={true}
                  titleKey="ready.android"
                  contentKey="ready.active-second"
                />
                <InfoItem
                  isThree={true}
                  titleKey="ready.hand"
                  contentKey="ready.active-third"
                  hasBorder={false}
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-[50px] gap-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <h4 className="text-white text-sm sm:text-lg font-normal">
                      {t("ready.need")}
                    </h4>
                    <a
                      href="https://t.me/Happytel_support"
                      target="_blank"
                      className="text-[#F06F1E] text-sm sm:text-lg font-normal cursor-pointer"
                    >
                      {t("ready.support")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#272727] p-6 sm:p-8 rounded-xl">
              <h3 className="text-white font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.silka")}
              </h3>

              <div className="flex flex-col sm:flex-row items-start justify-between mt-4 gap-6">
                <div className="w-full">
                  <h4 className="text-white text-base sm:text-lg font-normal">
                    {t("ready.iphone")}
                  </h4>
                  <div className="mt-4 border border-white rounded-xl py-3 px-4 flex items-center justify-between">
                    <p
                      onClick={handleActivate}
                      className="text-white mr-[5px]  text-[13px]  font-medium  cursor-pointer"
                    >
                      {t("ready.go")}
                    </p>
                    <ArrowRight size={10} className="text-white" />
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-[16px] sm:text-lg font-normal">
                      {t("ready.code")}
                    </p>
                    {/* <Copy onClick={handleCopyQrCode} color="white" /> */}
                    <p
                      onClick={handleCopyQrCode}
                      className="text-[#B9B9B9] cursor-pointer text-sm md:block hidden"
                    >
                      {t("ready.copy")}
                    </p>
                  </div>
                  <div
                    onClick={handleCopyQrCode}
                    className="mt-4 border border-[#FFFFFF6B] rounded-xl py-3 px-4 flex items-center justify-center cursor-pointer"
                  >
                    <p className="text-[#FFFFFF6B] text-sm font-medium text-center truncate">
                      {object?.qr_code}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* O‘ng blok */}
          <div className="w-full lg:w-1/3 flex flex-col gap-[8px]">
            <div className="bg-[#1C1C1C0D] px-6 sm:px-8 sm:pt-[18px] pt-[8px] pb-[20px] rounded-xl">
              <h3 className="text-[#1C1C1C] font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.order")} #{idEsm?.id}
              </h3>

              <div className="my-4 flex justify-center">
                {/* <Image
                  src={ASSETS.qr}
                  alt="QR Code"
                  className="max-w-[150px] sm:max-w-[200px] h-auto"
                /> */}
                <QrCode link={object?.qr_code} />
              </div>

              <h3 className="text-[#1C1C1C] font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.info")}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    ICCID:
                  </p>
                  <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate">
                    {object?.ssid}
                  </h3>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    UID:
                  </p>
                  <h3 className="text-sm md:max-w-none sm:text-base font-normal text-[#1C1C1C] truncate">
                    {object?.uid}
                  </h3>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    PIN:
                  </p>
                  <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate">
                    {object?.pin}
                  </h3>
                </div>

                <div className="flex items-center justify-between py-3">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    PUK:
                  </p>
                  <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate">
                    {object?.puk}
                  </h3>
                </div>
              </div>
            </div>
            <Button
              onclick={() => handleCheckBalance(object?.pivot?.order_id)}
              bg="orange"
              title={
                balanceData?.balance?.[0]?.subOrderList?.[0]?.remainingTraffic
                  ? (
                      balanceData?.balance[0]?.subOrderList[0]
                        ?.remainingTraffic / 1024
                    ) // ✅ KB → MB
                      .toFixed(2) + " MB"
                  : t("my.check")
              }
            />

            <div className="bg-[#1C1C1C0D] px-6 sm:px-8 sm:pt-[16px] pt-[8px] pb-[20px] rounded-xl">
              <h3 className="text-[#1C1C1C] font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.dispethcer")}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    {t("ready.phonenum")}
                  </p>
                  <a
                    href="tel:+998956802020"
                    className="text-sm sm:text-base font-normal bg-[#000000c8] text-white p-2 py-1 rounded-md hover:bg-[#3a3a3a] transition-colors duration-200"
                  >
                    +99895 680 20 20
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    {t("ready.bot")}
                  </p>
                  <a
                    href="https://t.me/happytel"
                    className="text-sm sm:text-base font-normal bg-[#000000c8] text-white p-2 py-1 rounded-md hover:bg-[#3a3a3a] transition-colors duration-200"
                  >
                    @happytel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MD: planshet and phone */}

        <div className="flex flex-col md:hidden  gap-[11px]">
          <div className="w-full flex flex-col gap-[8px]">
            <div className="bg-[#1C1C1C0D] px-6 pt-[8px] pb-[20px] rounded-xl flex items-center justify-between">
              <div>
                {/* <h3 className="text-[#1C1C1C] font-medium text-lg">
                  {t("ready.order")}#162
                </h3> */}
                {t("ready.order")} #{idEsm?.id}
                <div className="space-y-3 mt-2">
                  <div>
                    <p className="text-[#595959] text-sm font-normal truncate">
                      ICCID:
                    </p>
                    <h3 className="text-sm font-normal text-[#1C1C1C] max-w-[200px]">
                      {object?.ssid}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[#595959] text-sm font-normal truncate">
                      UID:
                    </p>
                    <h3 className="text-sm max-w-[200px] font-normal text-[#1C1C1C]">
                      {object?.uid}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[#595959] text-sm font-normal truncate">
                      PIN:
                    </p>
                    <h3 className="text-sm font-normal text-[#1C1C1C] max-w-[200px]">
                      {object?.pin}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[#595959] text-sm font-normal truncate">
                      PUK:
                    </p>
                    <h3 className="text-sm font-normal text-[#1C1C1C] max-w-[200px]">
                      {object?.puk}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="my-4 flex justify-center">
                <Image
                  src={ASSETS.qr}
                  alt="QR Code"
                  className="max-w-[175px] h-auto"
                />
              </div>
            </div>

            <Button
              onclick={() => handleCheckBalance(object?.pivot?.order_id)}
              bg="orange"
              title={
                balanceData?.balance?.[0]?.subOrderList?.[0]?.remainingTraffic
                  ? (
                      balanceData?.balance[0]?.subOrderList[0]
                        ?.remainingTraffic / 1024
                    ) // ✅ KB → MB
                      .toFixed(2) + " MB"
                  : t("my.check")
              }
              classname="w-full"
            />
          </div>

          <div className="w-full">
            <div className="bg-[#272727] p-6 mb-4 rounded-xl">
              <h3 className="text-white font-medium text-lg">
                {t("ready.silka")}
              </h3>

              <div className="flex flex-col items-start justify-between mt-4 gap-6">
                <div className="w-[55%]">
                  <h4 className="text-white text-base font-normal">
                    {t("ready.iphone")}
                  </h4>
                  <div
                    onClick={handleActivate}
                    className="mt-[15px] bg-[#f26a16ea] rounded-xl py-2 px-4 flex items-center justify-between"
                  >
                    <p className="text-[#ffffffb5] mr-[5px] text-[13px] font-medium">
                      {t("ready.go")}
                    </p>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-base font-normal">
                      {t("ready.code")}
                    </h4>
                    <Copy onClick={handleCopyQrCode} color="white" />
                    <p className="text-[#B9B9B9] text-sm md:block hidden">
                      {t("ready.copy")}
                    </p>
                  </div>
                  <div
                    onClick={handleCopyQrCode}
                    className="mt-4 border border-[#FFFFFF6B] rounded-xl py-2 px-4 flex items-center justify-center"
                  >
                    <p className="text-[#FFFFFF6B] text-sm font-medium text-center truncate">
                      {object?.qr_code}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#272727] px-6  pt-[10px]  pb-[20px] mb-[8px] rounded-xl">
              <h3 className="text-white font-medium text-lg">
                {t("ready.instruction")}
              </h3>

              <div className="mt-6 space-y-4">
                <InfoItem
                  isThree={true}
                  titleKey="ready.iphone"
                  contentKey="ready.active-first"
                />
                <InfoItem
                  isThree={true}
                  titleKey="ready.android"
                  contentKey="ready.active-second"
                />
                <InfoItem
                  isThree={true}
                  titleKey="ready.hand"
                  contentKey="ready.active-third"
                  hasBorder={false}
                />

                <div className="flex flex-col items-start justify-between mt-[20px] gap-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <h4 className="text-white text-sm font-normal">
                      {t("ready.need")}
                    </h4>
                    <a
                      href="https://t.me/Happytel_support"
                      target="_blank"
                      className="text-[#F06F1E] text-sm sm:text-lg font-normal cursor-pointer"
                    >
                      {t("ready.support")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1C1C1C0D] px-6 pt-[8px] pb-[20px] rounded-xl">
            <h3 className="text-[#1C1C1C] font-medium text-lg sm:text-xl lg:text-2xl">
              {t("ready.dispethcer")}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                  {t("ready.phonenum")}
                </p>
                <a
                  href="tel:+998956802020"
                  className="text-sm sm:text-base font-normal bg-[#000000c8] text-white p-2 py-1 rounded-md hover:bg-[#3a3a3a] transition-colors duration-200 truncate"
                >
                  +99895 680 20 20
                </a>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                  {t("ready.bot")}
                </p>
                <a
                  href="https://t.me/happyteluz_bot"
                  className="text-sm sm:text-base font-normal bg-[#000000c8] text-white p-2 py-1 rounded-md hover:bg-[#3a3a3a] transition-colors duration-200 truncate"
                >
                  @happytel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <FooterNav />
      </div>
    </div>
  );
};

export default SimReady;
