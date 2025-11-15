import React, { useEffect, useState } from "react";
import carColor from "../assets/CarFill.svg";
import carOutline from "../assets/CarFade.svg";
import bikeColor from "../assets/BikeFill.svg";
import bikeOutline from "../assets/BikeFade.svg";
import {addUserVehicleWithoutAMC } from "../api/vehicleApi";

const Backdrop = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/40 z-[9998]"
    onClick={onClose}
    aria-hidden="true"
  />
);

const AddVehicleModal = ({ open, onClose, onSubmit }) => {
  const [vehicleType, setVehicleType] = useState("car");
  const [formData, setFormData] = useState({
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
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

useEffect(() => {
  if (!open) {
    setFormData({
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

const hasValidBrand = (value) => /[^a-zA-Z\s]/.test(value);

const hasValid = (value) => /[^a-zA-Z0-9\s]/.test(value);

const validateVehicleNumber = (num) => {
  const cleaned = num.trim().toUpperCase().replace(/[-\s]/g, "");
  const regex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
  if (cleaned.length < 8 || cleaned.length > 12)
    return "Vehicle number should be 8–12 characters";
  if (!regex.test(cleaned))
    return "Invalid number (e.g. MH12AB1234)";
  return "";
};
  

const validateBrand = (v) => {
  if (!v.trim()) return "Brand is required";
  if (hasValidBrand(v)) return "Brand cannot contain special characters";
  if (v.length < 2) return "Brand must be at least 2 characters";
  return "";
};

const validateModel = (v) => {
  if (!v.trim()) return "Model is required";
  if (hasValid(v)) return "Model cannot contain special characters";
  if (v.length < 2) return "Brand must be at least 2 characters";
  return "";
};

const validateYear = (y) => {
  if (!y) return "Year is required";
  if (y.length !== 4) return "Year must be 4 digits";
  const yr = Number(y);
  if (yr < 1990 || yr > new Date().getFullYear())
    return "Invalid year";
  return "";
};

const validateFuelType = (v) => {
  if (!v.trim()) return "Fuel type is required";
  const valid = ["petrol", "diesel", "electric", "cng", "hybrid", "lpg"];
  if (!valid.includes(v.toLowerCase())) return "Invalid fuel type (try Petrol, Diesel, Electric)";
  if (hasValid(v)) return "Fuel type cannot contain special characters";
  return "";
};

const validateOnBlur = (name, value) => {
  let msg = "";
  if (name === "vehicleNumber") msg = validateVehicleNumber(value);
  if (name === "brand") msg = validateBrand(value);
  if (name === "model") msg = validateModel(value);
  if (name === "year") msg = validateYear(value);
  if (name === "fuelType") msg = validateFuelType(value);

  setErrors((prev) => ({ ...prev, [name]: msg }));
};

const validateForm = () => {
  const newErrors = {
    vehicleNumber: validateVehicleNumber(formData.vehicleNumber),
    brand: validateBrand(formData.brand),
    model: validateModel(formData.model),
    year: validateYear(formData.year),
    fuelType: validateFuelType(formData.fuelType),
  };

  setErrors(newErrors);
  return !Object.values(newErrors).some((e) => e);
};

const handleChange = (e) => {
  const { name, value } = e.target;
  let clean = value;

  if (name === "vehicleNumber")
    clean = clean.toUpperCase().replace(/\s+/g, "");

  if (name === "year")
    clean = clean.replace(/[^0-9]/g, "").slice(0, 4);

  if (name === "brand")
    clean = clean.replace(/[^a-zA-Z\s]/g, "").slice(0, 20);

  if (name === "model")
    clean = clean.replace(/\s+/g, " ").slice(0, 25);

  if (name === "fuelType")
    clean = clean.replace(/[^a-zA-Z]/g, "");

  setFormData((prev) => ({ ...prev, [name]: clean }));

  if (touched[name]) validateOnBlur(name, clean);
};

const handleBlur = (e) => {
  const { name, value } = e.target;
  setTouched((prev) => ({ ...prev, [name]: true }));
  validateOnBlur(name, value);
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitError("");

  const allTouched = Object.keys(formData).reduce(
    (acc, key) => ({ ...acc, [key]: true }),
    {}
  );
  setTouched(allTouched);

  if (!validateForm()) {
    setSubmitError("Vehicle Data is invalid");
    return;
  }

  setLoading(true);

  try {
    const payload = {
      vehicleNumber: formData.vehicleNumber.trim().toUpperCase(),
      vehicleType,
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      year: formData.year.trim(),
      fuelType: formData.fuelType.trim().toLowerCase(),
    };

    const response = await addUserVehicleWithoutAMC(payload);
    console.log("kjdbwcejchbe",response);
    const data = response?.data || response;

    setLoading(false);
    console.log("Add Vehicle Response:", data);

    if (response.status === 201 || data.statusCode === 201) {
      onSubmit?.(data.data);
      onClose();
      return;
    }

    setErrors((prev) => ({
      ...prev,
      vehicleNumber: data.message || "Vehicle already exists",
    }));

  } catch (error) {
    setLoading(false);

    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to add vehicle. Try again.";

    setErrors((prev) => ({ ...prev, vehicleNumber: msg }));
  }
};

if (!open) return null;

return (
  <>
    <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-3 sm:p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200">
          <div className="flex justify-between items-center bg-[#D9E7FE] rounded-t-2xl px-4 sm:px-6 py-3 sm:py-4 border-b">
            <h2 className="font-semibold text-center flex-1 text-sm sm:text-base">
              Add New Vehicle
            </h2>
            <button onClick={onClose} className="text-slate-600 text-lg">
              ✕
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 space-y-3 text-sm"
          >
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
                    className="h-7 mt-8"
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
                    value={formData[field]}
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
                    <p className="text-red-600 text-xs mt-1">{errors[field]}</p>
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