import axiosInstance from "./axiosInstance";

export const initiatePayment = async (paymentData) => {
    const response = await axiosInstance.post("/amc-pay/initiate-payment",paymentData);
    return response.data;
};

export const verifyPayment = async (txnid) => {
  console.log("rkjbgjhb");
    const response = await axiosInstance.post("/amc-pay/verify-payment", {txnid});
    console.log(response);
    return response.data;
};
