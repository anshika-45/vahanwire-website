import React, { useState, useRef, useEffect } from "react";

export default function CustomSelect({ options, value, onChange, placeholder, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#266DDF] transition appearance-none cursor-pointer text-left flex items-center justify-between ${
          isOpen ? "bg-white ring-2 ring-[#266DDF]" : "bg-gray-100"
        }`}
      >
        <span className={value ? "text-gray-900" : "text-blue-500"}>
          {selectedLabel}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path fill="#374151" d="M6 9L1 4h10z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange({ target: { id: "selectedField", value: option.value } });
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-sm text-left transition cursor-pointer ${
                value === option.value
                  ? "bg-[#266DDF] text-white"
                  : "bg-white text-gray-900 hover:bg-[#E9F0FC]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
