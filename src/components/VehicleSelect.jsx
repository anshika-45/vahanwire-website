import { useState } from "react";
export default function VehicleSelect() {
  const [selected, setSelected] = useState("car1");
  const options = [
    { id: "car1", label: "Sedan", img: "/images/sedan.webp" },
    { id: "car2", label: "SUV", img: "/images/suv.webp" },
  ];
  return (
    <div className="flex flex-col gap-2 md:gap-4 w-full max-w-xs md:max-w-md mx-auto px-2 md:px-0">
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-center justify-between border border-gray-200 rounded-xl p-2 md:p-3 cursor-pointer hover:bg-gray-50 transition-all duration-200"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <input
              type="radio"
              name="vehicle"
              value={option.id}
              checked={selected === option.id}
              onChange={() => setSelected(option.id)}
              className="hidden"
            />
            <div
              className={`w-4 md:w-5 h-4 md:h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                selected === option.id ? "border-green-500" : "border-gray-400"
              }`}
            >
              {selected === option.id && (
                <div className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full"></div>
              )}
            </div>
            <span
              className={`font-medium text-xs md:text-base truncate ${
                selected === option.id ? "text-green-600" : "text-gray-700"
              }`}
            >
              {option.label}
            </span>
          </div>
          <img
            src={option.img}
            alt={option.label}
            loading="lazy"
            className="w-8 md:w-12 h-8 md:h-12 object-contain flex-shrink-0"
          />
        </label>
      ))}
    </div>
  );
}