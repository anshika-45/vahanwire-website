import React, { useEffect, useState } from "react";
import carColor from "../assets/CarFill.svg";
import carOutline from "../assets/CarFade.svg";
import bikeColor from "../assets/BikeFill.svg";
import bikeOutline from "../assets/BikeFade.svg";
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
    if (!open) {
      setForm({
        vehicleNumber: "",
        brand: "",
        model: "",
        year: "",
        fuelType: "",
      });
      setErrors({});
      setTouched({});
      setSubmitError("");
      setVehicleType("car");
    }
  }, [open]);

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
        if (value.length < 2) return "Brand must be at least 2 characters";
        return "";
      case "model":
        if (!value.trim()) return "Model is required";
        return "";
      case "year": {
        if (!value.trim()) return "Year is required";
        const yearNum = +value;
        const curr = new Date().getFullYear();
        if (yearNum < 1900 || yearNum > curr + 1)
          return `Year must be between 1900 and ${curr + 1}`;
        return "";
      }
      case "fuelType": {
        if (!value.trim()) return "Fuel type is required";
        const valid = ["petrol", "diesel", "electric", "cng", "hybrid", "lpg"];
        if (!valid.includes(value.toLowerCase()))
          return "Invalid fuel type (try Petrol, Diesel, Electric, etc.)";
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
    const newValue = name === "vehicleNumber" ? value.toUpperCase() : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, newValue),
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
      brand: form.brand.trim(),
      model: form.model.trim(),
      fuelType: form.fuelType.trim().toUpperCase(),
      year: form.year,
    };

    try {
      const res = await addUserVehicle(payload);
      console.log("add vehicle response", res);
      if (res?.success || res?.data?.success) {
        alert("Vehicle added successfully!");
        onSubmit?.();
        onClose();
      } else {
        setSubmitError(res?.data?.message || "Failed to add vehicle");
      }
    } catch (err) {
      setSubmitError("An error occurred while adding the vehicle");
    }

    setLoading(false);
  };

  if (!open) return null;

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-3 sm:p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#D9E7FE] rounded-t-2xl px-4 sm:px-6 py-3 sm:py-4 border-b">
            <h2 className="font-semibold text-center flex-1 text-sm sm:text-base">
              Add New Vehicle
            </h2>
            <button onClick={onClose} className="text-slate-600 text-lg">
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 text-sm">
            {/* Vehicle type toggle */}
            <div className="flex justify-center gap-4">
              {["car", "bike"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVehicleType(type)}
                  className={`relative flex flex-col items-center w-28 h-24 rounded-xl ${
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
                    className="h-7 mt-8"
                  />
                </button>
              ))}
            </div>

            {/* Form Inputs */}
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
                {loading ? "Adding..." : "Add Vehicle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddVehicleModal;
