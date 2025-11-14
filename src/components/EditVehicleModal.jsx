import React, { useEffect, useState } from "react";
import carColor from "../assets/CarFill.svg";
import carOutline from "../assets/CarFade.svg";
import bikeColor from "../assets/BikeFill.svg";
import bikeOutline from "../assets/BikeFade.svg";
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
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
      setErrors({});
      setTouched({});
    }
  }, [initial]);

  const validateField = (name, value) => {
    switch (name) {
      case "vehicleNumber": {
        const clean = value.replace(/\s/g, "").toUpperCase();
        if (!clean) return "Vehicle number is required";
        const regex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,4}[0-9]{3,4}$/;
        if (!regex.test(clean))
          return "Please enter a valid number (e.g., DL01AB1234)";
        if (clean.length < 8 || clean.length > 12)
          return "Vehicle number should be 8–12 characters";
        return "";
      }
  
      case "brand":
        if (!value.trim()) return "Brand is required";
        if (/\d/.test(value.trim())) return "Brand cannot contain numbers";
        if (value.trim().length < 2) return "Brand must be at least 2 characters";
        if (value.trim().length > 20) return "Brand cannot exceed 20 characters";
        return "";
  
      case "model":
        if (!value.trim()) return "Model is required";
        if (value.trim().length > 25)
          return "Model cannot exceed 25 characters";
        return "";
  
      case "year": {
        if (!value.trim()) return "Year is required";
        if (!/^\d{4}$/.test(value)) return "Enter a valid 4-digit year";
        const yearNum = Number(value);
        const curr = new Date().getFullYear();
        if (yearNum < 1900 || yearNum > curr + 1)
          return `Year must be between 1900 and ${curr + 1}`;
        return "";
      }
  
      case "fuelType": {
        if (!value.trim()) return "Fuel type is required";
        const valid = ["petrol", "diesel", "electric", "cng", "hybrid", "lpg"];
        if (!valid.includes(value.toLowerCase()))
          return "Invalid fuel type (try Petrol, Diesel, Electric)";
        return "";
      }
  
      default:
        return "";
    }
  };  

  const validateForm = () => {
    const newErrors = {};
    for (const key of Object.keys(form)) {
      newErrors[key] = validateField(key, form[key]);
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;
  
    if (name === "vehicleNumber") {
      cleanValue = cleanValue.toUpperCase().replace(/\s+/g, "");
    }
  
    if (name === "year") {
      cleanValue = cleanValue.replace(/\D/g, "");
      if (cleanValue.length > 4) cleanValue = cleanValue.slice(0, 4);
    }
  
    if (name === "brand") {
      cleanValue = cleanValue.replace(/[0-9]/g, "");
      cleanValue = cleanValue.replace(/\s+/g, " ");
      cleanValue = cleanValue.slice(0, 20);
    }
  
    if (name === "model") {
      cleanValue = cleanValue.replace(/\s+/g, " ");
      cleanValue = cleanValue.slice(0, 25);
    }
  
    setForm((prev) => ({ ...prev, [name]: cleanValue }));
  
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, cleanValue),
      }));
    }
  };
  

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const allTouched = Object.keys(form).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (!validateForm()) {
      setSubmitError("Vehicle Data is invalid");
      return;
    }

    setLoading(true);

    const payload = {
      vehicleNumber: form.vehicleNumber.replace(/\s/g, ""),
      vehicleType,
      brandName: form.brand.trim(),
      modelName: form.model.trim(),
      fuelType: form.fuelType.trim().toUpperCase(),
      year: form.year,
    };

    try {
      const res = await updateUserVehicle(initial._id, payload);
      if (res?.data?.success || res?.success) {
        alert("Vehicle updated successfully!");
        onSubmit?.();
        onClose();
      } else {
        setSubmitError(res?.data?.message || "Failed to update vehicle");
      }
    } catch (err) {
      setSubmitError("An error occurred while updating the vehicle");
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-3 sm:p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200">
          <div className="flex justify-between items-center bg-[#D9E7FE] rounded-t-2xl px-4 sm:px-6 py-3 sm:py-4 border-b">
            <h2 className="font-semibold text-center flex-1 text-sm sm:text-base">
              Edit Vehicle Details
            </h2>
            <button onClick={onClose} className="text-slate-600 text-lg">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 text-sm">
            <div className="flex justify-center gap-4">
              {["car", "bike"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVehicleType(type)}
                  className={`relative flex flex-col items-center w-28 h-18 rounded-xl ${
                    vehicleType === type
                      ? "border-[#266DDF] bg-[#ECF3FD]"
                      : "border border-transparent hover:bg-[#ECF3FD]"
                  }`}
                >
                  <span
                    className={`absolute top-0 px-3 py-0.5 rounded-b-md text-[11px] font-semibold ${
                      vehicleType === type
                        ? "bg-[#E2A701] text-white"
                        : "bg-[#FFF8E6] text-black"
                    }`}
                  >
                    {type === "car" ? "Car" : "Bike"}
                  </span>
                  <img
                    src={
                      type === "car"
                        ? vehicleType === "car"
                          ? carColor
                          : carOutline
                        : vehicleType === "bike"
                        ? bikeColor
                        : bikeOutline
                    }
                    alt={type}
                    className="h-8 mt-8"
                  />
                </button>
              ))}
            </div>

            {["vehicleNumber", "year", "fuelType", "brand", "model"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-slate-700 mb-1 capitalize">
                    {field === "vehicleNumber"
                      ? "Vehicle Number"
                      : field === "fuelType"
                      ? "Fuel Type"
                      : field}
                  </label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#D9E7FE] outline-none ${
                      errors[field] && touched[field]
                        ? "border-red-500 bg-red-50"
                        : "border-slate-300"
                    }`}
                    placeholder={`Enter ${field}`}
                  />
                  {errors[field] && touched[field] && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors[field]}
                    </p>
                  )}
                </div>
              )
            )}

            {submitError && (
              <p className="text-red-600 text-xs text-center bg-red-50 py-2 rounded-lg">
                {submitError}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="border-2 border-blue-600 px-6 py-2 rounded-lg text-[#266DDF] hover:bg-blue-700 hover:text-white transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="border-2 border-blue-600 px-6 py-2 rounded-lg text-[#266DDF] hover:bg-blue-700 hover:text-white transition disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Vehicle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditVehicleModal;