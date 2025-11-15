import React, { useEffect, useRef } from "react";

export default function ConfirmCancelRefundModal({ open, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

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
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={onConfirm}
            className="
              w-full rounded-xl bg-blue-600 px-4 py-3 text-[15px] font-semibold
              text-white shadow-sm transition hover:bg-blue-700 active:translate-y-[0.5px]
            "
          >
            Yes, I Want
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              w-full rounded-xl border border-gray-300 bg-white
              px-4 py-3 text-[15px] font-semibold text-gray-700
              hover:bg-gray-50
            "
          >
            Not at the Moment
          </button>
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
