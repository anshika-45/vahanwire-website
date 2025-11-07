import React, { useState } from "react";
import Button from "./Button";
import { Check, X } from "lucide-react";
import detailIcon from "../assets/info-circle.webp";
import PlanSummaryPage from "../popup/PlanSummaryPage";
import "../index.css";

const CompareTable = ({ plans, features, onBuy }) => {
  const [hoveredCol, setHoveredCol] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleBuy = (plan) => {
    if (onBuy) {
      onBuy(plan);
    } else {
      const mappedPlan = {
        ...plan,
        _id: plan._id, 
        title: plan.name,
        validFor: plan.validFor || "12 Months",
      };
      setSelectedPlan(mappedPlan);
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="relative w-full max-w-[1400px] h-auto min-h-[1200px] md:min-h-[1200px] lg:min-h-[1100px] mx-auto md:mt-[100px] px-4 sm:px-6 md:px-8 lg:px-10 pb-20 rounded-2xl">
      <div className="min-w-[800px] border border-[#E0EDFF] overflow-x-auto overflow-y-hidden relative">
        {hoveredCol !== null && (
          <div
            className="absolute top-0 bottom-0 z-25 pointer-events-none transition-all duration-300 gradient-border-animate"
            style={{
              left: `calc((100% / ${plans.length + 1}) * (${hoveredCol >= 0 ? hoveredCol + 1 : 0}))`,
              width: `calc(100% / ${plans.length + 1})`,
              height: "100%",
              padding: "2px",
              background:
                "linear-gradient(135deg, #F80200 0%, #F8BA01 33%, #32AB15 65%, #4184ED 100%)",
              mask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              boxSizing: "border-box",
            }}
          ></div>
        )}
        <table
          className="w-full text-center border-collapse relative"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-[#FFFFFF] border-2 border-[#E9F0FC] top-0 z-20">
            <tr className="h-[120px]">
              <th
                className="py-10 px-6 text-center text-[#242424] font-bold text-4xl border-2 border-[#E0EDFF] bg-[#F9FBFF] h-[180px]"
                style={{ width: "20%" }}
                onMouseEnter={() => setHoveredCol(-1)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                <span>Compare plans</span>
              </th>
              {plans.map((plan, colIndex) => (
                <th
                  key={plan.key}
                  className="py-4 px-6 border-2 border-[#E0EDFF] bg-[#F9FBFF] relative transition-all duration-300"
                  style={{ width: "20%" }}
                  onMouseEnter={() => setHoveredCol(colIndex)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#242424] text-lg">
                        {plan.name}
                      </p>
                    </div>
                    <p className="text-[#242424] text-xl font-bold">
                      ₹ {plan.price}
                    </p>
                    <Button
                      text="Buy Now"
                      className={`mt-6 w-full h-full border-2 border-[#4184ED] px-4 py-2 rounded transition-colors duration-300 ${
                        hoveredCol === colIndex ? 'bg-[#4184ED] text-white' : 'bg-white text-[#242424] hover:bg-[#0961f0] hover:text-white'
                      }`}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-[#F7FAFF]"
                }`}
              >
                <td
                  className="py-4 px-6 text-left font-medium text-[#242424] border-x-2 border-[#E0EDFF]"
                  style={{ width: "20%" }}
                  onMouseEnter={() => setHoveredCol(-1)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div className="flex items-center gap-2 relative">
                    <span>{feature.label}</span>
                    {feature.label.toLowerCase() !== "validity" && !feature.label.toLowerCase().includes("number of service") && (
                      <div
                        className="relative inline-block"
                        onMouseEnter={() => setHoveredIcon(rowIndex)}
                        onMouseLeave={() => setHoveredIcon(null)}
                      >
                        <img loading="lazy"
                          src={detailIcon}
                          alt="Details"
                          className="w-5 h-5 cursor-pointer"
                        />
                        {hoveredIcon === rowIndex && (
                          <div className={`absolute left-8 bg-[#F7FAFF] border-1 border-[#c9dcfd] text-black text-xs px-8 py-8 rounded-lg z-50 w-72 ${rowIndex > 7 ? 'top-[-6rem]' : 'top-0'}`}>
                            <h5 className="text-center font-bold text-lg mb-2">{feature.label}</h5>
                            <p className="text-center">{feature.details}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                {plans.map((plan, colIndex) => (
                  <td
                    key={plan.key}
                    className="py-4 px-6 h-[80px] border-r-2 border-[#E0EDFF] relative transition-all duration-300"
                    style={{ width: "20%" }}
                    onMouseEnter={() => setHoveredCol(colIndex)}
                    onMouseLeave={() => setHoveredCol(null)}
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
                      <span className="text-[#242424] font-medium">
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
      <PlanSummaryPage
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        plan={selectedPlan}
      />
    </div>
  );
};

export default CompareTable;