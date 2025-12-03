import React, { useState, Suspense, useEffect } from "react";
import Button from "../components/Button";
import verifyIcon from "../assets/verify.webp";
import Modal from "../components/Modal";
import { addUserVehicleWithoutAMC, searchUserVehicle } from "../api/vehicleApi";
const SelectVehicle = React.lazy(() => import("./SelectVehicle"));
import { useAmcData } from "../context/AmcDataContext";
const DEFAULT_VEHICLE_TYPE = "car";

const EnterVehicleNumber = ({ isOpen, onClose, onBack, plan }) => {
   const { vehicleType } = useAmcData();
  const [ formData, setFormData ] = useState({
     vehicleNumber: "",
     brand: "",
     model: "",
  });
  const [error, setErrors] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
  })

  const [showSelectVehicle, setShowSelectVehicle] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);

useEffect(()=> {
  if(!isOpen){
    setFormData({
     vehicleNumber: "",
     brand: "",
     model: "",
    });
    setErrors({
      vehicleNumber: "",
      brand: "",
      model: "",
    })
    setShowModel(false);
    setVehicleData(null);
    setShowSelectVehicle(false);
  }
},[isOpen])

if (!isOpen && !showSelectVehicle) return null;

const handleChange = (e) => {
  const { name, value } = e.target;
  let val = value;

  if (name === "vehicleNumber")
    val = value.toUpperCase().replace(/\s/g, "");
  if (name === "brand")
    val = value.replace(/[0-9]/g, "").slice(0, 15);

  setFormData((prev) => ({ ...prev, [name]: val }));
  setErrors((prev) => ({ ...prev, [name]: "" }));
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
  const trimmedValue = v.trim();
  if (!trimmedValue) return "Brand is required";
  if (hasValidBrand(trimmedValue))
    return "Brand cannot contain special characters";
  if (trimmedValue.length < 2) return "Brand must be at least 2 characters";
  if (trimmedValue.length > 30) return "Brand cannot exceed 30 characters";
  if (/\s{2,}/.test(trimmedValue))
    return "Brand cannot contain multiple consecutive spaces";
  return "";
};

const validateModel = (v) => {
  const trimmedValue = v.trim();
  if (!trimmedValue) return "Model is required";
  if (hasValid(trimmedValue))
    return "Model cannot contain special characters";
  if (trimmedValue.length < 2) return "Model must be at least 2 characters";
  if (trimmedValue.length > 50) return "Model cannot exceed 50 characters";
  if (/\s{2,}/.test(trimmedValue))
    return "Model cannot contain multiple consecutive spaces";

  return "";
};


const handleSearch = async () => {
  const err = validateVehicleNumber(formData.vehicleNumber);

  if (err) {
    setErrors((prev) => ({ ...prev, vehicleNumber: err }));
    return;
  }

  setIsLoading(true);

  try{
     const response = await searchUserVehicle(formData.vehicleNumber);

     setIsLoading(false);

     const data = response?.data || response;

     if (!data.found) {
      setShowModel(true);
      return;
    }

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

    if (data.vehicle) {
      setVehicleData({
        vehicleNumber: data.vehicle.vehicleNumber,
        brand: data.vehicle.brand,
        model: data.vehicle.model,
        vehicleType: data.vehicle.vehicleType || DEFAULT_VEHICLE_TYPE,
      });
      setShowSelectVehicle(true);
    }
  }catch(error){
    setIsLoading(false);
    const message = error?.response?.data?.message || error?.message || "Error Searching Message";
    setErrors((prev) => ({ ...prev, vehicleNumber: message })); 
  }
}

const handleAddVehicle = async () => {
  const e = {
    vehicleNumber: validateVehicleNumber(formData.vehicleNumber),
    brand: validateBrand(formData.brand),
    model: validateModel(formData.model),
  }

  setErrors((prev) => ({...prev, ...e}));

  const hasError = Object.values(e).some((msg) => msg !== "");
  if (hasError) return;

  setIsLoading(true);

  try{
    const payload = {
      vehicleNumber: formData.vehicleNumber,
      brand: formData.brand,
      model: formData.model,
      vehicleType:vehicleType
    }

    const response = await addUserVehicleWithoutAMC(payload);

    setIsLoading(false);

    const data = response?.data || response;

    if (response.status === 201 || data.statusCode === 201) {
      setVehicleData({...data.data,
        vehicleType: data.data.vehicleType || DEFAULT_VEHICLE_TYPE});
      setShowSelectVehicle(true);
    }else {
      setErrors((prev) => ({
        ...prev,
        vehicleNumber: data.message || "Vehicle already exists",
      }));
    }
  }catch(error){
    setIsLoading(false);
    const msg = error?.response?.data?.message || "Failed to add vehicle. Try again.";
    setErrors((prev) => ({ ...prev, vehicleNumber: msg }));
  }
}
  const handleClose = () => {
    onClose();
    setShowSelectVehicle(false);
  };

  const handleBack = () => {
    onBack();
    setShowSelectVehicle(false);
  };

  return (
    <>
      <Modal isOpen={isOpen && !showSelectVehicle} onClose={handleClose} onBack={handleBack}>
        <div className="w-full max-w-[550px] flex flex-col items-center p-5">
          <div className="bg-white rounded-xl p-6 w-full flex flex-col items-center mb-10">
            <h2 className="text-2xl font-semibold text-[#242424] mb-4 w-full text-left">
              Add Your Vehicle
            </h2>

            <label className="w-full text-xs text-[#333333] mb-1">
              Enter Vehicle Number
            </label>
            <input
              type="text"
              name="vehicleNumber"
              placeholder="Enter Registration Number"
              value={formData.vehicleNumber}
              onChange={handleChange}
              maxLength={15}
              disabled={isLoading}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 text-xs bg-[#F8F8F8]
              hover:border-[#BCD2F5] focus:outline-none focus:border-[#BCD2F5] focus:ring-2 focus:ring-[#BCD2F5]"         
            />
            {error.vehicleNumber && (
              <div className="text-[#CB0200] text-xs mb-3 w-full">
                {error.vehicleNumber}
              </div>
            )}

            {showModel && (
              <>
                <label className="w-full text-xs text-[#333333] mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Enter Brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 text-xs bg-[#F8F8F8]
                  hover:border-[#BCD2F5] focus:outline-none focus:border-[#BCD2F5] focus:ring-2 focus:ring-[#BCD2F5]"
                />
                {error.brand && (
                  <div className="text-[#CB0200] text-xs mb-2 w-full">
                    {error.brand}
                  </div>
                )}

                <label className="w-full text-xs text-[#333333] mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  placeholder="Enter Model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 text-xs bg-[#F8F8F8]
                  hover:border-[#BCD2F5] focus:outline-none focus:border-[#BCD2F5] focus:ring-2 focus:ring-[#BCD2F5]"
                />
                {error.model && (
                  <div className="text-[#CB0200] text-xs mb-3 w-full">
                    {error.model}
                  </div>
                )}
              </>
            )}

            <Button
              text={
                isLoading
                  ? "Searching..."
                  : showModel
                  ? "Add Vehicle"
                  : "Add Vehicle"
              }
              // onClick={showModel ? handleAddVehicle : handleSearch}
               onClick={() => {
    console.log("BUTTON CLICKED");
    console.log("showModel =", showModel);
    showModel ? handleAddVehicle() : handleSearch();
  }}
              disabled={isLoading}
              className="self-start w-1/2 bg-[#266DDF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            />
          </div>
        </div>
      </Modal>

      {showSelectVehicle && vehicleData && (
        <Suspense fallback={<></>}>
          <SelectVehicle
            isOpen={showSelectVehicle}
            onClose={handleClose}
            onBack={handleBack}
            addedVehicleNumber={vehicleData.vehicleNumber}
            addedVehicleBrand={vehicleData.brand}
            addedVehicleModel={vehicleData.model}
            addedVehicleType={vehicleData.vehicleType}
            plan={plan}
          />
        </Suspense>
      )}
    </>
  );
}

export default EnterVehicleNumber;