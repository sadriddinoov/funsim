"use client";

import Image from "next/image";
import { ASSETS } from "../assets";
import "../styles/main.css";
import { useTranslations } from "next-intl";
import { getWhyUSCarddata } from "../data/WhyUsdata";
import Card from "../components/card";

const Hero = () => {
  const t = useTranslations("");
  const WhyUSData = getWhyUSCarddata(t);

  return (
    <div className="my-[40px] md:my-[100px]">
      <div className="container">
        <div className="flex items-center justify-center">
          <h1 className="text-[#1C1C1C] text-center md:text-[40px] text-[22px] font-medium max-w-[490px]">
            {t("hero.title")}
          </h1>
        </div>

        <div className="md:flex gap-[12px] mt-[20px] hidden">
          <div className="w-1/2 grid grid-cols-1 gap-[12px]">
            <div className="bg-[#282728] rounded-[12px] p-[20px] flex items-center">
              <div>
                <h2 className="text-[#FFFFFF] text-[24px] font-medium">
                  {t("hero.card3_title")}
                </h2>
                <p className="text-[#595959] text-[16px] font-medium max-w-[480px]">
                  {t("hero.card3_text")}
                </p>
              </div>
              <Image
                className="top-[125px] right-[50px] position-img w-[150px]"
                src={ASSETS.card3}
                alt=""
              />
            </div>

            <div className="bg-[#282728] rounded-[12px] p-[20px] flex items-center">
              <div>
                <h2 className="text-[#FFFFFF] text-[24px] font-medium">
                  {t("hero.card4_title")}
                </h2>
                <p className="text-[#595959] text-[16px] font-medium max-w-[400px]">
                  {t("hero.card4_text")}
                </p>
              </div>
              <Image
                className="top-[450px] w-[150px] left-[205px] position-img"
                src={ASSETS.card4}
                alt=""
              />
            </div>
          </div>

          <div className="w-1/2 grid grid-cols-2 gap-[10px]">
            {WhyUSData.map((item, idx) => (
              <Card
                img={item.img}
                key={idx}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </div>
        </div>

        {/* PHONE */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mt-[30px] lg:hidden">
          <div className="group bg-[#282728] hover:bg-[#F06F1E] rounded-[12px] py-[25px] px-[15px] w-full flex flex-col gap-2">
            <h2 className="text-[#FFFFFF] text-start text-[15px]/[15px] font-medium">
              {t("hero.card3_title")}
            </h2>
            <p className="text-[#595959] group-hover:text-[#FFFFFF] text-start text-[13px]/[13px] line-clamp-7 font-medium mt-4">
              {t("hero.card3_text")}
            </p>
          </div>

          <div className="group bg-[#282728] hover:bg-[#F06F1E] rounded-[12px] py-[25px] px-[15px] w-full flex flex-col gap-2">
            <h2 className="text-[#FFFFFF] text-start text-[15px]/[15px] font-medium">
              {t("hero.card4_title")}
            </h2>
            <p className="text-[#595959] group-hover:text-[#FFFFFF] text-start text-[13px]/[13px] line-clamp-7 font-medium mt-4">
              {t("hero.card4_text")}
            </p>
          </div>

          {WhyUSData.map((item, idx) => (
            <div
              key={idx}
              className="group bg-[#282728] hover:bg-[#F06F1E] rounded-[12px] py-[25px] px-[15px] w-full flex flex-col gap-2"
            >
              <h2 className="text-[#FFFFFF] text-start text-[15px]/[15px] font-medium">
                {item.title}
              </h2>
              <p className="text-[#595959] group-hover:text-[#FFFFFF] text-start text-[13px]/[13px] line-clamp-7 font-medium mt-4">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;