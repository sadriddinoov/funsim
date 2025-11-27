"use client";

import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ASSETS } from "@/assets";
import PackageCard from "@/components/packageCard";
import formatPrice from "@/utils/formatPrice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_IMAGE, API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import {
  Loading5756,
  LoadingWaiting,
  PaymentError,
  PaymentSuccess,
} from "@/components/loading/loading";
import { socket } from "@/socket/socketClient";
import { useOrderSocket } from "@/socket/useSocketEvents";
import Image from "next/image";
import { toast } from "react-toastify";
import Button from "@/components/button";
import { setToken } from "@/config/api";
import { APP_ROUTES } from "@/router/path";

async function fetchPayments() {
  const res = await fetch(`${API_URL}/${endpoints.payment}`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

async function fetchProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${endpoints.profile}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

const mockPaymentData = {
  data: [
    {
      id: 1,
      name: "Kaspi",
      key: "kaspi",
      image: ASSETS.kaspi,
    },
  ],
};

/**
 * Нормализация телефона под KZ-формат для API:
 * - убираем всё, кроме цифр
 * - срезаем возможный 998 (узбекский код)
 * - если 10 цифр — добавляем ведущую 7 => 7XXXXXXXXXX
 * - если 11 цифр и начинается с 8 — меняем на 7XXXXXXXXXX
 */
function normalizeKzPhone(raw?: string | null): string {
  let digits = (raw || "").replace(/\D/g, "");

  // 998XXXXXXXXX -> убираем 998
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  // если 10 цифр -> добавляем 7 в начало
  if (digits.length === 10) {
    digits = "7" + digits;
  }

  // если 11 цифр и начинается с 8 -> заменяем 8 на 7
  if (digits.length === 11 && digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }

  if (digits.length > 11) {
    digits = digits.slice(0, 11);
  }

  return digits;
}

/** Форматирование для отображения в инпуте: +7 XXX XXX XX XX */
function formatKzPhoneDisplay(digits: string): string {
  if (!digits) return "+7 ";

  let result = "+7 ";

  if (digits.length <= 3) {
    return result + digits;
  }

  result += digits.slice(0, 3); // XXX

  if (digits.length <= 6) {
    return result + " " + digits.slice(3); // XXX XXX
  }

  result += " " + digits.slice(3, 6); // +7 XXX XXX

  if (digits.length <= 8) {
    return result + " " + digits.slice(6); // +7 XXX XXX XX
  }

  result += " " + digits.slice(6, 8); // +7 XXX XXX XX

  if (digits.length <= 10) {
    return result + " " + digits.slice(8); // +7 XXX XXX XX XX
  }

  return result;
}

const ConfirmPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // 🟡 Kaspi выбран дефолтно
  const [selectedMethod, setSelectedMethod] = useState<number | null>(
    mockPaymentData.data[0]?.id ?? null
  );
  const [selectedMethodName, setSelectedMethodName] = useState<any | null>(
    mockPaymentData.data[0] ?? null
  );

  const [orderData, setOrderData] = useState<any>(null);
  const [object, setObject] = useState<any>(null);
  const [phoneDigits, setPhoneDigits] = useState<string>(""); // только 10 цифр после +7
  const [fio, setFio] = useState<string>();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [AgreeToKeshback, setAgreeToKeshback] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("obyekt");
    setObject(saved ? JSON.parse(saved) : null);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // все цифры из инпута (включая 7 из "+7")
    let digits = value.replace(/\D/g, "");

    // первый символ — страна (+7), убираем его, остаются только цифры абонента
    if (digits.startsWith("7")) {
      digits = digits.slice(1);
    }

    // максимум 10 цифр
    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }

    setPhoneDigits(digits);
  };

  const { data: paymentData } = useQuery({
    queryKey: ["payment"],
    queryFn: fetchPayments,
  });

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append("plan_id", data.plan_id);
      formData.append("fio", data.fio);
      formData.append("phone", data.phone);
      formData.append("payment_type", data.payment_type);

      const res = await fetch(`${API_URL}/${endpoints.orderCreate}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Failed to create payment: ${JSON.stringify(errorData)}`
        );
      }
      return res.json();
    },
    onSuccess: (res) => {
      if (res?.payment_details) {
        window.location.href = res.payment_details.payment_url;
      }

      const orderId = res?.order_id ?? res?.data?.order_id;
      setOrderData(res);

      if (res?.token) {
        localStorage.setItem("token", res?.token);
      }
      if (orderId) {
        const token = localStorage.getItem("token");
        socket?.emit("join_order", {
          orderId: orderId,
          token,
        });
      }

      setShowOrderModal(true);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  const handlePayment = () => {
    if (!fio || fio.trim() === "") {
      toast.error("Исмни киритинг!");
      return;
    }
    if (phoneDigits.length !== 10) {
      toast.error("Телефон рақамини киритинг!");
      return;
    }
    if (!selectedMethod) {
      toast.error("Тўлов усулини танланг!");
      return;
    }

    const normalizedPhone = normalizeKzPhone(phoneDigits);

    console.log("========== ORDER CREATE ==========");
    console.log(
      "📞 Введённый номер (input):",
      formatKzPhoneDisplay(phoneDigits)
    );
    console.log("🇰🇿 Номер для API (KZ формат):", normalizedPhone);
    console.log("==================================");

    mutate({
      plan_id: id,
      fio,
      phone: normalizedPhone,
      payment_type: selectedMethodName?.key,
      use_cashback: AgreeToKeshback,
    });
  };

  const { mutate: authMutate, isPending: authPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${API_URL}/${endpoints.auth}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Failed to create payment: ${JSON.stringify(errorData)}`
        );
      }
      return res.json();
    },
    onSuccess: async (res) => {
      console.log(res, "authRes");
      setToken(res?.data?.token);
      await router.push("/simDone");
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  const handleAuth = () => {
    const token = localStorage.getItem("token");
    const normalizedPhone = normalizeKzPhone(phoneDigits);

    console.log("============= AUTH =============");
    console.log(
      "📞 Введённый номер (input):",
      formatKzPhoneDisplay(phoneDigits)
    );
    console.log("🇰🇿 Номер для API (KZ формат):", normalizedPhone);
    console.log("================================");

    authMutate({
      phone: normalizedPhone,
      order_id: String(orderData?.order_id),
      secret: token,
    });
  };

  useOrderSocket({
    onOrderData: (data) => {
      if (data) {
        setShowOrderModal(true);
      }
    },
    onOrderUpdated: async (data) => {
      if (data?.status_name === "Активный") {
        localStorage.setItem("simkard", JSON.stringify(data?.simcards[0]));
        await setShowSuccessModal(true);
        await handleAuth();
      }
      if (data?.status_name === "Отменен") {
        setShowSuccessModal(false);
        setShowCancelModal(true);

        setTimeout(() => {
          setShowCancelModal(false);
        }, 3000);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
    onConnect: (id) => console.log("Ulandi:", id),
    onDisconnect: (reason) => console.log("Uzildi:", reason),
  });

  useEffect(() => {
    if (profileData?.data) {
      if (profileData.data.phone) {
        const normalized = normalizeKzPhone(profileData.data.phone);
        const subscriber =
          normalized.length === 11 && normalized.startsWith("7")
            ? normalized.slice(1)
            : normalized;
        setPhoneDigits(subscriber);
      }
      if (profileData.data.full_name) {
        setFio(profileData.data.full_name);
      }
    }
  }, [profileData?.data]);

  return (
    <>
      {isPending && (
        <div className="loading-overlay">
          <Loading5756 />
        </div>
      )}

      {showOrderModal && (
        <div className="loading-overlay">
          <LoadingWaiting selectedMethod={selectedMethod} />
        </div>
      )}

      {showSuccessModal && (
        <div className="loading-overlay">
          <PaymentSuccess />
        </div>
      )}

      {showCancelModal && (
        <div className="loading-overlay">
          <PaymentError />
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="py-6 md:pb-[100px] pb-[15px] container relative">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-8">
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
            <h1 className="font-semibold text-black text-xl sm:text-2xl lg:text-[35px]">
              {t("auth.confirm")}
            </h1>
          </div>

          <div className="flex flex-col items-stretch md:flex-row gap-[10px] md:gap-[13px]">
            <div className="block md:hidden">
              <PackageCard
                flag={`${API_IMAGE}/${object?.region_group?.img}`}
                country={object?.name}
                gb={object?.quantity_internet}
                days={object?.expiry_day}
                price={`${formatPrice(object?.price_sell)}`}
                variant="buy"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="bg-[#1C1C1C0D] w-full rounded-[12px] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row gap-[10px] md:gap-[20px]">
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#595959]">
                      {t("auth.name")}
                    </p>
                    <input
                      type="text"
                      placeholder="Ivan"
                      className="w-full bg-white p-2 text-black rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                      value={fio || ""}
                      onChange={(e) => setFio(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#595959]">
                      {t("auth.phone")}*
                    </p>
                    <input
                      type="text"
                      // placeholder убираем, всегда показываем +7 ...
                      placeholder=""
                      className="w-full bg-white p-2 text-black rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                      value={formatKzPhoneDisplay(phoneDigits)}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm mb-2 text-[#595959]">
                    {t("auth.pay")}*
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-3">
                    {mockPaymentData?.data?.map((item: any) => (
                      <div
                        key={item?.id}
                        className={`w-full h-[60px] md:h-[85px] flex items-center justify-center bg-white rounded-[12px] cursor-pointer ${
                          selectedMethod === item?.id
                            ? "border border-[#FFB800]"
                            : "border border-transparent"
                        }`}
                        onClick={() => {
                          setSelectedMethodName(item);
                          setSelectedMethod(item?.id);
                        }}
                      >
                        <Image
                          alt=""
                          src={item?.image}
                          className={`md:w-24 md:h-auto h-14 w-[120px] object-contain ${
                            item?.name === "click" || item?.name === "payme"
                              ? "h-30 w-30"
                              : ""
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                    <input
                      type="checkbox"
                      checked={agreeToPolicy}
                      onChange={(e) => setAgreeToPolicy(e.target.checked)}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg border-2 bg-white text-[#FFB800] cursor-pointer"
                    />
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
                      <p className="text-xs sm:text-sm font-medium text-[#1C1C1C]">
                        {t("auth.agree_to")}{" "}
                        <a
                          href={APP_ROUTES.CONFIDENTIAL}
                          rel="noopener noreferrer"
                          className="text-[#FFB800] font-semibold underline"
                        >
                          {t("auth.privacy_policy")}
                        </a>
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-[#1C1C1C]">
                        {t("auth.and")}
                      </p>
                      <a
                        href={APP_ROUTES.OFFER}
                        rel="noopener noreferrer"
                        className="text-[#FFB800] font-semibold underline text-xs sm:text-sm"
                      >
                        {t("auth.offerta")}
                      </a>
                    </div>
                  </div>

                  {profileData?.data?.balance > 0.0 && (
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-[#1C1C1C] flex gap-1">
                        {t("auth.use")}{" "}
                        <span className="font-semibold">
                          {profileData?.data?.balance}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="keshback"
                            checked={AgreeToKeshback === true}
                            onChange={() => setAgreeToKeshback(true)}
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#595959] bg-white text-[#FFB800]"
                          />
                          <span className="text-xs sm:text-sm font-medium text-[#1C1C1C]">
                            {t("yes")}
                          </span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="keshback"
                            checked={AgreeToKeshback === false}
                            onChange={() => setAgreeToKeshback(false)}
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 bg-white text-[#FFB800]"
                          />
                          <span className="text-xs sm:text-sm font-medium text-[#1C1C1C]">
                            {t("no")}
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:pb-0 pb-[75px]">
                <Button
                  classname="mt-[-5px] w-full"
                  title={isPending ? `${t("loading")}...` : t("auth.pay")}
                  onclick={handlePayment}
                  disabled={
                    isPending ||
                    !fio ||
                    fio.trim() === "" ||
                    phoneDigits.length !== 10 ||
                    !selectedMethod ||
                    !agreeToPolicy
                  }
                />
              </div>
            </div>

            <div className="md:block hidden">
              <PackageCard
                item={object}
                flag={`${API_IMAGE}/${object?.region_group?.img}`}
                country={object?.name}
                gb={object?.quantity_internet}
                days={object?.expiry_day}
                price={formatPrice(object?.price_sell)}
                variant="buy"
                set4g={object?.tariff_4g}
                set5g={object?.tariff_5g}
              />
            </div>
          </div>
        </div>

        <div className="">
          <FooterNav />
        </div>
      </div>
    </>
  );
};

export default ConfirmPage;
