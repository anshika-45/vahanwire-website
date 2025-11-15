import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAmcData } from "../context/AmcDataContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import carImg from "../assets/vehicle.webp";
import bikeImg from "../assets/bike2.png";
import verifyIcon from "../assets/verify.webp";
import {
  searchUserVehicle,
  addUserVehicleWithoutAMC,
  getUserVehicleWithoutAMC,
} from "../api/vehicleApi";
import { selectAMCVehicle } from "../api/amcApi";

const SelectVehicle = ({ isOpen, onClose, onBack, addedVehicleNumber, addedVehicleBrand, addedVehicleModel, addedVehicleYear , addedVehicleFuelType, plan }) => {

  const navigate = useNavigate();
  const { vehicleType, amcType, activateFilter } = useAmcData();
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
    year: "",
    fuelType: "",
  })

  const [error,setErrors] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
    year: "",
    fuelType: "",
  })
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [addedVehicles, setAddedVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);
  console.log(addedVehicleYear);
  console.log(addedVehicleFuelType);
  const initialized = useRef(false);

  const getVehicleImage = (vehicleType) => { return vehicleType?.toLowerCase() === "bike" ? bikeImg : carImg };

  const truncateText = (text, maxLength = 10) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  let val = value;

  if (name === "vehicleNumber") val = val.toUpperCase().replace(/\s/g, "");
  if (name === "brand") val = val.replace(/[^A-Za-z\s\-]/g, "");
  if (name === "model") val = val.replace(/[^A-Za-z0-9\s\-]/g, "");
  if (name === "fuelType") val = val.toLowerCase().replace(/[^A-Za-z]/g, "");
  if (name === "year") val = val.replace(/[^0-9]/g, "").slice(0, 4);

  setFormData((p) => ({ ...p, [name]: val }));
  setErrors((p) => ({ ...p, [name]: "" }));
};

const hasValidBrand = (value) => /[^a-zA-Z\s]/.test(value);

const hasValid = (value) => /[^a-zA-Z0-9\s]/.test(value);
  
const validateVehicleNumber = (num) => {
  const cleaned = num.trim().toUpperCase().replace(/[-\s]/g, "");
  const regex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
  
  if (cleaned.length < 8 || cleaned.length > 12)
    return "Vehicle number should be 8–12 characters";
  if (!regex.test(cleaned))
    return "Invalid number (e.g. MH12AB1234)";
  return "";
};
  
const validateBrand = (v) => {
  if (!v.trim()) return "Brand is required";
  if (hasValidBrand(v)) return "Brand cannot contain special characters";
  if (v.length < 2) return "Brand must be at least 2 characters";
  return "";
};
  
const validateModel = (v) => {
  if (!v.trim()) return "Model is required";
  if (hasValid(v)) return "Model cannot contain special characters";
  if (v.length < 2) return "Brand must be at least 2 characters";
  return "";
};
  
const validateYear = (y) => {
  if (!y) return "Year is required";
  if (y.length !== 4) return "Year must be 4 digits";
  const yr = Number(y);
  if (yr < 1990 || yr > new Date().getFullYear())
    return "Invalid year";
  return "";
};
  
const validateFuelType = (v) => {
  if (!v.trim()) return "Fuel type is required";
  const valid = ["petrol", "diesel", "electric", "cng", "hybrid", "lpg"];
  if (!valid.includes(v.toLowerCase())) return "Invalid fuel type (try Petrol, Diesel, Electric)";
  if (hasValid(v)) return "Fuel type cannot contain special characters";
  return "";
};
  
useEffect(() => {
  if (!initialized.current) {
    if (addedVehicleNumber && addedVehicleModel) {
      const preAddedVehicle = {
          number: addedVehicleNumber.toUpperCase(),
          model: addedVehicleModel,
          brand: addedVehicleBrand,
          year: addedVehicleYear,
          fuelType: addedVehicleFuelType
        };
        setAddedVehicles([preAddedVehicle]);
        setSelectedVehicle(preAddedVehicle.number);
    } else {
      (async()=>{
        try{
          const vehicles = await getUserVehicleWithoutAMC();
          if(vehicles?.length>0){
            const formatted = vehicles.map((v)=>({
              number: v.vehicleNumber.toUpperCase(),
              model: v.model,
              brand: v.brand,
              year: v.year,
              fuelType: v.fuelType
            }));
            setAddedVehicles(formatted);
            setSelectedVehicle(formatted[0].number);
          }
        }catch(err){
          console.error("Failed to load vehicles:", err);
        }
      })();
    }
  }
},[addedVehicleNumber]);

useEffect(() => {
  if (!isOpen) {
    setFormData({
      vehicleNumber: "",
      brand: "",
      model: "",
      year: "",
      fuelType: ""
    });
    setErrors({});
    setShowModel(false);
    }
}, [isOpen]);

const handleSearch = async () => {
  const errorMsg = validateVehicleNumber(formData.vehicleNumber);
  if (errorMsg) {
    setErrors({ vehicleNumber: errorMsg });
    return;
  }
   
  const vehicleNumber = formData.vehicleNumber.toUpperCase();
    
  if (addedVehicles.find((v) => v.number === vehicleNumber)) {
    setErrors({ vehicleNumber: "This vehicle is already in your list" });
    return;
  }

  setIsLoading(true);
  try{

    const response = await searchUserVehicle(vehicleNumber);
    const data = response.data;
    setIsLoading(false);

    if (data.alreadyRegisteredByOtherUser) {
      setErrors((prev) => ({
        ...prev,
        vehicleNumber: "This vehicle is already registered by another user.",
      }));
      return;
    }

    if (data.hasAMC) {
      setErrors((prev) => ({
        ...prev,
        vehicleNumber: `This vehicle already has an active AMC plan (${data?.amcDetails?.planName || " "})`,
      }));
      return;
    }

    if (data?.found && data.vehicle) {
      const newVehicle = {
        number: data.vehicle.vehicleNumber.toUpperCase(),
        brand: data.vehicle.brand,
        model: data.vehicle.model,
        year: data.vehicle.year,
        fuelType: data.vehicle.fuelType
      };

      setAddedVehicles((p) => [...p, newVehicle]);
      setSelectedVehicle(newVehicle.number);
      setErrors({});
      setFormData({ vehicleNumber: "", brand: "", model: "", year: "", fuelType: "" });
      return;
    }
    setShowModel(true)
  }catch(error){
    setIsLoading(false);
    setErrors({ vehicleNumber: error?.response?.data?.message || "Search failed. Try again." });
  }
}
 
const handleAddVehicle = async () => {
  const e = {
    vehicleNumber: validateVehicleNumber(formData.vehicleNumber),
    brand: validateBrand(formData.brand),
    model: validateModel(formData.model),
    year: validateYear(formData.year),
    fuelType: validateFuelType(formData.fuelType),
  };

  setErrors(e);

  if (Object.values(e).some((msg) => msg)) return;

  const normalized = formData.vehicleNumber.toUpperCase();

  if (addedVehicles.find((v) => v.number === normalized)) {
    setErrors({ vehicleNumber: "This vehicle already exists" });
    return;
  }

  setIsLoading(true);

  try {
    const res = await addUserVehicleWithoutAMC({
      vehicleNumber: normalized,
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      fuelType: formData.fuelType,
    });

    setIsLoading(false);
    const msg = res?.data?.message;

    if (msg?.includes("already registered")) {
      setErrors({ vehicleNumber: msg });
      return;
    }

    if (res.status === 201) {
      const newVehicle = {
        number: normalized,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        fuelType: formData.fuelType
      };
      setAddedVehicles((p) => [...p, newVehicle]);
      setSelectedVehicle(newVehicle.number);
      setShowModel(false);
      setFormData({
        vehicleNumber: "",
        brand: "",
        model: "",
        year: "",
        fuelType: "",
      });
      setErrors({});
      return;
    }

    setErrors({ vehicleNumber: "Failed to add vehicle. Try again." });
  } catch (err) {
    setIsLoading(false);
    setErrors({ vehicleNumber: err?.response?.data?.message || "Something went wrong. Please try again " });
  }
};

const handleProceed = async () => {
  if (!selectedVehicle) {
    setErrors({ proceed: "Please select a vehicle to continue" });
    return;
  }

  const vehicleData = addedVehicles.find((v) => v.number === selectedVehicle);
  console.log("kcjehwuckh",vehicleData);
  if (!vehicleData) {
    alert("Vehicle not found");
    return;
  }

  setIsProceeding(true);

  selectAMCVehicle({
    vehicleNumber: vehicleData.number,
    brand: vehicleData.brand,
    model: vehicleData.model,
    vehicleType,
    year: vehicleData.year,
    fuelType: vehicleData.fuelType,
    amcPlanCategory: amcType,
  })
    .then((response) => {
      console.log("response", response);

      if (response?.success) {
        const { hasActiveAMC, plans, vehicle } = response.data;

        if (hasActiveAMC) {
          alert("This vehicle already has an active AMC plan.");
          setIsProceeding(false);
          return;
        }

        const filterData = { plans, vehicle, selectedPlan: plan };
        activateFilter(filterData);
        navigate("/vehicle-amc-filter", { state: filterData });
      } else {
        alert(response?.message || "Failed to process request.");
      }

      setIsProceeding(false);
    })
    .catch((error) => {
      console.error("handleProceed error:", error);
      alert("Something went wrong. Please try again later.");
      setIsProceeding(false);
    });
};

const handleCancelAdd = () => {
    setShowModel(false);
    setFormData({
      vehicleNumber:"",
      brand:"",
      model:"",
      year:"",
      fuelType:"",
    })
    setErrors({});
  };

return (
  <Modal isOpen={isOpen} onClose={onClose} onBack={onBack}>
    <div className="w-full max-w-[550px] flex flex-col items-center p-2 relative">
      <div className="w-full flex items-center gap-2 bg-green-50 border border-green-200 text-[#21830F] rounded-lg px-4 py-3 mb-4">
      <img src={verifyIcon} alt="verify" className="w-5 h-5" />
        <span className="font-medium text-sm text-[#333333]">
          Account Verified
        </span>
      </div>
      <div className="w-full bg-white rounded-xl p-6 mb-4">
        <h2 className="text-xl font-semibold text-[#242424] mb-4">
          Select a Vehicle to Subscribe
        </h2>

        {addedVehicles.length > 0 ? (
            addedVehicles.map((vehicle, i) => (
              <div
                key={vehicle.number}
                className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm cursor-pointer transition-all ${
                  selectedVehicle === vehicle.number
                    ? "border-[#266DDF] bg-blue-50"
                    : "border-[#C4D9F9]"
                } ${i > 0 ? "mt-3" : ""}`}
                onClick={() => setSelectedVehicle(vehicle.number)}
              >
              <img src={getVehicleImage()} alt={vehicle.model} className="w-20 h-12 object-cover rounded"/>
                <div className="flex-1">
                  <div
                    className="font-medium text-[18px] text-gray-900"
                    title={`${vehicle.brand} ${vehicle.model}`}
                  >
                    {truncateText(vehicle.brand, 9)}{" "}
                    {truncateText(vehicle.model, 9)}
                  </div>
                  <div className="text-xs md:text-[17px] text-gray-500">
                    {vehicle.number}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedVehicle === vehicle.number}
                  readOnly
                  className="w-5 h-5 accent-[#266DDF]"
                />
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No vehicles added yet. Please add below.
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 w-full border border-gray-100 mb-20">
          <h2 className="text-xl font-semibold text-[#242424] mb-3">
            Add Vehicle
          </h2>
        <label className="text-sm lg:text-[16px] mb-3">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Enter Registration Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-2 focus:ring-[#BCD2F5] focus:outline-none"
          />
          {error.vehicleNumber && (
            <p className="text-[#CB0200] text-xs mb-2">{error.vehicleNumber}</p>
          )}

          {showModel && (
            <>
              <label className="text-base text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="Enter Brand"
                value={formData.brand}
                onChange={handleChange}
                maxLength={10}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-2"
              />
              {error.brand && (
                <p className="text-[#CB0200] text-xs mb-2">{error.brand}</p>
              )}

              <label className="text-base text-gray-700 mb-1">Model</label>
              <input
                type="text"
                name="model"
                placeholder="Enter Model"
                value={formData.model}
                onChange={handleChange}
                maxLength={10}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-3"
              />
              {error.model && (
                <p className="text-[#CB0200] text-xs mb-2">{error.model}</p>
              )}

             <label className="text-base text-gray-700 mb-1">Year</label>
              <input
                type="text"
                name="year"
                placeholder="Enter Year"
                value={formData.year}
                onChange={handleChange}
                maxLength={10}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-3"
              />
              {error.year && (
                <p className="text-[#CB0200] text-xs mb-2">{error.year}</p>
              )} 
              
              <label className="text-base text-gray-700 mb-1">Fuel Type</label>
              <input
                type="text"
                name="fuelType"
                placeholder="Enter Fuel Type"
                value={formData.fuelType}
                onChange={handleChange}
                maxLength={10}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-3"
              />
              {error.fuelType && (
                <p className="text-[#CB0200] text-xs mb-2">{error.fuelType}</p>
              )} 
              
              <div className="flex gap-3">
                <Button
                  text="Cancel"
                  className="w-1/2 bg-gray-500 text-white py-3 rounded-lg"
                  onClick={handleCancelAdd}
                />
                <Button
                  text={isLoading ? "Adding..." : "Add Vehicle"}
                  className="w-1/2 bg-[#266DDF] text-white py-3 rounded-lg"
                  onClick={handleAddVehicle}
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {!showModel && (
            <Button
              text={isLoading ? "Searching..." : "Search Vehicle"}
              className="w-full bg-[#266DDF] text-white py-3 rounded-lg"
              onClick={handleSearch}
            />
          )}
        </div>

        <Button
          text={isProceeding ? "Processing..." : "Proceed to AMC"}
          className={`w-full py-3 rounded-lg font-semibold ${
            selectedVehicle
              ? "bg-[#266DDF] text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-700 cursor-not-allowed"
          }`}
          onClick={handleProceed}
          disabled={!selectedVehicle || isProceeding}
        />
      </div>
    </Modal>
  );
};

export default SelectVehicle;
