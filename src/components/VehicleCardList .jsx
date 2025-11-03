import React from "react";
import { ShieldCheck } from "lucide-react";
import Button from "../components/Button";
import car1 from "../assets/Drive.webp";
import car2 from "../assets/Drive.webp";
const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz (E-Class sedan)",
    number: "DL7S885556",
    amcType: "Luxury Vehicle Gold AMC Covered",
    image: car1,
    bgColor: "bg-rose-50",
  },
  {
    id: 2,
    name: "Toyota Innova Crysta",
    number: "DL7S885556",
    amcType: "Essential Vehicle Gold AMC Covered",
    image: car2,
    bgColor: "bg-amber-50",
  },
];
const VehicleCardList = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`${vehicle.bgColor} rounded-2xl p-6 flex flex-col items-center justify-between shadow-md transition hover:shadow-lg`}
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              loading="lazy"
              className="w-64 h-36 object-contain mb-4"
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {vehicle.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Vehicle Number: {vehicle.number}
              </p>
              <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-medium mb-4">
                <ShieldCheck className="w-4 h-4" />
                {vehicle.amcType}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                text="Delete"
                className="border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50"
              />
              <Button
                text="Edit"
                className="border border-blue-500 text-blue-600 px-5 py-2 rounded-lg hover:bg-[#D9E7FE]"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button
          text="Add New Vehicle"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        />
      </div>
    </div>
  );
};
export default VehicleCardList;
