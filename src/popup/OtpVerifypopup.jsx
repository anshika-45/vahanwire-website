import React, { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import otpImg from "../assets/Animation.svg";
import { Edit } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { verifyOtp, sendOtp } from "../api/authApi";
import { getUserVehicleWithoutAMC } from "../api/vehicleApi";

const EnterVehicleNumber = React.lazy(() => import("./EnterVehicleNumber"));
const SelectVehicle = React.lazy(() => import("./SelectVehicle"));

const RESEND_SECONDS = 30;

const OtpVerifypopup = ({
  isOpen,
  onClose,
  onBack,
  phoneNumber,
  isFromLogin = false,
}) => {
  const { setIsLoggedIn, setUser } = useAuth();
  const [showVehiclePopup, setShowVehiclePopup] = useState(false);
  const [userVehicles, setUserVehicles] = useState([]);
  const [showSelectVehicle, setShowSelectVehicle] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

useEffect(() => {
  if (!isOpen) {
    setOtp(["", "", "", ""]);
    setError("");
    inputRefs[0].current?.focus();
  }
}, [isOpen]);

useEffect(() => {
  if (!isOpen) return;
  setTimer(RESEND_SECONDS);
  const interval = setInterval(() => {
    setTimer((prev) => (prev > 0 ? prev - 1 : 0));
  }, 1000);
  return () => clearInterval(interval);
}, [isOpen]);

const handleChange = (value, idx) => {
  if (/^[0-9]?$/.test(value)) {
    const next = [...otp];
    next[idx] = value;
    setOtp(next);
    if (value && idx < 3) inputRefs[idx + 1].current?.focus();
  }
};

const handleKeyDown = (e, idx) => {
  if (e.key === "Backspace" && !otp[idx] && idx > 0) {
    inputRefs[idx - 1].current?.focus();
  }
};

const handleOtpSubmit = async () => {
  const fullOtp = otp.join("").trim();
  if (fullOtp.length !== 4) {
  setError("Please enter 4-digit OTP");
    return;
  }

try {
  setLoading(true);
  setError("");

  const response = await verifyOtp(phoneNumber, fullOtp);

  if (response?.success && response?.data) {
    const { accessToken, user } = response.data;

    if (accessToken) {
      localStorage.setItem("token", accessToken);
    }
        
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }

    setIsLoggedIn(true);

    if (isFromLogin) {
        onClose();
    } else {
      try {
        const vehicles = await getUserVehicleWithoutAMC();
        setUserVehicles(vehicles);

        if (vehicles && vehicles.length > 0) {
          setShowSelectVehicle(true);
        } else {
          setShowVehiclePopup(true);
        }
        } catch (vehicleError) {
          setShowVehiclePopup(true);
        }
        }
      } else {
        setError(response?.message || "Invalid OTP. Try again.");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

const handleResend = async () => {
  if (timer > 0 || resendLoading) return;
  try {
    setResendLoading(true);
    setError("");

    const resp = await sendOtp(phoneNumber);

    if (resp?.success === false) {
      setError(resp?.message || "Could not send OTP. Please try again.");
      return;
    }

    setOtp(["", "", "", ""]);
    inputRefs[0].current?.focus();
    setTimer(RESEND_SECONDS);
    } catch (err) {
    console.error("Resend OTP failed:", err);
     setError(
      err?.response?.data?.message || "Could not send OTP. Please try again."
     );
    } finally {
      setResendLoading(false);
    }
  };

if (!isOpen && !showVehiclePopup && !showSelectVehicle) return null;

return (
  <>
    {!showVehiclePopup && !showSelectVehicle && (
      <Modal isOpen={isOpen} onClose={onClose} onBack={onBack}>
        <div className="bg-white rounded-xl p-5 flex flex-col items-center m-8">
          <img src={otpImg} loading="lazy" alt="OTP Animation" className="md:w-60 md:h-60 w-40 h-40 mb-4" width={160} height={160} decoding="async" />
            <h1 className="text-xl font-semibold text-[#242424] text-center mb-2">
              Verify Your Number
            </h1>
            <p className="text-base text-[#333333] mb-4">
              Enter the OTP sent to {phoneNumber}
            </p>

            <Button
              onClick={onBack}
              className="flex items-center gap-1 px-1 py-0 bg-[#EFEFEF] text-[#333333] text-xs rounded-full border border-gray-200 hover:bg-gray-200 transition-all mb-4"
            >
              <span className="flex items-center justify-center">
                <Edit size={12} className="text-[#242424]" />
              </span>
              <span className="text-xs text-[#333333] ">Change Number</span>
            </Button>

            <div id="otp-inputs" className="flex gap-2 mb-3" role="group">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  placeholder="X"
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-10 h-10 text-center text-sm text-[#5C5C5C] border border-[#BCD2F5] rounded focus:outline-none focus:ring-1 focus:ring-[#BCD2F5]"
                />
              ))}
            </div>

            {error && (
              <div className="text-[#CB0200] text-xs mb-2">{error}</div>
            )}

            {timer > 0 ? (
              <div className="text-base text-[#CB0200] mb-4">
                Resend OTP in {timer}s
              </div>
            ) : (
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-base text-[#266DDF] underline mb-4 disabled:opacity-60"
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            )}

            <Button
              text={loading ? "Verifying..." : "Submit"}
              disabled={loading}
              className="w-full bg-[#266DDF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2 disabled:opacity-60"
              onClick={handleOtpSubmit}
            />
          </div>
        </Modal>
      )}

      {showVehiclePopup && (
        <EnterVehicleNumber
          isOpen={showVehiclePopup}
          onClose={onClose}
          onBack={() => setShowVehiclePopup(false)}
        />
      )}

      {showSelectVehicle && (
        <React.Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="text-white">Loading vehicle selection...</div>
            </div>
          }
        >
          <SelectVehicle
            isOpen={showSelectVehicle}
            onClose={onClose}
            onBack={() => setShowSelectVehicle(false)}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default OtpVerifypopup;
