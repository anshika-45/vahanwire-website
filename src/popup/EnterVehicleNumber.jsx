import React, { useState } from "react";
import Button from "../components/Button";
import verifyIcon from "../assets/verify.webp";
import SelectVehicle from "./SelectVehicle";
import Modal from "../components/Modal";

const EnterVehicleNumber = ({ isOpen, onClose, onBack }) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [showSelectVehicle, setShowSelectVehicle] = useState(false);
  const [numberError, setNumberError] = useState("");
  const [modelError, setModelError] = useState("");
  const [showModel, setShowModel] = useState(false);
  if (!isOpen && !showSelectVehicle) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} onBack={onBack} className="z-110">
        <div className="w-full max-w-[550px] flex flex-col items-center p-2 sm:p-4">
          <div className="w-full flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-lg px-3 py-3 sm:py-5 mb-4">
          <img src={verifyIcon} loading="lazy" alt="verify" className="w-5 h-5" />
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
              onChange={(e) => {
                setVehicleNumber(e.target.value);
                if (numberError) setNumberError("");
              }}
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-4 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-xs bg-[#F8F8F8]"
            />
            {numberError && <div className="text-[#CB0200] text-xs mb-2 text-left">{numberError}</div>}

            {showModel && (
              <>
                <label htmlFor="vehicleModel" className="w-full text-xs text-[#333333] mb-2">
                  Enter Vehicle Make & Model
                </label>
                <input
                  id="vehicleModel"
                  type="text"
                  placeholder="Enter Make & Model"
                  value={vehicleModel}
                  onChange={(e) => {
                    setVehicleModel(e.target.value);
                    if (modelError) setModelError("");
                  }}
                  className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-4 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-xs bg-[#F8F8F8]"
                />
                {modelError && <div className="text-[#CB0200] text-xs mb-4 text-left">{modelError}</div>}
              </>
            )}

            <Button
              text={showModel ? "Add Vehicle" : "Search"}
              className="self-start w-full sm:w-1/2 bg-[#266DDF] text-white font-semibold py-3 px-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                if (!showModel) {
                  // Search clicked
                  if (!vehicleNumber.trim()) {
                    setNumberError("Please enter the vehicle number");
                  } else {
                    setNumberError("");
                    setShowModel(true);
                  }
                } else {
                  // Add Vehicle clicked
                  let hasError = false;
                  if (!vehicleModel.trim()) {
                    setModelError("Please enter the vehicle make & model");
                    hasError = true;
                  }
                  if (!hasError) {
                    setShowSelectVehicle(true);
                  }
                }
              }}
            />
          </div>


        </div>
      </Modal>

      {showSelectVehicle && (
        <SelectVehicle
          isOpen={showSelectVehicle}
          onClose={onClose}
          onBack={() => setShowSelectVehicle(false)}
          addedVehicleNumber={vehicleNumber}
          addedVehicleModel={vehicleModel}
        />
      )}
    </>
  );
};

export default EnterVehicleNumber;
