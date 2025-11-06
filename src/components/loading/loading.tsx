"use client";

import "./loading.css";
import { useEffect, useState } from "react";
import { ASSETS } from "../../assets";
import Image from "next/image";
import "ldrs/ring";
import { lineWobble } from "ldrs";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const Loading5755 = ({ value }: { value?: number }) => {
  const [percentage, setPercentage] = useState(1);

  useEffect(() => {
    if (typeof value === "number") {
      setPercentage(Math.max(0, Math.min(100, Math.floor(value))));
      return;
    }
    const interval = setInterval(() => {
      setPercentage((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 5);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="loading-container ">
      <div className="loading-5755">
        <div className="logo">
          <Image src={ASSETS.logowhite} alt="HappyTel Logo" />
        </div>
        <div className="progress-circle">
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

const Loading5756 = () => {
  const [percentage, setPercentage] = useState(1);
  const t = useTranslations();

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 5);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-5756">
        <div className="logo">
          <Image src={ASSETS.logowhite} alt="HappyTel Logo" />
        </div>
        <div className="progress-container">
          <div className="progress-background">
            <div
              className="progress-filled"
              style={{ width: `${percentage}%` }}
            ></div>
            <div
              className="progress-current"
              style={{ left: `${percentage}%` }}
            ></div>
          </div>
          <div className="progress-bar"></div>
        </div>
        <div className="loading-text">
          {t("loading")} {percentage}%
        </div>
      </div>
    </div>
  );
};

const Loading5757 = () => {
  return (
    <div className="loading-container">
      <div className="loading-5757">
        <div className="logo">
          <Image src={ASSETS.logowhite} alt="HappyTel Logo" />
        </div>
        <div className="circular-progress"></div>
      </div>
    </div>
  );
};

const LoadingWaiting = ({
  selectedMethod,
}: {
  selectedMethod: number | null;
}) => {
  const t = useTranslations();

  let paymentMethodText = "payment.other";

  console.log(selectedMethod, "selectedMethod");
  if (selectedMethod === 1) {
    paymentMethodText = "payment.click";
  } else if (selectedMethod === 2) {
    paymentMethodText = "payment.payme";
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <Image
          src={ASSETS.logowhite}
          alt="HappyTel Logo"
          className="w-32 h-auto drop-shadow-xl"
        />

        {/* Text with animated dots */}
        <div className="md:max-w-none max-w-[90%] md:justify-normal justify-center font-medium text-white flex items-end md:items-center">
          <p className="text-center text-lg md:text-xl">
            {t(paymentMethodText)}
          </p>
          <span className="md:ml-2 ml-0 hidden md:flex w-6 justify-center md:justify-start">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const LoadingPage = () => {
  lineWobble.register();

  return (
    <div className="loading-container">
      <div className="h-[25px] bg-white flex  items-center px-[20px] rounded-full">
        <div className="logo">
          <Image src={ASSETS.logowhite} alt="HappyTel Logo" />
        </div>
        <l-line-wobble
          size="200"
          stroke="10"
          bg-opacity="0.1"
          speed="2"
          color="#7A80FF"
        ></l-line-wobble>
      </div>
    </div>
  );
};

const PaymentSuccess = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Check */}
        <div className="relative">
          <CheckCircle2 className="w-24 h-24 text-green-500 animate-bounce" />
          <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-ping opacity-20"></div>
        </div>

        {/* Success text */}
        <h2 className="text-2xl text-center font-semibold text-white">
          Оплата успешно принята, Пожалуйста, не закрывайте окно, до получения
          данных e-sim
        </h2>
      </div>
    </div>
  );
};

const PaymentError = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Error Icon */}
        <div className="relative">
          <XCircle className="w-24 h-24 text-red-500 animate-shake" />
          <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-20"></div>
        </div>

        {/* Error text */}
        <h2 className="text-2xl font-semibold text-white">Ошибка при оплате</h2>
        <button>Вернуться на главную</button>
      </div>
    </div>
  );
};
export {
  Loading5757,
  Loading5756,
  Loading5755,
  LoadingPage,
  LoadingWaiting,
  PaymentSuccess,
  PaymentError,
};
