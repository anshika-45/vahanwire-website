import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAmcData } from "../context/AmcDataContext";
import { useCity } from "../context/CityContext";
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
import { createAMCPurchase, selectAMCVehicle } from "../api/amcApi";
import { initiatePayment } from "../api/paymentApi";
import Payment from "./Payment";
import { useAMCPlans } from "../context/AmcPlanContext";

const SuccessPurchase = React.lazy(() => import("./SuccessPurchase"));

const SelectVehicle = ({ isOpen, onClose, onBack, addedVehicleNumber, addedVehicleBrand, addedVehicleModel, addedVehicleType }) => {


 const selectedPlan =  JSON.parse(localStorage.getItem("selectedPlan"))

  const plan = selectedPlan

  const navigate = useNavigate();
  const { selectedCityName } = useCity();
  const { vehicleType, amcType, activateFilter } = useAmcData();
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
  });

  const [error, setErrors] = useState({
    vehicleNumber: "",
    brand: "",
    model: "",
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [addedVehicles, setAddedVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);
  const [currentView, setCurrentView] = useState("select");
  const [paymentData, setPaymentData] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;

    if (name === "vehicleNumber") val = val.toUpperCase().replace(/\s/g, "");
    if (name === "brand") val = val.replace(/[^A-Za-z\s\-]/g, "");
    if (name === "model") val = val.replace(/[^A-Za-z0-9\s\-]/g, "");

    setFormData((p) => ({ ...p, [name]: val }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const hasValidBrand = (value) => /[^a-zA-Z\s]/.test(value);

  const hasValid = (value) => /[^a-zA-Z0-9\s]/.test(value);

  const validateVehicleNumber = (num) => {
    const cleaned = num.trim().toUpperCase().replace(/[-\s]/g, "");
    const regex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;

    if (cleaned.length < 8 || cleaned.length > 12)
      return "Vehicle number should be 8–12 characters";
    if (!regex.test(cleaned))
      return "Invalid number (e.g. MH12AB1234)";
    return "";
  };

  const validateBrand = (v) => {
    const trimmedValue = v.trim();
    if (!trimmedValue) return "Brand is required";
    if (hasValidBrand(trimmedValue))
      return "Brand cannot contain special characters";
    if (trimmedValue.length < 2) return "Brand must be at least 2 characters";
    if (trimmedValue.length > 30) return "Brand cannot exceed 30 characters";
    if (/\s{2,}/.test(trimmedValue))
      return "Brand cannot contain multiple consecutive spaces";
    return "";
  };

  const validateModel = (v) => {
    const trimmedValue = v.trim();

    if (!trimmedValue) return "Model is required";
    if (hasValid(trimmedValue))
      return "Model cannot contain special characters";

    if (trimmedValue.length < 2) return "Model must be at least 2 characters";

    if (trimmedValue.length > 50) return "Model cannot exceed 50 characters";

    if (/\s{2,}/.test(trimmedValue))
      return "Model cannot contain multiple consecutive spaces";

    return "";
  };

  useEffect(() => {
    if (!initialized.current && isOpen) {
      initialized.current = true;
      setCurrentView("select");

      if (addedVehicleNumber && addedVehicleModel) {
        const preAddedVehicle = {
          number: addedVehicleNumber.toUpperCase(),
          model: addedVehicleModel,
          brand: addedVehicleBrand,
          vehicleType: addedVehicleType
        };
        setAddedVehicles([preAddedVehicle]);
        setSelectedVehicle(preAddedVehicle.number);
      } else {
        (async () => {
          try {
            const vehicles = await getUserVehicleWithoutAMC();
            if (vehicles?.length > 0) {
              const formatted = vehicles.map((v) => ({
                number: v.vehicleNumber.toUpperCase(),
                model: v.model,
                brand: v.brand,
                vehicleType: v.vehicleType || "car"
              }));
              setAddedVehicles(formatted);
              const matchingVehicle = formatted.find(v => v.vehicleType === vehicleType);
              if (matchingVehicle) {
                setSelectedVehicle(matchingVehicle.number);
              }
            }
          } catch (err) {
            console.error("Failed to load vehicles:", err);
          }
        })();
      }
    }
  }, [isOpen, addedVehicleNumber, addedVehicleModel, addedVehicleBrand, addedVehicleType, vehicleType]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        vehicleNumber: "",
        brand: "",
        model: "",
      });
      setErrors({});
      setShowModel(false);
      initialized.current = false;
      setCurrentView("select");
      setPaymentData(null);
    }
  }, [isOpen]);

  const handleSearch = async () => {
    const errorMsg = validateVehicleNumber(formData.vehicleNumber);
    if (errorMsg) {
      setErrors({ vehicleNumber: errorMsg });
      return;
    }

    const vehicleNumber = formData.vehicleNumber.toUpperCase();

    if (addedVehicles.find((v) => v.number === vehicleNumber)) {
      setErrors({ vehicleNumber: "This vehicle is already in your list" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchUserVehicle(vehicleNumber);
      const data = response.data;
      setIsLoading(false);

      if (data.alreadyRegisteredByOtherUser) {
        setErrors((prev) => ({
          ...prev,
          vehicleNumber: "This vehicle is already registered by another user.",
        }));
        return;
      }

      if (data.hasAMC) {
        setErrors((prev) => ({
          ...prev,
          vehicleNumber: `This vehicle already has an active AMC plan (${data?.amcDetails?.planName || " "})`,
        }));
        return;
      }

      if (data?.found && data.vehicle) {
        const newVehicle = {
          number: data.vehicle.vehicleNumber.toUpperCase(),
          brand: data.vehicle.brand,
          model: data.vehicle.model,
          vehicleType: data.vehicle.vehicleType
        };

        setAddedVehicles((p) => [...p, newVehicle]);
        setSelectedVehicle(newVehicle.number);
        setErrors({});
        setFormData({ vehicleNumber: "", brand: "", model: "" });
        return;
      }
      setShowModel(true);
    } catch (error) {
      setIsLoading(false);
      setErrors({ vehicleNumber: error?.response?.data?.message || "Search failed. Try again." });
    }
  };

  const handleAddVehicle = async () => {
    const e = {
      vehicleNumber: validateVehicleNumber(formData.vehicleNumber),
      brand: validateBrand(formData.brand),
      model: validateModel(formData.model),
    };

    setErrors(e);

    if (Object.values(e).some((msg) => msg)) return;

    const normalized = formData.vehicleNumber.toUpperCase();

    if (addedVehicles.find((v) => v.number === normalized)) {
      setErrors({ vehicleNumber: "This vehicle already exists" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await addUserVehicleWithoutAMC({
        vehicleNumber: normalized,
        brand: formData.brand,
        model: formData.model,
        vehicleType
      });
      setIsLoading(false);
      const msg = res?.data?.message;

      if (msg?.includes("already registered")) {
        setErrors({ vehicleNumber: msg });
        return;
      }

      if (res.status === 201) {
        const newVehicle = {
          number: normalized,
          brand: formData.brand,
          model: formData.model,
          vehicleType: vehicleType
        };
        setAddedVehicles((p) => [...p, newVehicle]);
        setSelectedVehicle(newVehicle.number);
        setShowModel(false);
        setFormData({
          vehicleNumber: "",
          brand: "",
          model: "",
        });
        setErrors({});
        return;
      }

      setErrors({ vehicleNumber: "Failed to add vehicle. Try again." });
    } catch (err) {
      setIsLoading(false);
      setErrors({ vehicleNumber: err?.response?.data?.message || "Something went wrong. Please try again " });
    }
  };

  const handleProceedToPayment = async (plan, vehicle) => {
    if (!plan?._id) {
      alert("Plan information is incomplete. Missing ID or price.");
      return;
    }

    if (!vehicle?.vehicleNumber) {
      alert("Vehicle information is missing. Please select a vehicle.");
      return;
    }

    setPaymentLoading(true);
    try {
      const purchaseData = await createAMCPurchase({
        planId: plan._id,
        vehicleNumber: vehicle.vehicleNumber,
      });

      if (purchaseData) {
        const paymentResponse = await initiatePayment({
          planId: plan._id,
          vehicleNumber: vehicle.vehicleNumber,
          couponCode: null,
        });

        if (paymentResponse.success) {
          setPaymentData(paymentResponse.data);
          setCurrentView("payment");
        } else {
          alert(paymentResponse.message || "Failed to initiate payment");
        }
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setCurrentView("success");
  };

  const handlePaymentBack = () => {
    setCurrentView("select");
    setPaymentData(null);
  };

  const handleProceed = async () => {

    console.log("hgftyuhgvbjk")

    if (!selectedVehicle) {
       console.log("drtgvghjuiygbhj")
      setErrors({ proceed: "Please select a vehicle to continue" });
      return;
    }

    const vehicleData = addedVehicles.find((v) => v.number === selectedVehicle);

    if (!vehicleData) {
      alert("Vehicle not found");
      return;
    }

    setIsProceeding(true);

    try {
      const response = await selectAMCVehicle({
        vehicleNumber: vehicleData.number,
        brand: vehicleData.brand,
        model: vehicleData.model,
        vehicleType: vehicleData.vehicleType,
        cityName: selectedCityName
      });

      if (response?.success) {
        const { hasActiveAMC, plans, vehicle, planCategory } = response.data;

        console.log({plan, plans})

        if (hasActiveAMC) {
          alert("This vehicle already has an active AMC plan.");
          setIsProceeding(false);
          return;
        }

        if (!plans || plans.length === 0) {
          alert("No AMC plans available for your vehicle Brand or City.");
          setIsProceeding(false);
          return;
        }

        const vehicleDataToStore = {
          vehicle: vehicle,
          vehicleType: vehicleType,
          amcType: planCategory,
          plans: plans,
          timestamp: Date.now()
        };

        localStorage.setItem('selectedVehicleData', JSON.stringify(vehicleDataToStore));

        const isPlanValid = plans.some((p)=>p._id === plan._id)

        if (isPlanValid) {
          await handleProceedToPayment(plan, vehicle);
        } else {

          const filterData = {
            plans,
            vehicle,
            selectedPlan: plan,
            vehicleType: vehicleType,
            amcType: planCategory
          };
          activateFilter(filterData);
          navigate("/vehicle-amc-filter", { state: filterData });
          alert('Selected Plan is not for your vehicle')
          handleClose()

        }
      } else {
        alert(response?.message || "Failed to process request.");
      }
    } catch (error) {
      console.error("handleProceed error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsProceeding(false);
    }
  };

  const handleCancelAdd = () => {
    setShowModel(false);
    setFormData({
      vehicleNumber: "",
      brand: "",
      model: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    onClose();
  };

  const handleBack = () => {
    if (currentView === "payment") {
      handlePaymentBack();
    } else {
      onBack();
    }
  };

  const renderContent = () => {
    if (currentView === "payment") {
      return (
        <Payment
          onBack={handlePaymentBack}
          onPaymentSuccess={handlePaymentSuccess}
          paymentData={paymentData}
          plan={plan}
          vehicle={addedVehicles.find(v => v.number === selectedVehicle)}
        />
      );
    }

    if (currentView === "success") {
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <SuccessPurchase onClose={onClose} plan={plan} />
        </React.Suspense>
      );
    }

    const filteredVehicles = addedVehicles.filter(v => v.vehicleType === vehicleType);
    const hasMatchingVehicles = filteredVehicles.length > 0;

    const isAddButtonDisabled = !formData.vehicleNumber.trim() || isLoading;

    return (
      <div className="w-full max-w-[550px] flex flex-col items-center p-2 relative">
        <div className="w-full flex items-center gap-2 bg-green-50 border border-green-200 text-[#21830F] rounded-lg px-4 py-3 mb-4">
          <img src={verifyIcon} alt="verify" className="w-5 h-5" />
          <span className="font-medium text-sm text-[#333333]">
            Account Verified
          </span>
        </div>
        <div className="w-full bg-white rounded-xl p-6 mb-4">
          <h2 className="text-xl font-semibold text-[#242424] mb-4">
            Select Vehicle
          </h2>

          {hasMatchingVehicles ? (
            filteredVehicles.map((vehicle, i) => (
              <div
                key={vehicle.number}
                className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm cursor-pointer transition-all ${selectedVehicle === vehicle.number
                  ? "border-[#266DDF] bg-blue-50"
                  : "border-[#C4D9F9]"
                  } ${i > 0 ? "mt-3" : ""}`}
                onClick={() => setSelectedVehicle(vehicle.number)}
              >
                <img src={getVehicleImage(vehicle.vehicleType)} alt={vehicle.model} className="w-20 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div
                    className="font-medium text-[18px] text-gray-900"
                    title={`${vehicle.brand} ${vehicle.model}`}
                  >
                    {truncateText(vehicle.brand, 60)}{" "}
                    {truncateText(vehicle.model, 60)}
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
              No {vehicleType}s added yet. Please add below.
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 w-full border border-gray-100 mb-20">
          <h2 className="text-xl font-semibold text-[#242424] mb-3">
            Add New Vehicle
          </h2>
          <label className="text-sm lg:text-[16px] mb-3">Enter Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Enter Registration Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-2 focus:ring-[#BCD2F5] focus:outline-none"
          />
          {error.vehicleNumber && (
            <p className="text-[#CB0200] text-xs mb-2">{error.vehicleNumber}</p>
          )}

          {showModel && (
            <>
              <label className="text-base text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="Enter Brand"
                value={formData.brand}
                onChange={handleChange}
                maxLength={15}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-2"
              />
              {error.brand && (
                <p className="text-[#CB0200] text-xs mb-2">{error.brand}</p>
              )}

              <label className="text-base text-gray-700 mb-1">Model</label>
              <input
                type="text"
                name="model"
                placeholder="Enter Model"
                value={formData.model}
                onChange={handleChange}
                maxLength={30}
                className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 text-base mb-3"
              />
              {error.model && (
                <p className="text-[#CB0200] text-xs mb-2">{error.model}</p>
              )}

              <div className="flex gap-3">
                <Button
                  text="Cancel"
                  className="w-1/2 bg-gray-500 text-white py-3 rounded-lg"
                  onClick={handleCancelAdd}
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
              text={isLoading ? "Searching..." : "Add New Vehicle"}
              className={`w-full py-3 rounded-lg font-semibold ${isAddButtonDisabled ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-[#266DDF] text-white"}`}
              onClick={handleSearch}
              disabled={isAddButtonDisabled}
            />
          )}
        </div>

        <Button
          text={isProceeding ? "Processing..." : "Proceed to Payment"}
          className={`w-full py-3 rounded-lg font-semibold ${hasMatchingVehicles && selectedVehicle
            ? "bg-[#266DDF] text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
          onClick={handleProceed}
          disabled={!hasMatchingVehicles || !selectedVehicle || isProceeding}
        />
      </div>
    );
  };

  const handleModalClose = () => {
    if (currentView === "success") {
      onClose();
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      onBack={currentView === "payment" ? handlePaymentBack : onBack}
      showBackButton={currentView !== "success"}
      showCloseButton={currentView !== "success"}
      proceedButton={null}
    >
      {renderContent()}
    </Modal>
  );
};

export default SelectVehicle;