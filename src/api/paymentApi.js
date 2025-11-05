import axiosInstance from "./axiosInstance";

export const initiatePayment = async (paymentData) => {
    try {
      console.log("kjrvnkjkjbkj")
      console.log(paymentData);
      const response = await axiosInstance.post('/payu/initiate-payment', paymentData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Payment initiation error:', error);
      throw error;
    }
  };
  
  export const verifyPayment = async (txnid) => {
    try {
      console.log("Sending verification request for txnid:", txnid);
      const response = await axiosInstance.post('/payu/verify-payment', { txnid });
      return response.data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  };