// in any page
import React, { useState } from "react";
import InvoiceModal from "./components/InvoiceModal";

export default function DemoPage() {
  const [open, setOpen] = useState(false);

  const invoice = {
    customerName: "Ashu Sharma",
    location: "Ghaziabad",
    phone: "6396422252",
    invoiceNo: "INV-B3BD4EEF",
    invoiceDate: "2025-11-10",
    vehicle: "Hyundai Verna",
    year: "2022",
    vehicleNumber: "UP13AS2258",
    problem: "JumpStart",
    status: "Completed",
    payment: "Paid",
    serviceCharge: 150,
    gst: 27,
    total: 177,
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[#266DDF] px-4 py-2 text-white hover:bg-blue-700
        focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-[#266DDF]"
      >
        Open Invoice
      </button>

      <InvoiceModal isOpen={open} onClose={() => setOpen(false)} invoice={invoice} />
    </div>
  );
}
