import React, { useState, useEffect } from "react";
import EditVehicleModal from "./EditVehicleModal";
import AddVehicleModal from "./AddVehicleModal";
import vehicleImage1 from "../assets/acar-2.webp";
import vehicleImage2 from "../assets/acar-1.webp";
import deleteIcon from "../assets/adelete.webp";
import editIcon from "../assets/aedit.webp";
import checkIcon from "../assets/circle-check-filled.webp";
import { getUserVehicles, deleteUserVehicle } from "../api/vehicleApi";
const VehicleCard = ({
  title,
  vehicleNumber,
  amcLabel,
  image,
  tone = "bg-rose-100",
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div
        className={`${tone} p-3 sm:p-4 md:p-6 flex items-center justify-center`}
      >
        <img
          loading="lazy"
          src={image}
          alt={`${title} image`}
          decoding="async"
          className="block h-24 sm:h-32 md:h-40 object-contain"
        />
      </div>

      <div className="p-3 sm:p-4 md:p-5 space-y-1.5 sm:space-y-2">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-800">
          {title}
        </h3>

        <p className="text-xs text-slate-600">
          Vehicle Number:{" "}
          <span className="font-medium text-slate-700">{vehicleNumber}</span>
        </p>

        {amcLabel && (
          <p className="text-xs text-slate-600 flex items-center gap-2">
            <img
              loading="lazy"
              src={checkIcon}
              alt="AMC active"
              className="w-4 sm:w-5 h-4 sm:h-5"
              decoding="async"
            />
            <span className="truncate">{amcLabel}</span>
          </p>
        )}

        <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={onDelete}
            aria-label={`Delete ${title}`}
            className="flex items-center justify-center h-9 sm:h-10 px-4 sm:px-6 rounded-lg border border-[#FB0200] text-[#FB0200] hover:bg-rose-50 text-xs sm:text-sm whitespace-nowrap w-full"
          >
            <img
              loading="lazy"
              src={deleteIcon}
              alt="Delete icon"
              className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
              decoding="async"
            />
            Delete
          </button>

          <button
            onClick={onEdit}
            aria-label={`Edit ${title}`}
            className="flex items-center justify-center h-9 sm:h-10 px-4 sm:px-6 rounded-lg border border-[#266DDF] text-[#266DDF] hover:bg-[#D9E7FE] text-xs sm:text-sm whitespace-nowrap w-full"
          >
            <img
              loading="lazy"
              src={editIcon}
              alt="Edit icon"
              className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
              decoding="async"
            />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

const CarCards = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const fetchUserVehicles = async () => {
    setLoading(true);
    const vehicles = await getUserVehicles();
    const formatted = vehicles.map((v, index) => ({
      _id: v._id,
      id: v._id,
      title: `${v.brand} ${v.model}`,
      vehicleNumber: v.vehicleNumber,
      vehicleType: v.vehicleType,
      brand: v.brand,
      model: v.model,
      fuelType: v.fuelType,
      amcLabel: "",
      image: index % 2 === 0 ? vehicleImage1 : vehicleImage2,
      tone: index % 2 === 0 ? "bg-[#FFD9D9]" : "bg-[#FFD88D]",
    }));
    setCars(formatted);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchUserVehicles();
  }, []);

  const handleDelete = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await deleteUserVehicle(vehicleId);
      setCars((prev) => prev.filter((car) => car.id !== vehicleId));
    }
  };

  const handleEditSubmit = () => {
    setOpen(false);
    fetchUserVehicles();
  };

  const handleAddSubmit = () => {
    setAddModalOpen(false);
    fetchUserVehicles();
  };

  return (
    <section className="w-full px-3 sm:px-4 md:px-0">
      <EditVehicleModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleEditSubmit}
        initial={current}
      />

      <AddVehicleModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddSubmit}
      />

      {loading ? (
        <p className="text-center text-sm text-gray-500 py-6">
          Loading vehicles...
        </p>
      ) : cars.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-6">
          No vehicles found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {cars.map((car) => (
            <VehicleCard
              key={car.id}
              title={car.title}
              vehicleNumber={car.vehicleNumber}
              image={car.image}
              tone={car.tone}
              onEdit={() => {
                setCurrent(car);
                setOpen(true);
              }}
              onDelete={() => handleDelete(car.id)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 sm:mt-6 md:mt-6 px-3 sm:px-4 md:px-0">
        <button
          onClick={() => setAddModalOpen(true)}
          aria-label="Add new vehicle"
          className="inline-flex items-center justify-center h-10 sm:h-10 px-4 sm:px-6 rounded-lg bg-[#266DDF] text-white hover:bg-blue-700 text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#cfe0ff]"
        >
          Add New Vehicle
        </button>
      </div>
    </section>
  );
};

export default CarCards;