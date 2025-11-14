import React, { useState, Suspense, useEffect } from "react";
import { useAmcData } from "../context/AmcDataContext";
import Button from "../components/Button";
import verifyIcon from "../assets/verify.webp";
import Modal from "../components/Modal";
import { searchUserVehicle, addUserVehicleWithoutAMC } from "../api/vehicleApi";
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

  useEffect(() => {
    if (!isOpen) {
      setVehicleNumber("");
      setVehicleModel("");
      setBrand("");
      setShowModel(false);
      setNumberError("");
      setModelError("");
      setBrandError("");
      setVehicleData(null);
    }
  }, [isOpen]);

  if (!isOpen && !showSelectVehicle) return null;

  const validateVehicleNumber = (number) => {
    const cleanedNumber = number.trim().toUpperCase().replace(/[-\s]/g, "");
    const indianVehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;
    const alternateRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1}[0-9]{3,4}$/;

    if (cleanedNumber.length < 8 || cleanedNumber.length > 15) {
      return {
        isValid: false,
        message: "Vehicle number should be between 8–15 characters",
      };
    }

    if (
      !indianVehicleRegex.test(cleanedNumber) &&
      !alternateRegex.test(cleanedNumber)
    ) {
      return {
        isValid: false,
        message:
          "Please enter a valid vehicle number (e.g., MH12AB1234 or DL3S9999)",
      };
    }

    return {
      isValid: true,
      message: "",
      formattedNumber: cleanedNumber,
    };
  };

  const handleSearch = async () => {
    const validation = validateVehicleNumber(vehicleNumber);
    if (!validation.isValid) {
      setNumberError(validation.message);
      return;
    }
    setNumberError("");

    const formattedNumber = validation.formattedNumber;
    setIsLoading(true);

    try {
      console.log("ekfnjknjkwnjkne");
      const response = await searchUserVehicle(formattedNumber);
      console.log("ekfnjknjkwnjkne22222");
      setIsLoading(false);

      const data = response?.data || response;

      if (!data.found) {
        setShowModel(true);
        setVehicleNumber(formattedNumber);
        return;
      }

      if (data.alreadyRegisteredByOtherUser) {
        setNumberError("This vehicle is already registered by another user.");
        return;
      }

      if (data.hasAMC) {
        const { amcDetails } = data;
        setNumberError(
          `This vehicle already has an active AMC plan (${
            amcDetails?.planName || "Unknown"
          }).`
        );
        return;
      }

      if (data.vehicle) {
        setVehicleData({
          vehicleNumber: data.vehicle.vehicleNumber,
          brand: data.vehicle.brand,
          model: data.vehicle.model,
        });
        setShowSelectVehicle(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Search error:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Error searching vehicle. Please try again.";
      setNumberError(errorMsg);
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
      vehicleType: vehicleType,
    };

    try {
      const response = await addUserVehicleWithoutAMC(newVehicle);
      setIsLoading(false);

      const data = response?.data || response;

      if (response.status === 201 || data.statusCode === 201) {
        const vehicleInfo = data?.data || data;
        setVehicleData({
          vehicleNumber: vehicleInfo.vehicleNumber,
          brand: vehicleInfo.brand,
          model: vehicleInfo.model,
        });
        setShowSelectVehicle(true);
      } else if (response.status === 200 || data.statusCode === 200) {
        setNumberError(
          data.message || "Vehicle already exists in your account"
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Add vehicle error:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add vehicle. Please try again.";
      setNumberError(errorMsg);
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
                setVehicleNumber(
                  e.target.value.toUpperCase().replace(/\s/g, "")
                )
              }
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 text-xs bg-[#F8F8F8]
              hover:border-[#BCD2F5] focus:outline-none focus:border-[#BCD2F5] focus:ring-2 focus:ring-[#BCD2F5]"
              maxLength={15}
              disabled={isLoading}
            />
            {numberError && (
              <div className="text-[#CB0200] text-xs mb-3 w-full">
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
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setBrandError("");
                  }}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-3 text-xs bg-[#F8F8F8]
                  hover:border-[#BCD2F5] focus:outline-none focus:border-[#BCD2F5] focus:ring-2 focus:ring-[#BCD2F5]"
                  maxLength={10}
                />
                {brandError && (
                  <div className="text-[#CB0200] text-xs mb-2 w-full">
                    {brandError}
                  </div>
                )}

                <label className="w-full text-xs text-[#333333] mb-1">
                  Model
                </label>
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
                  maxLength={10}
                />
                {modelError && (
                  <div className="text-[#CB0200] text-xs mb-3 w-full">
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
            addedVehicleModel={vehicleData.model}
            plan={plan}
          />
        </Suspense>
      )}
    </>
  );
};

export default EnterVehicleNumber;
