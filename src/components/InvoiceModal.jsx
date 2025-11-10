// components/InvoiceModal.jsx
import React from "react";
import { X } from "lucide-react";

export default function InvoiceModal({ isOpen, onClose, invoice }) {
  if (!isOpen) return null;
  if (!invoice) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card (mobile-first width) */}
      <div className="relative mx-4 w-full max-w-[420px] rounded-2xl bg-white shadow-xl">
        {/* Top bar with close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10 hover:bg-black/20"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="px-5 pt-6 pb-3">
          <h2 className="text-center text-xl font-semibold text-[#222]">
            Invoice
          </h2>
        </div>

        {/* Body */}
        <div className="px-5 pb-5">
          {/* Bill To */}
          <section className="rounded-xl border border-[#EEE] bg-[#FAFAFA] p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#666]">
              Bill To
            </h3>
            <div className="text-sm text-[#222]">{invoice.customerName}</div>
            <div className="text-xs text-[#666]">{invoice.location}</div>
            <div className="text-xs text-[#666]">{invoice.phone}</div>
          </section>

          {/* Invoice / Vehicle details */}
          <section className="mt-4 space-y-2 rounded-xl border border-[#EEE] bg-[#FAFAFA] p-4">
            <Row label="Invoice No." value={invoice.invoiceNo} />
            <Row label="Invoice Date" value={invoice.invoiceDate} />
            <Row label="Vehicle" value={`${invoice.vehicle} (${invoice.year})`} />
            <Row label="Vehicle Number" value={invoice.vehicleNumber} />
          </section>

          {/* Service Details */}
          <section className="mt-4 space-y-2 rounded-xl border border-[#EEE] bg-[#FAFAFA] p-4">
            <h3 className="mb-1 text-sm font-semibold text-[#222]">Service Details</h3>
            <Row label="Problems" value={invoice.problem} />
            <Row label="Status" value={invoice.status} />
            <Row label="Payment" value={invoice.payment} />
          </section>

          {/* Charges */}
          <section className="mt-4 rounded-xl border border-[#EEE] bg-[#FAFAFA] p-4">
            <Row label="Service Charge" value={`₹${invoice.serviceCharge}`} />
            <Row label="GST" value={`₹${invoice.gst}`} />
          </section>
        </div>

        {/* Footer total bar */}
        <div className="flex items-center justify-between rounded-b-2xl bg-white px-5 pb-5">
          <div className="w-full rounded-xl bg-[#111] px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Total Amount</span>
              <span className="text-base font-bold">₹{invoice.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-12 items-start gap-2 text-sm">
      <div className="col-span-5 text-[#666]">{label}</div>
      <div className="col-span-7 text-[#222]">{value}</div>
    </div>
  );
}
