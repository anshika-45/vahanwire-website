import React, { useState, useEffect } from "react";
import { Eye, Edit } from "lucide-react";
import ServiceCovrageDetails from "./ServiceCovrageDetails";
import MyAMCCard from "./MyAMCCard";
import ConfirmCancelRefundModal from "./ConfirmCancelRefundModal";
import InvoiceModal from "./InvoiceModal";
import EditVehicleModal from "./EditVehicleModal";
import RefundRequestModal from "./RefundRequestModal";
import { useAmcData } from "../context/AmcDataContext";

const initialAMCs = [
  {
    id: 1,
    plan: "Premium Care",
    vehicle: "DL7SDSS556",
    validity: "12 Months",
    orderId: "224455",
    description:
      "Reliable coverage, great value. The Gold Plan gives you a powerful combo of must-have car services like puncture repairs, car washes, towing, lock-in assistance, AC support, breakdown handling, vehicle health checks, and fuel top-up (up to 5 liters). On top of that, get a 20% discount on general services and a 10% discount on insurance – ideal for smart drivers who want dependable support, anytime",
    status: "Active",
    statusBadge: "Active AMC",
    bgColor: "bg-gradient-to-br from-[#8F6521] to-[#A3762D]",
    vehicleInfo: "DL 16 CD 1996",
    expiryWarning:
      "This edit expires in 24 hours. Service usage won't reflect afterward.",
    logoSrc: "/src/assets/Logo1.webp",
    carImageSrc: "/src/assets/carAMC.webp",
  },
  {
    id: 2,
    plan: "Standard Care",
    vehicle: "DL7SDSS556",
    validity: "12 Months",
    orderId: "224455",
    description:
      "Affordable protection for everyday drivers. The Silver Plan includes essential car services like puncture support, quick car washes, key lock-in help, basic car checkups, and fuel delivery (up to 5 liters). Plus, you get a 20% discount on any additional general service and a 10% discount on car insurance.",
    status: "Active",
    statusBadge: "Active AMC",
    bgColor: "bg-gradient-to-br from-[#252525] to-[#404040]",
    vehicleInfo: "DL 7S BS 5556",
    logoSrc: "/src/assets/Logo1.webp",
    carImageSrc: "/src/assets/carAMC.webp",
  },
  {
    id: 3,
    plan: "Basic Care",
    vehicle: "UP15MD5556",
    validity: "12 Months",
    orderId: "224455",
    description:
      "Premium care for your premium car. The Platinum Plan is your all-in-one solution for complete peace of mind on the road. It covers everything from puncture repairs and car washes to towing, key lock-in assistance, breakdown support, AC heating/cooling help, car health checks, and fuel delivery (up to 5 liters).",
    status: "Pending",
    statusBadge: "Refund Request Status : Pending",
    bgColor: "bg-gradient-to-br from-[#3A5353] to-[#4E7777]",
    vehicleInfo: "UP 16 DS 8585",
    refundApplied: true,
    refundRequestDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    refundFinalStatus: null, // Will be "Approved" or "Rejected"
    logoSrc: "/src/assets/Logo1.webp",
    carImageSrc: "/src/assets/carAMC.webp",
  },
];

export default function MyAMCPage() {
  const { purchasedCards } = useAmcData();
  const [activeTab, setActiveTab] = useState("All");
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const [selectedAMC, setSelectedAMC] = useState(null);
  const [showCancel, setShowCancel] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedRefundAMC, setSelectedRefundAMC] = useState(null);
  const [selectedCancelAMC, setSelectedCancelAMC] = useState(null);
  const [amcData, setAmcData] = useState([...initialAMCs, ...purchasedCards]);
  const [expiryTimestamps, setExpiryTimestamps] = useState({});

  const tabs = ["All", "Active", "Pending", "Rejected"];
  const filtered = amcData.filter((a) =>
    activeTab === "All" ? true : a.status === activeTab
  );

  // Update amcData when purchasedCards changes
  useEffect(() => {
    setAmcData([...initialAMCs, ...purchasedCards]);
  }, [purchasedCards]);

  // Check if refund request should be auto-finalized after 5-7 days
  useEffect(() => {
    const checkRefundStatus = () => {
      const updated = amcData.map((amc) => {
        // Only process pending refunds
        if (amc.status === "Pending" && amc.refundRequestDate && !amc.refundFinalStatus) {
          const requestDate = new Date(amc.refundRequestDate);
          const now = new Date();
          const daysElapsed = (now - requestDate) / (1000 * 60 * 60 * 24);

          // After 5-7 days, auto-finalize the refund (randomly Approved or Rejected for demo)
          if (daysElapsed >= 5) {
            const finalStatus = Math.random() > 0.5 ? "Approved" : "Rejected";
            return {
              ...amc,
              status: finalStatus,
              statusBadge: `Refund Request Status : ${finalStatus}`,
              refundFinalStatus: finalStatus,
              refundApplied: false,
            };
          }
        }
        return amc;
      });

      // Only update if something changed
      if (JSON.stringify(updated) !== JSON.stringify(amcData)) {
        setAmcData(updated);
      }
    };

    // Check immediately on mount
    checkRefundStatus();

    // Check every minute
    const interval = setInterval(checkRefundStatus, 60000);
    return () => clearInterval(interval);
  }, [amcData]);

  // Check and remove expired warning messages
  useEffect(() => {
    const now = Date.now();
    const hasExpired = Object.values(expiryTimestamps).some(timestamp => now >= timestamp);
    
    if (hasExpired) {
      const nextExpiry = Math.min(...Object.values(expiryTimestamps).filter(ts => ts > now));
      const timeUntilNext = nextExpiry - now;
      
      const timeout = setTimeout(() => {
        // Force re-render
        setExpiryTimestamps({...expiryTimestamps});
      }, timeUntilNext);
      
      return () => clearTimeout(timeout);
    }
  }, [expiryTimestamps]);

  function handleViewCoverage(item) {
    const planData = {
      name: item.plan,
      description: item.description,
      service: "Unlimited",
      validity: item.validity,
      startAfter: "48 Hours",
      services: [
        { name: "Flat Tyre (Tube)", available: true },
        { name: "Flat Tyre (Tubeless)", available: true },
        { name: "Battery Jumpstart", available: true },
        { name: "Custody Service", available: true },
        { name: "Key Unlock Assistance", available: true },
        { name: "Fuel Delivery", available: true },
        { name: "Starting Problem", available: true },
      ],
    };
    setSelectedAMC(planData);
    setShowCoverageModal(true);
  }

  function handleDownloadInvoice(item) {
    const invoice = {
      customerName: "Ashu Sharma",
      location: "Ghaziabad",
      phone: "6396422252",
      invoiceNo: `INV-${item.orderId}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      vehicle: item.vehicle,
      year: "2022",
      vehicleNumber: item.vehicleInfo,
      problem: item.plan,
      status: item.status,
      payment: "Paid",
      serviceCharge: 150,
      gst: 27,
      total: 177,
    };
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  }

  function handleEditVehicle(item) {
    setSelectedVehicle({
      id: item.id,
      vehicleNumber: item.vehicleInfo,
      brand: item.vehicle,
      model: item.plan,
      year: "2020",
      fuelType: "Petrol",
    });
    setShowEditModal(true);
  }

  function handleRequestRefund(item) {
    setSelectedRefundAMC({
      plan: item.plan,
      orderId: item.orderId,
      vehicle: item.vehicle,
      validity: item.validity,
      price: "₹5,999",
      id: item.id,
    });
    setShowRefundModal(true);
  }

  function handleEditSubmit() {
    setShowEditModal(false);
  }

  function handleRefundSubmit(payload) {
    console.log("Refund request submitted:", payload);

    // Update AMC data - change status to Pending and mark refund as applied
    const updatedAmcData = amcData.map((amc) => {
      if (amc.id === selectedRefundAMC?.id) {
        return {
          ...amc,
          status: "Pending",
          statusBadge: "Refund Request Status : Pending",
          refundApplied: true,
          refundRequestDate: new Date().toISOString(),
          refundFinalStatus: null,
        };
      }
      return amc;
    });

    // Set 24-hour expiry timestamp for the warning
    setExpiryTimestamps({
      ...expiryTimestamps,
      [selectedRefundAMC?.id]: Date.now() + (24 * 60 * 60 * 1000),
    });

    setAmcData(updatedAmcData);
    setShowRefundModal(false);
  }

  function handleCancelRefund() {
    console.log("Cancel refund request:", selectedCancelAMC?.id);

    // Update AMC data - change status back to Active and remove refund request
    const updatedAmcData = amcData.map((amc) => {
      if (amc.id === selectedCancelAMC?.id) {
        return {
          ...amc,
          status: "Active",
          statusBadge: "Active AMC",
          refundApplied: false,
        };
      }
      return amc;
    });

    setAmcData(updatedAmcData);
    setShowCancel(false);
    setSelectedCancelAMC(null);
  }

  return (
    <>
      <div className="w-full">
        <div className="space-y-2 md:space-y-3 bg-[#F4F4F4] p-3 md:p-4 rounded-xl">
          {/* Tabs */}
          <div className="rounded-xl p-2 md:p-3 m-2 md:m-3 mt-0 overflow-x-auto">
            <nav className="flex gap-1 md:gap-8 border-b border-[#D9D9D9] min-w-max md:min-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 md:pb-3 text-xs md:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-[#266DDF] text-[#266DDF]"
                      : "text-[#5C5C5C] hover:text-[#266DDF]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 md:gap-4 bg-white rounded-xl p-3 md:p-6"
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <MyAMCCard
                  plan={item.plan}
                  validity={item.validity}
                  bgColor={item.bgColor}
                  logoSrc={item.logoSrc}
                  carImageSrc={item.carImageSrc}
                  onDownloadInvoice={() => handleDownloadInvoice(item)}
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0 md:items-start mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">
                        {item.plan}
                      </h3>
                      <span
                        className={`px-3 md:px-6 py-2 md:py-3 rounded-full text-xs font-medium whitespace-nowrap ${
                        item.status === "Active"
                        ? "bg-[#E0F2DC] text-[#32AB15]"
                        : item.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : item.status === "Approved"
                            ? "bg-[#E0F2DC] text-[#32AB15]"
                              : "bg-[#FEEAB0] text-[#6C6F73]"
                        }`}
                        >
                         {item.statusBadge}
                       </span>
                    </div>

                    <p className="text-[#1C1C28] text-xs mb-2">
                      {item.status === "Active"
                        ? "Your AMC is active. You can raise service requests."
                        : item.status === "Approved"
                        ? "Your refund has been approved. Amount will be credited within 5-7 business days."
                        : item.status === "Rejected"
                        ? "Your refund request has been rejected. Please contact support for more details."
                        : "After Purchasing AMC you have applied refund request"}
                    </p>

                    <p className="text-[#1C1C28] text-xs mb-2 leading-normal line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mb-2">
                      <span className="text-xs md:text-sm font-semibold text-gray-900">
                        Order ID:{" "}
                      </span>
                      <span className="text-xs md:text-sm text-[#000000] font-bold">
                        {item.orderId}
                      </span>
                    </div>

                    {item.expiryWarning && item.status === "Active" && expiryTimestamps[item.id] && Date.now() < expiryTimestamps[item.id] && (
                    <span className="text-[#FF3B30] inline-block bg-red-50 px-2 md:px-3 py-1 rounded-lg text-xs">
                    {item.expiryWarning}
                    </span>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-3 mt-2 flex-wrap">
                    <button
                      onClick={() => handleViewCoverage(item)}
                      className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
                    >
                      <Eye size={16} className="md:w-[18px] md:h-[18px]" />
                      View Coverage
                    </button>

                    {item.status === "Active" && (
                      <>
                        <button
                          onClick={() => handleEditVehicle(item)}
                          className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
                        >
                          <Edit size={16} className="md:w-[18px] md:h-[18px]" />
                          Edit Vehicle
                        </button>
                        <button
                          onClick={() => handleRequestRefund(item)}
                          className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#266DDF] transition font-medium text-xs md:text-sm whitespace-nowrap"
                        >
                          Request Refund
                        </button>
                      </>
                    )}

                    {item.refundApplied && (
                    <button
                    className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#266DDF] transition font-medium text-xs md:text-sm whitespace-nowrap"
                    onClick={() => {
                        setSelectedCancelAMC(item);
                      setShowCancel(true);
                      }}
                      >
                         Cancel Refund
                       </button>
                     )}
                  </div>
                </div>
              </div>

              {item.status === "Pending" && (
              <div className="mt-3 md:mt-4 border-t border-gray-300 pt-4 md:pt-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-1 md:mb-2">
              Refund Request Status
              </h3>
              <p className="text-center text-red-600 font-medium mb-2 text-xs md:text-sm">
              It will take 5 to 7 Working Days
              </p>
                   {item.refundRequestDate && (
                     <p className="text-center text-gray-500 text-[11px] md:text-xs mb-4 md:mb-8">
                       Request submitted: {new Date(item.refundRequestDate).toLocaleDateString()} 
                       {" • "} 
                       Days elapsed: {Math.floor((new Date() - new Date(item.refundRequestDate)) / (1000 * 60 * 60 * 24))}
                     </p>
                   )}

                  <div className="flex items-center justify-center max-w-4xl mx-auto overflow-x-auto">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-6 md:w-7 h-6 md:h-7 rounded-full bg-green-600 flex items-center justify-center mb-2 md:mb-3">
                        <svg
                          className="w-4 md:w-5 h-4 md:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="font-semibold text-xs md:text-sm text-[#1C1C28] text-center">
                        Refund Submitted
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        05 Jul 2024, 12:20 AM
                      </p>
                    </div>

                    <div className="w-16 md:w-32 h-px bg-gray-300 -mt-12 md:-mt-16 flex-shrink-0" />

                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-6 md:w-7 h-6 md:h-7 rounded-full border-[3px] border-green-600 bg-white flex items-center justify-center mb-2 md:mb-3">
                        <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-green-600" />
                      </div>
                      <p className="font-semibold text-xs md:text-sm text-[#1C1C28] text-center">
                        Under Process
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        06 Jul 2024, 12:30 AM
                      </p>
                    </div>

                    <div className="w-16 md:w-40 h-px bg-gray-300 -mt-12 md:-mt-16 flex-shrink-0" />

                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-6 md:w-7 h-6 md:h-7 rounded-full border-[3px] border-gray-300 bg-white flex items-center justify-center mb-2 md:mb-3" />
                      <p className="font-semibold text-xs md:text-sm text-gray-400 text-center">
                        Accept/Reject
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coverage modal */}
        {showCoverageModal && selectedAMC && (
          <ServiceCovrageDetails
            isOpen={showCoverageModal}
            onClose={() => setShowCoverageModal(false)}
            plan={selectedAMC}
          />
        )}
      </div>

      {/* Cancel confirmation modal */}
      <ConfirmCancelRefundModal
        open={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={handleCancelRefund}
      />

      {/* Invoice Modal */}
      {showInvoiceModal && selectedInvoice && (
        <InvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          invoice={selectedInvoice}
        />
      )}

      {/* Edit Vehicle Modal */}
      <EditVehicleModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        initial={selectedVehicle}
        onSubmit={handleEditSubmit}
      />

      {/* Refund Request Modal */}
      <RefundRequestModal
        open={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        amcData={selectedRefundAMC}
        onSubmit={handleRefundSubmit}
      />
    </>
  );
}
