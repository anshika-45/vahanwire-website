import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAmcData } from "../context/AmcDataContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import brezzaImg from "../assets/vehicle.webp";
import verifyIcon from "../assets/verify.webp";
import {
  searchUserVehicle,
  addUserVehicle,
  getUserVehicles,
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

  // ✅ Validate Indian vehicle number format
  const validateVehicleNumber = (number) => {
    const cleaned = number.trim().toUpperCase().replace(/[-\s]/g, "");
    const pattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;
    if (!cleaned) return "Please enter the vehicle number";
    if (cleaned.length < 8 || cleaned.length > 10)
      return "Vehicle number should be 8–10 characters long";
    if (!pattern.test(cleaned))
      return "Invalid format. Example: DL01AB1234 or MH12DE1433";
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
            const vehicles = await getUserVehicles();
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

    const foundVehicle =
      data?.data?.vehicle || data?.vehicle || data?.data?.data?.vehicle;

    if (data?.data?.found || data?.found) {
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
    const brandError = !brand.trim() ? "Please enter the vehicle brand" : "";
    const modelError = !vehicleModel.trim() ? "Please enter the vehicle model" : "";

    if (numberError || brandError || modelError) {
      setErrors({ number: numberError, brand: brandError, model: modelError });
      return;
    }

    const normalizedNumber = vehicleNumber.toUpperCase();
    if (addedVehicles.find((v) => v.number === normalizedNumber)) {
      setErrors({ number: "This vehicle already exists in your list" });
      return;
    }

    setIsLoading(true);
    const response = await addUserVehicle({
      vehicleNumber: normalizedNumber,
      brand: brand.trim(),
      model: vehicleModel.trim(),
    });
    setIsLoading(false);

    if (response?.status === 201) {
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
    } else {
      setErrors({ number: "Failed to add vehicle. Try again." });
    }
  };

  const handleProceed = async () => {
    if (!selectedVehicle) {
      setErrors({ proceed: "Please select a vehicle to continue" });
      return;
    }

    const vehicleData = addedVehicles.find(
      (v) => v.number === selectedVehicle
    );
    if (!vehicleData) {
      alert("Vehicle not found");
      return;
    }

    setIsProceeding(true);
    const response = await selectAMCVehicle({
      vehicleNumber: vehicleData.number,
      brand: vehicleData.brand,
      model: vehicleData.model,
      vehicleType,
      amcPlanCategory: amcType,
    });
    setIsProceeding(false);

    if (response?.success) {
      const { hasActiveAMC, activeAMC, plans, vehicle } = response.data;
      if (hasActiveAMC) {
        alert("This vehicle already has an active AMC plan.");
      } else {
        const filterData = { plans, vehicle, selectedPlan: plan };
        activateFilter(filterData);
        navigate("/vehicle-amc-filter", { state: filterData });
      }
    } else {
      alert(response?.message || "Failed to process request.");
    }
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

        {/* Existing Vehicle List */}
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
                  src={brezzaImg}
                  alt={vehicle.model}
                  className="w-20 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {vehicle.brand} {vehicle.model}
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
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No vehicles added yet. Please add below.
            </div>
          )}
        </div>

        {/* Add New Vehicle */}
        <div className="bg-white rounded-xl p-6 w-full border border-gray-100 mb-20">
          <h2 className="text-xl font-semibold text-[#242424] mb-3">
            Add Vehicle
          </h2>

          <label className="text-xs text-gray-700 mb-1">Vehicle Number</label>
          <input
            type="text"
            placeholder="Enter Registration Number"
            value={vehicleNumber}
            onChange={(e) => {
              setVehicleNumber(e.target.value.toUpperCase());
              setErrors({});
            }}
            className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-xs mb-2 focus:ring-[#BCD2F5] focus:outline-none"
          />
          {errors.number && (
            <p className="text-[#CB0200] text-xs mb-2">{errors.number}</p>
          )}

          {showModel && (
            <>
              <label className="text-xs text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-xs mb-2"
              />
              {errors.brand && (
                <p className="text-[#CB0200] text-xs mb-2">{errors.brand}</p>
              )}

              <label className="text-xs text-gray-700 mb-1">Model</label>
              <input
                type="text"
                placeholder="Enter Model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-xs mb-3"
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

        {/* Proceed Button */}

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
