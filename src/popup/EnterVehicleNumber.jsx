import React, { useState, Suspense } from "react";
import { useAmcData } from "../context/AmcDataContext";
import Button from "../components/Button";
import verifyIcon from "../assets/verify.webp";
import Modal from "../components/Modal";
import { searchUserVehicle, addUserVehicle } from "../api/vehicleApi";
const SelectVehicle = React.lazy(() => import("./SelectVehicle"));
const EnterVehicleNumber = ({ isOpen, onClose, onBack, plan }) => {
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

  if (!isOpen && !showSelectVehicle) return null;

  const validateVehicleNumber = (number) => {
    const cleanedNumber = number.trim().toUpperCase().replace(/[-\s]/g, "");

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

    const isValidFormat = patterns.some((pattern) =>
      pattern.test(cleanedNumber)
    );

    if (!isValidFormat) {
      return {
        isValid: false,
        message:
          "Please enter a valid vehicle number format (e.g., DL01AB1234)",
      };
    }

    return {
      isValid: true,
      message: "",
      formattedNumber: cleanedNumber,
    };
  };

  const verifyVehicleNumber = async (regNumber) => {
    setIsLoading(true);
    const data = await searchUserVehicle(regNumber);
    setIsLoading(false);
    if (
      (data.found && data.vehicle) ||
      (data.data?.found && data.data?.vehicle)
    ) {
      const vehicle = data.vehicle || data.data.vehicle;
      return { found: true, vehicle: vehicle };
    } else {
      return { found: false };
    }
  };

  const handleSearch = async () => {
    const validation = validateVehicleNumber(vehicleNumber);
    if (!validation.isValid) {
      setNumberError(validation.message);
      return;
    }
    setNumberError("");
    const formattedNumber = validation.formattedNumber;
    const result = await verifyVehicleNumber(formattedNumber);
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
    const response = await addUserVehicle(newVehicle);
    setIsLoading(false);
    if (response.status === 201) {
      setVehicleData(newVehicle);
      setShowSelectVehicle(true);
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
      <Modal
        isOpen={isOpen && !showSelectVehicle}
        onClose={handleClose}
        onBack={handleBack}
      >
        <div className="w-full max-w-[550px] flex flex-col items-center p-4">
          <div className="w-full flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-lg px-3 py-3 mb-4">
            <img
              src={verifyIcon}
              alt="verify"
              className="w-5 h-5"
              width={20}
              height={20}
              decoding="async"
            />
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
            {numberError && (
              <div className="text-red-600 text-xs mb-3 w-full">
                {numberError}
              </div>
            )}

            {showModel && (
              <>
                <label className="w-full text-xs text-[#333333] mb-1">
                  Brand
                </label>
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
                {brandError && (
                  <div className="text-red-600 text-xs mb-2 w-full">
                    {brandError}
                  </div>
                )}

                <label className="w-full text-xs text-[#333333] mb-1">
                  Model
                </label>
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
                {modelError && (
                  <div className="text-red-600 text-xs mb-3 w-full">
                    {modelError}
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
                  : "Search"
              }
              onClick={showModel ? handleAddVehicle : handleSearch}
              disabled={isLoading}
              className="self-start w-1/2 bg-[#266DDF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            />
          </div>
        </div>
      </Modal>

      {showSelectVehicle && vehicleData && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="text-white"></div>
            </div>
          }
        >
          <SelectVehicle
            isOpen={showSelectVehicle}
            onClose={handleClose}
            onBack={() => setShowSelectVehicle(false)}
            addedVehicleNumber={vehicleData.vehicleNumber}
            addedVehicleBrand={vehicleData.brand}
            addedVehicleModel={`${vehicleData.model}`}
            plan={plan}
          />
        </Suspense>
      )}
    </>
  );
};

export default EnterVehicleNumber;
