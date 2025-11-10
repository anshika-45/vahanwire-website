import React, { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import otpImg from "../assets/AnimationPhone.webp";
import { LucideEdit } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { verifyOtp } from "../api/authApi";

const EnterVehicleNumber = React.lazy(() => import("./EnterVehicleNumber"));

const OtpVerifypopup = ({
  isOpen,
  onClose,
  onBack,
  phoneNumber,
  isFromLogin = false,
}) => {
  const { setIsLoggedIn } = useAuth();
  const [showVehiclePopup, setShowVehiclePopup] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (!isOpen) return;
    setTimer(30);
    const interval = setInterval(
      () => setTimer((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
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
    if (e.key === "Backspace" && !otp[idx] && idx > 0)
      inputRefs[idx - 1].current.focus();
  };

  const handleSubmit = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4) {
      setError("Please enter the 4-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await verifyOtp(phoneNumber, fullOtp);
      console.log("OTP verify response:", response);

      if (response.success) {
        if (response.data?.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
        }
        setIsLoggedIn(true);
        if (isFromLogin) {
          onClose();
        } else {
          setShowVehiclePopup(true);
        }
      } else {
        setError(response.message || "Invalid OTP. Try again.");
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      setError(err?.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen && !showVehiclePopup) return null;

  return (
    <>
      {!showVehiclePopup && (
        <Modal isOpen={isOpen} onClose={onClose} onBack={onBack}>
          <div className="bg-white rounded-xl p-5  flex flex-col items-center m-4">
            <img
              src={otpImg}
              loading="lazy"
              alt="OTP Animation"
              className="md:w-60 md:h-60 w-40 h-40 mb-4"
              width={160}     
              height={160}    
              decoding="async" 
            />
            <h1 className="text-xl font-semibold text-[#242424] text-center mb-2">
              Verify Your Number
            </h1>
            <p className="text-xs text-[#333333] mb-4">
              Enter the OTP sent to {phoneNumber}
            </p>

            <Button
              text="Change Number"
              onClick={onBack}
              className="flex items-center gap-1 px-2 py-0 bg-[#EFEFEF] text-[#333333] text-xs rounded-full border border-gray-200 hover:bg-gray-200 transition-all mb-4"
            >
              <span className="p-1 flex items-center justify-center mr-1">
                <LucideEdit size={14} className="text-[#242424]" />
              </span>
            </Button>

            <div id="otp-inputs" className="flex gap-2 mb-3" role="group">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  placeholder="X"
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-10 h-10 text-center text-lg border border-[#BCD2F5] rounded focus:outline-none focus:ring-1 focus:ring-[#BCD2F5]"
                />
              ))}
            </div>

            {error && <div className="text-[#CB0200] text-xs mb-2">{error}</div>}

            <div className="text-xs text-[#666] mb-4">
              Resend OTP in {timer}s
            </div>

            <Button
              text={loading ? "Verifying..." : "Submit"}
              disabled={loading}
              className="w-full bg-[#266DDF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 disabled:opacity-60"
              onClick={handleSubmit}
            />
          </div>
        </Modal>
      )}

      {showVehiclePopup && (

        <React.Suspense fallback={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-white">Loading vehicle entry...</div>
          </div>
        }>
          <EnterVehicleNumber
            isOpen={showVehiclePopup}
            onClose={onClose}
            onBack={() => setShowVehiclePopup(false)}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default OtpVerifypopup;