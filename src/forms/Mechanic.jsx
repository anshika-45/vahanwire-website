import React, { useState } from "react";

const RegisterMechanic = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    brand: "",
    serviceType: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg m-4 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="mb-4 text-center text-lg font-semibold text-[#242424]">
          Register As a Mechanic
        </h2>

        <form className="space-y-3">
          <div>
            <label className="mb-2 block text-sm text-[#5C5C5C]">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-2 sm:py-3 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-sm bg-[#F8F8F8] text-[#5C5C5C]"
            />
            {errors.name && <div className="text-[#CB0200] text-left text-xs mb-2">{errors.name}</div>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#5C5C5C]">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="10-digit Phone Number"
              maxLength={10}
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, "") });
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-2 sm:py-3 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-sm bg-[#F8F8F8] text-[#5C5C5C]"
            />
            {errors.phone && <div className="text-[#CB0200] text-left text-xs mb-2">{errors.phone}</div>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-[#5C5C5C]">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-2 sm:py-3 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-sm bg-[#F8F8F8] text-[#5C5C5C]"
            />
            {errors.email && <div className="text-[#CB0200] text-left text-xs mb-2">{errors.email}</div>}
          </div>

          {/* Brand */}
          <div>
            <label className="mb-2 block text-sm text-[#5C5C5C]">
              Mention Brand<span className="text-red-500">*</span>
            </label>
            <select 
              value={formData.brand}
              onChange={(e) => {
                setFormData({ ...formData, brand: e.target.value });
                if (errors.brand) setErrors({ ...errors, brand: "" });
              }}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-2 sm:py-3 bg-[#F8F8F8] text-sm focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-[#5C5C5C]">
              <option value="">Select Brand</option>
              <option>Maruti Suzuki</option>
              <option>Hyundai</option>
              <option>Honda</option>
            </select>
            {errors.brand && <div className="text-[#CB0200] text-left text-xs mb-2">{errors.brand}</div>}
          </div>

          {/* Service Type */}
          <div>
            <label className="mb-2 block text-sm text-[#5C5C5C]">
              Services type<span className="text-red-500">*</span>
            </label>
            <select 
              value={formData.serviceType}
              onChange={(e) => {
                setFormData({ ...formData, serviceType: e.target.value });
                if (errors.serviceType) setErrors({ ...errors, serviceType: "" });
              }}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-2 sm:py-3 bg-[#F8F8F8] text-sm focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-[#5C5C5C]">
              <option value="">Select Service Type</option>
              <option>Car Wash</option>
              <option>General Service</option>
              <option>Repair</option>
            </select>
            {errors.serviceType && <div className="text-[#CB0200] text-left text-xs mb-2">{errors.serviceType}</div>}
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm text-[#5C5C5C]">
              Services Location<span className="text-red-500">*</span>
            </label>
            <select 
              value={formData.location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value });
                if (errors.location) setErrors({ ...errors, location: "" });
              }}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-2 sm:py-3 bg-[#F8F8F8] text-sm focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-[#5C5C5C]">
              <option value="">Select Location</option>
              <option>Noida Sector 10</option>
              <option>Noida Sector 18</option>
              <option>Ghaziabad</option>
            </select>
            {errors.location && <div className="text-[#CB0200] text-left text-xs mb-2">{errors.location}</div>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const newErrors = {};
              if (!formData.name.trim()) newErrors.name = "Please enter your name.";
              if (!formData.phone.trim() || formData.phone.length !== 10) newErrors.phone = "Please enter a valid 10-digit phone number.";
              if (!formData.email.trim()) newErrors.email = "Please enter a valid email.";
              if (!formData.brand) newErrors.brand = "Please select a brand.";
              if (!formData.serviceType) newErrors.serviceType = "Please select a service type.";
              if (!formData.location) newErrors.location = "Please select a location.";
              setErrors(newErrors);
            }}
            className="mt-4 w-full bg-[#266DDF] text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
          </form>
      </div>
    </div>
  );
};

export default RegisterMechanic;