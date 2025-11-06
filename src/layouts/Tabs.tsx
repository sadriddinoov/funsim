"use client";

import React, { useEffect, useState } from "react";
import DestinationCard from "../components/destinationCard";
import type { DestinationType } from "../components/destinationCard";
import { tabConfig } from "../data/TabData";
import { useTranslations } from "next-intl";
import { API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useQueries } from "@tanstack/react-query";
import { buildQuery } from "@/utils/buildQuery";

const tabParams: Record<DestinationType, any> = {
  local: { plan_type: "local" },
  regional: { plan_type: "region" },
  global: { plan_type: "global" },
};

async function fetchPlans(type: DestinationType, params: any) {
  const query = buildQuery(params);
  let url = "";

  if (type === "local") {
    // 🟢 local uchun alohida API
    url = `${API_URL}/${endpoints.regions}`;
  } else {
    // 🔵 qolganlari uchun umumiy API
    url = `${API_URL}/${endpoints.regionGroups}?${query}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${type} plans`);
  return res.json();
}

const Tabs: React.FC = () => {
  useEffect(() => {
    localStorage.setItem("selectedTab", "local");
  }, []);
  const [activeTab, setActiveTab] = useState<DestinationType>("local");
  const t = useTranslations("");

  // 🔹 3 ta parallel query

  const results = useQueries({
    queries: (Object.keys(tabParams) as DestinationType[]).map((key) => ({
      queryKey: ["regionGroup", key],
      queryFn: () => fetchPlans(key, tabParams[key]),
    })),
  });

  // 🔹 activeTab bo‘yicha kerakli data olish
  const activeData = results.find(
    (_, idx) => Object.keys(tabParams)[idx] === activeTab
  )?.data;

  const handleTabClick = (tab: DestinationType) => {
    setActiveTab(tab);
    localStorage.setItem("selectedTab", tab);
  };

  return (
    <div className="mb-[30px] md:mb-[75px] bg-[linear-gradient(177.5deg,rgba(240,111,30,0.09)_4.7%,rgba(255,255,255,0.09)_93.18%)] pt-[40px] md:pt-[75px]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
          <h1 className="font-medium text-[22px] md:text-[40px] text-[#1C1C1C]">
            {t("destination.title")}
          </h1>

          <div className="flex gap-[0] md:gap-3 bg-[#1C1C1C0D] rounded-full w-full md:w-auto">
            {Object.entries(tabConfig).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => handleTabClick(key as DestinationType)}
                className={`flex-1 md:flex-initial px-1 py-2 md:px-4 md:py-2 rounded-full text-[13px] md:text-base transition-colors duration-150 ${
                  activeTab === key
                    ? "bg-[#ff7a00] text-white"
                    : "bg-transparent text-[#1C1C1C]"
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[30px] md:mt-[50px]">
          <DestinationCard type={activeTab} data={activeData?.data} />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
