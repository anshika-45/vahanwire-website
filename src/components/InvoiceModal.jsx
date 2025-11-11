import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getAmcInvoice } from "../api/amcApi";

export default function InvoiceModal({ isOpen, onClose, invoiceId }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("ejkbcbbe",invoiceId);
  useEffect(() => {
    if (!isOpen || !invoiceId) return;

    const fetchInvoice = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getAmcInvoice(invoiceId);
        console.log("lknfwdjcnbb",res);
        if (res.success) {
          const data = res.data;
          setInvoice({
            customerName: data.user.name,
            phone: data.user.phone,
            invoiceNo: data.invoiceId,
            invoiceDate: new Date(data.createdAt).toLocaleDateString(),
            vehicle: data.vehicle.vehicleName || data.vehicle.model || "-",
            year: data.vehicle.year || "-",
            brand: data.vehicle.brand,
            model: data.vehicle.model,
            vehicleType: data.vehicle.vehicleType,
            vehicleNumber: data.vehicle.vehicleNumber || "-",
            amcPlanType: data.plan.name,
            status: data.payment.paymentStatus,
            payment: data.payment.paymentId,
            serviceCharge: data.plan.price || 0,
            gst: Math.round((data.plan.price || 0) * 0.18),
            total: Math.round((data.plan.price || 0) * 1.18),
          });
        } else {
          setError("Failed to fetch invoice");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [isOpen, invoiceId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center p-3 sm:p-4" aria-modal="true" role="dialog">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#D9E7FE] border-b border-slate-200">
          <h2 className="text-sm sm:text-base font-semibold text-slate-800 mx-auto">Invoice Details</h2>
          <button onClick={onClose} aria-label="Close" className="absolute right-4 text-slate-600 hover:text-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3 text-sm text-slate-800">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {invoice && (
            <>
              <Section title="Bill To">
                <Item label="Name" value={invoice.customerName} />
                <Item label="Phone" value={invoice.phone} />
              </Section>

              <Section title="Invoice Info">
                <Item label="Invoice No." value={invoice.invoiceNo} />
                <Item label="Invoice Date" value={invoice.invoiceDate} />
              </Section>

              <Section title="Vehicle">
               <Item label="Vehicle Brand" value={invoice.brand} />
               <Item label="Vehicle Model" value={invoice.model} />
               <Item label="Vehicle Type" value={invoice.vehicleType} />
                <Item label="Vehicle Number" value={invoice.vehicleNumber} />
              </Section>

              <Section title="Service Details">
                <Item label="AMC Plan Type" value={invoice.amcPlanType || "-"} />
                <Item label="Status" value={invoice.status} />
                <Item label="Payment" value={invoice.payment} />
              </Section>

              <Section title="Charges">
                <Item label="Service Charge" value={`₹${invoice.serviceCharge}`} />
                <Item label="GST" value={`₹${invoice.gst}`} />
              </Section>
            </>
          )}
        </div>

        {invoice && (
          <div className="px-5 pb-4">
            <div className="w-full rounded-xl bg-[#266DDF] px-4 py-3 text-white">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Total Amount</span>
                <span className="text-base font-bold">₹{invoice.total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-[#FAFAFA] p-3 space-y-2">
      <h3 className="text-[11px] sm:text-xs font-semibold uppercase text-slate-600 tracking-wide">{title}</h3>
      {children}
    </section>
  );
}

function Item({ label, value }) {
  return (
    <div className="flex justify-between text-xs sm:text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

