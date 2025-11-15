import React, { useState, Suspense } from "react";
import { createContact } from "../api/authApi";
import { MailOpen, Phone, MapPin } from "lucide-react";
import contactBanner from "../assets/ContactUs.svg";
import contactImage from "../assets/ContactUs2.svg";

const AddBanner = React.lazy(() => import("../components/AddBanner"));
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const validateForm = () => {
  let newErrors = {};

  // Full Name Validation
  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full name is required.";
  } else if (/\d/.test(formData.fullName)) {
    newErrors.fullName = "Name should not contain numbers.";
  } else if (formData.fullName.trim().length < 3) {
    newErrors.fullName = "Name must be at least 3 characters.";
  }

  // Email Validation
  if (!formData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = "Enter a valid email.";
  }

  // Phone Number Validation
  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
    newErrors.phoneNumber =
      "Phone must start with 6-9 and be exactly 10 digits.";
  }

  // Reason Validation
  if (!formData.reason.trim()) {
    newErrors.reason = "Reason is required.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleChange = (e) => {
  const { id, value } = e.target;

  // Prevent letters in phone
  if (id === "phoneNumber" && /[^0-9]/.test(value)) return;

  setFormData({ ...formData, [id]: value });
  setErrors({ ...errors, [id]: "" });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await createContact(formData);
      setMessage({ type: "success", text: response.message });
      setFormData({ fullName: "", email: "", phoneNumber: "", reason: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.message || "Failed to submit contact form.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Suspense fallback={<ComponentFallback />}>
        <PageBanner
          title="Contact Us"
          image={contactBanner}
          useGradientTitle={false}
          useDarkOverlay={false}
          showTicker={false}
          height="250px"
        />
      </Suspense>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch">

        {/* LEFT SIDE CARD */}
        <div className="relative rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${contactImage})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="relative top-26 z-10 p-8 md:p-10 flex flex-col justify-end h-[360px] md:h-[420px]">
            <h2 className="text-3xl md:text-4xl sm:text-lg font-medium text-white mb-4">
              Contact Us
            </h2>

            <div className="flex flex-wrap items-center md:gap-6 gap-6 sm:gap-2 text-white/70 mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#FBBA01] rounded-full p-2">
                  <MailOpen size={16} className="text-black" />
                </div>
                <span>Info@Vahanwire.com</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-[#FBBA01] rounded-full p-2">
                  <MailOpen size={16} className="text-black" />
                </div>
                <span>Amc@Vahanwire.com</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-[#FBBA01] rounded-full p-2">
                  <Phone size={16} className="text-black" />
                </div>
                <span>0120 3221368</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#FBBA01] rounded-full p-2">
                <MapPin size={16} className="text-black" />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                TOWER B-819, Noida One, 819, Industrial Area, Sector 62,
                Noida, Uttar Pradesh 201309
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Welcome to VahanWire!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#266DDF]"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-2">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#266DDF]"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number*</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#266DDF]"
              />
              {errors.phoneNumber && (
                <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* REASON */}
            <div>
              <label className="block text-sm font-medium mb-2">Reason*</label>
              <input
                type="text"
                name="reason"
                id="reason"
                placeholder="Enter reason "
                value={formData.reason}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#266DDF]"
              />
              {errors.reason && (
                <p className="text-red-600 text-sm mt-1">{errors.reason}</p>
              )}
            </div>

            {message && (
              <p
                className={`text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-gray-400" : "bg-[#266DDF] hover:bg-[#1E5BC0]"
              } text-white py-3 rounded-lg text-sm transition shadow-sm`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

