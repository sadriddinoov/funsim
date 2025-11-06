"use client";

import Image from "next/image";
import { ASSETS } from "../assets";
import { Search, X, ArrowRight } from "lucide-react";
import "../styles/main.css";
import { useEffect, useState, useRef } from "react";
import { APP_ROUTES } from "../router/path";
import type { LocalDestination } from "../components/destinationCard";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import phone from "@/assets/phone.png";
import { buildQuery } from "@/utils/buildQuery";
import { API_IMAGE, API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function Autoplay(slider: any) {
  let timeout: ReturnType<typeof setTimeout>;
  let isPaused = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (isPaused) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2000);
  }

  slider.on("created", () => {
    // Mouse events for desktop
    slider.container.addEventListener("mouseover", () => {
      isPaused = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      isPaused = false;
      nextTimeout();
    });

    // Touch events for mobile
    slider.container.addEventListener("touchstart", () => {
      isPaused = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("touchend", () => {
      isPaused = false;
      nextTimeout();
    });

    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

async function fetchRegions(params: Record<string, any>) {
  const query = buildQuery(params);
  const res = await fetch(`${API_URL}/${endpoints.regions}?${query}`);
  if (!res.ok) throw new Error("Failed to fetch regions");
  return res.json();
}

const Main = () => {
  const t = useTranslations("main");
  const p = useTranslations("");
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { data: regionsData, isLoading } = useQuery({
    queryKey: ["regions", searchTerm],
    queryFn: () =>
      fetchRegions({
        ...(searchTerm ? { name: searchTerm } : {}),
      }),
  });

  const [defaultCountries, setDefaultCountries] = useState<LocalDestination[]>(
    []
  );

  useEffect(() => {
    setDefaultCountries(regionsData?.data || []);
  }, [regionsData]);

  const handleSelect = (country: any) => {
    if (!country.id) {
      console.error("Country ID is missing:", country);
      return;
    }

    if (
      !selectedCountries.some((c) => c.id === country.id) &&
      selectedCountries.length < 3
    ) {
      const updatedCountries = [...selectedCountries, country];
      setSelectedCountries(updatedCountries);

      localStorage.setItem("selectedObject", JSON.stringify(country));

      updatedCountries.forEach((c, index) => {
        localStorage.setItem(`name${index + 1}`, JSON.stringify(c));
      });

      for (let i = updatedCountries.length + 1; i <= 3; i++) {
        localStorage.removeItem(`name${i}`);
      }
    }

    setSearchTerm("");
    setIsInputFocused(false);
    slider?.next();
  };

  const handleRemove = (country: any) => {
    const updatedCountries = selectedCountries.filter(
      (c) => c.id !== country.id
    );
    setSelectedCountries(updatedCountries);

    localStorage.removeItem("name1");
    localStorage.removeItem("name2");
    localStorage.removeItem("name3");
    updatedCountries.forEach((c, index) => {
      localStorage.setItem(`name${index + 1}`, JSON.stringify(c));
    });

    const currentSelectedObject = JSON.parse(
      localStorage.getItem("selectedObject") || "{}"
    );
    if (
      currentSelectedObject.id === country.id &&
      updatedCountries.length > 0
    ) {
      localStorage.setItem(
        "selectedObject",
        JSON.stringify(updatedCountries[updatedCountries.length - 1])
      );
    } else if (updatedCountries.length === 0) {
      localStorage.removeItem("selectedObject");
    }
  };

  const handleSearchClick = () => {
    if (selectedCountries.length > 0) {
      const ids = selectedCountries.map((c: any) => c.id).join("-");
      router.push(`${APP_ROUTES.COUNTRY}/${ids}`);
    }
  };

  const [showPlaceholder, setShowPlaceholder] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setShowPlaceholder(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 2, spacing: 16 },
    },
    [Autoplay]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsInputFocused(true);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
        setSearchTerm("");
        // Resume slider autoplay
        slider?.next();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [slider]);

  return (
    <>
      <div className="main relative bg-[#FFFFFF8F]">
        <Image className="main-map" src={ASSETS.bgmap} alt="" />
        <div className="main-container">
          <div className="container relative lg:flex-row flex-col gap-[15px] flex lg:gap-[100px]">
            <div className="main-download mt-[50px] w-[150px] h-[150px] rounded-full border border-[#F06F1E] flex items-center justify-center">
              <p className="text-[#F06F1E] text-center">
                {p("download.title")}
              </p>
            </div>
            <Image className="main-gray" src={ASSETS.grey} alt="" />
            <div className="main-wrapper mb-[50px]">
              <h1 className="main-title">{t("title")}</h1>
              <div>
                <a
                  href="#phone"
                  className="text-[#F06F1E] text-[20px] underline"
                >
                  {t("support")}
                </a>
              </div>
              <ul className="main-list">
                <p className="main-item">{t("nav1")}</p>
                <p className="main-item">{t("nav2")}</p>
                <p className="main-item hidden sm:block">{t("nav3")}</p>
              </ul>

              <div className="lg:flex flex-col">
                {/* 🔹 Input and selected countries */}
                <div className={`search-container`}>
                  <div className="flex items-center pl-2 gap-2 w-full">
                    {selectedCountries.map((country) => (
                      <span
                        key={country.id}
                        className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm"
                      >
                        {country.name}
                        <X
                          size={14}
                          className="cursor-pointer"
                          onClick={() => handleRemove(country)}
                        />
                      </span>
                    ))}

                    <input
                      type="text"
                      placeholder={
                        showPlaceholder ? t("placeholder") : t("placeholder-sm")
                      }
                      className="text-[#FFFFFF54] w-full border-none outline-none p-2 bg-transparent"
                      value={searchTerm}
                      onChange={handleChange}
                      onFocus={() => setIsInputFocused(true)}
                    />
                  </div>

                  <div className="icon-wrapper">
                    <Search
                      className="text-[#FFFFFF] cursor-pointer"
                      size={23}
                      onClick={handleSearchClick}
                    />
                  </div>
                </div>
                {/* 🔹 Dropdown */}
                {(searchTerm || isInputFocused) && (
                  <div ref={dropdownRef} className="pb-[150px] sm:pb-0">
                    <div
                      className="absolute z-30 mt-4 lg:mt-[10px] max-w-[92%] w-full text-black 
                      lg:max-w-[500px] bg-[#FFFFFF] rounded-lg mb-4
                      lg:max-h-[calc(100vh-500px)] max-h-[165px] overflow-y-auto"
                    >
                      {regionsData?.data?.length > 0 ? (
                        regionsData?.data
                          .filter((item: any) =>
                            item.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .sort((a: any, b: any) =>
                            a.name.localeCompare(b.name, "ru", {
                              sensitivity: "base",
                            })
                          )
                          .map((item: any) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-100"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                handleSelect(item);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Image
                                  src={`${API_IMAGE}/${item.img}`}
                                  alt={item.name}
                                  width={20}
                                  height={20}
                                  className="w-5 h-5"
                                />
                                <span className="text-sm truncate max-w-[120px]">
                                  {item.name}
                                </span>
                              </div>
                              <ArrowRight className="text-[#1C1C1C]" />
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500 text-sm px-3 py-2">
                          {t("no_results")}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {/* {!searchTerm && defaultCountries?.length > 0 && (
                  <div
                    ref={sliderRef}
                    className="keen-slider mt-8 !w-[500px] grid grid-cols-2 overflow-hidden"
                  >
                    {defaultCountries?.map((item: any) => (
                      <div
                        key={item.country}
                        className="keen-slider__slide cursor-pointer h-fit bg-[#4546477A] rounded-[12px] p-[15px]"
                        onClick={() => {
                          localStorage.setItem(
                            "selectedObject",
                            JSON.stringify(item)
                          );
                          localStorage.setItem("selectedTab", "local");
                          router.push(`${APP_ROUTES.COUNTRY}/${item.id}`);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="img_wrapper shrink-0">
                            <Image
                              src={`${API_IMAGE}/${item.img}`}
                              className="destination-flag rounded-full"
                              alt={item.country}
                              width={40}
                              height={40}
                              unoptimized
                            />
                          </div>
                          <div>
                            <p
                              className={`font-normal text-[#FFFFFF] lg:text-[18px] text-[14px] ${
                                item.name.length > 10 ? " max-w-[150px]" : ""
                              }`}
                            >
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
              </div>
            </div>

            <Image
              className="main-phone hidden sm:block"
              src={phone}
              alt="phone"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
