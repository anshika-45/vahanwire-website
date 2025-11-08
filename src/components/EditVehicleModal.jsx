import React, { useEffect, useState } from "react";
import carColor from "../assets/CarFill.webp";
import carOutline from "../assets/CarFade.webp";
import bikeColor from "../assets/BikeFill.webp";
import bikeOutline from "../assets/BikeFade.webp";
import { updateUserVehicle } from "../api/vehicleApi";

const Backdrop = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/40 z-[9998]"
    onClick={onClose}
    aria-hidden="true"
  />
);

const EditVehicleModal = ({ open, onClose, onSubmit, initial }) => {
  const [vehicleType, setVehicleType] = useState("car");
  const [form, setForm] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
    year: "",
    fuelType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (initial) {
      setVehicleType(initial.vehicleType || "car");
      setForm({
        vehicleNumber: initial.vehicleNumber || "",
        brand: initial.brand || "",
        model: initial.model || "",
        year: initial.year || "",
        fuelType: initial.fuelType || "",
      });
    }
  }, [initial]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const cleanReg = (v) => (v || "").toUpperCase().replace(/[\s-]/g, "");
  const isValidReg = (v) => /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(cleanReg(v));
  const allowedFuel = ["PETROL", "DIESEL", "CNG", "EV", "ELECTRIC", "HYBRID", "LPG"];
  const isValidFuel = (v) => allowedFuel.includes((v || "").trim().toUpperCase());
  const isNonEmpty2 = (v) => (v || "").trim().length >= 2;

  const validate = () => {
    if (!form.vehicleNumber || !isValidReg(form.vehicleNumber)) {
      setError("Enter a valid vehicle number (e.g., DL01AB1234).");
      return false;
    }
    if (!isNonEmpty2(form.brand)) {
      setError("Brand is required (min 2 characters).");
      return false;
    }
    if (!isNonEmpty2(form.model)) {
      setError("Model is required (min 2 characters).");
      return false;
    }
    if (!form.fuelType) {
      setError("Fuel type is required.");
      return false;
    } else if (!isValidFuel(form.fuelType)) {
      setError("Allowed: Petrol, Diesel, CNG, EV, Electric, Hybrid, LPG.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const updateData = {
      vehicleNumber: cleanReg(form.vehicleNumber),
      vehicleType,
      brandName: form.brand.trim(),
      modelName: form.model.trim(),
      fuelType: form.fuelType.trim().toUpperCase()
    };
    await updateUserVehicle(initial._id, updateData);
    onSubmit?.();
    setLoading(false);
  };

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-3 sm:p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200">
          <div className="relative px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-[#D9E7FE] rounded-t-2xl">
            <h2 className="absolute left-1/2 -translate-x-1/2 text-sm sm:text-base font-semibold text-slate-800">
              Edit Vehicle Details
            </h2>
            <button
              aria-label="Close"
              onClick={onClose}
              className="ml-auto text-slate-500 hover:text-slate-700 text-lg sm:text-xl"
            >
              ✕
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10 mb-4 pb-4 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setVehicleType("car")}
                className={`flex flex-col items-center justify-center w-20 sm:w-24 h-20 sm:h-24 rounded-xl border-2 transition-all duration-200 ${
                  vehicleType === "car"
                    ? "border-blue-600 bg-[#D9E7FE]"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
                aria-pressed={vehicleType === "car"}
              >
                <span
                  className={`font-medium text-xs mb-1 ${
                    vehicleType === "car" ? "text-blue-700" : "text-slate-600"
                  }`}
                >
                  Car
                </span>
                <img
                  src={vehicleType === "car" ? carColor : carOutline}
                  alt={vehicleType === "car" ? "Car selected" : "Car"}
                  loading="lazy"
                  className="h-6 sm:h-7 w-auto"
                />
              </button>

              <button
                type="button"
                onClick={() => setVehicleType("bike")}
                className={`flex flex-col items-center justify-center w-20 sm:w-24 h-20 sm:h-24 rounded-xl border-2 transition-all duration-200 ${
                  vehicleType === "bike"
                    ? "border-blue-600 bg-[#D9E7FE]"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
                aria-pressed={vehicleType === "bike"}
              >
                <span
                  className={`font-medium text-xs mb-1 ${
                    vehicleType === "bike" ? "text-blue-700" : "text-slate-600"
                  }`}
                >
                  Bike
                </span>
                <img
                  src={vehicleType === "bike" ? bikeColor : bikeOutline}
                  alt={vehicleType === "bike" ? "Bike selected" : "Bike"}
                  loading="lazy"
                  className="h-6 sm:h-7 w-auto"
                />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 text-xs sm:text-sm"
            >
              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Vehicle Number
                </label>
                <input
                  name="vehicleNumber"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                  required
                  className="w-full h-8 sm:h-9 border border-slate-300 rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none"
                  placeholder="Enter Vehicle Number"
                />
              </div>

              <div className="flex items-center gap-4 py-1">
                <div className="flex-1 border-t border-slate-300" />
                <span className="text-slate-500 text-xs">OR</span>
                <div className="flex-1 border-t border-slate-300" />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Manufacture Year
                </label>
                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full h-8 sm:h-9 border border-slate-300 rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none"
                  placeholder="Enter Manufacture Year"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Fuel Type
                </label>
                <input
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                  className="w-full h-8 sm:h-9 border border-slate-300 rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none"
                  placeholder="Enter Fuel Type"
                  list="fuel-options"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Brand
                </label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  required
                  className="w-full h-8 sm:h-9 border border-slate-300 rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none"
                  placeholder="Enter Brand"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Model
                </label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  required
                  className="w-full h-8 sm:h-9 border border-slate-300 rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none"
                  placeholder="Enter Model"
                />
              </div>

              {error && (
                <p className="text-red-600 text-xs sm:text-sm mt-1 text-center">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row justify-start gap-2 pt-2 sm:pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="py-2 px-6 sm:px-8 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition w-full sm:w-auto whitespace-nowrap disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 sm:px-8 py-2 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition w-full sm:w-auto disabled:opacity-60 whitespace-nowrap"
                >
                  {loading ? "Updating..." : "Update Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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

export default EditVehicleModal;