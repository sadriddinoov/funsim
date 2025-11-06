"use client";

import { getWhyUSCarddata } from "../data/WhyUsdata";
import Card from "../components/card";
import { useTranslations } from "next-intl";

const WHYus = () => {
  const t = useTranslations("");

  const WhyUSData = getWhyUSCarddata(t);

  return (
    <div className="my-[75px] md:block hidden">
      <div className="container">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-[30px]">
            <div className="text-[40px]/[35px] max-w-[555px] font-medium text-[#1C1C1C]">
              {t("why.title")}
            </div>
            <p className="text-[18px]/[17px] max-w-[400px] text-[#595959]">
              {t("why.subtitle")}
            </p>
            <div className="grid gap-8 max-w-4xl w-full mt-[50px]">
              <div className="flex flex-col items-start">
                <div className="flex md:flex-col flex-row items-center justify-baseline">
                  <h1 className="text-4xl font-bold text-center text-black">
                    200+
                  </h1>
                  <p className="text-sm text-gray-600 mt-2 md:mt-0 text-center">
                    {t("why.why1")}
                  </p>
                </div>
              </div>

              <div className="flex md:flex-col  items-center md:justify-between flex-row-reverse">
                <h1 className="text-4xl font-bold text-black">500+</h1>
                <p className="text-sm text-gray-600 mt-2 md:mt-0 text-center md:text-left">
                  {t("why.why2")}
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex md:flex-col flex-row items-center md:justify-between">
                  <h1 className="text-4xl font-bold text-black">10000+</h1>
                  <p className="text-sm text-gray-600 mt-2 md:mt-0">
                    {t("why.why3")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[10px] max-w-[50%]">
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
      </div>
    </div>
  );
};

export default WHYus;
