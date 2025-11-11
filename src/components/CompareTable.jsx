import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { Check, X } from "lucide-react";
import detailIcon from "../assets/info.png";
import PlanSummaryPage from "../popup/PlanSummaryPage";
import { useAmcData } from "../context/AmcDataContext";
import { getAMCPlansByCategory } from "../api/amcApi";
import { createAMCPurchase } from "../api/amcApi";
import "../index.css";

const CompareTable = ({ plansAre, features, onBuy, vehicle }) => {
  const { vehicleType, amcType } = useAmcData();
  const [hoveredCol, setHoveredCol] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableRef = useRef(null);
  const firstColumnRef = useRef(null);

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

  const fetchPlans = async () => {
    setLoading(true);

    if (plansAre && Array.isArray(plansAre) && plansAre.length > 0) {
      const mappedPlans = plansAre.map((plan) => ({
        _id: plan._id,
        key: plan.planSubCategory?.toLowerCase(),
        name: plan.planName,
        price: plan.planTotalAmount,
      }));

      const order = { premium: 1, standard: 2, basic: 3 };
      mappedPlans.sort(
        (a, b) =>
          (order[a.planSubCategory] || 4) - (order[b.planSubCategory] || 4)
      );

      setPlans(mappedPlans);
    } else {
      const res = await getAMCPlansByCategory(vehicleType, amcType);
      if (res.success && Array.isArray(res.data)) {
        const mappedPlans = res.data.map((plan) => ({
          _id: plan._id,
          key: plan.planSubCategory?.toLowerCase(),
          name: plan.planName,
          price: plan.planTotalAmount,
        }));

        const order = { premium: 1, standard: 2, basic: 3 };
        mappedPlans.sort(
          (a, b) =>
            (order[a.planSubCategory] || 4) - (order[b.planSubCategory] || 4)
        );

        setPlans(mappedPlans);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, [plansAre, vehicleType, amcType]);

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
    <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-20 mt-10 sm:mt-16 md:mt-20">
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
            <thead className="bg-[#FFFFFF] border-2 border-[#E9F0FC] sticky top-0 z-20">
              <tr className="h-[120px]">
                <th
                  ref={firstColumnRef}
                  className="py-10 px-4 sm:px-6 text-center text-[#242424] font-bold text-2xl sm:text-3xl border-2 border-[#E0EDFF] bg-[#F9FBFF] relative"
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
                    className="py-4 px-4 sm:px-6 border-2 border-[#E0EDFF] bg-[#F9FBFF] transition-all duration-300"
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
                      <Button
                        text="Buy Now"
                        className={`mt-6 border-2 w-full h-full border-[#4184ED] px-4 py-2 rounded transition-colors duration-300 text-sm sm:text-base ${
                          hoveredCol === colIndex
                            ? "bg-[#4184ED] text-white"
                            : "bg-white text-[#242424] hover:bg-[#0961f0] hover:text-white"
                        }`}
                        onClick={() => handleBuyClick(plan)}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {features &&
                features.map((feature, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-[#F7FAFF]"
                    }`}
                  >
                    <td
                      ref={rowIndex === 0 ? firstColumnRef : null}
                      className="py-4 px-4 sm:px-6 text-left font-bold text-[#242424] border-x-2 border-[#E0EDFF] min-w-[200px] relative"
                      style={{ width: "20%" }}
                      onMouseEnter={handleFirstColumnMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center gap-2">
                        <span>{feature.label}</span>
                        {feature.label.toLowerCase() !== "validity" &&
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
                                onClick={() => setHoveredIcon(hoveredIcon === rowIndex ? null : rowIndex)}
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
                                  className={`absolute left-8 bg-[#F7FAFF] border border-[#c9dcfd] text-black text-xs px-3 py-3 rounded-lg z-50 w-70 sm:w-72 shadow-md ${
                                    rowIndex > 7 ? "top-[-10rem]" : "top-0"
                                  }`}
                                >
                                  <h5 className="text-center font-bold text-xl mb-3">
                                    {feature.label}
                                  </h5>
                                  <p className="text-center text-base">
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
                        className="py-4 px-4 sm:px-6 h-[80px] border-r-2 border-[#E0EDFF] transition-all duration-300 min-w-[150px] sm:min-w-[180px]"
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
                          <span className="text-[#242424] font-medium text-sm sm:text-base">
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
      <style>
        {`
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
          .overflow-x-auto {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
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
