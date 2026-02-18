import React, { useState } from "react";
import { X } from "lucide-react";
import CustomSelect from "../components/CustomSelect";

export default function RegisterServiceStationForm({ onClose }) {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    serviceType: "",
    serviceProvided: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Company Name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    } else if (formData.companyName.trim().length < 3) {
      newErrors.companyName = "Company name must be at least 3 characters.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }


    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone must start with 6-9 and be exactly 10 digits.";
    }


    if (!formData.serviceType.trim()) {
      newErrors.serviceType = "Service type is required.";
    }


    if (!formData.serviceProvided.trim()) {
      newErrors.serviceProvided = "Service provided is required.";
    }


    if (!formData.address.trim()) {
      newErrors.address = "Service center address is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;


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
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-0 pr-8">
          Register Your Service Station
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
            Company Name*
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#266DDF] focus:bg-white transition"
          />
          {errors.companyName && (
            <p className="text-red-600 text-xs mt-1">{errors.companyName}</p>
          )}
        </div>

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

 
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Which Type of Service Center*
          </label>
          <CustomSelect
            options={[
              { value: "General Service", label: "General Service" },
              { value: "Authorized Dealership", label: "Authorized Dealership" },
              { value: "Multi-Brand", label: "Multi-Brand" },
              { value: "Independent Workshop", label: "Independent Workshop" },
            ]}
            value={formData.serviceType}
            onChange={(e) => {
              const { value } = e.target;
              setFormData({ ...formData, serviceType: value });
              setErrors({ ...errors, serviceType: "" });
            }}
            placeholder="Select service type"
            error={errors.serviceType}
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            What Service You Provide*
          </label>
          <CustomSelect
            options={[
              { value: "Repair", label: "Repair" },
              { value: "Maintenance", label: "Maintenance" },
              { value: "Servicing", label: "Servicing" },
              { value: "Parts & Accessories", label: "Parts & Accessories" },
              { value: "Detailing", label: "Detailing" },
            ]}
            value={formData.serviceProvided}
            onChange={(e) => {
              const { value } = e.target;
              setFormData({ ...formData, serviceProvided: value });
              setErrors({ ...errors, serviceProvided: "" });
            }}
            placeholder="Select service"
            error={errors.serviceProvided}
          />
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Address of Service Center*
          </label>
          <CustomSelect
            options={[
              { value: "Noida Sector 10", label: "Noida Sector 10" },
              { value: "Delhi", label: "Delhi" },
              { value: "Gurgaon", label: "Gurgaon" },
            ]}
            value={formData.address}
            onChange={(e) => {
              const { value } = e.target;
              setFormData({ ...formData, address: value });
              setErrors({ ...errors, address: "" });
            }}
            placeholder="Select location"
            error={errors.address}
          />
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
