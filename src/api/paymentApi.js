import axiosInstance from "./axiosInstance";

export const initiatePayment = async (paymentData) => {
    const response = await axiosInstance.post("/amc-pay/initiate-payment",paymentData);
    return response.data;
};

export const verifyPayment = async (txnid) => {
    const response = await axiosInstance.post("/amc-pay/verify-payment", {txnid});
    return response.data;
};
