"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { getOtzivesData } from "../data/Otzivesdata";
import { Otzive } from "../components/otzives";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface Slider {
  next: () => void;
  on: (
    event: "created" | "dragStarted" | "animationEnded" | "updated",
    callback: () => void
  ) => void;
  container: HTMLElement;
}

const Otzives = () => {
  const t = useTranslations("");
  const OtziveData = getOtzivesData(t);

  // ✅ ekran o‘lchamini tekshirish
  const [isDesktop, setIsDesktop] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ autoplay funksiyasi
  function Autoplay(slider: Slider) {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 3000); // 3 sekundda bitta slayd
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  }

  // ✅ slider init
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      renderMode: "performance",
      drag: true,
      slides: {
        perView: isDesktop ? 3 : 1,
        spacing: isDesktop ? 20 : 10,
        origin: "center",
      },
      defaultAnimation: {
        duration: 800,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      },
    },
    [Autoplay]
  );

  return (
    <div className="md:py-[50px]  md:my-[50px] py-[40px] my-[40px] rounded-none md:rounded-[20px] bg-[#272727] overflow-hidden">
      <div className="container">
        <h1 className="text-[#FFFFFF] lg:text-[40px]/[35px] md:text-[28px]/[28px] text-[22px]/[22px] font-medium">
          {t("otzives.title")}
        </h1>
      </div>
      <div ref={sliderRef} className="keen-slider mt-[50px] px-2 w-full">
        {OtziveData.map((item, idx) => (
          <div key={idx} className="keen-slider__slide w-full">
            <Otzive {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Otzives;
