import { CheckCircle } from "lucide-react";

const SuccessAnimation = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
      <div className="mb-4">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <div className="animate-bounce">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎉</span>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Muvaffaqiyatli!</h3>
      <p className="text-gray-600 mb-4">Buyurtmangiz faollashtirildi</p>
      <div className="flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <div
          className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);

export default SuccessAnimation;
