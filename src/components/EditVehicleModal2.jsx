import React, { useEffect, useState } from "react";
// image imports (adjust paths if your assets live elsewhere)
import carColor from "../assets/CarFill.svg";
import carOutline from "../assets/CarFade.svg";
import bikeColor from "../assets/BikeFill.svg";
import bikeOutline from "../assets/BikeFade.svg";

/**
 * EditVehicleModal2
 * - Enhanced validations for vehicleNumber, brand, model
 * - Rejects gibberish like repeated chars, only-numbers, no-vowels (for longer strings), etc.
 * - Validates vehicle number state code against a known list of Indian state codes
 *
 * Note: backend must still re-validate before saving (never trust client only).
 */

export default function EditVehicleModal2({
  open,
  onClose = () => {},
  onSubmit = () => {},
  initial = null,
  initialVehicleType = null,
}) {
  const [vehicleType, setVehicleType] = useState("car");
  const [form, setForm] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // infer vehicle type from various sources
  const inferVehicleType = () => {
    // precedence: initialVehicleType prop -> initial.vehicleType -> initial.vehicleInfo -> initial.vehicle (text) -> default car
    const pref =
      initialVehicleType ||
      (initial && initial.vehicleType) ||
      (initial && initial.vehicleInfo) ||
      (initial && initial.vehicle) ||
      "";
    if (!pref) return "car";
    const p = String(pref).toLowerCase();
    if (
      p.includes("bike") ||
      p.includes("motor") ||
      p.includes("two") ||
      p.includes("scooter") ||
      p.includes("motorcycle")
    )
      return "bike";
    if (
      p.includes("car") ||
      p.includes("auto") ||
      p.includes("four") ||
      p.includes("sedan") ||
      p.includes("hatch")
    )
      return "car";
    // fallback to car
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
      });
    } else {
      setForm({
        vehicleNumber: "",
        brand: "",
        model: "",
      });
    }

    setErrors({});
    setTouched({});
    setSubmitError("");
    setIsSubmitting(false);
  }, [initial, initialVehicleType, open]);

  const isEditMode = !!(initial || initialVehicleType);

  const formatVehicleNumber = (value) =>
    String(value || "")
      .replace(/\s/g, "")
      .replace(/-/g, "")
      .toUpperCase();

  // --- Helper heuristics for brand/model validation ---
  const normalize = (s = "") =>
    String(s)
      .normalize?.("NFC")
      .replace(/\s+/g, " ")
      .trim();

  const hasVowel = (s = "") => /[aeiou]/i.test(s);
  const hasRepeatedChars = (s = "") => /(.)\1\1/.test(s); // 3 same chars in row
  const isMostlyNumeric = (s = "") => {
    const digits = (s.match(/\d/g) || []).length;
    return digits / Math.max(1, s.length) > 0.5;
  };
  const isMostlySymbols = (s = "") => {
    const lettersOrDigits = (s.match(/[A-Za-z0-9]/g) || []).length;
    return lettersOrDigits === 0;
  };

  // Indian state codes (common) for basic validation of first 2 letters of reg no.
  const STATE_CODES = new Set([
    "AP","AR","AS","BR","CG","GA","GJ","HR","HP","JK","JH","KA","KL","LD","MP","MH","MN","ML","MZ","NL",
    "OR","PB","RJ","SK","TN","TG","TR","UP","UT","WB","DL","DL1","DL2" // include DL variants loosely (mainly check DL)
  ]);

  // Validate single field and return string message or empty if valid
  const validateField = (name, value) => {
    const raw = value === undefined || value === null ? "" : String(value);
    const v = normalize(raw);

    switch (name) {
      case "vehicleNumber": {
        if (!v) return "Vehicle number is required";
        const clean = formatVehicleNumber(v);

        // Basic pattern: 2 letters (state), 1-2 digits (district), 1-4 letters, 1-4 digits
        const vehicleNumberRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,4}[0-9]{1,4}$/;
        if (!vehicleNumberRegex.test(clean))
          return "Invalid number. Example: MH12AB1234 or DL3S9999";

        if (clean.length < 6 || clean.length > 12)
          return "Vehicle number should be between 6 and 12 characters";

        // Validate state code specifically (first two letters)
        const stateCode = clean.slice(0, 2);
        if (!STATE_CODES.has(stateCode)) {
          // allow "DL" and common codes - if not in set, still show suggestion but not hard block for uncommon codes
          return `Unknown state code "${stateCode}". Please check the first two letters (e.g., MH, DL, KA)`;
        }

        // extra heuristic: avoid nonsense like 'AA11AAAA' (too many repeated letters)
        if (/(?:[A-Z])\1\1\1/.test(clean)) return "Invalid vehicle number (repeated letters detected)";

        return "";
      }

      case "brand": {
        if (!v) return "Brand is required";
        if (v.length < 2) return "Brand name must be at least 2 characters";
        if (v.length > 50) return "Brand name cannot exceed 50 characters";

        // allowed characters: letters, numbers, spaces, &, ., -, ()
        if (!/^[\p{L}0-9\s&.\-()\/]+$/u.test(v)) {
          return "Brand can contain letters, numbers, spaces and & . - ( ) / characters";
        }

        if (isMostlySymbols(v)) return "Brand looks invalid";
        if (hasRepeatedChars(v)) return "Brand looks invalid (repeated characters)";
        if (isMostlyNumeric(v)) return "Brand cannot be mostly numbers";

        // for longer brand names ensure at least one vowel present (helps avoid gibberish)
        if (v.length >= 4 && !hasVowel(v)) return "Brand looks invalid";

        // additional helpful heuristic: common garbage strings
        const lower = v.toLowerCase();
        const blacklist = ["asdf", "qwer", "test", "ghjkl", "zzz", "xxx", "abc", "gkhk", "kholjpi", "giho"];
        if (blacklist.some((b) => lower.includes(b))) return "Brand looks invalid";

        return "";
      }

      case "model": {
        if (!v) return "Model is required";
        if (v.length > 60) return "Model name cannot exceed 60 characters";

        // allow short technical names (i3, X7, K10) so min length 1
        if (!/^[\p{L}0-9\s&.\-()#\/]+$/u.test(v)) {
          return "Model can contain letters, numbers, spaces and . - ( ) # / characters";
        }

        if (isMostlySymbols(v)) return "Model looks invalid";
        if (hasRepeatedChars(v)) return "Model looks invalid (repeated characters)";

        // if model is longer, require it to contain at least one vowel or a number (avoid gibberish)
        if (v.length >= 4 && !hasVowel(v) && !/\d/.test(v)) {
          return "Model looks invalid — please provide a proper model name";
        }

        // reject clear garbage
        const lowerM = v.toLowerCase();
        const blacklistModel = ["asdf", "qwer", "test", "guy98", "gkhk", "zzzz", "abc", "kholjpi"];
        if (blacklistModel.some((b) => lowerM.includes(b))) return "Model looks invalid";

        return "";
      }

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((k) => {
      newErrors[k] = validateField(k, form[k]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reject invalid characters for specific fields (sanitization)
    let processed = value;
    if (name === "vehicleNumber") {
      processed = formatVehicleNumber(value);
    } else if (name === "brand" || name === "model") {
      // allow unicode letters, numbers, spaces and & . - ( ) / #
      // remove control chars and most punctuation
      processed = value.replace(/[<>$;"`\\|@%{}[\]^~]/g, "");
      // don't aggressively strip valid unicode letters, allow them
    }

    setForm((p) => ({ ...p, [name]: processed }));
    setSubmitError("");

    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validateField(name, processed) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const processed = name === "vehicleNumber" ? formatVehicleNumber(value) : value;
    setForm((p) => ({ ...p, [name]: processed }));
    setErrors((p) => ({ ...p, [name]: validateField(name, processed) }));
  };

  const hasValidationErrors = () => {
    return Object.keys(form).some((field) => touched[field] && errors[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    if (!validateForm()) {
      setSubmitError("Please fix validation errors before saving.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        vehicleNumber: formatVehicleNumber(form.vehicleNumber),
        vehicleType,
        brand: normalize(form.brand).trim(),
        model: normalize(form.model).trim(),
      };

      await onSubmit(payload);
      onClose();
    } catch (error) {
      setSubmitError(error?.message || "Failed to update vehicle. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  // show colored image for selected type, outline for the other if you ever toggle
  const carSrc = vehicleType === "car" ? carColor : carOutline;
  const bikeSrc = vehicleType === "bike" ? bikeColor : bikeOutline;

  // Only show one image (the inferred/selected vehicle). Clicking it toggles between types (optional).
  const displayedSrc = vehicleType === "car" ? carSrc : bikeSrc;
  const displayedAlt = vehicleType === "car" ? "Car" : "Bike";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[9998]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[9999] grid place-items-center p-2 sm:p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
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
                  Enter Vehicle Number
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
                  placeholder="Enter Vehicle Number"
                  maxLength={15}
                />
                {errors.vehicleNumber && touched.vehicleNumber && (
                  <p className="text-red-600 text-xs mt-1">{errors.vehicleNumber}</p>
                )}
              </div>

              <div className="flex items-center gap-4 py-1">
                <div className="flex-1 border-t border-slate-300" />
                <span className="text-slate-500 text-xs">OR</span>
                <div className="flex-1 border-t border-slate-300" />
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
                <div className="bg-red-50 border border-red-300 rounded-lg px-3 py-2 text-red-700 text-xs sm:text-sm">
                  {submitError}
                </div>
              )}

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
                  disabled={isSubmitting || hasValidationErrors()}
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
