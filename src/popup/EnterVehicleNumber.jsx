import React, { useState, Suspense } from "react";
import Button from "../components/Button";
import verifyIcon from "../assets/verify.webp";
import Modal from "../components/Modal";
import { searchUserVehicle, addUserVehicle } from "../api/vehicleApi";

// Heavy component ko lazy load karein
const SelectVehicle = React.lazy(() => import("./SelectVehicle"));

const EnterVehicleNumber = ({ isOpen, onClose, onBack }) => {
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
  
  if (!isOpen && !showSelectVehicle) return null;
  
  const validateVehicleNumber = (number) => {
    const cleanedNumber = number.trim().toUpperCase();
  
    if (cleanedNumber.length < 8 || cleanedNumber.length > 15) {
      return { isValid: false, message: "Vehicle number should be between 8-15 characters" };
    }

    const patterns = [
      /^[A-Z]{2}[-\s]?[0-9]{1,2}[-\s]?[A-Z]{1,3}[-\s]?[0-9]{1,4}$/,
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/,
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}[A-Z]?$/,
    ];

    const isValidFormat = patterns.some(pattern => pattern.test(cleanedNumber));
    
    if (!isValidFormat) {
      return { 
        isValid: false, 
        message: "Please enter a valid vehicle number format" 
      };
    }

    const invalidChars = /[^A-Z0-9\s-]/;
    if (invalidChars.test(cleanedNumber)) {
      return { isValid: false, message: "Vehicle number contains invalid characters" };
    }

    const stateCode = cleanedNumber.substring(0, 2);
    if (!/^[A-Z]{2}$/.test(stateCode)) {
      return { isValid: false, message: "First two characters should be state code letters" };
    }

    return { isValid: true, message: "", formattedNumber: cleanedNumber.replace(/[-\s]/g, '') };
  };

  const verifyVehicleNumber = async (regNumber) => {
    try {
      setIsLoading(true);
      const data = await searchUserVehicle(regNumber);
      setIsLoading(false);
      
      if (data.found && data.vehicle) {
        return { found: true, vehicle: data.vehicle };
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
    const validation = validateVehicleNumber(vehicleNumber);
    
    if (!validation.isValid) {
      setNumberError(validation.message);
      return;
    }

    if (!vehicleNumber.trim()) {
      setNumberError("Please enter the vehicle number");
      return;
    }

    setNumberError("");
    
    const formattedNumber = validation.formattedNumber || vehicleNumber.toUpperCase().replace(/[-\s]/g, '');
    const result = await verifyVehicleNumber(formattedNumber);

    if (result.found) {
      setVehicleData(result.vehicle);
      setShowSelectVehicle(true);
    } else {
      setShowModel(true);
      setVehicleNumber(formattedNumber);
    }
  };

  const handleAddVehicle = async () => {
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

      const vehicleData = {
        vehicleNumber: validation.formattedNumber || vehicleNumber.toUpperCase().replace(/[-\s]/g, ''),
        brand: brand.trim(),
        model: vehicleModel.trim(),
      };
      
      const response = await addUserVehicle(vehicleData);
      setIsLoading(false);
      
      if (response.status === 201) {
        setVehicleData({ 
          number: vehicleData.vehicleNumber, 
          model: `${brand} ${vehicleModel}`,
          brand: brand 
        });
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

  const handleVehicleNumberChange = (e) => {
    const value = e.target.value;
    setVehicleNumber(value);
    
    if (numberError) {
      setNumberError("");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} onBack={onBack} className="z-110">
        <div className="w-full max-w-[550px] flex flex-col items-center p-2 sm:p-4">
          <div className="w-full flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-lg px-3 py-3 sm:py-5 mb-4">
            <img 
              src={verifyIcon} 
              loading="lazy" 
              alt="verify" 
              className="w-5 h-5"
              width={20}
              height={20}
              decoding="async"
            />
            <span className="font-medium text-sm text-[#333333]">Account is Verified</span>
          </div>

          <div className="bg-white rounded-xl p-6 md:p-10 w-full flex flex-col items-center mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#242424] mb-4 w-full text-left">
              Vehicle not listed?
            </h2>

            <label htmlFor="vehicleNumber" className="w-full text-xs text-[#333333] mb-2">
              Enter Vehicle Number
            </label>  
            <input
              id="vehicleNumber"
              type="text"
              placeholder="Enter Registration Number"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-4 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-xs bg-[#F8F8F8] uppercase"
              disabled={isLoading}
              maxLength={15}
            />
            {numberError && (
              <div className="text-[#CB0200] text-xs mb-2 w-full text-left">{numberError}</div>
            )}
            {!numberError && vehicleNumber && (
              <div className="text-[#266DDF] text-xs mb-2 w-full text-left">
                {/* Optional: Add validation success message */}
              </div>
            )}

            {showModel && (
              <>
                <label htmlFor="brand" className="w-full text-xs text-[#333333] mb-2">
                  Enter Vehicle Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  placeholder="Enter Brand (e.g., Maruti Suzuki)"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    if (brandError) setBrandError("");
                  }}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-2 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-xs bg-[#F8F8F8]"
                />
                {brandError && <div className="text-[#CB0200] text-xs mb-2 w-full text-left">{brandError}</div>}

                <label htmlFor="vehicleModel" className="w-full text-xs text-[#333333] mb-2">
                  Enter Vehicle Model
                </label>
                <input
                  id="vehicleModel"
                  type="text"
                  placeholder="Enter Model (e.g., Brezza)"
                  value={vehicleModel}
                  onChange={(e) => {
                    setVehicleModel(e.target.value);
                    if (modelError) setModelError("");
                  }}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-2 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-xs bg-[#F8F8F8]"
                />
                {modelError && <div className="text-[#CB0200] text-xs mb-4 w-full text-left">{modelError}</div>}
              </>
            )}

            <Button
              text={isLoading ? "Searching..." : showModel ? "Add Vehicle" : "Search"}
              className="self-start w-full sm:w-1/2 bg-[#266DDF] text-white font-semibold py-3 px-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={showModel ? handleAddVehicle : handleSearch}
              disabled={isLoading}
            />
          </div>
        </div>
      </Modal>

      {showSelectVehicle && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-white">Loading vehicle selection...</div>
          </div>
        }>
          <SelectVehicle
            isOpen={showSelectVehicle}
            onClose={onClose}
            onBack={() => {
              setShowSelectVehicle(false);
              setShowModel(false);
              setVehicleModel("");
              setBrand("");
              setVehicleNumber("");
            }}
            addedVehicleNumber={vehicleData?.number || vehicleNumber}
            addedVehicleModel={vehicleData?.model || `${brand} ${vehicleModel}`}
          />
        </Suspense>
      )}
    </>
  );
};

export default EnterVehicleNumber;