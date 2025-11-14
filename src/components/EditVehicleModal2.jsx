import React, { useEffect, useState } from "react";
import carColor from "../assets/CarFill.svg";
import carOutline from "../assets/CarFade.svg";
import bikeColor from "../assets/BikeFill.svg";
import bikeOutline from "../assets/BikeFade.svg";
import { updateAMCPurchaseVehicle } from "../api/vehicleApi";

export default function EditVehicleModal2({
  open,
  onClose = () => {},
  onSubmit = () => {},
  initial = null,
  initialVehicleType = null,
  purchaseId = null,
}) {
  const [vehicleType, setVehicleType] = useState("car");
  const [form, setForm] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
    year: "",
    fuelType: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const inferVehicleType = () => {
    const pref =
      initialVehicleType ||
      initial?.vehicleType ||
      initial?.vehicleInfo ||
      initial?.vehicle ||
      "";
    if (!pref) return "car";
    const p = String(pref).toLowerCase();
    if (p.includes("bike") || p.includes("motor") || p.includes("two") || p.includes("scooter") || p.includes("motorcycle"))
      return "bike";
    return "car";
  };

  useEffect(() => {
    const inferred = inferVehicleType();
    setVehicleType(inferred);

    if (initial) {
      setForm({
        vehicleNumber: initial.vehicleNumber || initial.vehicle || "",
        brand: initial.brand || initial.vehicleBrand || "",
        model: initial.model || initial.vehicleModel || "",
        year: initial.year || "",
        fuelType: initial.fuelType || "",
      });
    } else {
      setForm({
        vehicleNumber: "",
        brand: "",
        model: "",
        year: "",
        fuelType: "",
      });
    }

    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initial, initialVehicleType, open]);

  const isEditMode = !!(initial || initialVehicleType);

  const validateField = (name, value) => {
    const v = String(value || "").trim();
    
    switch (name) {
      case "vehicleNumber": {
        const clean = v.toUpperCase().replace(/\s/g, "");
        if (!clean) return "Vehicle number is required";
        const regex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,4}[0-9]{3,4}$/;
        if (!regex.test(clean)) return "Please enter a valid number (e.g., DL01AB1234)";
        if (clean.length < 8 || clean.length > 12) return "Vehicle number should be 8–12 characters";
        return "";
      }
      case "brand": {
        if (!v) return "Brand is required";
        if (/\d/.test(v)) return "Brand cannot contain numbers";
        if (v.length < 2) return "Brand must be at least 2 characters";
        if (v.length > 20) return "Brand cannot exceed 20 characters";
        return "";
      }
      case "model": {
        if (!v) return "Model is required";
        if (v.length < 2) return "Model must be at least 2 characters";
        if (v.length > 25) return "Model cannot exceed 25 characters";
        return "";
      }
      case "year": {
        if (!v) return "";
        if (!/^\d{4}$/.test(v)) return "Enter a valid 4-digit year";
        const yearNum = Number(v);
        const curr = new Date().getFullYear();
        if (yearNum < 1900 || yearNum > curr + 1) return `Year must be between 1900 and ${curr + 1}`;
        return "";
      }
      case "fuelType": {
        if (!v) return "";
        const valid = ["petrol", "diesel", "electric", "cng", "hybrid", "lpg"];
        if (!valid.includes(v.toLowerCase())) return "Invalid fuel type (try Petrol, Diesel, Electric)";
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processed = value;

    if (name === "vehicleNumber") {
      processed = value.toUpperCase().replace(/\s+/g, "");
      if (errors.vehicleNumber) {
        setErrors((p) => ({ ...p, vehicleNumber: "" }));
      }
    } else if (name === "year") {
      processed = value.replace(/\D/g, "").slice(0, 4);
    } else if (name === "brand") {
      processed = value.replace(/[0-9]/g, "").replace(/\s+/g, " ").slice(0, 20);
    } else if (name === "model") {
      processed = value.replace(/\s+/g, " ").slice(0, 25);
    } else if (name === "fuelType") {
      processed = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setForm((p) => ({ ...p, [name]: processed }));

    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validateField(name, processed) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = Object.keys(form).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    );
    setTouched(allTouched);

    const newErrors = {};
    Object.keys(form).forEach((k) => {
      newErrors[k] = validateField(k, form[k]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      const payload = {
        vehicleNumber: form.vehicleNumber.replace(/\s/g, ""),
        vehicleType,
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: form.year.trim(),
        fuelType: form.fuelType.trim(),
      };

      const actualPurchaseId = purchaseId || initial?.purchaseId;

      if (actualPurchaseId) {
        await updateAMCPurchaseVehicle(actualPurchaseId, payload);
      }

      await onSubmit(payload);
      onClose();
    } catch (error) {
      setIsSubmitting(false);
      
      const errorMessage = error?.response?.data?.message || error?.message || "";
      const errorCode = error?.response?.data?.code || error?.code;
      
      if (errorCode === 11000 || errorMessage.includes("E11000") || errorMessage.includes("duplicate key")) {
        setErrors((p) => ({ ...p, vehicleNumber: "This vehicle number already exists in your account" }));
        setTouched((p) => ({ ...p, vehicleNumber: true }));
      } else if (errorMessage.toLowerCase().includes("vehicle number already exists") || 
          errorMessage.toLowerCase().includes("already exists in your account")) {
        setErrors((p) => ({ ...p, vehicleNumber: errorMessage }));
        setTouched((p) => ({ ...p, vehicleNumber: true }));
      } else if (errorMessage.toLowerCase().includes("registered by another user")) {
        setErrors((p) => ({ ...p, vehicleNumber: errorMessage }));
        setTouched((p) => ({ ...p, vehicleNumber: true }));
      } else if (errorMessage.toLowerCase().includes("active amc")) {
        setErrors((p) => ({ ...p, vehicleNumber: errorMessage }));
        setTouched((p) => ({ ...p, vehicleNumber: true }));
      } else if (errorMessage.toLowerCase().includes("cannot edit vehicle")) {
        setErrors((p) => ({ ...p, vehicleNumber: errorMessage }));
        setTouched((p) => ({ ...p, vehicleNumber: true }));
      } else if (errorMessage) {
        setErrors((p) => ({ ...p, vehicleNumber: errorMessage }));
        setTouched((p) => ({ ...p, vehicleNumber: true }));
      } else {
        setErrors((p) => ({ ...p, vehicleNumber: "Failed to update vehicle. Please try again." }));
        setTouched((p) => ({ ...p, vehicleNumber: true }));
      }
    }
  };

  if (!open) return null;

  const displayedSrc = vehicleType === "car" ? carColor : bikeColor;
  const displayedAlt = vehicleType === "car" ? "Car" : "Bike";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[9998]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-2 sm:p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-[#D9E7FE] rounded-t-2xl">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800 flex-1 text-center">
              Edit Vehicle Details
            </h2>
            <button
              aria-label="Close"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 text-lg sm:text-xl flex-shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div
              className="relative w-36 sm:w-35 md:w-40 mx-auto rounded-lg overflow-hidden border border-blue-300"
              style={{ backgroundColor: "#E8F4FF", marginBottom: "1rem" }}
            >
              <div
                className="absolute top-0 px-3 py-0.5 rounded-b-[8px] text-[11px] font-semibold left-1/2 -translate-x-1/2"
                style={{ backgroundColor: "#FFD84D" }}
              >
                {vehicleType === "car" ? "Car" : "Bike"}
              </div>

              <div className="flex justify-center pt-8">
                <img
                  src={displayedSrc}
                  alt={displayedAlt}
                  loading="lazy"
                  className={`w-28 sm:w-30 md:w-35 object-contain ${
                    !isEditMode ? "cursor-pointer" : ""
                  }`}
                  onClick={() =>
                    !isEditMode &&
                    setVehicleType((v) => (v === "car" ? "bike" : "car"))
                  }
                />
              </div>
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
                  onBlur={handleBlur}
                  className={`w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                    errors.vehicleNumber && touched.vehicleNumber
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300"
                  }`}
                  placeholder="e.g., DL01AB1234"
                />
                {errors.vehicleNumber && touched.vehicleNumber && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.vehicleNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Brand
                </label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                    errors.brand && touched.brand
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300"
                  }`}
                  placeholder="e.g., Honda"
                />
                {errors.brand && touched.brand && (
                  <p className="text-red-600 text-xs mt-1">{errors.brand}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 text-xs sm:text-sm">
                  Model
                </label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-8 sm:h-9 border rounded-lg px-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                    errors.model && touched.model
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300"
                  }`}
                  placeholder="e.g., City"
                />
                {errors.model && touched.model && (
                  <p className="text-red-600 text-xs mt-1">{errors.model}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-start gap-2 pt-2 sm:pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="py-2 px-6 sm:px-8 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition w-full sm:w-auto whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 sm:px-8 py-2 rounded-lg border-2 border-blue-600 text-[#266DDF] font-semibold hover:bg-blue-700 hover:text-white transition w-full sm:w-auto whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}