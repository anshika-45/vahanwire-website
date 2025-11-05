import React, { useEffect, useState } from "react";
import carColor from "../assets/CarFill.webp";
import carOutline from "../assets/CarFade.webp";
import bikeColor from "../assets/BikeFill.webp";
import bikeOutline from "../assets/BikeFade.webp";
import { addUserVehicle } from "../api/vehicleApi"; 

const Backdrop = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/40 z-[9998]"
    onClick={onClose}
    aria-hidden="true"
  />
);

const AddVehicleModal = ({ open, onClose, onSubmit }) => {
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

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        vehicleType, 
      };
      
      const res = await addUserVehicle(payload);
      console.log("ressss",res);
      if (res?.data?.data?.success || res?.data?.success) {
        alert("✅ Vehicle added successfully!");
        onSubmit?.();
        onClose();
      } else {
        setError(res?.data?.message || "Failed to add vehicle");
      }
    } catch (err) {
      console.error("Add Vehicle Failed:", err);
      setError(
        err.response?.data?.message || "Something went wrong, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-3 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-auto">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-[#D9E7FE] rounded-t-2xl">
            <h2 className="absolute left-1/2 -translate-x-1/2 text-sm sm:text-base font-semibold text-slate-800 px-4">
              Add New Vehicle Details
            </h2>
            <button
              aria-label="Close"
              onClick={onClose}
              className="ml-auto text-slate-500 hover:text-slate-700 text-lg sm:text-xl flex-shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-center gap-4 sm:gap-10 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setVehicleType("car")}
                className={`flex flex-col items-center justify-center w-20 sm:w-24 h-16 sm:h-20 rounded-xl border-2 transition-all duration-200 ${
                  vehicleType === "car"
                    ? "border-blue-600 bg-[#D9E7FE]"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <img
                  src={vehicleType === "car" ? carColor : carOutline}
                  alt="Car"
                  loading="lazy"
                  className="h-5 sm:h-6 w-auto mb-0.5"
                />
                <span
                  className={`font-medium text-xs ${
                    vehicleType === "car" ? "text-blue-700" : "text-slate-600"
                  }`}
                >
                  Car
                </span>
              </button>

              <button
                type="button"
                onClick={() => setVehicleType("bike")}
                className={`flex flex-col items-center justify-center w-20 sm:w-24 h-16 sm:h-20 rounded-xl border-2 transition-all duration-200 ${
                  vehicleType === "bike"
                    ? "border-blue-600 bg-[#D9E7FE]"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <img
                  src={vehicleType === "bike" ? bikeColor : bikeOutline}
                  alt="Bike"
                  loading="lazy"
                  className="h-5 sm:h-6 w-auto mb-0.5"
                />
                <span
                  className={`font-medium text-xs ${
                    vehicleType === "bike" ? "text-blue-700" : "text-slate-600"
                  }`}
                >
                  Bike
                </span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2 text-xs">
              <div>
                <label className="block text-slate-700 mb-0.5 text-xs">
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

              <div>
                <label className="block text-slate-700 mb-0.5 text-xs">
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
                <label className="block text-slate-700 mb-0.5 text-xs">
                  Fuel Type
                </label>
                <input
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                  className="w-full h-8 sm:h-9 border border-slate-300 rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none"
                  placeholder="Enter Fuel Type"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-0.5 text-xs">
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
                <label className="block text-slate-700 mb-0.5 text-xs">
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
                <p className="text-red-600 text-xs mt-1 text-center">{error}</p>
              )}

              <div className="flex flex-col sm:flex-row justify-start gap-2 pt-2 sm:pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-6 sm:px-8 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition text-xs sm:text-sm w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 sm:px-8 py-2 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition text-xs sm:text-sm w-full sm:w-auto disabled:opacity-60"
                >
                  {loading
                    ? "Adding..."
                    : `Add ${vehicleType === "car" ? "Car" : "Bike"}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVehicleModal;
