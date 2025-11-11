import React, { useState, useEffect } from "react";
import { Eye, Edit } from "lucide-react";
import ServiceCovrageDetails from "./ServiceCovrageDetails";
import MyAMCCard from "./MyAMCCard";
import ConfirmCancelRefundModal from "./ConfirmCancelRefundModal";
import InvoiceModal from "./InvoiceModal";
import EditVehicleModal from "./EditVehicleModal";
import RefundRequestModal from "./RefundRequestModal";
import { useAmcData } from "../context/AmcDataContext";
import { getMyAMCPlans } from "../api/amcApi";

const mapApiDataToAMC = (apiData) => {
  const bgColors = {
    "Premium Care": "bg-gradient-to-br from-[#8F6521] to-[#A3762D]",
    "Standard Care": "bg-gradient-to-br from-[#252525] to-[#404040]",
    "Basic Care": "bg-gradient-to-br from-[#3A5353] to-[#4E7777]",
  };

  const statusMap = {
    active: "Active",
    cancelled: "Rejected",
    pending: "Pending",
  };

  return apiData.map((item) => {
    const status = statusMap[item.planStatus] || "Active";
    const isRefundApplied = item.planStatus === "cancelled";
    
    return {
      id: item._id,
      plan: item.planName,
      vehicle: item.vehicleType.toUpperCase(),
      validity: `${item.planDuration} Months`,
      orderId: item.purchaseId,
      description: item.planFeatures.join(", "),
      status: status,
      statusBadge: isRefundApplied 
        ? `Refund Request Status : ${status}`
        : status === "Active" 
        ? "Active AMC" 
        : `Refund Request Status : ${status}`,
      bgColor: bgColors[item.planName] || "bg-gradient-to-br from-[#252525] to-[#404040]",
      vehicleInfo: item.vehicleType.toUpperCase(),
      refundApplied: isRefundApplied,
      refundRequestDate: isRefundApplied ? item.updatedAt : null,
      refundFinalStatus: item.planStatus === "cancelled" ? "Rejected" : null,
      logoSrc: "/src/assets/Logo1.webp",
      carImageSrc: "/src/assets/carAMC.webp",
      planPrice: item.planPrice,
      planStartDate: item.planStartDate,
      planEndDate: item.planEndDate,
      paymentId: item.paymentId,
    };
  });
};

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
  const [amcData, setAmcData] = useState([]);
  const [expiryTimestamps, setExpiryTimestamps] = useState({});
  const [loading, setLoading] = useState(true);

  const tabs = ["All", "Active", "Pending", "Rejected"];
  const filtered = amcData.filter((a) =>
    activeTab === "All" ? true : a.status === activeTab
  );

  useEffect(() => {
    const fetchAMCPlans = async () => {
      try {
        setLoading(true);
        const response = await getMyAMCPlans();
        if (response.success && response.data) {
          const mappedData = mapApiDataToAMC(response.data);
          setAmcData([...mappedData, ...purchasedCards]);
        }
      } catch (error) {
        console.error("Error fetching AMC plans:", error);
        setAmcData([...purchasedCards]);
      } finally {
        setLoading(false);
      }
    };

    fetchAMCPlans();
  }, []);

  useEffect(() => {
    if (!loading) {
      setAmcData((prev) => {
        const apiData = prev.filter(item => !purchasedCards.find(pc => pc.id === item.id));
        return [...apiData, ...purchasedCards];
      });
    }
  }, [purchasedCards]);

  useEffect(() => {
    const checkRefundStatus = () => {
      const updated = amcData.map((amc) => {
        if (amc.status === "Pending" && amc.refundRequestDate && !amc.refundFinalStatus) {
          const requestDate = new Date(amc.refundRequestDate);
          const now = new Date();
          const daysElapsed = (now - requestDate) / (1000 * 60 * 60 * 24);

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

      if (JSON.stringify(updated) !== JSON.stringify(amcData)) {
        setAmcData(updated);
      }
    };

    checkRefundStatus();
    const interval = setInterval(checkRefundStatus, 60000);
    return () => clearInterval(interval);
  }, [amcData]);

  useEffect(() => {
    const now = Date.now();
    const hasExpired = Object.values(expiryTimestamps).some(timestamp => now >= timestamp);
    
    if (hasExpired) {
      const nextExpiry = Math.min(...Object.values(expiryTimestamps).filter(ts => ts > now));
      const timeUntilNext = nextExpiry - now;
      
      const timeout = setTimeout(() => {
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
      serviceCharge: item.planPrice || 150,
      gst: Math.round((item.planPrice || 150) * 0.18),
      total: Math.round((item.planPrice || 150) * 1.18),
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
      price: `₹${item.planPrice || 5999}`,
      id: item.id,
    });
    setShowRefundModal(true);
  }

  function handleEditSubmit() {
    setShowEditModal(false);
  }

  function handleRefundSubmit(payload) {
    console.log("Refund request submitted:", payload);

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

    setExpiryTimestamps({
      ...expiryTimestamps,
      [selectedRefundAMC?.id]: Date.now() + (24 * 60 * 60 * 1000),
    });

    setAmcData(updatedAmcData);
    setShowRefundModal(false);
  }

  function handleCancelRefund() {
    console.log("Cancel refund request:", selectedCancelAMC?.id);

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

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#266DDF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AMC plans...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="space-y-2 md:space-y-3 bg-[#F4F4F4] p-3 md:p-4 rounded-xl">
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

          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No AMC plans found</p>
            </div>
          ) : (
            filtered.map((item) => (
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
            ))
          )}
        </div>

        {showCoverageModal && selectedAMC && (
          <ServiceCovrageDetails
            isOpen={showCoverageModal}
            onClose={() => setShowCoverageModal(false)}
            plan={selectedAMC}
          />
        )}
      </div>

      <ConfirmCancelRefundModal
        open={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={handleCancelRefund}
      />

      {showInvoiceModal && selectedInvoice && (
        <InvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          invoice={selectedInvoice}
        />
      )}

      <EditVehicleModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        initial={selectedVehicle}
        onSubmit={handleEditSubmit}
      />

      <RefundRequestModal
        open={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        amcData={selectedRefundAMC}
        onSubmit={handleRefundSubmit}
      />
    </>
  );
}


// import React, { useState, useEffect, useRef } from "react";
// import { Eye, Edit } from "lucide-react";
// import ServiceCovrageDetails from "./ServiceCovrageDetails";
// import MyAMCCard from "./MyAMCCard";
// import ConfirmCancelRefundModal from "./ConfirmCancelRefundModal";
// import InvoiceModal from "./InvoiceModal";
// import EditVehicleModal from "./EditVehicleModal";
// import RefundRequestModal from "./RefundRequestModal";
// import { useAmcData } from "../context/AmcDataContext";
// import { getMyAMCPlans, getRefundRequestStatus } from "../api/amcApi";

// const mapApiDataToAMC = (apiData) => {
//   const bgColors = {
//     "Premium Care": "bg-gradient-to-br from-[#8F6521] to-[#A3762D]",
//     "Standard Care": "bg-gradient-to-br from-[#252525] to-[#404040]",
//     "Basic Care": "bg-gradient-to-br from-[#3A5353] to-[#4E7777]",
//   };

//   const statusMap = {
//     active: "Active",
//     cancelled: "Rejected",
//     pending: "Pending",
//   };

//   return apiData.map((item) => {
//     const status = statusMap[item.planStatus] || "Active";
//     const isRefundApplied = item.planStatus === "cancelled";
    
//     return {
//       id: item._id,
//       plan: item.planName,
//       vehicle: item.vehicleType.toUpperCase(),
//       validity: `${item.planDuration} Months`,
//       orderId: item.purchaseId,
//       description: item.planFeatures.join(", "),
//       status: status,
//       statusBadge: isRefundApplied 
//         ? `Refund Request Status : ${status}`
//         : status === "Active" 
//         ? "Active AMC" 
//         : `Refund Request Status : ${status}`,
//       bgColor: bgColors[item.planName] || "bg-gradient-to-br from-[#252525] to-[#404040]",
//       vehicleInfo: item.vehicleType.toUpperCase(),
//       refundApplied: isRefundApplied,
//       refundRequestDate: isRefundApplied ? item.updatedAt : null,
//       refundFinalStatus: item.planStatus === "cancelled" ? "Rejected" : null,
//       logoSrc: "/src/assets/Logo1.webp",
//       carImageSrc: "/src/assets/carAMC.webp",
//       planPrice: item.planPrice,
//       planStartDate: item.planStartDate,
//       planEndDate: item.planEndDate,
//       paymentId: item.paymentId,
//       refundRequestId: item.refundRequestId,
//     };
//   });
// };

// export default function MyAMCPage() {
//   const { purchasedCards } = useAmcData();
//   const [activeTab, setActiveTab] = useState("All");
//   const [showCoverageModal, setShowCoverageModal] = useState(false);
//   const [selectedAMC, setSelectedAMC] = useState(null);
//   const [showCancel, setShowCancel] = useState(false);
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [showRefundModal, setShowRefundModal] = useState(false);
//   const [selectedRefundAMC, setSelectedRefundAMC] = useState(null);
//   const [selectedCancelAMC, setSelectedCancelAMC] = useState(null);
//   const [amcData, setAmcData] = useState([]);
//   const [expiryTimestamps, setExpiryTimestamps] = useState({});
//   const [loading, setLoading] = useState(true);
//   const pollingIntervalsRef = useRef({});

//   const tabs = ["All", "Active", "Pending", "Rejected"];
//   const filtered = amcData.filter((a) =>
//     activeTab === "All" ? true : a.status === activeTab
//   );

//   useEffect(() => {
//     const fetchAMCPlans = async () => {
//       try {
//         setLoading(true);
//         const response = await getMyAMCPlans();
//         if (response.success && response.data) {
//           const mappedData = mapApiDataToAMC(response.data);
//           setAmcData([...mappedData, ...purchasedCards]);
//         }
//       } catch (error) {
//         console.error("Error fetching AMC plans:", error);
//         setAmcData([...purchasedCards]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAMCPlans();
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       setAmcData((prev) => {
//         const apiData = prev.filter(item => !purchasedCards.find(pc => pc.id === item.id));
//         return [...apiData, ...purchasedCards];
//       });
//     }
//   }, [purchasedCards]);

//   useEffect(() => {
//     amcData.forEach((amc) => {
//       if (amc.status === "Pending" && amc.refundRequestId && !pollingIntervalsRef.current[amc.id]) {
//         startPollingForRefundStatus(amc.id, amc.refundRequestId);
//       }
//     });

//     return () => {
//       Object.values(pollingIntervalsRef.current).forEach(clearInterval);
//       pollingIntervalsRef.current = {};
//     };
//   }, [amcData]);

//   const startPollingForRefundStatus = async (amcId, refundRequestId) => {
//     const pollRefundStatus = async () => {
//       try {
//         const response = await getRefundRequestStatus(refundRequestId);
        
//         if (response.success && response.data) {
//           const { status, timeline } = response.data;
          
//           setAmcData((prevData) =>
//             prevData.map((amc) => {
//               if (amc.id === amcId) {
//                 let newStatus = status;
//                 let statusBadge = `Refund Request Status : ${status}`;
//                 let refundApplied = true;

//                 if (status === "approved") {
//                   newStatus = "Approved";
//                   statusBadge = "Refund Request Status : Approved";
//                   if (pollingIntervalsRef.current[amcId]) {
//                     clearInterval(pollingIntervalsRef.current[amcId]);
//                     delete pollingIntervalsRef.current[amcId];
//                   }
//                 } else if (status === "rejected") {
//                   newStatus = "Rejected";
//                   statusBadge = "Refund Request Status : Rejected";
//                   if (pollingIntervalsRef.current[amcId]) {
//                     clearInterval(pollingIntervalsRef.current[amcId]);
//                     delete pollingIntervalsRef.current[amcId];
//                   }
//                 } else if (status === "under_process") {
//                   newStatus = "Pending";
//                   statusBadge = "Refund Request Status : Pending";
//                 }

//                 return {
//                   ...amc,
//                   status: newStatus,
//                   statusBadge,
//                   refundApplied,
//                   refundTimeline: timeline,
//                 };
//               }
//               return amc;
//             })
//           );
//         }
//       } catch (error) {
//         console.error("Error polling refund status:", error);
//       }
//     };

//     await pollRefundStatus();
    
//     const intervalId = setInterval(pollRefundStatus, 10000);
//     pollingIntervalsRef.current[amcId] = intervalId;
//   };

//   useEffect(() => {
//     const now = Date.now();
//     const hasExpired = Object.values(expiryTimestamps).some(timestamp => now >= timestamp);
    
//     if (hasExpired) {
//       const nextExpiry = Math.min(...Object.values(expiryTimestamps).filter(ts => ts > now));
//       const timeUntilNext = nextExpiry - now;
      
//       const timeout = setTimeout(() => {
//         setExpiryTimestamps({...expiryTimestamps});
//       }, timeUntilNext);
      
//       return () => clearTimeout(timeout);
//     }
//   }, [expiryTimestamps]);

//   function handleViewCoverage(item) {
//     const planData = {
//       name: item.plan,
//       description: item.description,
//       service: "Unlimited",
//       validity: item.validity,
//       startAfter: "48 Hours",
//       services: [
//         { name: "Flat Tyre (Tube)", available: true },
//         { name: "Flat Tyre (Tubeless)", available: true },
//         { name: "Battery Jumpstart", available: true },
//         { name: "Custody Service", available: true },
//         { name: "Key Unlock Assistance", available: true },
//         { name: "Fuel Delivery", available: true },
//         { name: "Starting Problem", available: true },
//       ],
//     };
//     setSelectedAMC(planData);
//     setShowCoverageModal(true);
//   }

//   function handleDownloadInvoice(item) {
//     const invoice = {
//       customerName: "Ashu Sharma",
//       location: "Ghaziabad",
//       phone: "6396422252",
//       invoiceNo: `INV-${item.orderId}`,
//       invoiceDate: new Date().toISOString().split("T")[0],
//       vehicle: item.vehicle,
//       year: "2022",
//       vehicleNumber: item.vehicleInfo,
//       problem: item.plan,
//       status: item.status,
//       payment: "Paid",
//       serviceCharge: item.planPrice || 150,
//       gst: Math.round((item.planPrice || 150) * 0.18),
//       total: Math.round((item.planPrice || 150) * 1.18),
//     };
//     setSelectedInvoice(invoice);
//     setShowInvoiceModal(true);
//   }

//   function handleEditVehicle(item) {
//     setSelectedVehicle({
//       id: item.id,
//       vehicleNumber: item.vehicleInfo,
//       brand: item.vehicle,
//       model: item.plan,
//       year: "2020",
//       fuelType: "Petrol",
//     });
//     setShowEditModal(true);
//   }

//   function handleRequestRefund(item) {
//     setSelectedRefundAMC({
//       plan: item.plan,
//       orderId: item.orderId,
//       vehicle: item.vehicle,
//       validity: item.validity,
//       price: `₹${item.planPrice || 5999}`,
//       id: item.id,
//     });
//     setShowRefundModal(true);
//   }

//   function handleEditSubmit() {
//     setShowEditModal(false);
//   }

//   function handleRefundSubmit(refundData) {
//     const { amcPurchaseId, refundRequestId } = refundData;

//     const updatedAmcData = amcData.map((amc) => {
//       if (amc.id === amcPurchaseId) {
//         return {
//           ...amc,
//           status: "Pending",
//           statusBadge: "Refund Request Status : Pending",
//           refundApplied: true,
//           refundRequestDate: new Date().toISOString(),
//           refundFinalStatus: null,
//           refundRequestId: refundRequestId,
//         };
//       }
//       return amc;
//     });

//     setExpiryTimestamps({
//       ...expiryTimestamps,
//       [amcPurchaseId]: Date.now() + (24 * 60 * 60 * 1000),
//     });

//     setAmcData(updatedAmcData);
//     setShowRefundModal(false);

//     if (refundRequestId) {
//       startPollingForRefundStatus(amcPurchaseId, refundRequestId);
//     }
//   }

//   function handleCancelRefund() {
//     const updatedAmcData = amcData.map((amc) => {
//       if (amc.id === selectedCancelAMC?.id) {
//         if (pollingIntervalsRef.current[amc.id]) {
//           clearInterval(pollingIntervalsRef.current[amc.id]);
//           delete pollingIntervalsRef.current[amc.id];
//         }
        
//         return {
//           ...amc,
//           status: "Active",
//           statusBadge: "Active AMC",
//           refundApplied: false,
//         };
//       }
//       return amc;
//     });

//     setAmcData(updatedAmcData);
//     setShowCancel(false);
//     setSelectedCancelAMC(null);
//   }

//   const getRefundStatusDisplay = (item) => {
//     if (!item.refundTimeline || item.refundTimeline.length === 0) {
//       return {
//         submitted: { completed: true, date: new Date(item.refundRequestDate) },
//         underProcess: { completed: false },
//         acceptReject: { completed: false },
//       };
//     }

//     const timeline = item.refundTimeline;
//     const submitted = timeline.find(t => t.status === "submitted");
//     const underProcess = timeline.find(t => t.status === "under_process");
//     const final = timeline.find(t => t.status === "approved" || t.status === "rejected");

//     return {
//       submitted: {
//         completed: !!submitted,
//         date: submitted ? new Date(submitted.timestamp) : null,
//       },
//       underProcess: {
//         completed: !!underProcess,
//         date: underProcess ? new Date(underProcess.timestamp) : null,
//       },
//       acceptReject: {
//         completed: !!final,
//         status: final?.status,
//         date: final ? new Date(final.timestamp) : null,
//       },
//     };
//   };

//   if (loading) {
//     return (
//       <div className="w-full flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#266DDF] mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading AMC plans...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="w-full">
//         <div className="space-y-2 md:space-y-3 bg-[#F4F4F4] p-3 md:p-4 rounded-xl">
//           <div className="rounded-xl p-2 md:p-3 m-2 md:m-3 mt-0 overflow-x-auto">
//             <nav className="flex gap-1 md:gap-8 border-b border-[#D9D9D9] min-w-max md:min-w-full">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`pb-2 md:pb-3 text-xs md:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
//                     activeTab === tab
//                       ? "border-b-2 border-[#266DDF] text-[#266DDF]"
//                       : "text-[#5C5C5C] hover:text-[#266DDF]"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {filtered.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No AMC plans found</p>
//             </div>
//           ) : (
//             filtered.map((item) => {
//               const statusDisplay = getRefundStatusDisplay(item);
              
//               return (
//                 <div
//                   key={item.id}
//                   className="flex flex-col gap-3 md:gap-4 bg-white rounded-xl p-3 md:p-6"
//                 >
//                   <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                     <MyAMCCard
//                       plan={item.plan}
//                       validity={item.validity}
//                       bgColor={item.bgColor}
//                       logoSrc={item.logoSrc}
//                       carImageSrc={item.carImageSrc}
//                       onDownloadInvoice={() => handleDownloadInvoice(item)}
//                     />

//                     <div className="flex-1 flex flex-col justify-between">
//                       <div>
//                         <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0 md:items-start mb-2">
//                           <h3 className="text-lg md:text-xl font-bold text-gray-900">
//                             {item.plan}
//                           </h3>
//                           <span
//                             className={`px-3 md:px-6 py-2 md:py-3 rounded-full text-xs font-medium whitespace-nowrap ${
//                             item.status === "Active"
//                             ? "bg-[#E0F2DC] text-[#32AB15]"
//                             : item.status === "Rejected"
//                             ? "bg-red-100 text-red-600"
//                             : item.status === "Approved"
//                                 ? "bg-[#E0F2DC] text-[#32AB15]"
//                                   : "bg-[#FEEAB0] text-[#6C6F73]"
//                             }`}
//                           >
//                             {item.statusBadge}
//                           </span>
//                         </div>

//                         <p className="text-[#1C1C28] text-xs mb-2">
//                           {item.status === "Active"
//                             ? "Your AMC is active. You can raise service requests."
//                             : item.status === "Approved"
//                             ? "Your refund has been approved. Amount will be credited within 5-7 business days."
//                             : item.status === "Rejected"
//                             ? "Your refund request has been rejected. Please contact support for more details."
//                             : "After Purchasing AMC you have applied refund request"}
//                         </p>

//                         <p className="text-[#1C1C28] text-xs mb-2 leading-normal line-clamp-3">
//                           {item.description}
//                         </p>

//                         <div className="mb-2">
//                           <span className="text-xs md:text-sm font-semibold text-gray-900">
//                             Order ID:{" "}
//                           </span>
//                           <span className="text-xs md:text-sm text-[#000000] font-bold">
//                             {item.orderId}
//                           </span>
//                         </div>

//                         {item.expiryWarning && item.status === "Active" && expiryTimestamps[item.id] && Date.now() < expiryTimestamps[item.id] && (
//                         <span className="text-[#FF3B30] inline-block bg-red-50 px-2 md:px-3 py-1 rounded-lg text-xs">
//                         {item.expiryWarning}
//                         </span>
//                         )}
//                       </div>

//                       <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-3 mt-2 flex-wrap">
//                         <button
//                           onClick={() => handleViewCoverage(item)}
//                           className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
//                         >
//                           <Eye size={16} className="md:w-[18px] md:h-[18px]" />
//                           View Coverage
//                         </button>

//                         {item.status === "Active" && (
//                           <>
//                             <button
//                               onClick={() => handleEditVehicle(item)}
//                               className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
//                             >
//                               <Edit size={16} className="md:w-[18px] md:h-[18px]" />
//                               Edit Vehicle
//                             </button>
//                             <button
//                               onClick={() => handleRequestRefund(item)}
//                               className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#266DDF] transition font-medium text-xs md:text-sm whitespace-nowrap"
//                             >
//                               Request Refund
//                             </button>
//                           </>
//                         )}

//                         {item.refundApplied && (
//                         <button
//                         className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#266DDF] transition font-medium text-xs md:text-sm whitespace-nowrap"
//                         onClick={() => {
//                             setSelectedCancelAMC(item);
//                           setShowCancel(true);
//                           }}
//                           >
//                             Cancel Refund
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {item.status === "Pending" && (
//                   <div className="mt-3 md:mt-4 border-t border-gray-300 pt-4 md:pt-6">
//                   <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-1 md:mb-2">
//                   Refund Request Status
//                   </h3>
//                   <p className="text-center text-red-600 font-medium mb-2 text-xs md:text-sm">
//                   It will take 5 to 7 Working Days
//                   </p>
//                       {item.refundRequestDate && (
//                         <p className="text-center text-gray-500 text-[11px] md:text-xs mb-4 md:mb-8">
//                           Request submitted: {new Date(item.refundRequestDate).toLocaleDateString()} 
//                           {" • "} 
//                           Days elapsed: {Math.floor((new Date() - new Date(item.refundRequestDate)) / (1000 * 60 * 60 * 24))}
//                         </p>
//                       )}

//                       <div className="flex items-center justify-center max-w-4xl mx-auto overflow-x-auto">
//                         <div className="flex flex-col items-center flex-shrink-0">
//                           <div className={`w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center mb-2 md:mb-3 ${
//                             statusDisplay.submitted.completed ? 'bg-green-600' : 'bg-gray-300'
//                           }`}>
//                             {statusDisplay.submitted.completed && (
//                               <svg
//                                 className="w-4 md:w-5 h-4 md:h-5 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={3}
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                             )}
//                           </div>
//                           <p className="font-semibold text-xs md:text-sm text-[#1C1C28] text-center">
//                             Refund Submitted
//                           </p>
//                           {statusDisplay.submitted.date && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               {statusDisplay.submitted.date.toLocaleString('en-US', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 hour12: true
//                               })}
//                             </p>
//                           )}
//                         </div>

//                         <div className={`w-16 md:w-32 h-px -mt-12 md:-mt-16 flex-shrink-0 ${
//                           statusDisplay.underProcess.completed ? 'bg-green-600' : 'bg-gray-300'
//                         }`} />

//                         <div className="flex flex-col items-center flex-shrink-0">
//                           <div className={`w-6 md:w-7 h-6 md:h-7 rounded-full border-[3px] flex items-center justify-center mb-2 md:mb-3 ${
//                             statusDisplay.underProcess.completed 
//                               ? 'border-green-600 bg-white' 
//                               : 'border-gray-300 bg-white'
//                           }`}>
//                             {statusDisplay.underProcess.completed && (
//                               <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-green-600" />
//                             )}
//                           </div>
//                           <p className={`font-semibold text-xs md:text-sm text-center ${
//                             statusDisplay.underProcess.completed ? 'text-[#1C1C28]' : 'text-gray-400'
//                           }`}>
//                             Under Process
//                           </p>
//                           {statusDisplay.underProcess.date && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               {statusDisplay.underProcess.date.toLocaleString('en-US', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 hour12: true
//                               })}
//                             </p>
//                           )}
//                         </div>

//                         <div className={`w-16 md:w-40 h-px -mt-12 md:-mt-16 flex-shrink-0 ${
//                           statusDisplay.acceptReject.completed ? 'bg-green-600' : 'bg-gray-300'
//                         }`} />

//                         <div className="flex flex-col items-center flex-shrink-0">
//                           <div className={`w-6 md:w-7 h-6 md:h-7 rounded-full border-[3px] flex items-center justify-center mb-2 md:mb-3 ${
//                             statusDisplay.acceptReject.completed 
//                               ? 'border-green-600 bg-white' 
//                               : 'border-gray-300 bg-white'
//                           }`}>
//                             {statusDisplay.acceptReject.completed && (
//                               <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-green-600" />
//                             )}
//                           </div>
//                           <p className={`font-semibold text-xs md:text-sm text-center ${
//                             statusDisplay.acceptReject.completed ? 'text-[#1C1C28]' : 'text-gray-400'
//                           }`}>
//                             Accept/Reject
//                           </p>
//                           {statusDisplay.acceptReject.date && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               {statusDisplay.acceptReject.date.toLocaleString('en-US', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 hour12: true
//                               })}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {showCoverageModal && selectedAMC && (
//           <ServiceCovrageDetails
//             isOpen={showCoverageModal}
//             onClose={() => setShowCoverageModal(false)}
//             plan={selectedAMC}
//           />
//         )}
//       </div>

//       <ConfirmCancelRefundModal
//         open={showCancel}
//         onClose={() => setShowCancel(false)}
//         onConfirm={handleCancelRefund}
//       />

//       {showInvoiceModal && selectedInvoice && (
//         <InvoiceModal
//           isOpen={showInvoiceModal}
//           onClose={() => setShowInvoiceModal(false)}
//           invoice={selectedInvoice}
//         />
//       )}

//       <EditVehicleModal
//         open={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         initial={selectedVehicle}
//         onSubmit={handleEditSubmit}
//       />

//       <RefundRequestModal
//         open={showRefundModal}
//         onClose={() => setShowRefundModal(false)}
//         amcData={selectedRefundAMC}
//         onSubmit={handleRefundSubmit}
//       />
//     </>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { Eye, Edit } from "lucide-react";
// import ServiceCovrageDetails from "./ServiceCovrageDetails";
// import MyAMCCard from "./MyAMCCard";
// import ConfirmCancelRefundModal from "./ConfirmCancelRefundModal";
// import InvoiceModal from "./InvoiceModal";
// import EditVehicleModal from "./EditVehicleModal";
// import RefundRequestModal from "./RefundRequestModal";
// import { useAmcData } from "../context/AmcDataContext";
// import { getMyAMCPlans, getRefundRequestStatus } from "../api/amcApi";

// const mapApiDataToAMC = (apiData) => {
//   const bgColors = {
//     "Premium Care": "bg-gradient-to-br from-[#8F6521] to-[#A3762D]",
//     "Standard Care": "bg-gradient-to-br from-[#252525] to-[#404040]",
//     "Basic Care": "bg-gradient-to-br from-[#3A5353] to-[#4E7777]",
//   };

//   const statusMap = {
//     active: "Active",
//     cancelled: "Rejected",
//     pending: "Pending",
//   };

//   return apiData.map((item) => {
//     const hasRefundRequest = item.refundStatus && item.refundStatus !== "none" && item.refundStatus !== null;
//     const status = hasRefundRequest ? "Pending" : (statusMap[item.planStatus] || "Active");
//     const isRefundApplied = hasRefundRequest || item.planStatus === "cancelled";
    
//     return {
//       id: item._id,
//       plan: item.planName,
//       vehicle: item.vehicleType.toUpperCase(),
//       validity: `${item.planDuration} Months`,
//       orderId: item.purchaseId,
//       description: item.planFeatures.join(", "),
//       status: status,
//       statusBadge: isRefundApplied 
//         ? `Refund Request Status : ${status}`
//         : status === "Active" 
//         ? "Active AMC" 
//         : `Refund Request Status : ${status}`,
//       bgColor: bgColors[item.planName] || "bg-gradient-to-br from-[#252525] to-[#404040]",
//       vehicleInfo: item.vehicleType.toUpperCase(),
//       refundApplied: isRefundApplied,
//       refundRequestDate: isRefundApplied ? item.updatedAt : null,
//       refundFinalStatus: item.planStatus === "cancelled" ? "Rejected" : null,
//       logoSrc: "/src/assets/Logo1.webp",
//       carImageSrc: "/src/assets/carAMC.webp",
//       planPrice: item.planPrice,
//       planStartDate: item.planStartDate,
//       planEndDate: item.planEndDate,
//       paymentId: item.paymentId,
//       refundRequestId: item.refundRequestId,
//     };
//   });
// };

// export default function MyAMCPage() {
//   const { purchasedCards } = useAmcData();
//   const [activeTab, setActiveTab] = useState("All");
//   const [showCoverageModal, setShowCoverageModal] = useState(false);
//   const [selectedAMC, setSelectedAMC] = useState(null);
//   const [showCancel, setShowCancel] = useState(false);
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [showRefundModal, setShowRefundModal] = useState(false);
//   const [selectedRefundAMC, setSelectedRefundAMC] = useState(null);
//   const [selectedCancelAMC, setSelectedCancelAMC] = useState(null);
//   const [amcData, setAmcData] = useState([]);
//   const [expiryTimestamps, setExpiryTimestamps] = useState({});
//   const [loading, setLoading] = useState(true);
//   const pollingIntervalsRef = useRef({});

//   const tabs = ["All", "Active", "Pending", "Rejected"];
//   const filtered = amcData.filter((a) =>
//     activeTab === "All" ? true : a.status === activeTab
//   );

//   useEffect(() => {
//     const fetchAMCPlans = async () => {
//       try {
//         setLoading(true);
//         const response = await getMyAMCPlans();
//         if (response.success && response.data) {
//           const mappedData = mapApiDataToAMC(response.data);
//           setAmcData([...mappedData, ...purchasedCards]);
//         }
//       } catch (error) {
//         console.error("Error fetching AMC plans:", error);
//         setAmcData([...purchasedCards]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAMCPlans();
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       setAmcData((prev) => {
//         const apiData = prev.filter(item => !purchasedCards.find(pc => pc.id === item.id));
//         return [...apiData, ...purchasedCards];
//       });
//     }
//   }, [purchasedCards]);

//   useEffect(() => {
//     amcData.forEach((amc) => {
//       if (amc.status === "Pending" && amc.refundRequestId && !pollingIntervalsRef.current[amc.id]) {
//         startPollingForRefundStatus(amc.id, amc.refundRequestId);
//       }
//     });

//     return () => {
//       Object.values(pollingIntervalsRef.current).forEach(clearInterval);
//       pollingIntervalsRef.current = {};
//     };
//   }, [amcData]);

//   const startPollingForRefundStatus = async (amcId, refundRequestId) => {
//     const pollRefundStatus = async () => {
//       try {
//         const response = await getRefundRequestStatus(refundRequestId);
//         console.log("jhwvqjdhvjvj",response);
//         if (response.success && response.data) {
//           const { status, timeline } = response.data;
//           console.log("status",status);
//           console.log("timeline",timeline);
//           setAmcData((prevData) =>
//             prevData.map((amc) => {
//               if (amc.id === amcId) {
//                 let newStatus = status;
//                 let statusBadge = `Refund Request Status : ${status}`;
//                 let refundApplied = true;

//                 if (status === "approved") {
//                   newStatus = "Approved";
//                   statusBadge = "Refund Request Status : Approved";
//                   if (pollingIntervalsRef.current[amcId]) {
//                     clearInterval(pollingIntervalsRef.current[amcId]);
//                     delete pollingIntervalsRef.current[amcId];
//                   }
//                 } else if (status === "rejected") {
//                   newStatus = "Rejected";
//                   statusBadge = "Refund Request Status : Rejected";
//                   if (pollingIntervalsRef.current[amcId]) {
//                     clearInterval(pollingIntervalsRef.current[amcId]);
//                     delete pollingIntervalsRef.current[amcId];
//                   }
//                 } else if (status === "under_process") {
//                   newStatus = "Pending";
//                   statusBadge = "Refund Request Status : Pending";
//                 }

//                 return {
//                   ...amc,
//                   status: newStatus,
//                   statusBadge,
//                   refundApplied,
//                   refundTimeline: timeline,
//                 };
//               }
//               return amc;
//             })
//           );
//         }
//       } catch (error) {
//         console.error("Error polling refund status:", error);
//       }
//     };

//     await pollRefundStatus();
    
//     const intervalId = setInterval(pollRefundStatus, 10000);
//     pollingIntervalsRef.current[amcId] = intervalId;
//   };

//   useEffect(() => {
//     const now = Date.now();
//     const hasExpired = Object.values(expiryTimestamps).some(timestamp => now >= timestamp);
    
//     if (hasExpired) {
//       const nextExpiry = Math.min(...Object.values(expiryTimestamps).filter(ts => ts > now));
//       const timeUntilNext = nextExpiry - now;
      
//       const timeout = setTimeout(() => {
//         setExpiryTimestamps({...expiryTimestamps});
//       }, timeUntilNext);
      
//       return () => clearTimeout(timeout);
//     }
//   }, [expiryTimestamps]);

//   function handleViewCoverage(item) {
//     const planData = {
//       name: item.plan,
//       description: item.description,
//       service: "Unlimited",
//       validity: item.validity,
//       startAfter: "48 Hours",
//       services: [
//         { name: "Flat Tyre (Tube)", available: true },
//         { name: "Flat Tyre (Tubeless)", available: true },
//         { name: "Battery Jumpstart", available: true },
//         { name: "Custody Service", available: true },
//         { name: "Key Unlock Assistance", available: true },
//         { name: "Fuel Delivery", available: true },
//         { name: "Starting Problem", available: true },
//       ],
//     };
//     setSelectedAMC(planData);
//     setShowCoverageModal(true);
//   }

//   function handleDownloadInvoice(item) {
//     const invoice = {
//       customerName: "Ashu Sharma",
//       location: "Ghaziabad",
//       phone: "6396422252",
//       invoiceNo: `INV-${item.orderId}`,
//       invoiceDate: new Date().toISOString().split("T")[0],
//       vehicle: item.vehicle,
//       year: "2022",
//       vehicleNumber: item.vehicleInfo,
//       problem: item.plan,
//       status: item.status,
//       payment: "Paid",
//       serviceCharge: item.planPrice || 150,
//       gst: Math.round((item.planPrice || 150) * 0.18),
//       total: Math.round((item.planPrice || 150) * 1.18),
//     };
//     setSelectedInvoice(invoice);
//     setShowInvoiceModal(true);
//   }

//   function handleEditVehicle(item) {
//     setSelectedVehicle({
//       id: item.id,
//       vehicleNumber: item.vehicleInfo,
//       brand: item.vehicle,
//       model: item.plan,
//       year: "2020",
//       fuelType: "Petrol",
//     });
//     setShowEditModal(true);
//   }

//   function handleRequestRefund(item) {
//     setSelectedRefundAMC({
//       plan: item.plan,
//       orderId: item.orderId,
//       vehicle: item.vehicle,
//       validity: item.validity,
//       price: `₹${item.planPrice || 5999}`,
//       id: item.id,
//     });
//     setShowRefundModal(true);
//   }

//   function handleEditSubmit() {
//     setShowEditModal(false);
//   }

//   function handleRefundSubmit(refundData) {
//     const { amcPurchaseId, refundRequestId } = refundData;

//     const updatedAmcData = amcData.map((amc) => {
//       if (amc.id === amcPurchaseId) {
//         return {
//           ...amc,
//           status: "Pending",
//           statusBadge: "Refund Request Status : Pending",
//           refundApplied: true,
//           refundRequestDate: new Date().toISOString(),
//           refundFinalStatus: null,
//           refundRequestId: refundRequestId,
//         };
//       }
//       return amc;
//     });

//     setExpiryTimestamps({
//       ...expiryTimestamps,
//       [amcPurchaseId]: Date.now() + (24 * 60 * 60 * 1000),
//     });

//     setAmcData(updatedAmcData);
//     setShowRefundModal(false);

//     if (refundRequestId) {
//       startPollingForRefundStatus(amcPurchaseId, refundRequestId);
//     }
//   }

//   function handleCancelRefund() {
//     const updatedAmcData = amcData.map((amc) => {
//       if (amc.id === selectedCancelAMC?.id) {
//         if (pollingIntervalsRef.current[amc.id]) {
//           clearInterval(pollingIntervalsRef.current[amc.id]);
//           delete pollingIntervalsRef.current[amc.id];
//         }
        
//         return {
//           ...amc,
//           status: "Active",
//           statusBadge: "Active AMC",
//           refundApplied: false,
//         };
//       }
//       return amc;
//     });

//     setAmcData(updatedAmcData);
//     setShowCancel(false);
//     setSelectedCancelAMC(null);
//   }

//   const getRefundStatusDisplay = (item) => {
//     if (!item.refundTimeline || item.refundTimeline.length === 0) {
//       return {
//         submitted: { completed: true, date: new Date(item.refundRequestDate) },
//         underProcess: { completed: false },
//         acceptReject: { completed: false },
//       };
//     }

//     const timeline = item.refundTimeline;
//     const submitted = timeline.find(t => t.status === "submitted");
//     const underProcess = timeline.find(t => t.status === "under_process");
//     const final = timeline.find(t => t.status === "approved" || t.status === "rejected");

//     return {
//       submitted: {
//         completed: !!submitted,
//         date: submitted ? new Date(submitted.timestamp) : null,
//       },
//       underProcess: {
//         completed: !!underProcess,
//         date: underProcess ? new Date(underProcess.timestamp) : null,
//       },
//       acceptReject: {
//         completed: !!final,
//         status: final?.status,
//         date: final ? new Date(final.timestamp) : null,
//       },
//     };
//   };

//   if (loading) {
//     return (
//       <div className="w-full flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#266DDF] mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading AMC plans...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="w-full">
//         <div className="space-y-2 md:space-y-3 bg-[#F4F4F4] p-3 md:p-4 rounded-xl">
//           <div className="rounded-xl p-2 md:p-3 m-2 md:m-3 mt-0 overflow-x-auto">
//             <nav className="flex gap-1 md:gap-8 border-b border-[#D9D9D9] min-w-max md:min-w-full">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`pb-2 md:pb-3 text-xs md:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
//                     activeTab === tab
//                       ? "border-b-2 border-[#266DDF] text-[#266DDF]"
//                       : "text-[#5C5C5C] hover:text-[#266DDF]"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {filtered.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No AMC plans found</p>
//             </div>
//           ) : (
//             filtered.map((item) => {
//               const statusDisplay = getRefundStatusDisplay(item);
              
//               return (
//                 <div
//                   key={item.id}
//                   className="flex flex-col gap-3 md:gap-4 bg-white rounded-xl p-3 md:p-6"
//                 >
//                   <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                     <MyAMCCard
//                       plan={item.plan}
//                       validity={item.validity}
//                       bgColor={item.bgColor}
//                       logoSrc={item.logoSrc}
//                       carImageSrc={item.carImageSrc}
//                       onDownloadInvoice={() => handleDownloadInvoice(item)}
//                     />

//                     <div className="flex-1 flex flex-col justify-between">
//                       <div>
//                         <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0 md:items-start mb-2">
//                           <h3 className="text-lg md:text-xl font-bold text-gray-900">
//                             {item.plan}
//                           </h3>
//                           <span
//                             className={`px-3 md:px-6 py-2 md:py-3 rounded-full text-xs font-medium whitespace-nowrap ${
//                             item.status === "Active"
//                             ? "bg-[#E0F2DC] text-[#32AB15]"
//                             : item.status === "Rejected"
//                             ? "bg-red-100 text-red-600"
//                             : item.status === "Approved"
//                                 ? "bg-[#E0F2DC] text-[#32AB15]"
//                                   : "bg-[#FEEAB0] text-[#6C6F73]"
//                             }`}
//                           >
//                             {item.statusBadge}
//                           </span>
//                         </div>

//                         <p className="text-[#1C1C28] text-xs mb-2">
//                           {item.status === "Active"
//                             ? "Your AMC is active. You can raise service requests."
//                             : item.status === "Approved"
//                             ? "Your refund has been approved. Amount will be credited within 5-7 business days."
//                             : item.status === "Rejected"
//                             ? "Your refund request has been rejected. Please contact support for more details."
//                             : "After Purchasing AMC you have applied refund request"}
//                         </p>

//                         <p className="text-[#1C1C28] text-xs mb-2 leading-normal line-clamp-3">
//                           {item.description}
//                         </p>

//                         <div className="mb-2">
//                           <span className="text-xs md:text-sm font-semibold text-gray-900">
//                             Order ID:{" "}
//                           </span>
//                           <span className="text-xs md:text-sm text-[#000000] font-bold">
//                             {item.orderId}
//                           </span>
//                         </div>

//                         {item.expiryWarning && item.status === "Active" && expiryTimestamps[item.id] && Date.now() < expiryTimestamps[item.id] && (
//                         <span className="text-[#FF3B30] inline-block bg-red-50 px-2 md:px-3 py-1 rounded-lg text-xs">
//                         {item.expiryWarning}
//                         </span>
//                         )}
//                       </div>

//                       <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-3 mt-2 flex-wrap">
//                         <button
//                           onClick={() => handleViewCoverage(item)}
//                           className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
//                         >
//                           <Eye size={16} className="md:w-[18px] md:h-[18px]" />
//                           View Coverage
//                         </button>

//                         {!item.refundApplied && item.status === "Active" && (
//                           <>
//                             <button
//                               onClick={() => handleEditVehicle(item)}
//                               className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
//                             >
//                               <Edit size={16} className="md:w-[18px] md:h-[18px]" />
//                               Edit Vehicle
//                             </button>
//                             <button
//                               onClick={() => handleRequestRefund(item)}
//                               className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#266DDF] transition font-medium text-xs md:text-sm whitespace-nowrap"
//                             >
//                               Request Refund
//                             </button>
//                           </>
//                         )}

//                         {item.refundApplied && (
//                         <button
//                         className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#266DDF] transition font-medium text-xs md:text-sm whitespace-nowrap"
//                         onClick={() => {
//                             setSelectedCancelAMC(item);
//                           setShowCancel(true);
//                           }}
//                           >
//                             Cancel Refund
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {item.status === "Pending" && (
//                   <div className="mt-3 md:mt-4 border-t border-gray-300 pt-4 md:pt-6">
//                   <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-1 md:mb-2">
//                   Refund Request Status
//                   </h3>
//                   <p className="text-center text-red-600 font-medium mb-2 text-xs md:text-sm">
//                   It will take 5 to 7 Working Days
//                   </p>
//                       {item.refundRequestDate && (
//                         <p className="text-center text-gray-500 text-[11px] md:text-xs mb-4 md:mb-8">
//                           Request submitted: {new Date(item.refundRequestDate).toLocaleDateString()} 
//                           {" • "} 
//                           Days elapsed: {Math.floor((new Date() - new Date(item.refundRequestDate)) / (1000 * 60 * 60 * 24))}
//                         </p>
//                       )}

//                       <div className="flex items-center justify-center max-w-4xl mx-auto overflow-x-auto">
//                         <div className="flex flex-col items-center flex-shrink-0">
//                           <div className={`w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center mb-2 md:mb-3 ${
//                             statusDisplay.submitted.completed ? 'bg-green-600' : 'bg-gray-300'
//                           }`}>
//                             {statusDisplay.submitted.completed && (
//                               <svg
//                                 className="w-4 md:w-5 h-4 md:h-5 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={3}
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                             )}
//                           </div>
//                           <p className="font-semibold text-xs md:text-sm text-[#1C1C28] text-center">
//                             Refund Submitted
//                           </p>
//                           {statusDisplay.submitted.date && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               {statusDisplay.submitted.date.toLocaleString('en-US', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 hour12: true
//                               })}
//                             </p>
//                           )}
//                         </div>

//                         <div className={`w-16 md:w-32 h-px -mt-12 md:-mt-16 flex-shrink-0 ${
//                           statusDisplay.underProcess.completed ? 'bg-green-600' : 'bg-gray-300'
//                         }`} />

//                         <div className="flex flex-col items-center flex-shrink-0">
//                           <div className={`w-6 md:w-7 h-6 md:h-7 rounded-full border-[3px] flex items-center justify-center mb-2 md:mb-3 ${
//                             statusDisplay.underProcess.completed 
//                               ? 'border-green-600 bg-white' 
//                               : 'border-gray-300 bg-white'
//                           }`}>
//                             {statusDisplay.underProcess.completed && (
//                               <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-green-600" />
//                             )}
//                           </div>
//                           <p className={`font-semibold text-xs md:text-sm text-center ${
//                             statusDisplay.underProcess.completed ? 'text-[#1C1C28]' : 'text-gray-400'
//                           }`}>
//                             Under Process
//                           </p>
//                           {statusDisplay.underProcess.date && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               {statusDisplay.underProcess.date.toLocaleString('en-US', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 hour12: true
//                               })}
//                             </p>
//                           )}
//                         </div>

//                         <div className={`w-16 md:w-40 h-px -mt-12 md:-mt-16 flex-shrink-0 ${
//                           statusDisplay.acceptReject.completed ? 'bg-green-600' : 'bg-gray-300'
//                         }`} />

//                         <div className="flex flex-col items-center flex-shrink-0">
//                           <div className={`w-6 md:w-7 h-6 md:h-7 rounded-full border-[3px] flex items-center justify-center mb-2 md:mb-3 ${
//                             statusDisplay.acceptReject.completed 
//                               ? 'border-green-600 bg-white' 
//                               : 'border-gray-300 bg-white'
//                           }`}>
//                             {statusDisplay.acceptReject.completed && (
//                               <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-green-600" />
//                             )}
//                           </div>
//                           <p className={`font-semibold text-xs md:text-sm text-center ${
//                             statusDisplay.acceptReject.completed ? 'text-[#1C1C28]' : 'text-gray-400'
//                           }`}>
//                             Accept/Reject
//                           </p>
//                           {statusDisplay.acceptReject.date && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               {statusDisplay.acceptReject.date.toLocaleString('en-US', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                                 hour12: true
//                               })}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {showCoverageModal && selectedAMC && (
//           <ServiceCovrageDetails
//             isOpen={showCoverageModal}
//             onClose={() => setShowCoverageModal(false)}
//             plan={selectedAMC}
//           />
//         )}
//       </div>

//       <ConfirmCancelRefundModal
//         open={showCancel}
//         onClose={() => setShowCancel(false)}
//         onConfirm={handleCancelRefund}
//       />

//       {showInvoiceModal && selectedInvoice && (
//         <InvoiceModal
//           isOpen={showInvoiceModal}
//           onClose={() => setShowInvoiceModal(false)}
//           invoice={selectedInvoice}
//         />
//       )}

//       <EditVehicleModal
//         open={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         initial={selectedVehicle}
//         onSubmit={handleEditSubmit}
//       />

//       <RefundRequestModal
//         open={showRefundModal}
//         onClose={() => setShowRefundModal(false)}
//         amcData={selectedRefundAMC}
//         onSubmit={handleRefundSubmit}
//       />
//     </>
//   );
// }