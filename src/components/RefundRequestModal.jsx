import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function RefundRequestModal({
  open,
  onClose,
  onSubmit, // (payload) => void
}) {
  const [reason, setReason] = useState("");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    setTimeout(
      () => dialogRef.current?.querySelector("button,textarea")?.focus(),
      20
    );
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const choices = [
    "Accidental Purchase",
    "Service Not Utilized",
    "Unsatisfactory Experience",
  ];

  const validate = () => {
    // If no reason selected, description is mandatory
    if (selected === null && !reason.trim()) {
      setError("Please select a reason or provide a description");
      return false;
    }
    // If reason is selected, description is optional
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.({
      selectedReason: selected != null ? choices[selected] : null,
      description: reason.trim() || null,
    });
  };

  const Pill = ({ idx, label }) => {
    const active = selected === idx;
    return (
      <button
        type="button"
        onClick={() => setSelected(active ? null : idx)}
        className={[
          "w-full rounded-xl px-4 py-3 text-center text-[14px] font-medium transition",
          "border",
          active
            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
        ].join(" ")}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="refund-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Dialog */}
      <form
        ref={dialogRef}
        onSubmit={handleSubmit}
        className="
          relative w-[92%] max-w-[440px]
          rounded-2xl bg-white shadow-xl
          p-5 sm:p-6
          animate-[fadeIn_.18s_ease-out]
        "
        style={{ borderRadius: 18 }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2
          id="refund-title"
          className="mb-4 mt-1 w-full text-center text-[18px] font-semibold text-gray-900"
        >
          Request Refund for Your AMC Plan
        </h2>

        {/* Reason pills */}
        <div className="space-y-3">
          {choices.map((c, i) => (
            <Pill key={c} idx={i} label={c} />
          ))}
        </div>

        {/* Divider with OR */}
        <div className="my-5 flex items-center">
          <div className="h-px w-full bg-gray-200" />
          <span className="px-3 text-[14px] font-semibold text-gray-500">
            OR
          </span>
          <div className="h-px w-full bg-gray-200" />
        </div>

        {/* Textarea */}
        <label
          htmlFor="reason"
          className="mb-2 block text-[12px] font-medium text-gray-600"
        >
          Explain Your Reason
          {selected !== null && (
            <span className="ml-1 text-[11px] font-normal text-gray-400">
              (Optional)
            </span>
          )}
          {selected === null && (
            <span className="ml-1 text-[11px] font-normal text-red-500">
              (Required)
            </span>
          )}
        </label>
        <textarea
          id="reason"
          rows={5}
          placeholder="Type your review here..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={`w-full resize-none rounded-xl border px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-100"
              : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

        {/* Actions */}
        <div className="mt-5 space-y-3">
          <button
            type="submit"
            className="
              w-full rounded-xl bg-blue-600 px-4 py-3 text-[15px] font-semibold
              text-white shadow-sm transition hover:bg-blue-700 active:translate-y-[0.5px]
            "
          >
            Submit Request Refund
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
      </form>

      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(6px) } 
          to { opacity: 1; transform: translateY(0) } 
        }
      `}</style>
    </div>
  );
}
