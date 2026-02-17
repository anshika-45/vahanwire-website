import React, { useState } from "react";
import { X } from "lucide-react";

export default function RegisterMechanicForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    brand: "",
    serviceType: "",
    serviceLocation: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name should not contain numbers.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone must start with 6-9 and be exactly 10 digits.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    // Brand validation
    if (!formData.brand.trim()) {
      newErrors.brand = "Brand selection is required.";
    }

    // Service Type validation
    if (!formData.serviceType.trim()) {
      newErrors.serviceType = "Service type is required.";
    }

    // Service Location validation
    if (!formData.serviceLocation.trim()) {
      newErrors.serviceLocation = "Service location is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Prevent letters in phone number
    if (id === "phoneNumber" && /[^0-9]/.test(value)) return;

    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Form Data:", formData);
    alert("Your form submitted successfully");
    onClose();
  };

  return (
    <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl w-full relative max-h-[75vh] flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 sm:top-3 sm:right-6 p-1 bg-gray-100 border border-gray-200 hover:bg-gray-200 rounded-full z-10 transition"
      >
        <X size={20} strokeWidth={3} className="text-gray-600" />
      </button>

      <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-2 flex-shrink-0">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center mb-0 pr-8">
          Register As a Mechanic
        </h2>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="space-y-5 px-6 sm:px-8 py-2 overflow-y-auto flex-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          form::-webkit-scrollbar {
            display: none;
          }
        `}</style>

    
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Name*
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>

 
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Phone Number*
          </label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition"
          />
          {errors.phoneNumber && (
            <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* EMAIL ADDRESS */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
          )}
        </div>

   
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Mention Brand*
          </label>
          <select
            id="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            <option value="">Select a brand</option>
            <option value="Maruti Suzuki">Maruti Suzuki</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Tata">Tata</option>
            <option value="Honda">Honda</option>
          </select>
          {errors.brand && (
            <p className="text-red-600 text-xs mt-1">{errors.brand}</p>
          )}
        </div>

        {/* SERVICE TYPE */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Services Type*
          </label>
          <select
            id="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            <option value="">Select service type</option>
            <option value="Car Wash">Car Wash</option>
            <option value="Repair">Repair</option>
            <option value="Servicing">Servicing</option>
          </select>
          {errors.serviceType && (
            <p className="text-red-600 text-xs mt-1">{errors.serviceType}</p>
          )}
        </div>

        {/* SERVICE LOCATION */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Services Location*
          </label>
          <select
            id="serviceLocation"
            value={formData.serviceLocation}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            <option value="">Select location</option>
            <option value="Noida Sector 10">Noida Sector 10</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>
          {errors.serviceLocation && (
            <p className="text-red-600 text-xs mt-1">{errors.serviceLocation}</p>
          )}
        </div>
      </form>

      <div className="px-6 sm:px-8 py-3 pb-6 flex-shrink-0">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-[#266DDF] hover:bg-[#1E5BC0] text-white py-3 rounded-lg text-sm transition shadow-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
