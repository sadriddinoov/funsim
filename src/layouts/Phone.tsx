"use client";

import { ASSETS } from "@/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Phone: React.FC = () => {
  const t = useTranslations("");

  return (
    <div id="phone" className="md:my-[100px] my-[50px]">
      <div className="container mx-auto px-4">
        <h1 className="max-w-[670px] text-center md:text-start text-[25px] leading-[35px] font-medium md:text-[40px] md:leading-[45px] tracking-[-0.06em] text-[#1C1C1C] shadow-[inset_0_0.77px_0.77px_0px_#FFFFFF]">
          {t("phone.title")}
        </h1>

        <div className="flex flex-col md:flex-row items-stretch gap-[50px] mt-[50px] md:mt-[70px]">
          <div className="flex flex-col items-center text-center">
            <Image
              className="md:w-[203px] md:h-[428px] w-[150px] h-[300px] object-contain mb-[20px]"
              src={ASSETS.phonee1}
              alt=""
            />

            <h3 className="md:text-[20px] text-[16px] leading-[25px] md:leading-[40px] text-[#1C1C1C]">
              {t("phone.text1")}{" "}
              <a
                className="md:text-[22px] text-[18px] inline-block bg-[#1C1C1C] text-white p-2 py-0.5 rounded-md hover:bg-[#3a3a3a] transition-colors duration-200"
                href="tel:*#06#"
              >
                *#06#
              </a>
            </h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <Image
              className="md:w-[203px] md:h-[428px] w-[150px] h-[300px] object-contain mb-[20px]"
              src={ASSETS.phonee2}
              alt=""
            />

            <h3 className="md:text-[18px] md:max-w-[600px] max-w-[300px] text-[15px] leading-[20px] md:leading-[30px] text-[#1C1C1C]">
              {t("phone.text2")}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
