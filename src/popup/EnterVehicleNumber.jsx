import React, { useState, Suspense } from "react";
import { useAmcData } from "../context/AmcDataContext";
import Button from "../components/Button";
import verifyIcon from "../assets/verify.webp";
import Modal from "../components/Modal";
import { searchUserVehicle, addUserVehicle } from "../api/vehicleApi";
const SelectVehicle = React.lazy(() => import("./SelectVehicle"));

const EnterVehicleNumber = ({ isOpen, onClose, onBack, plan }) => {
  const { vehicleType } = useAmcData();
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

  // ✅ Updated: Realistic Indian Vehicle Number Validation
  const validateVehicleNumber = (number) => {
    const cleanedNumber = number.trim().toUpperCase().replace(/[-\s]/g, "");

    // Common India vehicle number format: MH12AB1234
    // State Code (2 letters) + RTO (1–2 digits) + Series (1–3 letters) + Number (1–4 digits)
    const indianVehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;

    // Some older vehicles or temporary numbers have different pattern (like DL3S1234, BR01T999)
    const alternateRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1}[0-9]{3,4}$/;

    if (cleanedNumber.length < 8 || cleanedNumber.length > 15) {
      return {
        isValid: false,
        message: "Vehicle number should be between 8–15 characters",
      };
    }

    if (!indianVehicleRegex.test(cleanedNumber) && !alternateRegex.test(cleanedNumber)) {
      return {
        isValid: false,
        message: "Please enter a valid vehicle number (e.g., MH12AB1234 or DL3S9999)",
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
    try {
      const data = await searchUserVehicle(regNumber);
      setIsLoading(false);
      if ((data.found && data.vehicle) || (data.data?.found && data.data?.vehicle)) {
        const vehicle = data.vehicle || data.data.vehicle;
        return { found: true, vehicle };
      } else {
        return { found: false };
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error verifying vehicle:", error);
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

    const validation = validateVehicleNumber(vehicleNumber);
    if (!validation.isValid) {
      setNumberError(validation.message);
      return;
    }

    setIsLoading(true);
    const newVehicle = {
      vehicleNumber: validation.formattedNumber,
      brand: brand.trim(),
      model: vehicleModel.trim(),
    };

    try {
      const response = await addUserVehicle(newVehicle);
      setIsLoading(false);
      if (response.status === 201) {
        setVehicleData(newVehicle);
        setShowSelectVehicle(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding vehicle:", error);
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
        <div className="w-full max-w-[550px] flex flex-col items-center p-5">
          <div className="w-full flex items-center gap-3 bg-green-50 border border-green-200 text-[#6AAC5E] rounded-lg px-3 py-4 mb-4">
            <img src={verifyIcon} alt="verify" className="w-5 h-5" />
            <span className="font-medium text-sm text-[#333333]">
              Account is Verified
            </span>
          </div>

          <div className="bg-white rounded-xl p-6 w-full flex flex-col items-center mb-10">
            <h2 className="text-2xl font-semibold text-[#242424] mb-4 w-full text-left">
              Vehicle not listed?
            </h2>

            <label className="w-full text-xs text-[#333333] mb-1">
              Enter Vehicle Number
            </label>
            <input
              type="text"
              placeholder="Enter Registration Number (e.g. MH12AB1234)"
              value={vehicleNumber}
              onChange={(e) =>
                setVehicleNumber(e.target.value.toUpperCase().replace(/\s/g, ""))
              }
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 text-xs bg-[#F8F8F8]
              hover:border-[#BCD2F5] focus:outline-none focus:border-[#BCD2F5] focus:ring-2 focus:ring-[#BCD2F5]"
              maxLength={15}
              disabled={isLoading}
            />
            {numberError && (
              <div className="text-[#CB0200] text-xs mb-3 w-full">{numberError}</div>
            )}

            {showModel && (
              <>
                <label className="w-full text-xs text-[#333333] mb-1">Brand</label>
                <input
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setBrandError("");
                  }}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 text-xs bg-[#F8F8F8]
                  hover:border-[#BCD2F5] focus:outline-none focus:border-[#BCD2F5] focus:ring-2 focus:ring-[#BCD2F5]"
                />
                {brandError && (
                  <div className="text-[#CB0200] text-xs mb-2 w-full">{brandError}</div>
                )}

                <label className="w-full text-xs text-[#333333] mb-1">Model</label>
                <input
                  type="text"
                  placeholder="Enter Model"
                  value={vehicleModel}
                  onChange={(e) => {
                    setVehicleModel(e.target.value);
                    setModelError("");
                  }}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 text-xs bg-[#F8F8F8]
                  hover:border-[#BCD2F5] focus:outline-none focus:border-[#BCD2F5] focus:ring-2 focus:ring-[#BCD2F5]"
                />
                {modelError && (
                  <div className="text-[#CB0200] text-xs mb-3 w-full">{modelError}</div>
                )}
              </>
            )}

            <Button
              text={
                isLoading ? "Searching..." : showModel ? "Add Vehicle" : "Search"
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
            addedVehicleModel={vehicleData.model}
            plan={plan}
          />
        </Suspense>
      )}
    </>
  );
};

export default EnterVehicleNumber;
