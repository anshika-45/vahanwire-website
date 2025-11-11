import React, { useEffect, useRef } from "react";
import Button from "./Button";

export default function ConfirmCancelRefundModal({ open, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => {
      dialogRef.current?.querySelector("button")?.focus();
    }, 10);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-refund-title"
      aria-describedby="cancel-refund-desc"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative mx-4 w-[92%] max-w-[440px] rounded-[18px] bg-white shadow-xl px-8 pt-8 pb-8 animate-[fadeIn_.18s_ease-out]"
      >
        {/* Title */}
        <h2
          id="cancel-refund-title"
          className="text-center text-[22px] sm:text-[24px] font-semibold text-gray-900 leading-tight"
        >
          Are you sure you want to cancel
          <br className="hidden sm:block" />
          your refund request?
        </h2>

        {/* Subtitle */}
        <p
          id="cancel-refund-desc"
          className="mt-3 text-center text-[14px] sm:text-[15px] text-gray-500"
        >
          This action cannot be undone.
        </p>

        {/* Buttons (stacked vertically) */}
        <div className="mt-8 flex flex-col gap-3">
          <Button
            className="w-full px-4 py-3 bg-[#266DDF] text-white rounded-lg hover:bg-[#1f5bc4] transition font-medium text-sm"
            variant="primary"
            onClick={onConfirm}
            text="Yes, I Want"
          />
          <Button
            className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
            variant="outline"
            onClick={onClose}
            text="Not at the Moment"
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
