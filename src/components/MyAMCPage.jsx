// import React, { useState, useEffect } from "react";
// import { Eye, Edit } from "lucide-react";
// import ServiceCovrageDetails from "./ServiceCovrageDetails";
// import MyAMCCard from "./MyAMCCard";
// import ConfirmCancelRefundModal from "./ConfirmCancelRefundModal";
// import InvoiceModal from "./InvoiceModal";
// import EditVehicleModal2 from "./EditVehicleModal2";
// import RefundRequestModal from "./RefundRequestModal";
// // import { useAmcData } from "../context/AmcDataContext";
// import { getMyAMCPlans } from "../api/amcApi";
// import { checkRefundStatus, cancelRefundRequest } from "../api/amcRefund";
// import { S3_IMAGES } from "../constants/images";
// const STATUS_CONFIG = {
//   ACTIVE: { label: "Active AMC", color: "bg-[#E0F2DC] text-[#32AB15]" },
//   PENDING_ACTIVATION: {
//     label: "AMC Activation: Pending",
//     color: "bg-[#FEEAB0] text-[#6C6F73]",
//   },
//   CANCELLED: {
//     label: "AMC Cancelled",
//     color: "bg-[#FFE5E5] text-[#DC2626]",
//   },
// };

// const AMCCardShimmer = () => (
//   <div className="flex flex-col gap-3 md:gap-4 bg-white rounded-xl p-3 md:p-6">
//     <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//       <div className="w-full md:w-[340px] h-[200px] bg-gray-200 rounded-xl animate-pulse"></div>

//       <div className="flex-1 flex flex-col justify-between">
//         <div>
//           <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0 md:items-start mb-2">
//             <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
//             <div className="h-10 bg-gray-200 rounded-full animate-pulse w-32"></div>
//           </div>

//           <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded animate-pulse w-40 mb-2"></div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-3 mt-2 flex-wrap">
//           <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-32"></div>
//           <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-32"></div>
//           <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-32"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const getStatusBadge = (planStatus, refundStatus) => {
//   if (planStatus === "cancelled") return STATUS_CONFIG.CANCELLED;
//   if (planStatus === "pending") return STATUS_CONFIG.PENDING_ACTIVATION;
//   if (planStatus === "active") return STATUS_CONFIG.ACTIVE;
//   return STATUS_CONFIG.ACTIVE;
// };

// const getStatusMessage = (planStatus, refundStatus) => {
//   if (planStatus === "cancelled") {
//     return "Your AMC plan has been cancelled.";
//   }
//   if (refundStatus === "approved") {
//     return "Your refund has been approved. Amount will be credited within 5-7 business days.";
//   }
//   if (refundStatus === "rejected_admin") {
//     return "Your refund request has been rejected by vahanwire. Please contact support for more details.";
//   }
//   if (refundStatus === "rejected_payu") {
//     return "Your refund request has been rejected by payment gateway. Please contact support for more details.";
//   }
//   if (refundStatus === "cancelled") {
//     return "Your refund request has been cancelled.";
//   }
//   if (refundStatus === "under_process") {
//     return "Your refund request is under process. It will take 5 to 7 working days.";
//   }
//   if (refundStatus === "submitted") {
//     return "Your refund request has been submitted and is awaiting vahanwire approval.";
//   }
//   if (planStatus === "pending") {
//     return "Your AMC payment is successful. Waiting for vahanwire approval to activate.";
//   }
//   if (planStatus === "active") {
//     return "Your AMC is active. You can raise service requests.";
//   }
//   return "Your AMC plan details.";
// };

// const mapApiDataToAMC = (apiData) => {
//   const bgColors = {
//     "Premium Care": "bg-gradient-to-br from-[#8F6521] to-[#A3762D]",
//     "Standard Care": "bg-gradient-to-br from-[#252525] to-[#404040]",
//     "Basic Care": "bg-gradient-to-br from-[#3A5353] to-[#4E7777]",
//   };

//   return apiData.map((item) => {
//     const canEditVehicle = item.vehicleEditableUntil
//       ? new Date() < new Date(item.vehicleEditableUntil)
//       : false;

//     const canRequestRefund =
//       canEditVehicle &&
//       item.refundStatus === "none" &&
//       !item.refundCancelledByUser;

//     const statusBadge = getStatusBadge(item.planStatus, item.refundStatus);
//     const statusMessage = getStatusMessage(item.planStatus, item.refundStatus);

//     return {
//       id: item._id,
//       plan: item.planName,
//       validity: `${item.planDuration} Months`,
//       orderId: item.purchaseId,
//       planFeatures:item.planFeatures,
//       planServices:item.planServices,
//       features: item.planFeatures.join(", "),
//       statusBadge: statusBadge.label,
//       statusColor: statusBadge.color,
//       statusMessage,
//       bgColor:
//         bgColors[item.planName] ||
//         "bg-gradient-to-br from-[#252525] to-[#404040]",
//       vehicleType: item.vehicleType,
//       refundStatus: item.refundStatus || "none",
//       refundTimeline: item.refundTimeline || [],
//       planStatus: item.planStatus,
//       logoSrc: S3_IMAGES.LOGO_AMC,
//       carImageSrc: S3_IMAGES.CAR_AMC,
//       bikeImageSrc: S3_IMAGES.BIKE_AMC,
//       planPrice: item.planPrice,
//       planStartDate: item.planStartDate,
//       planEndDate: item.planEndDate,
//       paymentId: item.paymentId,
//       refundRequestId: item.refundRequestId,
//       vehicleNumber: item.vehicleNumber,
//       vehicleBrand: item.vehicleBrand,
//       vehicleModel: item.vehicleModel,
//       vehicleYear: item.vehicleYear,
//       vehicleFuelType: item.vehicleFuelType,
//       planDescription: item.planDescription,
//       vehicleEditableUntil: item.vehicleEditableUntil,
//       canEditVehicle,
//       canRequestRefund,
//       refundCancelledByUser: item.refundCancelledByUser || false,
//     };
//   });
// };

// const hasUnderProcessInTimeline = (timeline = []) => {
//   return timeline.some((entry) => entry.status === "under_process");
// };

// const getTimelineStatus = (refundStatus, timeline) => {
//   const hasUnderProcess = hasUnderProcessInTimeline(timeline);

//   return {
//     submitted: [
//       "submitted",
//       "under_process",
//       "approved",
//       "rejected_admin",
//       "rejected_payu",
//     ].includes(refundStatus),
//     under_process: hasUnderProcess,
//     completed: [
//       "approved",
//       "rejected_admin",
//       "rejected_payu",
//       "cancelled",
//     ].includes(refundStatus),
//     isCancelled: refundStatus === "cancelled",
//     isRejectedAdmin: refundStatus === "rejected_admin",
//     isRejectedPayu: refundStatus === "rejected_payu",
//     isAdminRejectionFlow: refundStatus === "rejected_admin" && !hasUnderProcess,
//     isPayuRejectionFlow: refundStatus === "rejected_payu" && hasUnderProcess,
//   };
// };

// const getTimelineDates = (timeline = []) => {
//   const dates = { submitted: null, under_process: null, completed: null };

//   timeline.forEach((entry) => {
//     if (entry.status === "submitted") dates.submitted = entry.timestamp;
//     if (entry.status === "under_process") dates.under_process = entry.timestamp;
//     if (
//       ["approved", "rejected_admin", "rejected_payu", "cancelled"].includes(
//         entry.status
//       )
//     )
//       dates.completed = entry.timestamp;
//   });

//   return dates;
// };

// const getRemainingTime = (vehicleEditableUntil, currentTime) => {
//   if (!vehicleEditableUntil) return null;

//   const expiry = new Date(vehicleEditableUntil).getTime();
//   const diff = expiry - currentTime;

//   if (diff <= 0) return null;

//   const hours = Math.floor(diff / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//   if (hours > 0) {
//     return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""
//       }`;
//   }
//   return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
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
//   const [loading, setLoading] = useState(true);
//   const [refundStatusData, setRefundStatusData] = useState({});
//   const [currentTime, setCurrentTime] = useState(Date.now());

//   const fetchAMCPlans = async () => {
//     setLoading(true);
//     const response = await getMyAMCPlans();
//     if (response.success && response.data) {
//       const mappedData = mapApiDataToAMC(response.data);
//       setAmcData([...mappedData, ...purchasedCards]);
//       mappedData.forEach((amc) => {
//         if (amc.refundRequestId) fetchRefundStatus(amc.id, amc.refundRequestId);
//       });
//     } else {
//       setAmcData([...purchasedCards]);
//     }
//     setLoading(false);
//   };

//   const fetchRefundStatus = async (amcId, refundRequestId) => {
//     if (!refundRequestId) return;

//     const response = await checkRefundStatus(refundRequestId);
//     if (response.success && response.data) {
//       setRefundStatusData((prev) => ({ ...prev, [amcId]: response.data }));
//     }
//   };

//   useEffect(() => {
//     fetchAMCPlans();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(Date.now());
//     }, 60000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const pendingRefunds = amcData.filter(
//       (amc) =>
//         amc.refundRequestId &&
//         ["submitted", "under_process"].includes(amc.refundStatus)
//     );

//     if (pendingRefunds.length === 0) return;

//     const interval = setInterval(() => {
//       pendingRefunds.forEach((amc) =>
//         fetchRefundStatus(amc.id, amc.refundRequestId)
//       );
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [amcData]);

//   useEffect(() => {
//     setAmcData((prev) =>
//       prev.map((amc) => {
//         const refundData = refundStatusData[amc.id];
//         if (!refundData) return amc;

//         const statusBadge = getStatusBadge(amc.planStatus, refundData.status);
//         const statusMessage = getStatusMessage(
//           amc.planStatus,
//           refundData.status
//         );
//         const canEditVehicle = amc.vehicleEditableUntil
//           ? new Date() < new Date(amc.vehicleEditableUntil)
//           : false;

//         const canRequestRefund =
//           canEditVehicle &&
//           refundData.status === "none" &&
//           !amc.refundCancelledByUser;

//         return {
//           ...amc,
//           refundStatus: refundData.status,
//           refundTimeline: refundData.timeline || [],
//           statusBadge: statusBadge.label,
//           statusColor: statusBadge.color,
//           statusMessage,
//           canEditVehicle,
//           canRequestRefund,
//         };
//       })
//     );
//   }, [refundStatusData]);

//   const tabs = ["All", "Active", "Pending", "Rejected", "Cancelled"];

//   const getTabStatus = (item) => {
//     if (
//       item.refundStatus === "rejected_admin" ||
//       item.refundStatus === "rejected_payu"
//     )
//       return "Rejected";
//     if (["submitted", "under_process"].includes(item.refundStatus))
//       return "Pending";
//     if (item.planStatus === "pending") return "Pending";
//     if (item.planStatus === "cancelled") return "Cancelled";
//     return "Active";
//   };

//   const filtered = amcData.filter((a) =>
//     activeTab === "All" ? true : getTabStatus(a) === activeTab
//   );

//   const handleViewCoverage = (item,index) => {
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
//     setSelectedAMC(item);
//     setShowCoverageModal(true);
//   };

//   const handleDownloadInvoice = (item) => {
//     setSelectedInvoice(item.id);
//     setShowInvoiceModal(true);
//   };

//   const handleEditVehicle = (item) => {
//     if (!item.canEditVehicle) {
//       alert("24-hour edit window has expired");
//       return;
//     }

//     setSelectedVehicle({
//       purchaseId: item.id,
//       vehicleNumber: item.vehicleNumber,
//       brand: item.vehicleBrand,
//       model: item.vehicleModel,
//       year: item.vehicleYear,
//       fuelType: item.vehicleFuelType,
//       vehicleType: item.vehicleType?.toLowerCase() || "car",
//     });
//     setShowEditModal(true);
//   };

//   const handleRequestRefund = (item) => {
//     if (!item.canRequestRefund) {
//       alert("24-hour refund request window has expired");
//       return;
//     }

//     setSelectedRefundAMC({
//       plan: item.plan,
//       orderId: item.orderId,
//       vehicle: item.vehicleNumber,
//       validity: item.validity,
//       price: `₹${item.planPrice || 5999}`,
//       id: item.id,
//     });
//     setShowRefundModal(true);
//   };

//   const handleEditSubmit = () => {
//     setShowEditModal(false);
//     fetchAMCPlans();
//   };

//   const handleRefundSubmit = () => {
//     setShowRefundModal(false);
//     fetchAMCPlans();
//   };

//   const handleConfirmCancelRefund = async () => {
//     if (!selectedCancelAMC?.refundRequestId) {
//       alert("Refund request ID not found");
//       return;
//     }

//     const response = await cancelRefundRequest(
//       selectedCancelAMC.refundRequestId
//     );

//     if (response) {
//       setAmcData((prev) =>
//         prev.map((amc) => {
//           if (amc.id === selectedCancelAMC.id) {
//             const statusBadge = getStatusBadge(amc.planStatus, "cancelled");
//             const statusMessage = getStatusMessage(amc.planStatus, "cancelled");

//             const canEditVehicle = amc.vehicleEditableUntil
//               ? new Date() < new Date(amc.vehicleEditableUntil)
//               : false;
//             const canRequestRefund = false;

//             return {
//               ...amc,
//               refundStatus: "cancelled",
//               refundCancelledByUser: true,
//               canRequestRefund,
//               canEditVehicle,
//               statusBadge: statusBadge.label,
//               statusColor: statusBadge.color,
//               statusMessage,
//               refundTimeline: [
//                 ...amc.refundTimeline,
//                 {
//                   status: "cancelled",
//                   timestamp: new Date().toISOString(),
//                   description: "Refund request cancelled by user",
//                 },
//               ],
//             };
//           }
//           return amc;
//         })
//       );

//       setRefundStatusData((prev) => {
//         const updated = { ...prev };
//         delete updated[selectedCancelAMC.id];
//         return updated;
//       });
//     }

//     setShowCancel(false);
//     setSelectedCancelAMC(null);
//   };

//   const shouldShowCancelRefund = (item) => {
//     return (
//       item.refundStatus === "submitted" &&
//       (item.planStatus === "active" || item.planStatus === "pending")
//     );
//   };

//   const shouldShowTimeline = (item) => {
//     return item.refundStatus !== "none" && item.refundStatus !== "cancelled";
//   };

//   const shouldShowActionButtons = (item) => {
//     const canShowEditVehicle =
//       item.canEditVehicle && !["approved"].includes(item.refundStatus);

//     const canShowRequestRefund =
//       item.canRequestRefund &&
//       item.refundStatus === "none" &&
//       !item.refundCancelledByUser;

//     return canShowEditVehicle || canShowRequestRefund;
//   };

//   if (loading) {
//     return (
//       <div className="w-full">
//         <div className="space-y-2 md:space-y-3 bg-[#F4F4F4] p-3 md:p-4 rounded-xl">
//           <div className="rounded-xl p-2 md:p-3 m-2 md:m-3 mt-0 overflow-x-auto">
//             <nav className=" gap-x-6 md:gap-8 border-b border-[#D9D9D9] min-w-max md:min-w-full">
//               {tabs.map((tab) => (
//                 <div
//                   key={tab}
//                   className="pb-2 md:pb-3 h-8 w-16 bg-gray-200 rounded animate-pulse"
//                 ></div>
//               ))}
//             </nav>
//           </div>
//           <AMCCardShimmer />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="w-full">
//         <div className="space-y-2 md:space-y-3 bg-[#F4F4F4] p-3 md:p-4 rounded-xl">
//           <div className="rounded-xl px-3 overflow-x-auto">
//             <nav className="flex gap-x-4 md:gap-8 border-b border-[#D9D9D9] min-w-max md:min-w-full">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`pb-2 md:pb-3 text-sm md:text-[16px] font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab
//                     ? "border-b-2 border-[#266DDF] text-[#266DDF]"
//                     : "text-[#5C5C5C] hover:text-[#266DDF]"
//                     }`}
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
//             filtered.map((item,index) => {
//               const timelineStatus = getTimelineStatus(
//                 item.refundStatus,
//                 item.refundTimeline
//               );
//               const timelineDates = getTimelineDates(item.refundTimeline);
//               const remainingTime = getRemainingTime(
//                 item.vehicleEditableUntil,
//                 currentTime
//               );

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
//                       vehicle={item.vehicleNumber}
//                       planDescription={item.planDescription}
//                       carImageSrc={
//                         item.vehicleType?.toLowerCase() === "car"
//                           ? item.carImageSrc
//                           : item.bikeImageSrc
//                       }
//                       onDownloadInvoice={() => handleDownloadInvoice(item)}
//                     />

//                     <div className="flex-1 flex flex-col justify-between">
//                       <div>
//                         <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0 md:items-start mb-2">
//                           <h3 className="text-lg md:text-xl font-bold text-gray-900">
//                             {item.plan}
//                           </h3>
//                           <span
//                             className={`px-3 md:px-6 py-2 md:py-3 rounded-full text-[15px] font-medium whitespace-nowrap ${item.statusColor}`}
//                           >
//                             {item.statusBadge}
//                           </span>
//                         </div>

//                         <p className="text-[#1C1C28] text-[16px] mb-2">
//                           {item.statusMessage}
//                         </p>

//                         <p className="text-[#1C1C28] text-[16px] mb-2 leading-normal line-clamp-3">
//                           {item.planDescription}
//                         </p>

//                         <div className="mb-2">
//                           <span className="text-xs md:text-lg text-gray-900">
//                             Order ID:{" "}
//                           </span>
//                           <span className="text-xs md:text-sm text-[#000000] font-bold">
//                             {item.orderId}
//                           </span>
//                         </div>

//                         {remainingTime &&
//                           !["approved"].includes(item.refundStatus) && (
//                             <span className="text-[#FF3B30] inline-block bg-red-50 px-2 md:px-3 py-2 rounded-lg text-xs">
//                               This edit expires in {remainingTime}. Service
//                               usage won't reflect afterward.
//                             </span>
//                           )}
//                       </div>

//                       <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-3 mt-2 flex-wrap">
//                         <button
//                           onClick={() => handleViewCoverage(item)}
                          
//                           className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
//                         >
//                           <Eye size={16} className="md:w-[18px] md:h-[18px]" />
//                           View Coverage
//                         </button>

//                         {shouldShowActionButtons(item) && (
//                           <>
//                             {item.canEditVehicle &&
//                               !["approved"].includes(item.refundStatus) && (
//                                 <button
//                                   onClick={() => handleEditVehicle(item)}
//                                   className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
//                                 >
//                                   <Edit
//                                     size={16}
//                                     className="md:w-[18px] md:h-[18px]"
//                                   />
//                                   Edit Vehicle
//                                 </button>
//                               )}

//                             {item.canRequestRefund &&
//                               item.refundStatus === "none" &&
//                               !item.refundCancelledByUser && (
//                                 <button
//                                   onClick={() => handleRequestRefund(item)}
//                                   className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#1d5bc7] transition font-medium text-xs md:text-sm whitespace-nowrap"
//                                 >
//                                   Request Refund
//                                 </button>
//                               )}
//                           </>
//                         )}
//                         {shouldShowCancelRefund(item) && (
//                           <button
//                             className="px-3 md:px-4 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#1d5bc7] transition font-medium text-xs whitespace-nowrap"
//                             onClick={() => {
//                               setSelectedCancelAMC(item);
//                               setShowCancel(true);
//                             }}
//                           >
//                             Cancel Refund Request
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {shouldShowTimeline(item) && (
//                     <div className="mt-3 md:mt-4 border-t border-gray-300 pt-4 md:pt-6">
//                       <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-1 md:mb-2">
//                         Refund Request Status
//                       </h3>

//                       {item.refundStatus === "submitted" && (
//                         <p className="text-center text-orange-600 font-medium mb-2 text-xs md:text-sm">
//                           Awaiting Approval for Refund
//                         </p>
//                       )}

//                       {item.refundStatus === "under_process" && (
//                         <p className="text-center text-blue-600 font-medium mb-2 text-xs md:text-sm">
//                           It will take 5 to 7 Working Days
//                         </p>
//                       )}

//                       {item.refundStatus === "approved" && (
//                         <p className="text-center text-green-600 font-medium mb-2 text-xs md:text-sm">
//                           Your refund has been approved successfully
//                         </p>
//                       )}

//                       {item.refundStatus === "rejected_admin" && (
//                         <p className="text-center text-red-600 font-medium mb-2 text-xs md:text-sm">
//                           Your refund request has been rejected by vahanwire
//                         </p>
//                       )}

//                       {item.refundStatus === "rejected_payu" && (
//                         <p className="text-center text-red-600 font-medium mb-2 text-xs md:text-sm">
//                           Your refund request has been rejected by payment
//                           gateway
//                         </p>
//                       )}

//                       {timelineStatus.isAdminRejectionFlow ? (
//                         <div className="flex md:flex-row flex-col gap-y-15 items-center justify-center max-w-4xl mx-auto overflow-x-auto">
//                           <div className="flex flex-col items-center flex-shrink-0">
//                             <div className="w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center mb-2 md:mb-3 bg-green-600">
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
//                             </div>
//                             <p className="font-semibold text-xs md:text-sm text-[#1C1C28] text-center">
//                               Refund Submitted
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               {timelineDates.submitted
//                                 ? new Date(
//                                   timelineDates.submitted
//                                 ).toLocaleString("en-GB", {
//                                   day: "2-digit",
//                                   month: "short",
//                                   year: "numeric",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                   hour12: true,
//                                 })
//                                 : "Pending"}
//                             </p>
//                           </div>

//                           <div className="w-16 md:w-40 h-px -mt-12 md:-mt-16 flex-shrink-0 bg-red-400 md:rotate-0 rotate-90 sm:translate-y-0 translate-y-6  " />

//                           <div className="flex flex-col items-center flex-shrink-0">
//                             <div className="w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center mb-2 md:mb-3 bg-red-600 ">
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
//                                   d="M6 18L18 6M6 6l12 12"
//                                 />
//                               </svg>
//                             </div>
//                             <p className="font-semibold text-xs md:text-sm text-center text-red-600">
//                               Rejected by Vahanwire
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               {timelineDates.completed
//                                 ? new Date(
//                                   timelineDates.completed
//                                 ).toLocaleString("en-GB", {
//                                   day: "2-digit",
//                                   month: "short",
//                                   year: "numeric",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                   hour12: true,
//                                 })
//                                 : "Pending"}
//                             </p>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex items-center md:flex-row flex-col gap-y-15  justify-center max-w-4xl mx-auto overflow-x-auto">
//                           <div className="flex flex-col items-center flex-shrink-0">
//                             <div
//                               className={`w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center mb-2 md:mb-3  ${timelineStatus.submitted
//                                 ? "bg-green-600"
//                                 : "bg-gray-300"
//                                 }`}
//                             >
//                               {timelineStatus.submitted && (
//                                 <svg
//                                   className="w-4 md:w-5 h-4 md:h-5 text-white"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={3}
//                                     d="M5 13l4 4L19 7"
//                                   />
//                                 </svg>
//                               )}
//                             </div>
//                             <p className="font-semibold text-xs md:text-sm text-[#1C1C28] text-center">
//                               Refund Submitted
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               {timelineDates.submitted
//                                 ? new Date(
//                                   timelineDates.submitted
//                                 ).toLocaleString("en-GB", {
//                                   day: "2-digit",
//                                   month: "short",
//                                   year: "numeric",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                   hour12: true,
//                                 })
//                                 : "Pending"}
//                             </p>
//                           </div>

//                           <div
//                             className={`w-16 md:w-32 h-px -mt-12 md:-mt-16 flex-shrink-0 md:rotate-0 rotate-90 sm:translate-y-0 translate-y-6 ${timelineStatus.under_process
//                               ? "bg-green-600"
//                               : "bg-gray-300"
//                               }`}
//                           />

//                           <div className="flex flex-col items-center flex-shrink-0">
//                             <div
//                               className={`w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center mb-2 md:mb-3 ${timelineStatus.completed
//                                 ? "bg-green-600"
//                                 : timelineStatus.under_process
//                                   ? item.refundStatus === "under_process"
//                                     ? "border-[3px] border-green-600 bg-white"
//                                     : "bg-green-600"
//                                   : "border-[3px] border-gray-300 bg-white"
//                                 }`}
//                             >
//                               {timelineStatus.completed ||
//                                 (timelineStatus.under_process &&
//                                   item.refundStatus !== "under_process") ? (
//                                 <svg
//                                   className="w-4 md:w-5 h-4 md:h-5 text-white"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={3}
//                                     d="M5 13l4 4L19 7"
//                                   />
//                                 </svg>
//                               ) : item.refundStatus === "under_process" ? (
//                                 <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-green-600" />
//                               ) : null}
//                             </div>
//                             <p className="font-semibold text-xs md:text-sm text-center text-[#1C1C28]">
//                               Under Process
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               {timelineDates.under_process
//                                 ? new Date(
//                                   timelineDates.under_process
//                                 ).toLocaleString("en-GB", {
//                                   day: "2-digit",
//                                   month: "short",
//                                   year: "numeric",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                   hour12: true,
//                                 })
//                                 : "Pending"}
//                             </p>
//                           </div>

//                           <div
//                             className={`w-16 md:w-40 h-px -mt-12 md:-mt-16 flex-shrink-0 md:rotate-0 rotate-90 sm:translate-y-0 translate-y-6   ${timelineStatus.isRejectedPayu
//                               ? "bg-red-400"
//                               : item.refundStatus === "approved"
//                                 ? "bg-green-600"
//                                 : "bg-gray-300"
//                               }`}
//                           />

//                           <div className="flex flex-col items-center flex-shrink-0">
//                             <div
//                               className={`w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center mb-2 md:mb-3 ${timelineStatus.isRejectedPayu
//                                 ? "bg-red-600"
//                                 : item.refundStatus === "approved"
//                                   ? "bg-green-600"
//                                   : "border-[3px] border-gray-300 bg-white"
//                                 }`}
//                             >
//                               {timelineStatus.isRejectedPayu ? (
//                                 <svg
//                                   className="w-4 md:w-5 h-4 md:h-5 text-white"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={3}
//                                     d="M6 18L18 6M6 6l12 12"
//                                   />
//                                 </svg>
//                               ) : item.refundStatus === "approved" ? (
//                                 <svg
//                                   className="w-4 md:w-5 h-4 md:h-5 text-white"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={3}
//                                     d="M5 13l4 4L19 7"
//                                   />
//                                 </svg>
//                               ) : null}
//                             </div>
//                             <p
//                               className={`font-semibold text-xs md:text-sm text-center ${timelineStatus.isRejectedPayu
//                                 ? "text-red-600"
//                                 : item.refundStatus === "approved"
//                                   ? "text-[#1C1C28]"
//                                   : "text-gray-400"
//                                 }`}
//                             >
//                               {timelineStatus.isRejectedPayu
//                                 ? "Rejected by PayU"
//                                 : item.refundStatus === "approved"
//                                   ? "Approved"
//                                   : "Refunded or Rejected"}
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               {timelineDates.completed
//                                 ? new Date(
//                                   timelineDates.completed
//                                 ).toLocaleString("en-GB", {
//                                   day: "2-digit",
//                                   month: "short",
//                                   year: "numeric",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                   hour12: true,
//                                 })
//                                 : "Pending"}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>

//       {showCoverageModal && selectedAMC && (
//         <ServiceCovrageDetails
//           isOpen={showCoverageModal}
//           onClose={() => setShowCoverageModal(false)}
//           plan={selectedAMC}
          
//         />
//       )}

//       <ConfirmCancelRefundModal
//         open={showCancel}
//         onClose={() => {
//           setShowCancel(false);
//           setSelectedCancelAMC(null);
//         }}
//         onConfirm={handleConfirmCancelRefund}
//       />

//       {showInvoiceModal && selectedInvoice && (
//         <InvoiceModal
//           isOpen={showInvoiceModal}
//           onClose={() => setShowInvoiceModal(false)}
//           invoiceId={selectedInvoice}
//         />
//       )}

//       <EditVehicleModal2
//         open={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         initial={selectedVehicle}
//         initialVehicleType={selectedVehicle?.vehicleType}
//         purchaseId={selectedVehicle?.purchaseId}
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