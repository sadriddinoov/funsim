import { Loader2 } from "lucide-react";

const WaitingAnimation = () => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl">
      {/* Animated SIM Card */}
      <div className="mb-6 relative">
        <div className="w-24 h-24 mx-auto relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>

          {/* Inner SIM card */}
          <div className="absolute inset-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-sm animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-2 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-8 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-4 left-8 w-1 h-1 bg-green-400 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-2 right-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>

      {/* Title with typing effect */}
      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        <span className="inline-block animate-pulse">Buyurtma</span>
        <span
          className="inline-block animate-pulse"
          style={{ animationDelay: "0.2s" }}
        >
          {" "}
          qayta
        </span>
        <span
          className="inline-block animate-pulse"
          style={{ animationDelay: "0.4s" }}
        >
          {" "}
          ishlanmoqda
        </span>
        <span
          className="inline-block animate-bounce text-blue-500"
          style={{ animationDelay: "0.6s" }}
        >
          ...
        </span>
      </h3>

      <p className="text-gray-600 mb-6">
        Iltimos, biroz kuting. Tez orada tayyor bo'ladi!
      </p>

      {/* Progress dots */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>

      {/* Animated progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse"
          style={{ width: "70%" }}
        ></div>
      </div>

      {/* Status indicators */}
      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>To'lov tasdiqlandi</span>
        </div>
        <div className="flex items-center space-x-1">
          <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
          <span>SIM faollashtirish</span>
        </div>
      </div>
    </div>
  </div>
);

export default WaitingAnimation;
