import React, { useState, useEffect } from "react";
import { Eye, Edit } from "lucide-react";
import ServiceCovrageDetails from "./ServiceCovrageDetails";
import MyAMCCard from "./MyAMCCard";
import ConfirmCancelRefundModal from "./ConfirmCancelRefundModal";
import InvoiceModal from "./InvoiceModal";
import EditVehicleModal from "./EditVehicleModal";
import RefundRequestModal from "./RefundRequestModal";
import { useAmcData } from "../context/AmcDataContext";
import { getMyAMCPlans, checkRefundStatus } from "../api/amcApi";

const mapApiDataToAMC = (apiData) => {
  const bgColors = {
    "Premium Care": "bg-gradient-to-br from-[#8F6521] to-[#A3762D]",
    "Standard Care": "bg-gradient-to-br from-[#252525] to-[#404040]",
    "Basic Care": "bg-gradient-to-br from-[#3A5353] to-[#4E7777]",
  };

  return apiData.map((item) => {
    const isPlanPending = item.planStatus === "pending";
    const isRefundPending = ["submitted", "under_process"].includes(item.refundStatus);
    const isRefundApproved = item.refundStatus === "approved";
    const isRefundRejected = item.refundStatus === "rejected";

    let status = "Active";
    let statusBadge = "Active AMC";

    if (isPlanPending) {
      status = "Pending";
      statusBadge = "Pending";
    } else if (isRefundPending) {
      status = "Pending";
      statusBadge = `Refund Request Status : Pending`;
    } else if (isRefundApproved) {
      status = "Approved";
      statusBadge = `Refund Request Status : Approved`;
    } else if (isRefundRejected) {
      status = "Rejected";
      statusBadge = `Refund Request Status : Rejected`;
    } else if (item.planStatus === "cancelled") {
      status = "Rejected";
      statusBadge = `Refund Request Status : Rejected`;
    }

    return {
      id: item._id,
      plan: item.planName,
      vehicle: item.vehicleType.toUpperCase(),
      validity: `${item.planDuration} Months`,
      orderId: item.purchaseId,
      description: item.planFeatures.join(", "),
      status: status,
      statusBadge: statusBadge,
      bgColor:
        bgColors[item.planName] ||
        "bg-gradient-to-br from-[#252525] to-[#404040]",
      vehicleInfo: item.vehicleType.toUpperCase(),
      refundApplied: isRefundPending,
      refundRequestDate: item.refundRequestDate || item.updatedAt,
      refundFinalStatus: isRefundApproved
        ? "Approved"
        : isRefundRejected
        ? "Rejected"
        : null,
      refundStatus: item.refundStatus,
      refundTimeline: item.refundTimeline || [],
      planStatus: item.planStatus,
      logoSrc: "/src/assets/Logo1.webp",
      carImageSrc: "/src/assets/carAMC.webp",
      planPrice: item.planPrice,
      planStartDate: item.planStartDate,
      planEndDate: item.planEndDate,
      paymentId: item.paymentId,
      refundRequestId: item.refundRequestId,
      vehicle: item.vehicle,
      vehicleBrand: item.vehicleBrand,
      vehicleModel: item.vehicleModel,
      planDescription: item.planDescription
    };
  });
};

const getTimelineStatus = (refundStatus, timeline = []) => {
  const statusOrder = ["submitted", "under_process", "approved", "rejected"];

  if (!refundStatus)
    return { submitted: false, under_process: false, completed: false };

  const currentStatusIndex = statusOrder.indexOf(refundStatus);

  return {
    submitted: currentStatusIndex >= 0,
    under_process: currentStatusIndex >= 1 && refundStatus !== "rejected",
    completed: ["approved", "rejected"].includes(refundStatus),
  };
};

const getTimelineDates = (timeline = []) => {
  const dates = {
    submitted: null,
    under_process: null,
    completed: null,
  };

  timeline.forEach((entry) => {
    if (entry.status === "submitted") dates.submitted = entry.timestamp;
    if (entry.status === "under_process") dates.under_process = entry.timestamp;
    if (["approved", "rejected"].includes(entry.status))
      dates.completed = entry.timestamp;
  });

  return dates;
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
  const [refundStatusData, setRefundStatusData] = useState({});

  const tabs = ["All", "Active", "Pending", "Rejected"];
  const filtered = amcData.filter((a) =>
    activeTab === "All" ? true : a.status === activeTab
  );

  console.log("ke2fbkjbkhbhjb",selectedInvoice);

  const fetchRefundStatus = async (amcId, refundRequestId) => {
    try {
      if (!refundRequestId) return;

      const response = await checkRefundStatus(refundRequestId);
      if (response.success && response.data) {
        setRefundStatusData((prev) => ({
          ...prev,
          [amcId]: response.data,
        }));
      }
    } catch (error) {
      console.error(`Error fetching refund status for AMC ${amcId}:`, error);
    }
  };

  useEffect(() => {
    const fetchAMCPlans = async () => {
      try {
        setLoading(true);
        const response = await getMyAMCPlans();
        if (response.success && response.data) {
          const mappedData = mapApiDataToAMC(response.data);
          setAmcData([...mappedData, ...purchasedCards]);

          mappedData.forEach((amc) => {
            if (amc.refundRequestId) {
              fetchRefundStatus(amc.id, amc.refundRequestId);
            }
          });
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
        const apiData = prev.filter(
          (item) => !purchasedCards.find((pc) => pc.id === item.id)
        );
        return [...apiData, ...purchasedCards];
      });
    }
  }, [purchasedCards]);

  useEffect(() => {
    const pendingRefunds = amcData.filter(
      (amc) =>
        amc.refundRequestId &&
        ["submitted", "under_process"].includes(amc.refundStatus)
    );

    if (pendingRefunds.length === 0) return;

    const interval = setInterval(() => {
      pendingRefunds.forEach((amc) => {
        fetchRefundStatus(amc.id, amc.refundRequestId);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [amcData]);

  useEffect(() => {
    const updatedAmcData = amcData.map((amc) => {
      const refundData = refundStatusData[amc.id];
      if (refundData) {
        const isRefundPending = ["submitted", "under_process"].includes(refundData.status);
        
        return {
          ...amc,
          refundStatus: refundData.status,
          refundTimeline: refundData.timeline || [],
          status:
            refundData.status === "approved"
              ? "Approved"
              : refundData.status === "rejected"
              ? "Rejected"
              : isRefundPending
              ? "Pending"
              : amc.planStatus === "pending"
              ? "Pending"
              : "Active",
          statusBadge: isRefundPending
            ? `Refund Request Status : Pending`
            : refundData.status === "approved"
            ? `Refund Request Status : Approved`
            : refundData.status === "rejected"
            ? `Refund Request Status : Rejected`
            : amc.planStatus === "pending"
            ? "AMC Activation Pending"
            : "Active AMC",
          refundFinalStatus:
            refundData.status === "approved"
              ? "Approved"
              : refundData.status === "rejected"
              ? "Rejected"
              : null,
          refundApplied: isRefundPending || refundData.status === "rejected",
        };
      }
      return amc;
    });

    if (JSON.stringify(updatedAmcData) !== JSON.stringify(amcData)) {
      setAmcData(updatedAmcData);
    }
  }, [refundStatusData]);

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
    setSelectedInvoice(item.id);
    setShowInvoiceModal(true);
  }

  function handleEditVehicle(item) {
    console.log("oooo",item);
    setSelectedVehicle({
      id: item.id,
      vehicleNumber: item.vehicle,
      brand: item.vehicleBrand,
      model: item.vehicleModel,
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
    const updatedAmcData = amcData.map((amc) => {
      if (amc.id === selectedRefundAMC?.id) {
        return {
          ...amc,
          status: "Pending",
          statusBadge: "Refund Request Status : Pending",
          refundApplied: true,
          refundRequestDate: new Date().toISOString(),
          refundFinalStatus: null,
          refundStatus: "submitted",
          refundTimeline: [
            {
              status: "submitted",
              timestamp: new Date().toISOString(),
              description: "Refund request submitted successfully",
            },
          ],
        };
      }
      return amc;
    });

    setExpiryTimestamps({
      ...expiryTimestamps,
      [selectedRefundAMC?.id]: Date.now() + 24 * 60 * 60 * 1000,
    });

    setAmcData(updatedAmcData);
    setShowRefundModal(false);
  }

  function handleCancelRefund() {
    const updatedAmcData = amcData.map((amc) => {
      if (amc.id === selectedCancelAMC?.id) {
        return {
          ...amc,
          status: amc.planStatus === "pending" ? "Pending" : "Active",
          statusBadge: amc.planStatus === "pending" ? "AMC Activation Pending" : "Active AMC",
          refundApplied: false,
          refundStatus: "none",
          refundFinalStatus: null,
          refundRequestDate: null,
          refundTimeline: [],
        };
      }
      return amc;
    });

    setAmcData(updatedAmcData);
    setShowCancel(false);
    setSelectedCancelAMC(null);
  }

  const shouldShowCancelRefund = (item) => {
    return (
      item.refundStatus === "submitted" &&
      !item.refundFinalStatus &&
      item.planStatus === "active"
    );
  };

  const shouldShowTimeline = (item) => {
    return (item.refundApplied || item.refundFinalStatus) && item.planStatus !== "pending";
  };

  const isActivePlan = (item) => {
    return item.planStatus === "active" && item.refundStatus === "none";
  };

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
            filtered.map((item) => {
              const refundData = refundStatusData[item.id] || {};
              const timelineStatus = getTimelineStatus(
                item.refundStatus,
                item.refundTimeline
              );
              const timelineDates = getTimelineDates(item.refundTimeline);

              return (
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
                      vehicle={item.vehicle}
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
                          {item.planStatus === "pending"
                            ? "Your AMC payment is successful. Waiting for admin approval to activate."
                            : item.status === "Active"
                            ? "Your AMC is active. You can raise service requests."
                            : item.status === "Approved"
                            ? "Your refund has been approved. Amount will be credited within 5-7 business days."
                            : item.status === "Rejected"
                            ? "Your refund request has been rejected. Please contact support for more details."
                            : item.refundStatus === "submitted"
                            ? "Your refund request has been submitted and is awaiting admin approval."
                            : "Your refund request is under process."}
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

                        {item.expiryWarning &&
                          item.status === "Active" &&
                          expiryTimestamps[item.id] &&
                          Date.now() < expiryTimestamps[item.id] && (
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

                        {isActivePlan(item) && (
                          <>
                            <button
                              onClick={() => handleEditVehicle(item)}
                              className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
                            >
                              <Edit
                                size={16}
                                className="md:w-[18px] md:h-[18px]"
                              />
                              Edit Vehicle
                            </button>
                            <button
                              onClick={() => handleRequestRefund(item)}
                              className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#1d5bc7] transition font-medium text-xs md:text-sm whitespace-nowrap"
                            >
                              Request Refund
                            </button>
                          </>
                        )}

                        {shouldShowCancelRefund(item) && (
                          <button
                            className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#1d5bc7] transition font-medium text-xs md:text-sm whitespace-nowrap"
                            onClick={() => {
                              setSelectedCancelAMC(item);
                              setShowCancel(true);
                            }}
                          >
                            Cancel Refund Request
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {shouldShowTimeline(item) && (
                    <div className="mt-3 md:mt-4 border-t border-gray-300 pt-4 md:pt-6">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-1 md:mb-2">
                        Refund Request Status
                      </h3>
                      
                      {item.refundStatus === "submitted" && (
                        <p className="text-center text-orange-600 font-medium mb-2 text-xs md:text-sm">
                          Awaiting admin approval
                        </p>
                      )}
                      
                      {item.refundStatus === "under_process" && (
                        <p className="text-center text-blue-600 font-medium mb-2 text-xs md:text-sm">
                          It will take 5 to 7 Working Days
                        </p>
                      )}
                      
                      {item.status === "Approved" && (
                        <p className="text-center text-green-600 font-medium mb-2 text-xs md:text-sm">
                          Your refund has been approved successfully
                        </p>
                      )}
                      
                      {item.status === "Rejected" && (
                        <p className="text-center text-red-600 font-medium mb-2 text-xs md:text-sm">
                          Your refund request has been rejected
                        </p>
                      )}

                      {item.refundRequestDate && (
                        <p className="text-center text-gray-500 text-[11px] md:text-xs mb-4 md:mb-8">
                          Request submitted:{" "}
                          {new Date(
                            item.refundRequestDate
                          ).toLocaleDateString()}
                          {" • "}
                          Days elapsed:{" "}
                          {Math.floor(
                            (new Date() - new Date(item.refundRequestDate)) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </p>
                      )}

                      <div className="flex items-center justify-center max-w-4xl mx-auto overflow-x-auto">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div
                            className={`w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center mb-2 md:mb-3 ${
                              timelineStatus.submitted || item.status === "Rejected"
                                ? "bg-green-600"
                                : "bg-gray-300"
                            }`}
                          >
                            {(timelineStatus.submitted || item.status === "Rejected") && (
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
                            )}
                          </div>
                          <p className="font-semibold text-xs md:text-sm text-[#1C1C28] text-center">
                            Refund Submitted
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {timelineDates.submitted
                              ? new Date(
                                  timelineDates.submitted
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }) +
                                ", " +
                                new Date(
                                  timelineDates.submitted
                                ).toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              : item.refundRequestDate
                              ? new Date(
                                  item.refundRequestDate
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }) +
                                ", " +
                                new Date(
                                  item.refundRequestDate
                                ).toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              : "Pending"}
                          </p>
                        </div>

                        <div className={`w-16 md:w-32 h-px -mt-12 md:-mt-16 flex-shrink-0 ${
                          item.status === "Rejected" ? "bg-red-400" : 
                          timelineStatus.under_process ? "bg-green-600" : "bg-gray-300"
                        }`} />

                        <div className="flex flex-col items-center flex-shrink-0">
                          <div
                            className={`w-6 md:w-7 h-6 md:h-7 rounded-full border-[3px] flex items-center justify-center mb-2 md:mb-3 ${
                              item.status === "Rejected"
                                ? "border-red-600 bg-red-600"
                                : timelineStatus.under_process
                                ? "border-green-600 bg-white"
                                : timelineStatus.submitted
                                ? "border-green-600 bg-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {item.status === "Rejected" ? (
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
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            ) : timelineStatus.under_process && (
                              <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-green-600" />
                            )}
                          </div>
                          <p className={`font-semibold text-xs md:text-sm text-center ${
                            item.status === "Rejected" ? "text-red-600" : "text-[#1C1C28]"
                          }`}>
                            {item.status === "Rejected" ? "Rejected" : "Under Process"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.status === "Rejected" 
                              ? timelineDates.completed
                                ? new Date(timelineDates.completed).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }) +
                                  ", " +
                                  new Date(timelineDates.completed).toLocaleTimeString("en-GB", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                : "Rejected"
                              : timelineDates.under_process
                              ? new Date(
                                  timelineDates.under_process
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }) +
                                ", " +
                                new Date(
                                  timelineDates.under_process
                                ).toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              : "Pending"}
                          </p>
                        </div>

                        {item.status !== "Rejected" && (
                          <>
                            <div className="w-16 md:w-40 h-px bg-gray-300 -mt-12 md:-mt-16 flex-shrink-0" />

                            <div className="flex flex-col items-center flex-shrink-0">
                              <div
                                className={`w-6 md:w-7 h-6 md:h-7 rounded-full border-[3px] flex items-center justify-center mb-2 md:mb-3 ${
                                  timelineStatus.completed
                                    ? "border-green-600 bg-green-600"
                                    : "border-gray-300 bg-white"
                                }`}
                              >
                                {timelineStatus.completed && (
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
                                )}
                              </div>
                              <p
                                className={`font-semibold text-xs md:text-sm text-center ${
                                  timelineStatus.completed
                                    ? "text-[#1C1C28]"
                                    : "text-gray-400"
                                }`}
                              >
                                {item.refundFinalStatus === "Approved"
                                  ? "Approved"
                                  : "Approved/Rejected"}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {timelineDates.completed
                                  ? new Date(
                                      timelineDates.completed
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }) +
                                    ", " +
                                    new Date(
                                      timelineDates.completed
                                    ).toLocaleTimeString("en-GB", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                  : "Pending"}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
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
          invoiceId={selectedInvoice}
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