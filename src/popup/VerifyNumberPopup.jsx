import React, { useState } from "react";
import Button from "../components/Button";
import phoneGif from "../assets/AnimationPhone.webp";
import OtpVerifypopup from "./OtpVerifypopup";
import Modal from "../components/Modal";
import { sendOtp } from "../api/authApi";
const VerifyNumberPopup = ({ isOpen, onClose, isFromLogin = false }) => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen && !showOtp) return null;

  const validatePhone = (num) => /^[6-9]\d{9}$/.test(num);

  const handleVerify = async () => {
    console.log("kgikwhrighi");
    setShowError(true);

    if (!validatePhone(number)) {
      setError("Please enter a valid 10-digit phone number starting with 6-9.");
      return;
    }

    try {
      setLoading(true);
      setError("");

     
      const response = await sendOtp(number);
      console.log("OTP API response:", response);

      if (response.success || response.message?.includes("OTP sent")) {
        setShowOtp(true);
      } else {
        setError(response.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpBack = () => setShowOtp(false);

  return (
    <>
      {!showOtp && (
        <Modal isOpen={isOpen} onClose={onClose}>
  <div
    className="
      bg-white rounded-xl 
      p-6 sm:p-8 md:p-10 
      w-[90%] sm:w-[420px] md:w-[500px] 
      max-w-lg 
      flex flex-col items-center 
      mx-auto my-6
    "
  >
    <div className="flex justify-center mb-5 sm:mb-7">
      <img
        src={phoneGif}
        alt="Phone Animation"
        className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60"
      />
    </div>

    <h1 className="text-lg sm:text-xl font-semibold text-[#242424] text-center mb-3 sm:mb-4">
      Verify Your Number
    </h1>

    <label htmlFor="phone" className="w-full text-xs text-[#5C5C5C] mb-1">
      Phone Number*
    </label>

    <input
      id="phone"
      type="tel"
      placeholder="Phone Number"
      value={number}
      onChange={(e) => {
        setNumber(e.target.value.replace(/[^0-9]/g, ""));
        if (showError) setShowError(false);
      }}
      maxLength={10}
      className="
        w-full border border-[#BCD2F5] rounded-lg 
        px-3 py-2 sm:py-3 
        mb-2 
        focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] 
        text-left text-sm bg-[#F8F8F8]
      "
    />

    {showError && error && (
      <div className="text-[#CB0200] text-left text-xs mb-2">{error}</div>
    )}

    <Button
      text={loading ? "Sending..." : "Verify"}
      disabled={loading}
      className="
        w-full bg-[#266DDF] text-white font-semibold 
        py-2 sm:py-3 
        rounded-lg hover:bg-blue-700 transition-colors mt-2 
        disabled:opacity-60
      "
      onClick={handleVerify}
    />
  </div>
</Modal>

      )}

      {showOtp && (
        <OtpVerifypopup
          isOpen={showOtp}
          onClose={() => {
            setShowOtp(false);
            onClose();
          }}
          onBack={handleOtpBack}
          phoneNumber={number}
          isFromLogin={isFromLogin}
        />
      )}
    </>
  );
};

export default VerifyNumberPopup;
