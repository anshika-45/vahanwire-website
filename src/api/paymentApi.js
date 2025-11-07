import axiosInstance from "./axiosInstance";

export const initiatePayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post(
      "/amc-pay/initiate-payment",
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error("Payment initiation error:", error);
    throw error;
  }
};

export const verifyPayment = async (txnid) => {
  try {
    const response = await axiosInstance.post("/amc-pay/verify-payment", {
      txnid,
    });
    return response.data;
  } catch (error) {
    console.error("Payment verification error:", error);
    throw error;
  }
};
