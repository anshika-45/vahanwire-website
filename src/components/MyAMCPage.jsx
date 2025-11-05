import React, { useState, useEffect } from "react";
import { Eye, Edit } from "lucide-react";
import ServiceCovrageDetails from "./ServiceCovrageDetails";
import MyAMCCard from "./MyAMCCard";
import { getMyAMCPlans } from "../api/authApi";
import { toast } from "react-toastify";

export default function MyAMCPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const [selectedAMC, setSelectedAMC] = useState(null);
  const [amcPlans, setAmcPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["All", "Active", "Pending", "Rejected"];

  // Fetch user AMC plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await getMyAMCPlans();
        if (res.success) {
          setAmcPlans(res.data || []);
        } else {
          toast.error(res.message || "Failed to fetch AMC plans");
        }
      } catch (error) {
        console.error("Error fetching AMC plans:", error);
        toast.error("Something went wrong while fetching plans");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Filter plans based on tab
  const filtered = amcPlans.filter((plan) =>
    activeTab === "All"
      ? true
      : plan.planStatus?.toLowerCase() === activeTab.toLowerCase()
  );

  // Handle view coverage modal
  function handleViewCoverage(item) {
    const planData = {
      name: item.planName,
      description: item.planFeatures?.join(", "),
      service: "Unlimited",
      validity: `${item.planDuration} Months`,
      startAfter: "48 Hours",
      services:
        item.planServices?.map((s) => ({
          name: s,
          available: true,
        })) || [],
    };
    setSelectedAMC(planData);
    setShowCoverageModal(true);
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-gray-500 text-sm">Loading your AMC plans...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-2 md:space-y-3 bg-[#F4F4F4] p-3 md:p-4 rounded-xl">
        {/* Tabs */}
        <div className="rounded-xl p-2 md:p-3 m-2 md:m-3 mt-0 overflow-x-auto">
          <nav className="flex gap-1 md:gap-8 border-b-1 border-[#D9D9D9] min-w-max md:min-w-full">
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

        {/* AMC List */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No AMC plans found for this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-3 md:gap-4 bg-white rounded-xl p-3 md:p-6"
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <MyAMCCard
                  plan={item.planName}
                  validity={`${item.planDuration} Months`}
                  bgColor="bg-gradient-to-br from-[#8F6521] to-[#A3762D]"
                  logoSrc="/src/assets/Logo1.webp"
                  carImageSrc="/src/assets/carAMC.webp"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0 md:items-start mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">
                        {item.planName}
                      </h3>
                      <span
                        className={`px-3 md:px-6 py-2 md:py-3 rounded-full text-xs font-medium whitespace-nowrap ${
                          item.planStatus === "active"
                            ? "bg-[#E0F2DC] text-[#32AB15]"
                            : item.planStatus === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-[#FEEAB0] text-[#6C6F73]"
                        }`}
                      >
                        {item.planStatus}
                      </span>
                    </div>
                    <p className="text-[#1C1C28] text-xs mb-2 leading-normal line-clamp-3">
                      {item.planFeatures?.join(", ")}
                    </p>
                    <div className="mb-2">
                      <span className="text-xs md:text-sm font-semibold text-gray-900">
                        Order ID:{" "}
                      </span>
                      <span className="text-xs md:text-sm text-[#000000] font-bold">
                        {item._id}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-3 mt-2 flex-wrap">
                    <button
                      onClick={() => handleViewCoverage(item)}
                      className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium"
                    >
                      <Eye size={16} />
                      View Coverage
                    </button>

                    <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-[#266DDF] text-[#266DDF] rounded-lg hover:bg-[#D9E7FE] transition text-xs md:text-sm font-medium">
                      <Edit size={16} />
                      Edit Vehicle
                    </button>

                    <button className="px-4 md:px-6 py-2 bg-[#266DDF] text-white rounded-lg hover:bg-[#266DDF] transition font-medium text-xs md:text-sm whitespace-nowrap">
                      Request Refund
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showCoverageModal && selectedAMC && (
        <ServiceCovrageDetails
          isOpen={showCoverageModal}
          onClose={() => setShowCoverageModal(false)}
          plan={selectedAMC}
        />
      )}
    </div>
  );
}
