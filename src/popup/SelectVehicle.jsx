import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAmcData } from "../context/AmcDataContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import brezzaImg from "../assets/vehicle.webp";
import verifyIcon from "../assets/verify.webp";
import { searchUserVehicle, addUserVehicle } from "../api/vehicleApi";
import { selectAMCVehicle } from "../api/amcApi";

const SelectVehicle = ({
  isOpen,
  onClose,
  onBack,
  onSelectVehicle,
  addedVehicleNumber,
  addedVehicleBrand,
  addedVehicleModel,
  plan,
}) => {
  const navigate = useNavigate();
  const { vehicleType, amcType } = useAmcData();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [brand, setBrand] = useState("");
  const [numberError, setNumberError] = useState("");
  const [modelError, setModelError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [addedVehicles, setAddedVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);

  const initialized = useRef(false);
  
  useEffect(() => {
    if (!initialized.current && addedVehicleNumber && addedVehicleModel) {
      const preAddedVehicle = {
        number: addedVehicleNumber,
        model: addedVehicleModel,
        brand: addedVehicleBrand || addedVehicleModel.split(" ")[0],
        originalModel: addedVehicleModel,
        isPreAdded: true
      };
      
      setAddedVehicles([preAddedVehicle]);
      setSelectedVehicle(addedVehicleNumber);
      initialized.current = true;
    }
  }, [addedVehicleNumber, addedVehicleBrand, addedVehicleModel]);

  const verifyVehicleNumber = async (regNumber) => {
    setIsLoading(true);
    const response = await searchUserVehicle(regNumber);
    setIsLoading(false);
    if (response.success && response.data.found && response.data.vehicle) {
      return { 
        found: true, 
        vehicle: response.data.vehicle 
      };
    } else {
      return { 
        found: false 
      };
    }
  };

  const handleAddNewVehicle = async (vehicleData) => {
    setIsLoading(true);
    const response = await addUserVehicle(vehicleData);
    setIsLoading(false);
    
    if (response.status === 201) {
      return { 
        success: true, 
        data: response.data 
      };
    } else {
      return { 
        success: false, 
        message: "Failed to add vehicle" 
      };
    }
  };

  const handleSearch = async () => {
    setNumberError("");
    setBrandError("");
    setModelError("");
    
    const normalizedNumber = vehicleNumber.toUpperCase().trim();
    if (!normalizedNumber) {
      setNumberError("Please enter the vehicle number");
      return;
    }
    
    const existingVehicle = addedVehicles.find(
      vehicle => vehicle.number.toUpperCase() === normalizedNumber
    );
    
    if (existingVehicle) {
      setSelectedVehicle(existingVehicle.number);
      setNumberError("This vehicle is already in your list");
      return;
    }
    
    const result = await verifyVehicleNumber(normalizedNumber);
    
    if (result.found) {
      const newVehicle = {
        number: result.vehicle.vehicleNumber,
        model: result.vehicle.model,
        brand: result.vehicle.brand,
        originalModel: result.vehicle.model,
      };
      
      setAddedVehicles(prev => [...prev, newVehicle]);
      setSelectedVehicle(newVehicle.number);
      setVehicleNumber("");
      setShowModel(false);
      
      if (onSelectVehicle) {
        onSelectVehicle(newVehicle);
      }
    } else {
      setShowModel(true);
    }
  };

  const handleAddVehicle = async () => {
    setBrandError("");
    setModelError("");
    
    const normalizedNumber = vehicleNumber.toUpperCase().trim();
    const normalizedBrand = brand.trim();
    const normalizedModel = vehicleModel.trim();
    
    let hasError = false;
    if (!normalizedBrand) {
      setBrandError("Please enter the vehicle brand");
      hasError = true;
    }
    if (!normalizedModel) {
      setModelError("Please enter the vehicle model");
      hasError = true;
    }
    if (hasError) return;
  
    const existingVehicle = addedVehicles.find(
      vehicle => vehicle.number.toUpperCase() === normalizedNumber
    );
    
    if (existingVehicle) {
      setNumberError("This vehicle is already in your list");
      setSelectedVehicle(existingVehicle.number);
      return;
    }
    
    const vehicleData = {
      vehicleNumber: normalizedNumber,
      brand: normalizedBrand,
      model: normalizedModel,
    };
    
    const result = await handleAddNewVehicle(vehicleData);
    
    if (result.success) {
      const newVehicle = {
        number: normalizedNumber,
        model: normalizedModel,
        brand: normalizedBrand,
        originalModel: normalizedModel,
      };
      
      setAddedVehicles(prev => [...prev, newVehicle]);
      setSelectedVehicle(newVehicle.number);
      setVehicleNumber("");
      setVehicleModel("");
      setBrand("");
      setShowModel(false);
      
      if (onSelectVehicle) {
        onSelectVehicle(newVehicle);
      }
    } else {
      setNumberError(result.message);
    }
  };

  const handleVehicleSelect = (vehicleNumber) => {
    setSelectedVehicle(vehicleNumber);
    const selectedVehicleData = addedVehicles.find(
      vehicle => vehicle.number === vehicleNumber
    );
    if (selectedVehicleData && onSelectVehicle) {
      onSelectVehicle(selectedVehicleData);
    }
  };

  const handleCancelAdd = () => {
    setShowModel(false);
    setVehicleNumber("");
    setVehicleModel("");
    setBrand("");
    setBrandError("");
    setModelError("");
    setNumberError("");
  };

  useEffect(() => {
    if (!isOpen) {
      setVehicleNumber("");
      setVehicleModel("");
      setBrand("");
      setShowModel(false);
      setNumberError("");
      setBrandError("");
      setModelError("");
    }
  }, [isOpen]);

  const handleSelectAMCVehicle = async (vehicleData) => {
    setIsProceeding(true);
    const requestData = {
      vehicleNumber: vehicleData.number,
      brand: vehicleData.brand,
      model: vehicleData.model,
      vehicleType: vehicleType,
      amcPlanCategory: amcType,
    };
    const response = await selectAMCVehicle(requestData);
    setIsProceeding(false);
    return response;
  };

  const handleProceed = async () => {
    if (!selectedVehicle) {
      alert("Please select a vehicle to proceed");
      return;
    }
    
    const vehicleData = addedVehicles.find(
      vehicle => vehicle.number === selectedVehicle
    );
    
    if (!vehicleData) {
      alert("Vehicle data not found");
      return;
    }
    
    const response = await handleSelectAMCVehicle(vehicleData);
    if (response.success) {
      const { hasActiveAMC, activeAMC, plans, vehicle } = response.data;
      if (hasActiveAMC) {
        alert("This vehicle already has an active AMC plan");
      } else {
        navigate("/vehicle-amc-filter", {
          state: {
            plans,
            vehicle,
            selectedPlan: plan,
          },
        });
      }
    } else {
      alert(response.message || "Failed to process vehicle selection");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onBack={onBack}>
      <div className="w-full max-w-[550px] flex flex-col items-center p-1">
        <div className="w-full flex items-center gap-2 bg-green-50 border border-green-200 text-[#21830F] rounded-lg px-4 py-4 mb-4">
          <img
            src={verifyIcon}
            alt="verify"
            loading="lazy"
            className="w-5 h-5"
            width={20} 
            height={20}
            decoding="async"
          />
          <span className="font-medium text-sm text-[#333333]">
            Account is Verified
          </span>
        </div>
        
        <div className="w-full bg-white rounded-xl p-6 mb-4">
          <h2 className="text-xl font-semibold text-[#242424] mb-4">
            Select a Vehicle to Subscribe
          </h2>
          
          {addedVehicles.map((vehicle, index) => (
            <div
              key={`${vehicle.number}-${index}`}
              className={`flex items-center gap-4 bg-white rounded-xl border ${
                selectedVehicle === vehicle.number
                  ? "border-[#266DDF] bg-blue-50"
                  : "border-[#C4D9F9]"
              } p-4 shadow-sm cursor-pointer transition-all ${
                index > 0 ? 'mt-4' : ''
              }`}
              onClick={() => handleVehicleSelect(vehicle.number)}
            >
              <img
                src={brezzaImg}
                alt={vehicle.model}
                loading="lazy"
                className="w-20 h-12 object-cover rounded"
                width={88} 
                height={48}
                decoding="async"
              />
              <div className="flex-1">
                {vehicle.brand === vehicle.model ? (
                  <div className="font-medium text-gray-900">
                    {vehicle.brand}
                  </div>
                ) : (
                  <div className="font-medium text-gray-900">
                    {vehicle.brand} {vehicle.model}
                  </div>
                )}
                <div className="text-xs text-gray-500">{vehicle.number}</div>
              </div>
              <input
                type="checkbox"
                checked={selectedVehicle === vehicle.number}
                readOnly
                className="w-5 h-5 accent-[#266DDF]"
              />
            </div>
          ))}
          
          {addedVehicles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No vehicles added yet. Please add a vehicle below.
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl p-6 w-full flex flex-col items-center border border-gray-100 mb-10">
          <h2 className="text-2xl font-semibold text-[#242424] mb-4 w-full text-left">
            Add Vehicle
          </h2>
          
          <label htmlFor="vehicleNumber" className="w-full text-xs text-gray-700 mb-1">
            Enter Vehicle Number
          </label>
          <input
            id="vehicleNumber"
            type="text"
            placeholder="Enter Registration Number"
            value={vehicleNumber}
            onChange={(e) => {
              setVehicleNumber(e.target.value);
              if (numberError) setNumberError("");
            }}
            className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-4 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-xs"
            disabled={isLoading}
          />
          
          {numberError && (
            <div className="text-[#CB0200] text-xs mb-2 w-full text-left">
              {numberError}
            </div>
          )}
          
          {showModel && (
            <div className="w-full">
              <label htmlFor="brand" className="w-full text-xs text-gray-700 mb-1">
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
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-2 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-xs"
              />
              {brandError && (
                <div className="text-[#CB0200] text-xs mb-2 w-full text-left">
                  {brandError}
                </div>
              )}
              
              <label htmlFor="vehicleModel" className="w-full text-xs text-gray-700 mb-1">
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
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-4 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-xs"
              />
              {modelError && (
                <div className="text-[#CB0200] text-xs mb-4 w-full text-left">
                  {modelError}
                </div>
              )}
              
              <div className="flex gap-3">
                <Button
                  text="Cancel"
                  className="w-1/2 bg-gray-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={handleCancelAdd}
                  disabled={isLoading}
                />
                <Button
                  text={isLoading ? "Adding..." : "Add Vehicle"}
                  className="w-1/2 bg-[#266DDF] text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  onClick={handleAddVehicle}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
          
          {!showModel && (
            <Button
              text={isLoading ? "Searching..." : "Search Vehicle"}
              className="w-full bg-[#266DDF] text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSearch}
              disabled={isLoading || !vehicleNumber.trim()}
            />
          )}
        </div>
        
        {selectedVehicle && (
          <Button
            text={isProceeding ? "Processing..." : "Proceed to AMC"}
            className="w-full bg-[#266DDF] text-white font-semibold py-3 mt-2 rounded-lg hover:bg-blue-700 transition-colors sticky bottom-4 disabled:opacity-50"
            onClick={handleProceed}
            disabled={isProceeding}
          />
        )}
      </div>
    </Modal>
  );
};

export default SelectVehicle;