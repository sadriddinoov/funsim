import { XCircle } from "lucide-react";

const ErrorMessage = () => (
  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center">
      <XCircle className="w-5 h-5 text-red-500 mr-2" />
      <div>
        <h4 className="text-red-800 font-medium">Xatolik yuz berdi</h4>
        <p className="text-red-600 text-sm mt-1">Hatolik yuz berdi</p>
      </div>
    </div>
    <button
      // onClick={() => setShowError(false)}
      className="mt-2 text-red-600 text-sm underline hover:no-underline"
    >
      Yopish
    </button>
  </div>
);

export default ErrorMessage;
