import React, { useState, useEffect, useRef, useMemo } from "react";
import { Check, X } from "lucide-react";
import detailIcon from "../assets/Vector.png";
import PlanSummaryPage from "../popup/PlanSummaryPage";
import { useAmcData } from "../context/AmcDataContext";
import { useAMCPlans } from "../context/AmcPlanContext";
import { createAMCPurchase } from "../api/amcApi";
import "../index.css";

const CompareTable = ({ plansAre, onBuy, vehicle }) => {
  const { vehicleType, amcType } = useAmcData();
  const { fetchPlans, loading } = useAMCPlans();
  const [hoveredCol, setHoveredCol] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [rawPlans, setRawPlans] = useState([]);

  const tableRef = useRef(null);
  const firstColumnRef = useRef(null);

  const keyMapping = {
    "premium care": "premium",
    "premiuim care": "premium",
    "standard care": "standard",
    "basic care": "basic",
  };

  const getPlanKey = (planName) => {
    const normalized = planName?.toLowerCase();
    return keyMapping[normalized] || normalized?.replace(/\s+/g, "");
  };

  const features = useMemo(() => {
    if (!rawPlans || rawPlans.length === 0) return [];

    const serviceMap = new Map();

    rawPlans.forEach((plan) => {
      const planKey = getPlanKey(plan.planName);

      plan.planServicesIncluded?.forEach((service) => {
        const serviceName = service.serviceName;

        if (!serviceMap.has(serviceName)) {
          serviceMap.set(serviceName, {
            label: serviceName,
            values: {},
            details: service.info || null,
          });
        }

        const feature = serviceMap.get(serviceName);

        switch (service.serviceType) {
          case "bool":
            feature.values[planKey] =
              service.value === 1 || service.value === true;
            break;
          case "days":
            feature.values[planKey] = `${service.value} days`;
            break;
          case "range":
            feature.values[planKey] = `Up to ${service.value} kms`;
            break;
          case "unlimited":
            feature.values[planKey] = "Unlimited";
            break;
          case "count":
            feature.values[planKey] = String(service.value);
            break;
          default:
            feature.values[planKey] = service.value ?? false;
        }

        if (service.info && !feature.details) {
          feature.details = service.info;
        }
      });
    });

    return Array.from(serviceMap.values());
  }, [rawPlans]);

  const handleMouseEnter = (colIndex) => {
    setHoveredCol(colIndex);
    if (!tableRef.current) return;
    const thElements = tableRef.current.querySelectorAll("thead th");
    const targetTh = thElements[colIndex + 1];
    if (targetTh) {
      const rect = targetTh.getBoundingClientRect();
      const containerRect =
        tableRef.current.parentElement.getBoundingClientRect();
      setHoverStyle({
        left: `${
          rect.left -
          containerRect.left +
          tableRef.current.parentElement.scrollLeft
        }px`,
        width: `${rect.width}px`,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCol(null);
    setHoverStyle({});
  };

  const handleFirstColumnMouseEnter = () => {
    setHoveredCol(-1);
    if (!tableRef.current || !firstColumnRef.current) return;
    const firstTh = tableRef.current.querySelector("thead th:first-child");
    if (firstTh) {
      const rect = firstTh.getBoundingClientRect();
      const containerRect =
        tableRef.current.parentElement.getBoundingClientRect();
      setHoverStyle({
        left: `${
          rect.left -
          containerRect.left +
          tableRef.current.parentElement.scrollLeft
        }px`,
        width: `${rect.width}px`,
      });
    }
  };

  const mapPlansData = (plans = []) => {
    if (!Array.isArray(plans) || plans.length === 0) return [];
    return plans.map((plan) => ({
      _id: plan?._id,
      key: getPlanKey(plan?.planName),
      name: plan?.planName,
      price: plan?.planPriceAfterDiscount || 0,
      sorting: plan?.sorting ?? 999,
    }));
  };

  useEffect(() => {
    const loadPlans = async () => {
      let data = [];

      if (Array.isArray(plansAre) && plansAre.length > 0) {
        data = plansAre;
      } else if (vehicleType && amcType) {
        data = await fetchPlans(vehicleType, amcType);
      }

      setRawPlans(data);
      const mappedPlans = mapPlansData(data);
      mappedPlans.sort((a, b) => a.sorting - b.sorting);
      setPlans(mappedPlans);
    };

    loadPlans();
  }, [plansAre, vehicleType, amcType, fetchPlans]);

  const handleBuyClick = async (plan) => {
    if (onBuy) {
      onBuy(plan);
    } else {
      if (!vehicle?.vehicleNumber) {
        alert("Please select a vehicle first.");
        return;
      }
      const purchaseResponse = await createAMCPurchase({
        planId: plan._id,
        vehicleNumber: vehicle.vehicleNumber,
      });
      if (!purchaseResponse.success) {
        alert(purchaseResponse.message || "Failed to create AMC purchase");
        return;
      }
      const purchaseData = purchaseResponse.data;
      setSelectedPlan({
        ...plan,
        purchaseId: purchaseData._id,
        vehicleNumber: vehicle.vehicleNumber,
      });
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPlan(null);
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading plans...</div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No plans available for comparison
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:pb-0 pb-20 mt-10 sm:mt-16 md:mt-20 pt-1">
      <div className="w-full overflow-x-auto overflow-y-hidden relative scroll-smooth">
        <div
          className="min-w-[700px] inline-block align-middle w-full relative"
          ref={tableRef}
        >
          {hoveredCol !== null && (
            <div
              className="absolute top-0 bottom-0 z-25 pointer-events-none transition-all duration-300 gradient-border-animate"
              style={{
                ...hoverStyle,
                height: "100%",
                padding: "2px",
                background:
                  "linear-gradient(135deg, #F80200 0%, #F8BA01 33%, #32AB15 65%, #4184ED 100%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                boxSizing: "border-box",
              }}
            ></div>
          )}
          <table className="w-full border-collapse text-center">
            <thead className="bg-[#FFFFFF] sticky top-0 z-20">
              <tr className="h-[120px]">
                <th
                  ref={firstColumnRef}
                  className="py-10 px-4 sm:px-6 text-center text-[#242424] text-2xl sm:text-3xl border-2 border-[#BCD2F5] bg-[#F9FBFF] relative"
                  style={{ width: "20%" }}
                  onMouseEnter={handleFirstColumnMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Compare plans
                </th>
                {plans.map((plan, colIndex) => (
                  <th
                    key={plan._id}
                    style={{ width: "20%" }}
                    className="py-4 px-4 sm:px-6 border-2 border-[#BCD2F5] bg-white transition-all duration-300"
                    onMouseEnter={() => handleMouseEnter(colIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex flex-col items-center gap-1 min-w-[160px] sm:min-w-[180px]">
                      <p className="font-semibold text-[#242424] text-base sm:text-lg">
                        {plan.name}
                      </p>
                      <p className="text-[#242424] text-lg sm:text-xl font-bold">
                        ₹ {plan.price}
                      </p>
                      <button
                        className={`mt-6 border-2 w-full h-full font-medium hover:opacity-90 border-[#4184ED] px-4 py-2 rounded transition-colors duration-300 text-sm sm:text-base ${
                          hoveredCol === colIndex
                            ? "bg-[#4184ed] text-white"
                            : "bg-white"
                        }`}
                        onClick={() => handleBuyClick(plan)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#E9F0FC]"}
                >
                  <td
                    className="py-4 px-4 sm:px-6 text-left text-[17px] font-bold border-2 border-[#BCD2F5] text-[#242424] min-w-[200px] relative"
                    style={{ width: "20%" }}
                    onMouseEnter={handleFirstColumnMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center gap-2">
                      <span>{feature.label}</span>
                      {feature.details &&
                        feature.label.toLowerCase() !== "validity" &&
                        !feature.label
                          .toLowerCase()
                          .includes("number of service") && (
                          <div
                            className="relative inline-block"
                            onMouseEnter={() => setHoveredIcon(rowIndex)}
                            onMouseLeave={() => setHoveredIcon(null)}
                          >
                            <button
                              type="button"
                              className="w-5 h-5 p-0 bg-none border-none cursor-pointer"
                              aria-label={`Details for ${feature.label}`}
                              onClick={() =>
                                setHoveredIcon(
                                  hoveredIcon === rowIndex ? null : rowIndex
                                )
                              }
                            >
                              <img
                                loading="lazy"
                                src={detailIcon}
                                alt="info"
                                className="w-4 h-4"
                              />
                            </button>

                            {hoveredIcon === rowIndex && (
                              <div
                                className={`absolute left-full ml-2 bg-white border border-[#BCD2F5] text-black px-4 py-3 rounded-xl z-50 shadow-lg min-w-[280px] max-w-[320px] ${
                                  rowIndex >= features.length - 3 ? "bottom-0" : "top-0"
                                }`}
                              >
                                <h5 className="text-center font-bold text-base mb-2 text-[#242424]">
                                  {feature.label}
                                </h5>
                                <p className="text-center text-sm text-[#242424] leading-relaxed">
                                  {feature.details}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  </td>
                  {plans.map((plan, colIndex) => (
                    <td
                      key={plan._id}
                      className="py-4 px-4 sm:px-6 h-[80px] border-2 border-[#BCD2F5] transition-all duration-300 min-w-[150px] sm:min-w-[180px]"
                      style={{ width: "20%" }}
                      onMouseEnter={() => handleMouseEnter(colIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {feature.values[plan.key] === true ? (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#21830F] mx-auto">
                          <Check size={16} className="text-white" />
                        </div>
                      ) : feature.values[plan.key] === false ? (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#DF0200] mx-auto">
                          <X size={16} className="text-white" />
                        </div>
                      ) : (
                        <span className="text-[#242424] font-semibold text-[17px]">
                          {feature.values[plan.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`.overflow-x-auto::-webkit-scrollbar{display:none}.overflow-x-auto{-ms-overflow-style:none;scrollbar-width:none}`}</style>
      {isPopupOpen && (
        <PlanSummaryPage
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          plan={selectedPlan}
          vehicle={vehicle}
        />
      )}
    </div>
  );
};

export default CompareTable;