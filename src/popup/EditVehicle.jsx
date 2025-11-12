import React, { useEffect } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import bin from "../assets/bin.png"; 
export default function EditVehicle({ isOpen, onClose, type = "edit" }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  const content = {
    edit: {
      icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
      title: "Edit Not Allowed",
      message:
        "This vehicle is under AMC. The vehicle number cannot be changed.",
    },
    delete: {
      icon: (<img
        src={bin}
        alt="Delete Icon"
         className="w-20 h-20 object-contain"
      />),
      title: "Vehicle Protected <br/> by AMC",
      message:
        "This vehicle is under AMC coverage and can't be deleted right now.",
    },
  };

  const { icon, title, message } = content[type] || content.edit;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-40">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-sm px-6 pb-7 pt-10 text-center">
        <div className="flex justify-center mb-7">{icon}</div>
        <h2
          className="md:text-2xl text-lg font-semibold text-black mb-2"
          dangerouslySetInnerHTML={{ __html: `${title}` }}
        ></h2>
        <p
          className="text-[17px] text-black mb-6"
          dangerouslySetInnerHTML={{ __html: `${message}` }}
        ></p>
        <button
          onClick={onClose}
          className="w-full border border-black rounded-md py-2.5 text-black hover:bg-gray-50 font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
