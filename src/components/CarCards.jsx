import React, { useState } from "react";
import EditVehicleModal from "./EditVehicleModal";
import AddVehicleModal from "./AddVehicleModal";
import vehicleImage1 from "../assets/acar-2.webp";
import vehicleImage2 from "../assets/acar-1.webp";
import deleteIcon from "../assets/adelete.webp";
import editIcon from "../assets/aedit.webp";
import checkIcon from "../assets/circle-check-filled.webp";
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
      <div className={`${tone} p-3 sm:p-4 md:p-6 flex items-center justify-center`}>
        <img loading="lazy" src={image} alt={title} className="h-24 sm:h-32 md:h-40 object-contain" />
      </div>
      <div className="p-3 sm:p-4 md:p-5 space-y-1.5 sm:space-y-2">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-600">Vehicle Number: {vehicleNumber}</p>
        <p className="text-xs text-slate-600 flex items-center gap-2">
          <span className="text-green-600"><img loading="lazy" src={checkIcon} alt="Delete" className="w-4 sm:w-5 h-4 sm:h-5" /></span>
          {amcLabel}
        </p>
        <div className="mt-3 sm:mt-4 md:mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <button
            onClick={onDelete}
            className="flex h-8 sm:h-9 px-4 sm:px-6 md:px-23 justify-center rounded-lg pt-1 border border-[#FB0200] text-[#FB0200] hover:bg-rose-50 text-xs sm:text-sm w-full sm:w-auto"
          ><img loading="lazy" src={deleteIcon} alt="delete" className="w-4 sm:w-5 h-4 sm:h-5 mr-1" />
            Delete
          </button>
          <button
            onClick={onEdit}
            className="flex h-8 sm:h-9 px-4 sm:px-6 md:px-23 rounded-lg justify-center pt-1 border border-[#266DDF] text-[#266DDF] hover:bg-[#D9E7FE] text-xs sm:text-sm w-full sm:w-auto"
          ><img loading="lazy" src={editIcon} alt="Delete" className="w-4 sm:w-5 h-4 sm:h-5 mr-1" />

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
  const [cars, setCars] = useState([
    {
      id: 1,
      title: "Mercedes-Benz (E-Class sedan)",
      vehicleNumber: "DL7SBS5556",
      amcLabel: "Luxury Vehicle Gold AMC Covered",
      image:vehicleImage1,
      tone: "bg-[#FFD9D9]",
    },
    {
      id: 2,
      title: "Toyota Innova Crysta",
      vehicleNumber: "DL7SBS5556",
      amcLabel: "Essential Vehicle Gold AMC Covered",
      image:vehicleImage2,
      tone: "bg-[#FFD88D]",
    },
  ]);
  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setCars(cars.filter(car => car.id !== carId));
    }
  };
  return (
    <section className="w-full px-3 sm:px-4 md:px-0">
      <EditVehicleModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => setOpen(false)}
        initial={current}
      />
      <AddVehicleModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={() => setAddModalOpen(false)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {cars.map((car) => (
          <VehicleCard
            key={car.id}
            title={car.title}
            vehicleNumber={car.vehicleNumber}
            amcLabel={car.amcLabel}
            image={car.image}
            tone={car.tone}
            onEdit={() => { setCurrent(car); setOpen(true); }}
            onDelete={() => handleDelete(car.id)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 sm:mt-6 md:mt-4 px-3 sm:px-4 md:px-0">
        <button 
          onClick={() => setAddModalOpen(true)}
          className="h-9 sm:h-10 px-4 sm:px-6 rounded-lg bg-[#266DDF] text-white hover:bg-blue-700 text-xs sm:text-sm w-full sm:w-auto"
        >
          Add New Vehicle
        </button>
      </div>
    </section>
  );
};
export default CarCards;