import axiosInstance from "./axiosInstance";

export const createRefundRequest = async (refundData) => {
  const response = await axiosInstance.post("/amc-refund/refund-request", refundData);
  return response.data;
};

export const getRefundRequestDetails = async (amcPurchaseId) => {
  const response = await axiosInstance.get(`/amc-refund/refund-data/${amcPurchaseId}`);
  return response.data;
}

export const checkRefundStatus = async (refundRequestId) => {
  const response = await axiosInstance.get(`/admin-amc-refund/refund-request/${refundRequestId}/check-status`);
  return response.data;
};

export const cancelRefundRequest = async (refundRequestId) => {
  const response = await axiosInstance.put(`/amc-refund/refund-request/${refundRequestId}/cancel`);
  return response.data;
};
