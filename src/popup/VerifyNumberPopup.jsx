import React, { useState } from "react";
import Button from "../components/Button";
import phoneGif from "../assets/AnimationPhone.webp";
import OtpVerifypopup from "./OtpVerifypopup";
import Modal from "../components/Modal";

const VerifyNumberPopup = ({ isOpen, onClose, isFromLogin = false }) => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showOtp, setShowOtp] = useState(false);



  if (!isOpen && !showOtp) return null;

  const validatePhone = (num) => /^[6-9]\d{9}$/.test(num);

  const handleVerify = () => {
    setShowError(true);
    if (!validatePhone(number)) {
      setError("Please enter a valid 10-digit phone number starting with 6-9.");
      return;
    }
    setError("");
    setShowError(false);
    setShowOtp(true);
  };

  const handleOtpBack = () => setShowOtp(false);

  return (
    <>
      {/* Phone Number Modal */}
      {!showOtp && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="bg-white rounded-xl p-10 w-[500px] max-w-lg flex flex-col items-center m-4">
            <div className="flex justify-center mb-7">
              <img src={phoneGif} alt="Phone Animation" loading="lazy" className="w-60 h-60" />
            </div>

            <h1 className="text-xl font-semibold text-[#242424] text-center mb-4">Verify Your Number</h1>
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
              className="w-full border border-[#BCD2F5] rounded-lg px-3 py-3 mb-2 focus:outline-none focus:ring-1 focus:ring-[#BCD2F5] text-left text-sm bg-[#F8F8F8]"
            />
            {showError && error && <div className="text-[#CB0200] text-left text-xs mb-2">{error}</div>}

            <Button
              text="Verify"
              className="w-full bg-[#266DDF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2"
              onClick={handleVerify}
            />
          </div>
        </Modal>
      )}

      {/* OTP Modal */}
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
