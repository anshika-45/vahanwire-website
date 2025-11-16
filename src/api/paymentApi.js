import axiosInstance from "./axiosInstance";

export const initiatePayment = async (paymentData) => {
    const response = await axiosInstance.post("/amc-pay/initiate-payment",paymentData);
    return response.data;
};

export const getPaymentStatus = async (txnid) => {
    const response = await axiosInstance.get(`/amc-pay/payment-status/${txnid}`);
    return response.data;
};