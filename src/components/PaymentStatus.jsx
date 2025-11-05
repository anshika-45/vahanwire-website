import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyPayment } from "../api/authApi";
import SuccessPurchase from "../popup/SuccessPurchase";
import FailedPurchase from "../popup/FailedPurchase";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [verified, setVerified] = useState(false);

  const txnid = searchParams.get("txnid");
  const paymentStatus = searchParams.get("status");

  useEffect(() => {
    const checkPayment = async () => {
      if (!txnid) return;

      try {
        const res = await verifyPayment(txnid);
        if (res?.success && res?.data?.transaction?.status === "success") {
          setStatus("success");
          setVerified(true);
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
      }
    };

    if (paymentStatus === "success") {
      checkPayment();
    } else if (paymentStatus === "failed") {
      setStatus("failed");
    }
  }, [txnid, paymentStatus]);

  // While verifying
  if (status === "verifying") {
    return (
      <div className="text-center mt-20 text-gray-600">
        Verifying your payment...
      </div>
    );
  }

  // Failed case
  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FailedPurchase
          reason="Your UPI payment was not completed or cancelled."
          onClose={() => (window.location.href = "/")}
          onRetry={() => (window.location.href = "/plans")}
        />
      </div>
    );
  }

  // Success case
  if (verified && status === "success") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SuccessPurchase onClose={() => (window.location.href = "/")} />
      </div>
    );
  }

  return null;
};

export default PaymentStatus;
