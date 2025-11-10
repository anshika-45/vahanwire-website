import React, { useEffect, useState } from "react";
import carColor from "../assets/CarFill.webp";
import carOutline from "../assets/CarFade.webp";
import bikeColor from "../assets/BikeFill.webp";
import bikeOutline from "../assets/BikeFade.webp";

const Backdrop = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 z-50"
    onClick={onClose}
    aria-hidden="true"
  />
);

const Modal = ({ open, onClose, onSubmit, initial }) => {
  const [vehicleType, setVehicleType] = useState("car");

  const [vehicleNumber1, setVehicleNumber1] = useState(initial?.vehicleNumber || "");
  const [manufactureYear, setManufactureYear] = useState(""); // UI: Brand
  const [fuelType, setFuelType] = useState("");
  const [vehicleNumber2] = useState("");
  const [modelNumber, setModelNumber] = useState(""); // UI: Model

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    setVehicleNumber1(initial?.vehicleNumber || "");
  }, [initial]);

  if (!open) return null;

  // Helpers
  const cleanReg = (v) => (v || "").toUpperCase().replace(/[\s-]/g, "");
  const isValidReg = (v) => /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(cleanReg(v));
  const allowedFuel = ["PETROL", "DIESEL", "CNG", "EV", "ELECTRIC", "HYBRID", "LPG"];
  const isValidFuel = (v) => allowedFuel.includes((v || "").trim().toUpperCase());
  const isNonEmpty2 = (v) => (v || "").trim().length >= 2; // for Brand/Model

  const validate = () => {
    const next = {};

    // Vehicle number (at least one valid; if both, must match)
    const v1ok = vehicleNumber1 ? isValidReg(vehicleNumber1) : false;
    const v2ok = vehicleNumber2 ? isValidReg(vehicleNumber2) : false;
    if (!v1ok && !v2ok) {
      next.vehicleNumber1 = "Enter a valid vehicle number (e.g., DL01AB1234).";
      if (vehicleNumber2) next.vehicleNumber2 = "Format looks invalid (e.g., DL01AB1234).";
    }
    if (vehicleNumber1 && vehicleNumber2) {
      if (cleanReg(vehicleNumber1) !== cleanReg(vehicleNumber2)) {
        next.vehicleNumber2 = "Both vehicle numbers should match.";
      }
    }

    // Brand (manufactureYear var)
    if (!isNonEmpty2(manufactureYear)) {
      next.manufactureYear = "Brand is required (min 2 characters).";
    }

    // Model (modelNumber var)
    if (!isNonEmpty2(modelNumber)) {
      next.modelNumber = "Model is required (min 2 characters).";
    }

    // Fuel type
    if (!fuelType) {
      next.fuelType = "Fuel type is required.";
    } else if (!isValidFuel(fuelType)) {
      next.fuelType = "Allowed: Petrol, Diesel, CNG, EV, Electric, Hybrid, LPG.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const inputBase =
    "w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm text-gray-900 placeholder:text-xs placeholder:text-gray-400 focus:ring-2 focus:ring-[#D9E7FE] outline-none";
  const borderOk = "border-slate-300";
  const borderErr = "border-red-500";

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-3 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden my-auto">
          {/* Header */}
          <div className="relative px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-[#D9E7FE] rounded-t-2xl">
            <h2 className="absolute left-1/2 -translate-x-1/2 text-sm sm:text-base font-semibold text-slate-800 px-4">
              Edit Vehicle
            </h2>
            <button
              aria-label="Close"
              onClick={onClose}
              className="ml-auto text-slate-500 hover:text-slate-700 text-lg sm:text-xl flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <form
            className="p-4 sm:p-6 space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (validate()) {
                onSubmit?.();
              }
            }}
            noValidate
          >
            {/* Vehicle type selector with top label */}
            <div className="flex items-center justify-center gap-4 sm:gap-10 mb-3 sm:mb-4 pb-3 sm:pb-4">
              {/* Car */}
              <button
                type="button"
                onClick={() => setVehicleType("car")}
                className={`relative flex flex-col items-center justify-end w-24 sm:w-28 h-20 sm:h-24 rounded-xl border-2 transition-all duration-200 ${
                  vehicleType === "car"
                    ? "border-[#266DDF]"
                    : "border-[#ffffff]"
                }`}
                aria-pressed={vehicleType === "car"}
              >
                <span
                  className={`absolute top-0 px-2 py-1 rounded-b-sm text-[11px] sm:text-xs ${
                    vehicleType === "car"
                      ? "bg-[#E2A701]/90 text-[#1F2937]"
                      : "bg-[#FFF8E6] text-slate-600"
                  }`}
                >
                  Car
                </span>
                <img
                  loading="lazy"
                  src={vehicleType === "car" ? carColor : carOutline}
                  alt={vehicleType === "car" ? "Car selected" : "Car"}
                  className="h-6 sm:h-7 w-auto mb-2"
                />
              </button>

              {/* Bike */}
              <button
                type="button"
                onClick={() => setVehicleType("bike")}
                className={`relative flex flex-col items-center justify-end w-24 sm:w-28 h-20 sm:h-24 rounded-xl border-2 transition-all duration-200 ${
                  vehicleType === "bike"
                    ? "border-[#266DDF] "
                    : "border-[#ffffff]"
                }`}
                aria-pressed={vehicleType === "bike"}
              >
                <span
                  className={`absolute top-0 px-2 py-1 rounded-b-sm text-[11px] sm:text-xs ${
                    vehicleType === "bike"
                      ? "bg-[#E2A701]/90 text-[#1F2937]"
                      : "bg-[#FFF8E6] text-slate-600"
                  }`}
                >
                  Bike
                </span>
                <img
                  loading="lazy"
                  src={vehicleType === "bike" ? bikeColor : bikeOutline}
                  alt={vehicleType === "bike" ? "Bike selected" : "Bike"}
                  className="h-6 sm:h-7 w-auto mb-2"
                />
              </button>
            </div>

            {/* Fields */}
            <div>
              <label className="block text-slate-700 mb-0.5 text-xs">
                Enter Vehicle Number*
              </label>
              <input
                type="text"
                inputMode="text"
                name="vehicleNumber1"
                placeholder="Enter Vehicle Number"
                className={`${inputBase} ${errors.vehicleNumber1 ? borderErr : borderOk}`}
                value={vehicleNumber1}
                onChange={(e) => setVehicleNumber1(e.target.value)}
                aria-invalid={!!errors.vehicleNumber1}
                aria-describedby={errors.vehicleNumber1 ? "err-vn1" : undefined}
                pattern="[A-Za-z]{2}[0-9]{2}[A-Za-z]{1,2}[0-9]{4}"
              />
              {errors.vehicleNumber1 && (
                <p id="err-vn1" className="mt-1 text-[11px] text-red-600">
                  {errors.vehicleNumber1}
                </p>
              )}
            </div>

            {/* OR */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 border-t border-slate-300" />
              <span className="text-slate-500 text-xs">OR</span>
              <div className="flex-1 border-t border-slate-300" />
            </div>

            {/* Select Brand* (uses manufactureYear state under the hood) */}
            <div>
              <label className="block text-slate-700 mb-0.5 text-xs">
                Enter Brand*
              </label>
              <input
                type="text"
                name="brand"
                placeholder="Enter Brand"
                className={`${inputBase} ${errors.manufactureYear ? borderErr : borderOk}`}
                value={manufactureYear}
                onChange={(e) => setManufactureYear(e.target.value)}
                aria-invalid={!!errors.manufactureYear}
                aria-describedby={errors.manufactureYear ? "err-brand" : undefined}
              />
              {errors.manufactureYear && (
                <p id="err-brand" className="mt-1 text-[11px] text-red-600">
                  {errors.manufactureYear}
                </p>
              )}
            </div>

            {/* Select Model* (uses modelNumber state) */}
            <div>
              <label className="block text-slate-700 mb-0.5 text-xs">
                Enter Model*
              </label>
              <input
                type="text"
                name="model"
                placeholder="Enter Model"
                className={`${inputBase} ${errors.modelNumber ? borderErr : borderOk}`}
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
                aria-invalid={!!errors.modelNumber}
                aria-describedby={errors.modelNumber ? "err-model" : undefined}
              />
              {errors.modelNumber && (
                <p id="err-model" className="mt-1 text-[11px] text-red-600">
                  {errors.modelNumber}
                </p>
              )}
            </div>

            {/* Select Fuel Type* */}
            <div>
              <label className="block text-slate-700 mb-0.5 text-xs">
                Enter Fuel Type*
              </label>
              <input
                type="text"
                name="fuelType"
                placeholder="Enter Fuel Type"
                className={`${inputBase} ${errors.fuelType ? borderErr : borderOk}`}
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                aria-invalid={!!errors.fuelType}
                aria-describedby={errors.fuelType ? "err-fuel" : undefined}
                list="fuel-options"
              />
              {errors.fuelType && (
                <p id="err-fuel" className="mt-1 text-[11px] text-red-600">
                  {errors.fuelType}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-start gap-2 pt-2 sm:pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 sm:px-8 py-2 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition text-xs sm:text-sm w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 sm:px-8 py-2 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition text-xs sm:text-sm w-full sm:w-auto"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* fuel datalist (optional suggestions) */}
      <datalist id="fuel-options">
        <option>Petrol</option>
        <option>Diesel</option>
        <option>CNG</option>
        <option>EV</option>
        <option>Electric</option>
        <option>Hybrid</option>
        <option>LPG</option>
      </datalist>
    </>
  );
};

export default Modal;
