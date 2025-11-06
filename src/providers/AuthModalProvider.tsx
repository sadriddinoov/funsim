"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/router/path";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { setToken } from "@/config/api";
import { API_URL } from "@/config";

interface AuthModalContextType {
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPhone, setModalPhone] = useState<string>("");

  const cleanedPhone = modalPhone.replace(/\s/g, "");
  const [code, setCode] = useState<string>("");
  const [isVerifyStep, setIsVerifyStep] = useState(false);
  const [phone, setPhone] = useState<any>();
  const [newCode, setNewCode] = useState<any>();

  const openAuthModal = () => {
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
    setModalPhone("");
    setCode("");
    setIsVerifyStep(false);
  };

  const handleModalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    setPhone(value);
    if (value.startsWith("998")) {
      value = value.substring(3);
    }
    if (value.length > 9) value = value.substring(0, 9);
    if (value.length > 0) {
      const formatted = `${value.substring(0, 2)} ${value.substring(
        2,
        5
      )} ${value.substring(5, 7)} ${value.substring(7, 9)}`.trim();
      e.target.value = formatted;
      setModalPhone(formatted);
    } else {
      e.target.value = "";
      setModalPhone("");
    }
  };
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // faqat raqamlarni oladi

    if (value.length > 6) value = value.substring(0, 6); // maksimal uzunlik 6 ta
    setNewCode(value);
    if (value.length > 0) {
      // har bir belgini bo‘sh joy bilan ajratib formatlaymiz
      const formatted = value.split("").join(" ").trim();

      e.target.value = formatted;
      console.log(formatted, "formatted");

      setCode(formatted);
    } else {
      e.target.value = "";
      setCode("");
    }
  };

  const handleLogin = () => {
    console.log(
      "handleLogin called, isVerifyStep:",
      isVerifyStep,
      "modalPhone:",
      modalPhone,
      "code:",
      code
    );
    if (!isVerifyStep) {
      if (modalPhone) {
        setIsVerifyStep(true);
      }
    } else {
      if (code) {
        localStorage.setItem("safe_road_token", modalPhone);
        setModalPhone("");
        setCode("");
        setIsVerifyStep(false);
        closeAuthModal();
        redirect(APP_ROUTES.PROFILE);
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${API_URL}/client/login-sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataJson = await res.json();

      // ❗ success false bo‘lsa xato sifatida tashlaymiz
      if (!dataJson.success) {
        throw new Error(dataJson.message || "Noma’lum xato");
      }

      return dataJson;
    },
    onSuccess: (res) => {
      setIsVerifyStep(true);
    },
    onError: (err: any) => {
      console.log(err, "errorlar");

      toast.error(err?.message);
    },
  });

  const handlePayment = () => {
    mutate({
      phone,
    });
  };

  const { mutate: sendCode, isPending: sendCodePending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${API_URL}/client/confirm-sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataJson = await res.json();

      setToken(dataJson?.data?.token);

      if (!dataJson.success) {
        throw new Error(dataJson.message || "Noma’lum xato");
      }

      return dataJson;
    },
    onSuccess: (res) => {
      closeAuthModal();
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const handleSendCode = () => {
    sendCode({
      phone: phone,
      code: newCode,
    });
  };

  return (
    <AuthModalContext.Provider
      value={{ isModalOpen, openAuthModal, closeAuthModal }}
    >
      {children}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[#1C1C1C99] flex items-center justify-center z-[1000] px-4"
          style={{ display: isModalOpen ? "flex" : "none" }}
        >
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl lg:text-[34px] font-medium text-[#1C1C1C]">
                {t("auth.welcome")}
              </h2>
              <button
                onClick={closeAuthModal}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
              >
                <X size={16} className="text-[#1C1C1C57] sm:size-5" />
              </button>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-10">
              <p className="text-base text-black sm:text-lg font-normal mb-2">
                {t("auth.phone")}
              </p>
              <input
                type="tel"
                value={`+998 ${modalPhone}`}
                onChange={handleModalPhoneChange}
                className="w-full bg-[#CFCFCF1F] px-4 py-2 text-[#1C1C1C] rounded-lg focus:outline-none text-base sm:text-lg"
                placeholder="+998 99 999 99 99"
              />
            </div>

            {isVerifyStep && (
              <div className="mt-2 sm:mt-4 lg:mt-6">
                <p className="text-base text-black sm:text-lg font-normal mb-2">
                  {t("auth.code")}
                </p>
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  className="w-full bg-[#CFCFCF1F] px-4 py-2 text-[#1C1C1C] rounded-lg focus:outline-none text-base sm:text-lg"
                  placeholder="0 0 0 0 0 0"
                />
              </div>
            )}

            <button
              className="w-full mt-6 bg-[#F06F1E] text-white rounded-lg py-2 sm:py-3 hover:bg-[#8F4D26] cursor-pointer transition-colors text-base sm:text-lg"
              onClick={isVerifyStep ? handleSendCode : handlePayment}
            >
              {isPending || sendCodePending ? `${t("loading")}...` : t("auth.button")}
            </button>
          </div>
        </div>
      )}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
