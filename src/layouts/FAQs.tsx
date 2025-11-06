"use client";

import FAQ from "../components/faq";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { API_URL } from "@/config";
import endpoints from "@/services/endpoints";

async function fetchFaqs() {
  const res = await fetch(`${API_URL}/${endpoints.faqs}`);
  return res.json();
}

const FAQs = () => {
  const t = useTranslations("");

  const { data } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  return (
    <div className="my-[40px] md:my-[50px]">
      <div className="container">
        <div className="lg:flex block items-start lg:justify-between">
          <div className="flex flex-col gap-[30px] md:justify-normal justify-center">
            <h1 className="text-[#1C1C1C] lg:text-[40px]/[35px] md:text-[28px]/[28px] text-[22px]/[25px] font-medium">
              {t("faq.title")}
            </h1>

            <p className="text-[#595959] text-[14px]/[15px] md:text-[17px]/[18px] lg:text-[18px]/[16.96px] font-normal md:font-medium max-w-[270px] md:max-w-[320px] lg:max-w-[375px]">
              {t("faq.subtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-[8px] lg:mt-0 mt-[25px] md:mt-[15px] md:justify-normal justify-center">
            {data?.data?.map((item, idx) => (
              <FAQ key={idx} title={item.question} question={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
