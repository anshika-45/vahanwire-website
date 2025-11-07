import React, { useState, useEffect } from "react";
import { useAmcData } from "../context/AmcDataContext";
import Button from "../components/Button";
import verifyIcon from "../assets/verify.webp";
import SelectVehicle from "./SelectVehicle";
import Modal from "../components/Modal";
import { searchUserVehicle, addUserVehicle } from "../api/vehicleApi";

const EnterVehicleNumber = ({
  isOpen,
  onClose,
  onBack,
  plan
}) => {
  const { vehicleType, amcType } = useAmcData();
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [brand, setBrand] = useState("");
  const [showSelectVehicle, setShowSelectVehicle] = useState(false);
  const [numberError, setNumberError] = useState("");
  const [modelError, setModelError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
 
  console.log("vehicleData", vehicleData);
  
  if (!isOpen && !showSelectVehicle) return null;

  const validateVehicleNumber = (number) => {
    const cleanedNumber = number.trim().toUpperCase().replace(/[-\s]/g, "");

    console.log("Validating:", cleanedNumber);

    if (cleanedNumber.length < 8 || cleanedNumber.length > 15) {
      return {
        isValid: false,
        message: "Vehicle number should be between 8-15 characters",
      };
    }

    const patterns = [
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/,
      /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,   
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{2}[0-9]{4}$/,   
      /^[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{3,4}$/,
    ];

    const isValidFormat = patterns.some((pattern) => pattern.test(cleanedNumber));

    console.log("Validation result:", isValidFormat);

    if (!isValidFormat) {
      return { 
        isValid: false, 
        message: "Please enter a valid vehicle number format (e.g., DL01AB1234)" 
      };
    }

    return {
      isValid: true,
      message: "",
      formattedNumber: cleanedNumber,
    };
  };

  const verifyVehicleNumber = async (regNumber) => {
    try {
      setIsLoading(true);
      console.log("Calling searchUserVehicle with:", regNumber);
      const data = await searchUserVehicle(regNumber);
      console.log("API Response data:", data);
      setIsLoading(false);
      
      // Check both possible response structures
      if ((data.found && data.vehicle) || (data.data?.found && data.data?.vehicle)) {
        const vehicle = data.vehicle || data.data.vehicle;
        return { found: true, vehicle: vehicle };
      } else {
        return { found: false };
      }
    } catch (error) {
      setIsLoading(false);
      console.error("API Error:", error);
      return { found: false };
    }
  };

  const handleSearch = async () => {
    console.log("Handle search called with:", vehicleNumber);
    
    const validation = validateVehicleNumber(vehicleNumber);
    console.log("Validation result:", validation);
    
    if (!validation.isValid) {
      setNumberError(validation.message);
      return;
    }

    setNumberError("");

    const formattedNumber = validation.formattedNumber;
    console.log("Formatted number:", formattedNumber);
    
    const result = await verifyVehicleNumber(formattedNumber);
    console.log("Verify result:", result);
    
    if (result.found && result.vehicle) {
      setVehicleData({
        vehicleNumber: result.vehicle.vehicleNumber,
        brand: result.vehicle.brand,
        model: result.vehicle.model,
      });
      setShowSelectVehicle(true);
    } else {
      setShowModel(true);
      setVehicleNumber(formattedNumber);
    }
  };

  const handleAddVehicle = async () => {
    console.log("Handle add vehicle called");
    
    let hasError = false;
    if (!brand.trim()) {
      setBrandError("Please enter the vehicle brand");
      hasError = true;
    }
    if (!vehicleModel.trim()) {
      setModelError("Please enter the vehicle model");
      hasError = true;
    }
    if (hasError) return;

    try {
      setIsLoading(true);
      const validation = validateVehicleNumber(vehicleNumber);
      if (!validation.isValid) {
        setNumberError(validation.message);
        setIsLoading(false);
        return;
      }

      const newVehicle = {
        vehicleNumber: validation.formattedNumber,
        brand: brand.trim(),
        model: vehicleModel.trim(),
      };

      console.log("Adding new vehicle:", newVehicle);
      const response = await addUserVehicle(newVehicle);
      console.log("Add vehicle response:", response);
      setIsLoading(false);

      if (response.status === 201) {
        setVehicleData(newVehicle);
        setShowSelectVehicle(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Add Vehicle Error:", error);
      if (error.response?.status === 400) {
        setNumberError(error.response?.data?.message || "Vehicle already exists");
      } else {
        setNumberError("Failed to add vehicle");
      }
    }
  };

  const handleClose = () => {
    setVehicleNumber("");
    setVehicleModel("");
    setBrand("");
    setShowModel(false);
    setNumberError("");
    setModelError("");
    setBrandError("");
    setVehicleData(null);
    setShowSelectVehicle(false);
    onClose();
  };

  const handleBack = () => {
    setVehicleNumber("");
    setVehicleModel("");
    setBrand("");
    setShowModel(false);
    setNumberError("");
    setModelError("");
    setBrandError("");
    setVehicleData(null);
    setShowSelectVehicle(false);
    onBack();
  };

  return (
    <>
      <Modal isOpen={isOpen && !showSelectVehicle} onClose={handleClose} onBack={handleBack}>
        <div className="w-full max-w-[550px] flex flex-col items-center p-4">
          <div className="w-full flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-lg px-3 py-3 mb-4">
            <img src={verifyIcon} alt="verify" className="w-5 h-5" />
            <span className="font-medium text-sm text-[#333333]">
              Account is Verified
            </span>
          </div>

          <div className="bg-white rounded-xl p-6 w-full flex flex-col items-center mb-10">
            <h2 className="text-xl font-semibold text-[#242424] mb-4 w-full text-left">
              Vehicle not listed?
            </h2>

            <label className="w-full text-xs text-[#333333] mb-1">
              Enter Vehicle Number
            </label>
            <input
              type="text"
              placeholder="Enter Registration Number (e.g., DL01AB1234)"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 focus:ring-1 focus:ring-[#BCD2F5] text-xs bg-[#F8F8F8]"
              maxLength={15}
              disabled={isLoading}
            />
            {numberError && <div className="text-red-600 text-xs mb-3 w-full">{numberError}</div>}

            {showModel && (
              <>
                <label className="w-full text-xs text-[#333333] mb-1">Brand</label>
                <input
                  type="text"
                  placeholder="Enter Brand (e.g., Hero)"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setBrandError("");
                  }}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-2 text-xs bg-[#F8F8F8]"
                />
                {brandError && <div className="text-red-600 text-xs mb-2 w-full">{brandError}</div>}

                <label className="w-full text-xs text-[#333333] mb-1">Model</label>
                <input
                  type="text"
                  placeholder="Enter Model (e.g., Hero Zone)"
                  value={vehicleModel}
                  onChange={(e) => {
                    setVehicleModel(e.target.value);
                    setModelError("");
                  }}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-2 text-xs bg-[#F8F8F8]"
                />
                {modelError && <div className="text-red-600 text-xs mb-3 w-full">{modelError}</div>}
              </>
            )}

            <Button
              text={isLoading ? "Searching..." : showModel ? "Add Vehicle" : "Search"}
              onClick={showModel ? handleAddVehicle : handleSearch}
              disabled={isLoading}
              className="self-start w-1/2 bg-[#266DDF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            />
          </div>
        </div>
      </Modal>

      {showSelectVehicle && vehicleData && (
        <SelectVehicle
          isOpen={showSelectVehicle}
          onClose={handleClose}
          onBack={() => setShowSelectVehicle(false)}
          addedVehicleNumber={vehicleData.vehicleNumber}
          addedVehicleBrand={vehicleData.brand}
          addedVehicleModel={`${vehicleData.model}`}
          plan={plan}
        />
      )}
    </>
  );
};

export default EnterVehicleNumber;