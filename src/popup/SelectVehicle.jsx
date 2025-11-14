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
  const { vehicleType, amcType, activateFilter } = useAmcData();

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [brand, setBrand] = useState("");
  const [errors, setErrors] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [addedVehicles, setAddedVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);
  const initialized = useRef(false);

  const getVehicleImage = (vehicleType) => {
    return vehicleType?.toLowerCase() === "bike" ? bikeImg : carImg;
  };

  const truncateText = (text, maxLength = 10) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const validateVehicleNumber = (number) => {
    const cleaned = number.trim().toUpperCase().replace(/[-\s]/g, "");
    if (!cleaned) return "Please enter the vehicle number";
    const indianPattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;
    const tempPattern = /^TEMP[0-9]{4,6}$/;
    if (cleaned.length < 8 || cleaned.length > 10)
      return "Vehicle number should be 8–10 characters long";
    if (!indianPattern.test(cleaned) && !tempPattern.test(cleaned))
      return "Invalid vehicle number format. Example: DL01AB1234 or TEMP1234";
    if (/^[A-Z]{2}0{1,2}[A-Z]{1,3}0+$/.test(cleaned))
      return "Vehicle number cannot contain all zeros";
    return "";
  };

  const validateBrand = (value) => {
    if (!value.trim()) return "Please enter the vehicle brand";
    if (/\d/.test(value.trim())) return "Brand cannot contain numbers";
    if (value.trim().length < 2) return "Brand must be at least 2 characters";
    if (value.trim().length > 10) return "Brand cannot exceed 10 characters";
    return "";
  };

  useEffect(() => {
    if (!initialized.current) {
      if (addedVehicleNumber && addedVehicleModel) {
        const preAddedVehicle = {
          number: addedVehicleNumber.toUpperCase(),
          model: addedVehicleModel,
          brand: addedVehicleBrand || addedVehicleModel.split(" ")[0],
          originalModel: addedVehicleModel,
          isPreAdded: true,
        };
        setAddedVehicles([preAddedVehicle]);
        setSelectedVehicle(preAddedVehicle.number);
      } else {
        const loadExistingVehicles = async () => {
          try {
            const vehicles = await getUserVehicleWithoutAMC();
            console.log("feb2ciubhbch", vehicles);
            if (vehicles?.length > 0) {
              const formatted = vehicles.map((v) => ({
                number: v.vehicleNumber.toUpperCase(),
                model: v.model,
                brand: v.brand,
                originalModel: v.model,
              }));
              setAddedVehicles(formatted);
              setSelectedVehicle(formatted[0].number);
            }
          } catch (err) {
            console.error("Failed to load vehicles:", err);
          }
        };
        loadExistingVehicles();
      }
      initialized.current = true;
    }
  }, [addedVehicleNumber, addedVehicleBrand, addedVehicleModel]);

  useEffect(() => {
    if (!isOpen) {
      setVehicleNumber("");
      setVehicleModel("");
      setBrand("");
      setErrors({});
      setShowModel(false);
      setSelectedVehicle(null);
    }
  }, [isOpen]);

  const handleSearch = async () => {
    const errorMsg = validateVehicleNumber(vehicleNumber);
    if (errorMsg) return setErrors({ number: errorMsg });

    const normalizedNumber = vehicleNumber.toUpperCase();
    if (addedVehicles.find((v) => v.number === normalizedNumber)) {
      setErrors({ number: "This vehicle is already in your list" });
      return;
    }

    setIsLoading(true);
    const data = await searchUserVehicle(normalizedNumber);
    setIsLoading(false);

    const response = data?.data;

    if (response?.alreadyRegisteredByOtherUser) {
      setErrors({
        number:
          "This vehicle is already registered by another user. Please check the number or try a different one.",
      });
      return;
    }

    if (response?.hasAMC) {
      setErrors({
        number: `This vehicle already has an active AMC plan (${
          response.amcDetails?.planName || "Active"
        }). Please select another vehicle.`,
      });
      return;
    }

    const foundVehicle = response?.vehicle;

    if (response?.found && foundVehicle && !response?.hasAMC) {
      const newVehicle = {
        number: foundVehicle.vehicleNumber.toUpperCase(),
        model: foundVehicle.model,
        brand: foundVehicle.brand,
      };
      setAddedVehicles((prev) => [...prev, newVehicle]);
      setSelectedVehicle(newVehicle.number);
      setVehicleNumber("");
      setErrors({});
      setShowModel(false);
    } else {
      setShowModel(true);
      setErrors({});
    }
  };

  const handleAddVehicle = async () => {
    const numberError = validateVehicleNumber(vehicleNumber);
    const brandError = validateBrand(brand);
    const modelError = !vehicleModel.trim()
      ? "Please enter the vehicle model"
      : "";

    if (numberError || brandError || modelError) {
      setErrors({
        number: numberError,
        brand: brandError,
        model: modelError,
      });
      return;
    }

    const normalizedNumber = vehicleNumber.toUpperCase();

    if (addedVehicles.find((v) => v.number === normalizedNumber)) {
      setErrors({ number: "This vehicle already exists in your list" });
      return;
    }

    setIsLoading(true);

    try {
      const apiRes = await addUserVehicleWithoutAMC({
        vehicleNumber: normalizedNumber,
        brand: brand.trim(),
        model: vehicleModel.trim(),
      });

      setIsLoading(false);

      const msg = apiRes?.data?.message;

      if (msg === "Vehicle already exists in your account") {
        setErrors({ number: msg });
        return;
      }

      if (msg === "This vehicle is already registered with another user") {
        setErrors({ number: msg });
        return;
      }

      if (msg?.includes("active AMC")) {
        setErrors({ number: msg });
        return;
      }

      if (apiRes?.status === 201 && msg === "Vehicle added successfully") {
        const newVehicle = {
          number: normalizedNumber,
          model: vehicleModel.trim(),
          brand: brand.trim(),
        };

        setAddedVehicles((prev) => [...prev, newVehicle]);
        setSelectedVehicle(newVehicle.number);

        setVehicleNumber("");
        setBrand("");
        setVehicleModel("");
        setShowModel(false);
        setErrors({});

        return;
      }

      setErrors({ number: "Failed to add vehicle. Try again." });
    } catch (error) {
      setIsLoading(false);

      const msg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

      setErrors({ number: msg });
    }
  };

  const handleProceed = async () => {
    if (!selectedVehicle) {
      setErrors({ proceed: "Please select a vehicle to continue" });
      return;
    }

    const vehicleData = addedVehicles.find((v) => v.number === selectedVehicle);
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
    setVehicleNumber("");
    setBrand("");
    setVehicleModel("");
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
                key={`${vehicle.number}-${i}`}
                className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm cursor-pointer transition-all ${
                  selectedVehicle === vehicle.number
                    ? "border-[#266DDF] bg-blue-50"
                    : "border-[#C4D9F9]"
                } ${i > 0 ? "mt-3" : ""}`}
                onClick={() => setSelectedVehicle(vehicle.number)}
              >
                <img
                  src={getVehicleImage(vehicleType)}
                  alt={vehicle.model}
                  className="w-20 h-12 object-cover rounded"
                />
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
            placeholder="Enter Registration Number"
            value={vehicleNumber}
            onChange={(e) => {
              setVehicleNumber(e.target.value.toUpperCase());
              setErrors({});
            }}
            className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-2 focus:ring-[#BCD2F5] focus:outline-none"
          />
          {errors.number && (
            <p className="text-[#CB0200] text-xs mb-2">{errors.number}</p>
          )}

          {showModel && (
            <>
              <label className="text-base text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => {
                  const value = e.target.value.replace(/[0-9]/g, "");
                  setBrand(value.slice(0, 10));
                }}
                maxLength={10}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-2"
              />
              {errors.brand && (
                <p className="text-[#CB0200] text-xs mb-2">{errors.brand}</p>
              )}

              <label className="text-base text-gray-700 mb-1">Model</label>
              <input
                type="text"
                placeholder="Enter Model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                maxLength={10}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-3"
              />
              {errors.model && (
                <p className="text-[#CB0200] text-xs mb-2">{errors.model}</p>
              )}

              <div className="flex gap-3">
                <Button
                  text="Cancel"
                  className="w-1/2 bg-gray-500 text-white py-3 rounded-lg"
                  onClick={handleCancelAdd}
                  disabled={isLoading}
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
              disabled={isLoading || !vehicleNumber.trim()}
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
