import React, { useEffect, useState } from "react";
import carColor from "../assets/CarRed.png";
import carOutline from "../assets/CarGrey.png";
import bikeColor from "../assets/BikeRed.png";
import bikeOutline from "../assets/BikeGrey.png";
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
  const [errors, setErrors] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
    year: "",
    fuelType: "",
  });
  const [touched, setTouched] = useState({
    vehicleNumber: false,
    brand: false,
    model: false,
    year: false,
    fuelType: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const validateField = (name, value) => {
    switch (name) {
      case "vehicleNumber":
        if (!value.trim()) return "Vehicle number is required";

        const cleanValue = value.replace(/\s/g, "").toUpperCase();

        const vehicleNumberRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,4}[0-9]{3,4}$/;

        if (!vehicleNumberRegex.test(cleanValue)) {
          return "Please enter a valid vehicle number (e.g., AB12CD1234, KA01AB1234)";
        }

        if (cleanValue.length < 8 || cleanValue.length > 12) {
          return "Vehicle number should be between 8-12 characters";
        }
        return "";

      case "brand":
        if (!value.trim()) return "Brand is required";
        if (!/^[A-Za-z0-9\s&.-]+$/.test(value))
          return "Please enter a valid brand name";
        if (value.trim().length < 2)
          return "Brand name should be at least 2 characters";
        return "";

      case "model":
        if (!value.trim()) return "Model is required";
        if (!/^[A-Za-z0-9\s&.-]+$/.test(value))
          return "Please enter a valid model name";
        if (value.trim().length < 1) return "Model name is required";
        return "";

      case "year":
        if (!value.trim()) return "Manufacture year is required";
        if (!/^\d{4}$/.test(value)) return "Please enter a valid year (YYYY)";
        const yearNum = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (yearNum < 1900 || yearNum > currentYear + 1) {
          return `Year must be between 1900 and ${currentYear + 1}`;
        }
        return "";

      case "fuelType":
        if (!value.trim()) return "Fuel type is required";
        if (!/^[A-Za-z\s-]+$/.test(value))
          return "Please enter a valid fuel type";

        const validFuelTypes = [
          "petrol",
          "diesel",
          "electric",
          "cng",
          "hybrid",
          "lpg",
        ];
        if (!validFuelTypes.includes(value.toLowerCase())) {
          return "Common fuel types: Petrol, Diesel, Electric, CNG, Hybrid, LPG";
        }
        return "";

      default:
        return "";
    }
  };

  const formatVehicleNumber = (value) => {
    return value.replace(/\s/g, "").toUpperCase();
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "vehicleNumber") {
      processedValue = formatVehicleNumber(value);
    }

    setForm((prev) => ({ ...prev, [name]: processedValue }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, processedValue),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let processedValue = value;
    if (name === "vehicleNumber") {
      processedValue = formatVehicleNumber(value);
      setForm((prev) => ({ ...prev, [name]: processedValue }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, processedValue),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const allTouched = Object.keys(touched).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!validateForm()) {
      setSubmitError("Please fix all validation errors before submitting");
      return;
    }

    setLoading(true);

    const payload = {
      ...form,
      vehicleNumber: form.vehicleNumber.replace(/\s/g, ""),
      vehicleType,
    };

    try {
      const res = await addUserVehicle(payload);

      if (res?.data?.data?.success || res?.data?.success) {
        alert("Vehicle added successfully!");
        onSubmit?.();
        onClose();
        setForm({
          vehicleNumber: "",
          brand: "",
          model: "",
          year: "",
          fuelType: "",
        });
        setTouched({
          vehicleNumber: false,
          brand: false,
          model: false,
          year: false,
          fuelType: false,
        });
        setErrors({
          vehicleNumber: "",
          brand: "",
          model: "",
          year: "",
          fuelType: "",
        });
      } else {
        setSubmitError(res?.data?.message || "Failed to add vehicle");
      }
    } catch (error) {
      setSubmitError("An error occurred while adding the vehicle");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-3 sm:p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-[#D9E7FE] rounded-t-2xl">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800 flex-1 text-center">
              Add New Vehicle Details
            </h2>
            <button
              aria-label="Close"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 text-lg sm:text-xl flex-shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="p-3 sm:p-4">
            {/* Vehicle Type Buttons */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3">
              {/* Car */}
              <button
                type="button"
                onClick={() => setVehicleType("car")}
                className={`relative flex flex-col items-center justify-start w-24 h-14 sm:w-26 sm:h-16 rounded-xl border-1 transition-all duration-150 ${
                  vehicleType === "car"
                    ? "border-[#266DDF] bg-[#ECF3FD] shadow-sm"
                    : "border-[#ffffff] hover:border-[#266DDF] hover:bg-[#ECF3FD]"
                }`}
              >
                <span
                  className={`absolute top-0 px-3 py-0.5 rounded-b-[8px] text-[11px] font-semibold ${
                    vehicleType === "car"
                      ? "bg-[#E2A701] text-white"
                      : "bg-[#FFF8E6] text-black"
                  }`}
                >
                  Car
                </span>
                <img
                  src={vehicleType === "car" ? carColor : carOutline}
                  alt="Car"
                  loading="lazy"
                  className="h-7 sm:h-8 w-auto mt-8 sm:mt-7"
                />
              </button>

              <button
                type="button"
                onClick={() => setVehicleType("bike")}
                className={`relative flex flex-col items-center justify-start w-24 h-14 sm:w-26 sm:h-16 rounded-xl border-1 transition-all duration-150 ${
                  vehicleType === "bike"
                    ? "border-[#266DDF] bg-[#ECF3FD] shadow-sm"
                    : "border-[#ffffff] hover:border-[#266DDF] hover:bg-[#ECF3FD]"
                }`}
              >
                <span
                  className={`absolute top-0 px-3 py-0.5 rounded-b-[8px] text-[11px] font-semibold ${
                    vehicleType === "bike"
                      ? "bg-[#E2A701] text-white"
                      : "bg-[#FFF8E6] text-black"
                  }`}
                >
                  Bike
                </span>
                <img
                  src={vehicleType === "bike" ? bikeColor : bikeOutline}
                  alt="Bike"
                  loading="lazy"
                  className="h-7 sm:h-8 w-auto mt-8 sm:mt-7"
                />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 text-xs sm:text-sm"
            >
              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Enter Vehicle Number
                </label>
                <input
                  name="vehicleNumber"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                    errors.vehicleNumber && touched.vehicleNumber
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300"
                  }`}
                  placeholder="Enter Vehicle Number"
                  maxLength={15}
                />
                {errors.vehicleNumber && touched.vehicleNumber && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.vehicleNumber}
                  </p>
                )}
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
                  onBlur={handleBlur}
                  className={`w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                    errors.year && touched.year
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300"
                  }`}
                  placeholder="Enter Manufacture Year"
                  maxLength={4}
                />
                {errors.year && touched.year && (
                  <p className="text-red-600 text-xs mt-1">{errors.year}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Select Fuel Type
                </label>
                <input
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                    errors.fuelType && touched.fuelType
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300"
                  }`}
                  placeholder="Enter Fuel Type (e.g., Petrol, Diesel, Electric)"
                />
                {errors.fuelType && touched.fuelType && (
                  <p className="text-red-600 text-xs mt-1">{errors.fuelType}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Select Brand
                </label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                    errors.brand && touched.brand
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300"
                  }`}
                  placeholder="Enter Brand"
                />
                {errors.brand && touched.brand && (
                  <p className="text-red-600 text-xs mt-1">{errors.brand}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Select Model
                </label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                    errors.model && touched.model
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300"
                  }`}
                  placeholder="Enter Model"
                />
                {errors.model && touched.model && (
                  <p className="text-red-600 text-xs mt-1">{errors.model}</p>
                )}
              </div>

              {submitError && (
                <p className="text-red-600 text-xs sm:text-sm mt-1 text-center bg-red-50 py-2 rounded-lg">
                  {submitError}
                </p>
              )}

              <div className="flex flex-col sm:flex-row justify-start gap-2 pt-2 sm:pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-6 sm:px-8 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition w-full sm:w-auto whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 sm:px-8 py-2 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition w-full sm:w-auto disabled:opacity-60 whitespace-nowrap"
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
