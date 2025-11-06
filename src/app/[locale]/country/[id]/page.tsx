"use client";

import { useParams, useRouter } from "next/navigation";
// import { tabConfig } from "@/data/TabData";
import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft, Info, ArrowRight, X } from "lucide-react";
import ESimCard from "@/components/countryCard";
import ServiceCard from "@/components/serviceCard";
// import type { RegionalOrGlobalDestination } from "@/components/destinationCard";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import InfoItem from "@/components/infoitem";
import Image from "next/image";
import "@/app/[locale]/globals.css";
import { useLocale, useTranslations } from "next-intl";
import PhoneInput from "@/components/phoneInput";
import { ASSETS } from "@/assets";
import { buildQuery } from "@/utils/buildQuery";
import { API_IMAGE, API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import formatPrice from "@/utils/formatPrice";
import { APP_ROUTES } from "@/router/path";
import { Loading5756 } from "@/components/loading/loading";

async function fetchPlans(params: any) {
  const query = buildQuery(params);
  const res = await fetch(`${API_URL}/${endpoints.plans}?${query}`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

const Country = () => {
  const t = useTranslations("");
  const params = useParams();
  const locale = useLocale();
  const [showAvailableModal, setShowAvailableModal] = useState(false);

  useEffect(() => {
    if (showAvailableModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAvailableModal]);

  const id = params.id?.toString().split("-") || [];
  const selectedRegion = localStorage.getItem("selectedTab") || "local";

  // const ids = params.ids?.toString().split("-") || [];

  const router = useRouter();

  const { data: plansData, isLoading } = useQuery({
    queryKey: ["plans", id, selectedRegion],
    queryFn: () => {
      if (selectedRegion === "local") {
        return fetchPlans({
          region_ids: id,
        });
      } else {
        return fetchPlans({
          region_group_id: id,
        });
      }
    },
  });

  const hasRegion = plansData?.data?.data?.some(
    (item: any) => item.is_region === true
  );

  // 2. Qo‘shimcha so‘rov
  const { data: regionPlans } = useQuery({
    queryKey: ["plans-region", id],
    queryFn: () =>
      fetchPlans({
        region_ids: id,
        is_region: 1,
      }),
    enabled: !!hasRegion, // ✅ faqat ichida is_region true bo‘lsa ishlaydi
  });

  // const countryId = id ? parseInt(id, 10) : null;
  // const country = localDestinations.find((item) => item.id === countryId);
  // const data = getCOUNTRIESdata();

  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("+998");

  const [code, setCode] = useState("");

  const [isVerifyStep, setIsVerifyStep] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  console.log(phone, code, setPhone, setCode, setIsVerifyStep, isAuthenticated);

  // ✅ localStorage ni client da tekshiramiz
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
    }
  }, []);

  // if (!countryId || !country) {
  //   return (
  //     <div className="min-h-screen items-center justify-center flex">
  //       <p className="text-gray-500 text-lg">{t("main.no_results")}</p>
  //       <div className="fixed bottom-0 w-full">
  //         <FooterNav />
  //       </div>
  //     </div>
  //   );
  // }

  // const getRandomRegionalCountries = () => {
  //   const regionalData = tabConfig.global.data as RegionalOrGlobalDestination[];
  //   const shuffled = [...regionalData].sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, 3);
  // };

  // const randomRegionalCountries = getRandomRegionalCountries();

  // const handlePackageSelect = (index: number) => {
  //   console.log(index);

  //   setSelectedPackage(index);
  // };

  const handleBuyClick = () => {
    // if (isAuthenticated) {
    //   if (selectedPackage !== null) {
    //     router.push(`/confirm?${selectedPackage}`);
    //   }
    // } else {
    //   setIsModalOpen(true);
    // }
    router.push(`${APP_ROUTES.CONFIRM_ORDER}/${selectedPackage}`);
  };

  // const handleLogin = () => {
  //   if (!isVerifyStep) {
  //     setIsVerifyStep(true);
  //   } else {
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("authToken", "1");
  //     }
  //     setIsAuthenticated(true);
  //     setIsModalOpen(false);
  //     setIsVerifyStep(false);
  //     setPhone("+998");
  //     setCode("");
  //     if (selectedPackage !== null) {
  //       const selectedItem = data[selectedPackage];
  //       const query = new URLSearchParams({
  //         price: selectedItem.price,
  //         gb: selectedItem.gb.toString(),
  //         days: selectedItem.days.toString(),
  //         flag: country.flag,
  //         country: country.country,
  //       }).toString();
  //       router.push(`/confirm?${query}`);
  //     }
  //   }
  // };

  const selectedObject =
    typeof window !== "undefined"
      ? window.localStorage.getItem("selectedObject")
      : null;
  const object = selectedObject ? JSON.parse(selectedObject) : null;

  const getCountryNames = () => {
    const names: string[] = [];
    for (let i = 1; i <= 3; i++) {
      const country = localStorage.getItem(`name${i}`);
      if (country) {
        const parsed = JSON.parse(country);
        if (parsed?.name) {
          names.push(parsed.name);
        }
      }
    }
    return names.join(", ");
  };

  const countryNames = getCountryNames();

  return (
    <>
      {showAvailableModal && selectedItem?.regions && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75"
          onClick={() => setShowAvailableModal(false)}
        >
          <div
            className="bg-white rounded-lg px-4 py-6 shadow-2xl w-[90%] max-w-[700px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-8">
              <h3 className="sm:text-[20px] text-base font-semibold text-center text-black">
                {t("main.available")}:
              </h3>
              <div className="bg-gray-600 opacity-90 absolute top-7.5 right-5 w-10 h-10 rounded-full md:flex hidden items-center justify-center">
                <button
                  onClick={() => setShowAvailableModal(false)}
                  className="text-white text-xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="bg-gray-600 opacity-90 w-8 h-8 rounded-full md:hidden flex items-center justify-center ml-auto">
                <button
                  onClick={() => setShowAvailableModal(false)}
                  className="text-white text-lg font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[235px]  md:max-h-[155px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth">
              {selectedItem?.regions.map((region: any) => (
                <div
                  key={region.id}
                  className="flex items-center gap-2 py-3 px-4 border border-gray-200 rounded-lg max-w-[100%]"
                >
                  <Image
                    src={`${API_IMAGE}${region.img}`}
                    alt={region.name}
                    width={35}
                    height={35}
                    className="mb-1 rounded"
                  />
                  <p className="sm:text-[16px] text-sm text-gray-700 truncate">
                    {region.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <Loading5756 />
      ) : (
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <div className="py-6 md:pb-[175px] pb-[111px] container ">
            {/* HEADER */}
            <div className="flex md:items-cente items-start gap-2 justify-between mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
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
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] text-[#1C1C1C] font-semibold ml-4">
                  {countryNames || t("main.no_results")}
                </h1>
              </div>
            </div>
            {/* SIM CARDS */}
            <div
              className={`${
                plansData?.data?.data?.length == 0 && "!grid !grid-cols-1"
              } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 py-4 `}
            >
              {plansData?.data?.data?.filter(
                (item: any) =>
                  item.is_local === 1 ||
                  (item.is_local === true &&
                    !(item?.b2b === 1 || item?.hide_site === true))
              ).length > 0 && (
                <>
                  <h2 className="col-span-full font-bold text-lg mb-2 text-black">
                    Локальные тарифы
                  </h2>
                  {plansData?.data?.data
                    .filter(
                      (item: any) =>
                        item.is_local === 1 ||
                        (item.is_local === true &&
                          !(item?.b2b === 1 || item?.hide_site === true))
                    )
                    .map((item: any, idx: any) => (
                      <ESimCard
                        tarrifName={item?.name}
                        key={`local-${idx}`}
                        flag={
                          `${API_IMAGE}/${item?.region_group?.img}` ||
                          ASSETS.noImage
                        }
                        gb={item.quantity_internet}
                        days={item.expiry_day}
                        price={formatPrice(item.price_sell)}
                        onSelect={() => {
                          localStorage.setItem("obyekt", JSON.stringify(item));
                          setSelectedPackage(item?.id);
                        }}
                        isSelected={selectedPackage === item?.id}
                        onShowAvailable={() => {
                          setSelectedItem(item);
                          setShowAvailableModal(true);
                        }}
                      />
                    ))}
                </>
              )}

              {/* REGION */}
              {plansData?.data?.data?.filter(
                (item: any) =>
                  item.is_region === 1 ||
                  (item.is_region === true &&
                    !(item?.b2b === 1 || item?.hide_site === true))
              ).length > 0 && (
                <>
                  <h2 className="col-span-full font-bold text-lg mb-2 text-black">
                    Региональные тарифы
                  </h2>
                  {plansData?.data?.data
                    .filter(
                      (item: any) =>
                        item.is_region === 1 ||
                        (item.is_region === true &&
                          !(item?.b2b === 1 || item?.hide_site === true))
                    )
                    .map((item: any, idx: any) => (
                      <ESimCard
                        tarrifName={item?.name}
                        key={`region-${idx}`}
                        flag={
                          `${API_IMAGE}/${item?.region_group?.img}` ||
                          ASSETS.noImage
                        }
                        gb={item.quantity_internet}
                        days={item.expiry_day}
                        price={formatPrice(item.price_sell)}
                        onSelect={() => {
                          localStorage.setItem("obyekt", JSON.stringify(item));
                          setSelectedPackage(item?.id);
                        }}
                        isSelected={selectedPackage === item?.id}
                        onShowAvailable={() => {
                          setSelectedItem(item);
                          setShowAvailableModal(true);
                        }}
                      />
                    ))}
                </>
              )}

              {/* GLOBAL */}
              {plansData?.data?.data?.filter(
                (item: any) =>
                  item.is_global === 1 ||
                  (item.is_global === true &&
                    !(item?.b2b === 1 || item?.hide_site === true))
              ).length > 0 && (
                <>
                  <h2 className="col-span-full font-bold text-lg mb-2 text-black">
                    Глобальные тарифы
                  </h2>
                  {plansData?.data?.data
                    .filter(
                      (item: any) =>
                        item.is_global === 1 ||
                        (item.is_global === true &&
                          !(item?.b2b === 1 || item?.hide_site === true))
                    )
                    .map((item: any, idx: any) => (
                      <ESimCard
                        tarrifName={item?.name}
                        key={`global-${idx}`}
                        flag={
                          `${API_IMAGE}/${item?.region_group?.img}` ||
                          ASSETS.noImage
                        }
                        gb={item.quantity_internet}
                        days={item.expiry_day}
                        price={formatPrice(item.price_sell)}
                        onSelect={() => {
                          localStorage.setItem("obyekt", JSON.stringify(item));
                          setSelectedPackage(item?.id);
                        }}
                        isSelected={selectedPackage === item?.id}
                        onShowAvailable={() => {
                          setSelectedItem(item);
                          setShowAvailableModal(true);
                        }}
                      />
                    ))}
                </>
              )}

              {/* is_local === false */}

              {/* is_region === true */}

              {/* Если ничего не найдено */}
              {plansData?.data?.data?.filter(
                (item: any) => !(item?.b2b === 1 || item?.hide_site === true)
              ).length === 0 && (
                <p className="text-black text-center">Hech nima topilmadi !</p>
              )}
            </div>
            <div
              className="fixed container md:left-0 md:bottom-26 bottom-19 flex justify-center right-0.5  px-4 z-40"
              onClick={handleBuyClick}
            >
              <Button
                classname="w-full sm:mt-6"
                title={t("auth.buy")}
                none={selectedPackage === null}
              />
            </div>
            {/* SERVICES */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 py-4">
              <ServiceCard
                title={t("country.internet")}
                available={t("country.yes")}
                image={ASSETS.internet}
              />
              <ServiceCard
                title={t("country.calls")}
                available={t("country.not")}
                image={ASSETS.calls}
              />
              <ServiceCard
                title={t("country.sms")}
                available={t("country.not")}
                image={ASSETS.sms}
              />
              <ServiceCard
                title={"5G"}
                available={t("country.yes")}
                image={ASSETS.fiveg}
              />
            </div>
            {/* INFO + OTHERS */}
            <div className="flex flex-col md:flex-row items-stretch gap-3 sm:gap-4 pt-4">
              <div className="bg-[#272727] rounded-xl py-4 sm:py-5 px-4 sm:px-6 w-full mb-4 md:mb-0">
                <h1 className="text-[#FFFFFF] font-medium text-base sm:text-lg md:text-xl">
                  {t("country.how-works")}
                </h1>

                <InfoItem titleKey="country.comp" contentKey="country.comp" />
                <InfoItem
                  titleKey="country.onlyint"
                  contentKey="country.onlyint"
                />
                <InfoItem
                  titleKey="country.active"
                  contentKey="country.active"
                />
                <InfoItem titleKey="country.date" contentKey="country.date" />
                <InfoItem
                  titleKey="country.choice"
                  contentKey="country.choice"
                  hasBorder={false}
                />
              </div>
            </div>

            <div
              onClick={() => setIsNoteVisible(!isNoteVisible)}
              className="md:mt-4  flex cursor-pointer items-start border border-[#F06F1E] gap-2 sm:gap-3 bg-[#F4F4F4] rounded-md md:rounded-xl py-2 sm:py-4 px-3 sm:px-5"
            >
              <Info size={24} className="text-[#F06F1E] w-12" />
              <p
                className={`font-normal text-[#1C1C1C] md:block text-[10px] sm:text-base`}
              >
                {regionPlans?.data?.data[0]?.[`note_${locale}`] ||
                  t("country.not-avaiable")}
              </p>
            </div>
            {/* BUY BUTTON */}
          </div>

          {/* MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-[#1C1C1CAB] flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-2xl lg:text-[34px] font-medium text-[#1C1C1C]">
                    {t("auth.welcome")}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
                    title={t("auth.close")}
                  >
                    <X size={16} className="text-[#1C1C1C57] sm:size-5" />
                  </button>
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-10">
                  <p className="text-base sm:text-lg font-normal mb-2 text-black">
                    {t("auth.phone")}
                  </p>
                  <PhoneInput />
                </div>

                {isVerifyStep && (
                  <div className="mt-2 sm:mt-4 lg:mt-6">
                    <p className="text-base sm:text-lg font-normal mb-2 text-black">
                      {t("auth.code")}
                    </p>
                    <PhoneInput />
                  </div>
                )}

                <button
                  title={t("login.submit")}
                  className="w-full mt-6 bg-[#F06F1E] text-white rounded-lg py-2 sm:py-3 hover:bg-[#8F4D26] cursor-pointer transition-colors text-base sm:text-lg"
                  // onClick={handleLogin}
                >
                  {t("auth.button")}
                </button>
              </div>
            </div>
          )}

          <div className="mt-auto">
            <FooterNav />
          </div>
        </div>
      )}
    </>
  );
};

export default Country;
