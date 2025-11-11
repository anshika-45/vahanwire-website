import React, { useEffect } from "react";
import backIcon from "../assets/back.webp";
import closeIcon from "../assets/x.webp";
const Modal = ({ isOpen, onClose, onBack, children, proceedButton }) => {
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex w-full h-full bg-black/50 z-50">
      <div className="ml-auto lg:w-[45vw] md:w-[60vw] max-w-[700px] sm:w-[50vw] w-[100vw] h-full bg-[#EFEFEF] flex flex-col relative">
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-1">
          <button
            onClick={onBack || onClose}
            className="text-gray-700 hover:text-gray-900 flex items-center gap-2 text-xs sm:text-sm"
          >
            <img src={backIcon} loading="lazy" alt="Back" className="w-4 sm:w-5 h-4 sm:h-5" />Back
          </button>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
          >
            <img src={closeIcon} loading="lazy" alt="Close" className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-[#EFEFEF]">
          {children}
        </div>
        {proceedButton && (
          <div className="w-full px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-white sticky bottom-0">
            {proceedButton}
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;