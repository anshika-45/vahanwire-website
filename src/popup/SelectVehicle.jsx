import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import brezzaImg from "../assets/vehicle.webp";
import verifyIcon from "../assets/verify.webp";
import { searchUserVehicle, addUserVehicle } from "../api/vehicleApi";

const SelectVehicle = ({
  isOpen,
  onClose,
  onBack,
  onSelectVehicle,
  addedVehicleNumber,
  addedVehicleModel,
}) => {
  const navigate = useNavigate();
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
    if (!vehicleNumber.trim()) {
      setNumberError("Please enter the vehicle number");
      return;
    }

    setNumberError("");
    const result = await verifyVehicleNumber(vehicleNumber);

    if (result.found) {
      const vehicleDisplay = `${result.vehicle.brand} ${result.vehicle.model}`;
      setAddedVehicles(prev => [...prev, { 
        number: result.vehicle.vehicleNumber, 
        model: vehicleDisplay,
        brand: result.vehicle.brand
      }]);
      setVehicleNumber("");
      setShowModel(false);
      if (onSelectVehicle) {
        onSelectVehicle({ 
          number: result.vehicle.vehicleNumber, 
          model: vehicleDisplay 
        });
      }
    } else {
      setShowModel(true);
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
      const vehicleData = {
        vehicleNumber: vehicleNumber.toUpperCase().trim(),
        brand: brand.trim(),
        model: vehicleModel.trim(),
      };
      
      const response = await addUserVehicle(vehicleData);
      setIsLoading(false);
      
      if (response.status === 201) {
        const vehicleDisplay = `${brand} ${vehicleModel}`;
        setAddedVehicles(prev => [...prev, { 
          number: vehicleNumber, 
          model: vehicleDisplay,
          brand: brand
        }]);
        setVehicleNumber("");
        setVehicleModel("");
        setBrand("");
        setShowModel(false);
        if (onSelectVehicle) {
          onSelectVehicle({ number: vehicleNumber, model: vehicleDisplay });
        }
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} onBack={onBack}>
      <div className="w-full max-w-[550px] flex flex-col items-center p-1">
        <div className="w-full flex items-center gap-2 bg-green-50 border border-green-200 text-[#21830F] rounded-lg px-4 py-4 mb-4">
          <img src={verifyIcon} alt="verify" loading="lazy" className="w-5 h-5" />
          <span className="font-medium text-sm text-[#333333]">Account is Verified</span>
        </div>

        <div className="w-full bg-white rounded-xl p-6 mb-4">
          <h2 className="text-xl font-semibold text-[#242424] mb-4">
            Select a Vehicle to Subscribe
          </h2>
          <div
            className={`flex items-center gap-4 bg-[#F8F8F8] rounded-xl border ${
              selectedVehicle === addedVehicleNumber
                ? "border-[#266DDF]"
                : "border-[#C4D9F9]"
            } p-4 shadow-sm cursor-pointer transition-all`}
            onClick={() => setSelectedVehicle(addedVehicleNumber)}
          >
            <img loading="lazy"
              src={brezzaImg}
              alt="Maruti Suzuki Brezza"
              className="w-22 h-12 object-cover rounded ml-2"
            />
            <div className="flex-1">
              <div className="font-medium text-[#242424]">
                {addedVehicleModel || "Added Vehicle"}
              </div>
              <div className="text-xs text-[#6C6F73]">
                {addedVehicleNumber}
              </div>
            </div>
            <input
              type="checkbox"
              checked={selectedVehicle === addedVehicleNumber}
              readOnly
              className="w-5 h-5 accent-[#266DDF] bg-white border-[#5C5C5C]"
            />
          </div>
          {addedVehicles.map((vehicle, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 bg-white rounded-xl border ${
                selectedVehicle === vehicle.number
                  ? "border-[#266DDF]"
                  : "border-[#C4D9F9]"
              } p-4 shadow-sm cursor-pointer transition-all mt-4`}
              onClick={() => setSelectedVehicle(vehicle.number)}
            >
              <img
                src={brezzaImg}
                alt={vehicle.model}
                loading="lazy"
                className="w-20 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {vehicle.model}
                </div>
                <div className="text-xs text-gray-500">
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
          ))}
        </div>

        <div className="bg-white rounded-xl p-10 w-full flex flex-col items-center border border-gray-100 mb-10">
          <h2 className="text-2xl font-semibold text-[#242424] mb-4 w-full text-left">
            Add Vehicle
          </h2>

          <label
            htmlFor="vehicleNumber"
            className="w-full text-xs text-gray-700 mb-1"
          >
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
            <>
              <label
                htmlFor="brand"
                className="w-full text-xs text-gray-700 mb-1"
              >
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

              <label
                htmlFor="vehicleModel"
                className="w-full text-xs text-gray-700 mb-1"
              >
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
            </>
          )}

          <Button
            text={isLoading ? "Searching..." : showModel ? "Add Vehicle" : "Search"}
            className="self-start w-1/2 bg-[#266DDF] text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={showModel ? handleAddVehicle : handleSearch}
            disabled={isLoading}
          />
        </div>

        {selectedVehicle && (
          <Button
            text="Proceed"
            className="w-full bg-[#266DDF] text-white font-semibold py-3 mt-2 rounded-lg hover:bg-blue-700 transition-colors sticky bottom-4"
            onClick={() => {
              if (selectedVehicle) {
                navigate("/vehicle-amc-filter");
              } else {
                alert("Please select a vehicle to proceed");
              }
            }}
          />
        )}
      </div>
    </Modal>
  );
};

export default SelectVehicle;