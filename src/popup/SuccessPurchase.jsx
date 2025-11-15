import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
const SuccessPurchase = ({ onClose, selectedPlan }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose(selectedPlan);
    }
    navigate("/my-account?view=amc");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-lg w-full mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
            <Check className="text-white w-8 h-8" strokeWidth={3} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Purchase!
        </h2>

        <p className="text-gray-600 text-base leading-relaxed mb-8 p-2">
          Your AMC Plan has been purchased — it will be activated within 24
          hours. You can start enjoying worry-free service and priority support
          soon.
        </p>

       
        <button
          onClick={handleClose}
          className="px-20 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg active:scale-95 transition-transform"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPurchase;
