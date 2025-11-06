"use client";

import type React from "react";
import {
  X,
  CheckCircle,
  Clock,
  CreditCard,
  User,
  Calendar,
  Wifi,
  Package,
  AlertCircle,
  Smartphone,
  Signal,
  Settings,
  Star,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

interface OrderData {
  id: number;
  status_id: number;
  status_name: string;
  sim_type_id: number;
  sim_type_name: string;
  plan: {
    id: number;
    name: string;
    price: string;
    quantity_internet: string;
    expiry_day: number;
  };
  client: {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    balance: string;
  };
  agent: {
    id: number;
    name: string;
  };
  simcards: any[];
  payments: Array<{
    id: number;
    amount: number;
    payment_type_name: string;
    created_at: string;
  }>;
  date_start: string;
  date_finish: string;
  cashback_amount: number;
  discount_amount: number;
  created_at: string;
  updated_at: string;
}

interface OrderInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderData | null;
}

const OrderInfoModal: React.FC<OrderInfoModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  if (!isOpen || !orderData) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("uz-UZ").format(Number(price)) + " so'm";
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "активный":
        return "text-emerald-600 bg-emerald-100";
      case "Ожидание":
        return "text-amber-600 bg-amber-100";
      case "error":
        return "text-rose-600 bg-rose-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "активный":
        return <CheckCircle className="w-4 h-4" />;
      case "ожидание":
        return <Clock className="w-4 h-4" />;
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Enhanced SIM Card specific process steps
  const getSimCardProcessSteps = () => {
    const steps = [
      {
        id: 1,
        title: "🛒 Buyurtma yaratildi",
        description: "Tarif rejasi tanlandi va buyurtma ro'yxatdan o'tkazildi",
        detailedDescription:
          "Mijoz tomonidan kerakli tarif rejasi tanlandi va tizimda buyurtma muvaffaqiyatli yaratildi",
        icon: <Package className="w-6 h-6" />,
        status: "completed",
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50",
        time: "✅ Yakunlandi",
        emoji: "🎯",
      },
      {
        id: 2,
        title: "💳 To'lov tasdiqlandi",
        description: "SIM karta uchun to'lov muvaffaqiyatli amalga oshirildi",
        detailedDescription:
          "Tanlangan tarif rejasi uchun to'lov xavfsiz tarzda qabul qilindi va tasdiqlandi",
        icon: <CreditCard className="w-6 h-6" />,
        status: orderData.payments.length > 0 ? "completed" : "pending",
        gradient: "from-emerald-500 to-teal-500",
        bgGradient: "from-emerald-50 to-teal-50",
        time: orderData.payments.length > 0 ? "✅ Yakunlandi" : "⏳ Kutilmoqda",
        emoji: "💰",
      },
      {
        id: 3,
        title: "⚙️ SIM karta tayyorlanmoqda",
        description: "Virtual SIM karta yaratilmoqda va sozlanmoqda",
        detailedDescription:
          "Tizimda yangi eSIM profili yaratilmoqda, tarif rejasi sozlanmoqda va xavfsizlik parametrlari o'rnatilmoqda",
        icon: <Settings className="w-6 h-6" />,
        status:
          orderData.status_name.toLowerCase() === "ожидание"
            ? "current"
            : orderData.status_name.toLowerCase() === "активный"
            ? "completed"
            : "pending",
        gradient: "from-amber-500 to-orange-500",
        bgGradient: "from-amber-50 to-orange-50",
        time:
          orderData.status_name.toLowerCase() === "ожидание"
            ? "🔄 Jarayonda..."
            : orderData.status_name.toLowerCase() === "активный"
            ? "✅ Yakunlandi"
            : "⏳ Kutilmoqda",
        emoji: "🔧",
      },
      {
        id: 4,
        title: "📶 eSIM faollashtirilmoqda",
        description: "SIM karta faollashtirilmoqda va tarmoqqa ulanmoqda",
        detailedDescription:
          "eSIM profili qurilmaga yuklanmoqda, mobil tarmoqqa ulanmoqda va signal kuchi tekshirilmoqda",
        icon: <Signal className="w-6 h-6" />,
        status:
          orderData.status_name.toLowerCase() === "активный"
            ? "completed"
            : orderData.status_name.toLowerCase() === "ожидание"
            ? "current"
            : "pending",
        gradient: "from-purple-500 to-violet-500",
        bgGradient: "from-purple-50 to-violet-50",
        time:
          orderData.status_name.toLowerCase() === "активный"
            ? "✅ Yakunlandi"
            : orderData.status_name.toLowerCase() === "ожидание"
            ? "🔄 Jarayonda..."
            : "⏳ Kutilmoqda",
        emoji: "📡",
      },
      {
        id: 5,
        title: "🎉 Foydalanishga tayyor!",
        description: "SIM karta to'liq faollashtirildi va ishlatishga tayyor",
        detailedDescription:
          "eSIM muvaffaqiyatli faollashtirildi! Internet, qo'ng'iroqlar va SMS xizmatlari to'liq ishlaydi",
        icon: <Smartphone className="w-6 h-6" />,
        status:
          orderData.status_name.toLowerCase() === "активный"
            ? "completed"
            : "pending",
        gradient: "from-rose-500 to-pink-500",
        bgGradient: "from-rose-50 to-pink-50",
        time:
          orderData.status_name.toLowerCase() === "активный"
            ? "🎊 Tayyor!"
            : "⏳ Kutilmoqda",
        emoji: "🚀",
      },
    ];

    return steps;
  };

  const SimCardProcessTracker = () => {
    const steps = getSimCardProcessSteps();

    return (
      <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 mb-8 border-2 border-white shadow-2xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200 to-rose-200 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-black text-gray-800 text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  SIM karta jarayoni
                </h3>
                <p className="text-gray-600 font-medium">
                  Buyurtmangiz holati va keyingi qadamlar
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-2 font-medium">
                SIM turi
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl text-sm font-bold shadow-lg">
                {orderData.sim_type_name}
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Enhanced progress line */}
            <div className="absolute left-10 top-16 bottom-16 w-1 bg-gradient-to-b from-indigo-300 via-purple-300 via-pink-300 to-rose-300 rounded-full shadow-sm"></div>

            {steps.map((step) => {
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";
           

              return (
                <div
                  key={step.id}
                  className="relative flex items-start mb-10 last:mb-0"
                >
                  {/* Enhanced step indicator */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div
                      className={`
                      w-20 h-20 rounded-3xl border-4 border-white shadow-2xl flex items-center justify-center transform transition-all duration-500
                      ${
                        isCompleted
                          ? `bg-gradient-to-r ${step.gradient} text-white scale-110 shadow-green-300`
                          : isCurrent
                          ? `bg-gradient-to-r ${step.gradient} text-white animate-pulse scale-110 shadow-blue-300`
                          : "bg-white text-gray-400 shadow-gray-200"
                      }
                    `}
                    >
                      {isCompleted ? (
                        <div className="relative">
                          <CheckCircle className="w-8 h-8" />
                          <div className="absolute -top-1 -right-1 text-xl">
                            {step.emoji}
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          {step.icon}
                          {isCurrent && (
                            <div className="absolute -top-1 -right-1 text-xl">
                              {step.emoji}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Pulse animation for current step */}
                      {isCurrent && (
                        <>
                          <div className="absolute inset-0 rounded-3xl bg-current opacity-20 animate-ping"></div>
                          <div className="absolute inset-0 rounded-3xl bg-current opacity-10 animate-ping animation-delay-200"></div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Enhanced step content */}
                  <div className="ml-8 flex-1">
                    <div
                      className={`
                      bg-white rounded-2xl p-6 shadow-xl border-2 transform transition-all duration-300 hover:scale-105
                      ${
                        isCompleted
                          ? "border-emerald-200 shadow-emerald-100"
                          : isCurrent
                          ? "border-indigo-200 shadow-indigo-100"
                          : "border-gray-100 shadow-gray-100"
                      }
                    `}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4
                          className={`
                          font-black text-xl
                          ${
                            isCompleted
                              ? "text-emerald-700"
                              : isCurrent
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                              : "text-gray-500"
                          }
                        `}
                        >
                          {step.title}
                        </h4>
                        <span
                          className={`
                          text-sm px-3 py-1 rounded-full font-bold
                          ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-700"
                              : isCurrent
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                        >
                          {step.time}
                        </span>
                      </div>

                      <p
                        className={`
                        text-base mb-3 font-medium
                        ${
                          isCompleted
                            ? "text-emerald-600"
                            : isCurrent
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }
                      `}
                      >
                        {step.description}
                      </p>

                      <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">
                        {step.detailedDescription}
                      </p>

                      {/* Enhanced current step animation */}
                      {isCurrent && (
                        <div className="flex items-center mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                          <div className="flex space-x-1 mr-4">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-indigo-700 font-bold">
                            🔄 Hozir amalga oshirilmoqda...
                          </span>
                        </div>
                      )}

                      {/* Enhanced completed step success message */}
                      {isCompleted && (
                        <div className="flex items-center mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm text-emerald-700 font-bold">
                            🎉 Muvaffaqiyatli yakunlandi!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced progress summary */}
          <div className="mt-8 p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">Joriy holat</p>
                  <p className="text-gray-600 font-medium">
                    Buyurtma #{orderData.id}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-bold shadow-lg ${getStatusColor(
                    orderData.status_name
                  )}`}
                >
                  {getStatusIcon(orderData.status_name)}
                  <span className="ml-2">{orderData.status_name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gray-100">
        {/* Enhanced Header */}
        <div className="relative flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-30 -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-200 to-rose-200 rounded-full opacity-30 translate-y-8 -translate-x-8"></div>

          <div className="relative z-10 flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-1">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SIM karta buyurtmasi
                </span>
              </h2>
              <p className="text-gray-600 font-medium">
                Buyurtma #{orderData.id} • {orderData.sim_type_name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 w-12 h-12 rounded-2xl bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center hover:bg-opacity-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* SIM Card Process Tracker */}
          <SimCardProcessTracker />

          {/* Enhanced Plan Information */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-white shadow-2xl">
            <h3 className="font-black text-gray-800 mb-6 flex items-center text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              Tanlangan tarif rejasi
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Tarif nomi
                  </p>
                </div>
                <p className="font-black text-gray-800 text-xl">
                  {orderData.plan.name}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Narx</p>
                </div>
                <p className="font-black text-emerald-600 text-xl">
                  {formatPrice(orderData.plan.price)}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <Wifi className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Internet hajmi
                  </p>
                </div>
                <p className="font-black text-blue-600 text-xl">
                  {orderData.plan.quantity_internet} GB
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Amal qilish muddati
                  </p>
                </div>
                <p className="font-black text-purple-600 text-xl">
                  {orderData.plan.expiry_day} kun
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Client Information */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-white shadow-2xl">
            <h3 className="font-black text-gray-800 mb-6 flex items-center text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              Mijoz ma'lumotlari
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  👤 F.I.Sh
                </p>
                <p className="font-bold text-gray-800 text-lg">
                  {orderData.client.name}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  📱 Telefon raqami
                </p>
                <p className="font-bold text-gray-800 text-lg">
                  +{orderData.client.phone}
                </p>
              </div>
              {orderData.client.email && (
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    📧 Email manzil
                  </p>
                  <p className="font-bold text-gray-800 text-lg">
                    {orderData.client.email}
                  </p>
                </div>
              )}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  💰 Hisob balansi
                </p>
                <p className="font-bold text-gray-800 text-lg">
                  {formatPrice(orderData.client.balance)}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Payment Information */}
          {orderData.payments.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border-2 border-emerald-200 shadow-2xl">
              <h3 className="font-black text-gray-800 mb-6 flex items-center text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                To'lov ma'lumotlari
              </h3>
              {orderData.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-xl border border-gray-100 transform hover:scale-105 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">
                        {payment.payment_type_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(payment.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-600 text-2xl">
                      {formatPrice(payment.amount)}
                    </p>
                    <p className="text-sm text-emerald-500 font-bold">
                      ✅ To'landi
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Date Information */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200 shadow-2xl">
            <h3 className="font-black text-gray-800 mb-6 flex items-center text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Muhim sanalar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  🚀 Faollik boshlanishi
                </p>
                <p className="font-bold text-gray-800 text-lg">
                  {formatDate(orderData.date_start)}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  ⏰ Faollik tugashi
                </p>
                <p className="font-bold text-gray-800 text-lg">
                  {formatDate(orderData.date_finish)}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  📅 Buyurtma sanasi
                </p>
                <p className="font-bold text-gray-800 text-lg">
                  {formatDate(orderData.created_at)}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  🔄 Oxirgi yangilanish
                </p>
                <p className="font-bold text-gray-800 text-lg">
                  {formatDate(orderData.updated_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Agent Information */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200 shadow-2xl">
            <h3 className="font-black text-gray-800 mb-6 flex items-center text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              Xizmat ko'rsatuvchi agent
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-black text-gray-800 text-xl">
                    {orderData.agent.name}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    Agent ID: {orderData.agent.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Additional Information */}
          {(orderData.cashback_amount > 0 || orderData.discount_amount > 0) && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 border-2 border-amber-200 shadow-2xl">
              <h3 className="font-black text-gray-800 mb-6 flex items-center text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                Qo'shimcha imtiyozlar
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {orderData.cashback_amount > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      🎁 Cashback
                    </p>
                    <p className="font-black text-emerald-600 text-2xl">
                      {formatPrice(orderData.cashback_amount)}
                    </p>
                  </div>
                )}
                {orderData.discount_amount > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all">
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      🏷️ Chegirma
                    </p>
                    <p className="font-black text-rose-600 text-2xl">
                      {formatPrice(orderData.discount_amount)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="p-8 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-black text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105"
          >
            🚀 Yopish
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoModal;
