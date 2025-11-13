import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getAmcInvoice } from "../api/amcApi";

export default function InvoiceModal({ isOpen, onClose, invoiceId }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

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
            total:  data.plan.price 
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
      <div className="relative w-[95%] max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 bg-[#D9E7FE] border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xs sm:text-sm font-semibold text-slate-800 mx-auto">Invoice Details</h2>
          <button onClick={onClose} aria-label="Close" className="absolute right-3 sm:right-4 text-slate-600 hover:text-slate-800">
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-3 sm:px-5 py-3 sm:py-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-800 overflow-y-auto flex-1 hide-scrollbar">
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
              </Section>
            </>
          )}
        </div>

        {invoice && (
          <div className="px-3 sm:px-5 py-3 sm:py-4 flex-shrink-0 border-t border-slate-200">
            <div className="w-full rounded-lg sm:rounded-xl bg-[#266DDF] px-3 sm:px-4 py-2 sm:py-3 text-white">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold">Total Amount</span>
                <span className="text-sm sm:text-base font-bold">₹{invoice.total}</span>
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
     <section className="rounded-lg sm:rounded-xl border border-slate-200 bg-[#FAFAFA] p-2 sm:p-3 space-y-1 sm:space-y-2">
       <h3 className="text-[10px] sm:text-xs font-semibold uppercase text-slate-600 tracking-wide">{title}</h3>
       {children}
     </section>
   );
 }
 
 function Item({ label, value }) {
   return (
     <div className="flex justify-between text-[11px] sm:text-xs gap-2">
       <span className="text-slate-600">{label}</span>
       <span className="font-medium text-slate-800 text-right truncate">{value}</span>
     </div>
   );
 }

