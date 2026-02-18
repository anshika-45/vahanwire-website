import React, { useState } from "react";
import { X } from "lucide-react";

export default function RegisterPetrolPumpForm({ onClose }) {
  const [formData, setFormData] = useState({
    petrolPumpName: "",
    name: "",
    email: "",
    phoneNumber: "",
    additionalServices: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Petrol Pump Name validation
    if (!formData.petrolPumpName.trim()) {
      newErrors.petrolPumpName = "Petrol pump name is required.";
    } else if (formData.petrolPumpName.trim().length < 3) {
      newErrors.petrolPumpName = "Petrol pump name must be at least 3 characters.";
    }

    // Your Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name should not contain numbers.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone must start with 6-9 and be exactly 10 digits.";
    }

    // Additional Services validation
    if (!formData.additionalServices.trim()) {
      newErrors.additionalServices = "Please select additional services.";
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
    // Add API call here when ready
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
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-0 pr-8">
          Register Your Petrol Pump
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

        {/* PETROL PUMP NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Petrol Pump Name*
          </label>
          <input
            type="text"
            id="petrolPumpName"
            placeholder="Enter petrol pump name"
            value={formData.petrolPumpName}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition"
          />
          {errors.petrolPumpName && (
            <p className="text-red-600 text-xs mt-1">{errors.petrolPumpName}</p>
          )}
        </div>

        {/* YOUR NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Your Name*
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

        {/* PHONE NUMBER */}
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

        {/* ADDITIONAL SERVICES */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            What More You Sell on Petrol Pump*
          </label>
          <select
            id="additionalServices"
            value={formData.additionalServices}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            <option value="">Select services</option>
            <option value="Convenience Store">Convenience Store</option>
            <option value="Food & Beverages">Food & Beverages</option>
            <option value="Car Wash">Car Wash</option>
            <option value="Auto Parts">Auto Parts</option>
            <option value="Tire Services">Tire Services</option>
            <option value="Repair Shop">Repair Shop</option>
            <option value="EV Charging">EV Charging</option>
          </select>
          {errors.additionalServices && (
            <p className="text-red-600 text-xs mt-1">{errors.additionalServices}</p>
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
