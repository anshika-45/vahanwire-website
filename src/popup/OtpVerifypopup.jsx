import React, { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import otpImg from "../assets/AnimationPhone.webp";
import { LucideEdit } from "lucide-react";
import EnterVehicleNumber from "./EnterVehicleNumber";
import { useAuth } from "../context/AuthContext";

const OtpVerifypopup = ({ isOpen, onClose, onBack, isFromLogin = false }) => {
  const { setIsLoggedIn } = useAuth();
  const [showVehiclePopup, setShowVehiclePopup] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (!isOpen) return;
    setTimer(30);
    const interval = setInterval(() => setTimer((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleChange = (value, idx) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      if (value && idx < 3) inputRefs[idx + 1].current.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) inputRefs[idx - 1].current.focus();
  };

  if (!isOpen && !showVehiclePopup) return null;

  return (
    <>
      {/* OTP Modal */}
      {!showVehiclePopup && (
        <Modal isOpen={isOpen} onClose={onClose} onBack={onBack}>
          <div className="bg-white rounded-xl p-10 w-[500px] max-w-lg flex flex-col items-center m-4">
            <img src={otpImg} loading="lazy" alt="OTP Animation" className="w-60 h-60 mb-4" />
            <h1 className="text-xl font-semibold text-[#242424] text-center mb-2">Verify Your Number</h1>
            <p className="text-xs text-[#333333] mb-4">Enter OTP to start accepting jobs on Vahanwire.</p>

            <Button
            text="Change Number"
            onClick={onBack}
              className="flex items-center gap-1 px-2 py-0 bg-[#EFEFEF] text-[#333333] text-xs rounded-full border border-gray-200 hover:bg-gray-200 transition-all mb-4"
            >
            <span className=" p-1 flex items-center justify-center mr-1">
              <LucideEdit size={14} className="text-[#242424]" />
              </span>
            </Button>

            <label htmlFor="otp-inputs" className="sr-only">Enter OTP</label>
            <div id="otp-inputs" className="flex gap-2 mb-3" role="group" aria-label="OTP input">
            {otp.map((digit, idx) => (
            <input
            key={idx}
            ref={inputRefs[idx]}
            type="text"
            maxLength={2}
            value={digit}
            placeholder="X"
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="w-10 h-10 text-center text-lg border border-[#BCD2F5] rounded focus:outline-none focus:ring-1 focus:ring-[#BCD2F5]"
              aria-label={`OTP digit ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-xs text-[#CB0200] mb-4">Resend OTP in {timer}s</div>

            <Button
              text="Submit"
              className="w-full bg-[#266DDF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2"
              onClick={() => {
                setIsLoggedIn(true);
                if (isFromLogin) {
                  onClose();
                } else {
                  setShowVehiclePopup(true);
                }
              }}
            />
          </div>
        </Modal>
      )}

      {/* Vehicle Modal */}
      {showVehiclePopup && (
        <EnterVehicleNumber
          isOpen={showVehiclePopup}
          onClose={onClose}
          onBack={() => setShowVehiclePopup(false)}
        />
      )}
    </>
  );
};

export default OtpVerifypopup;
