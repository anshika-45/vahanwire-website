import axiosInstance from "./axiosInstance";

export const getAMCPlansByCategory = async (vehicleType, category) => {
    const res = await axiosInstance.get(`/amc-plans/${vehicleType}/${category}`);
    return res.data;
};

export const getMyAMCPlans = async () => {
    const response = await axiosInstance.get("/users/my-plans");
    console.log("responseeee",response);
    return response.data;
};

export const selectAMCVehicle = async (vehicleData) => {
  const res = await axiosInstance.post("/amc-purchase/select-amc-vehicle",vehicleData);
  return res.data;
};

export const createAMCPurchase = async (purchaseData) => {
    const res = await axiosInstance.post("/amc-purchase/create-amc-purchase",purchaseData);
    return res.data;
};

export const createRefundRequest = async (refundData) => {
  console.log("kjebjq",refundData);
  const res = await axiosInstance.post("/amc-refund/refund-request", refundData);
  return res.data;
};


export const getRefundRequestDetails = async (amcPurchaseId) => {
  console.log("cbedhbhj",amcPurchaseId);
  const res = await axiosInstance.get(`/amc-refund/refund-data/${amcPurchaseId}`);
  console.log("kwndjkebjhb",res.data.data);
  return res.data;
}


export const checkRefundStatus = async (refundRequestId) => {
  try {
    const response = await axiosInstance.get(
      `/admin-amc-refund/refund-request/${refundRequestId}/check-status`
    );
    return response.data;
  } catch (error) {
    console.error("Error checking refund status:", error);
    throw error;
  }
};

export const downloadAmcInvoice = async (amcId) => {
  try {
    const response = await axios.get(
      `/api/amc-invoice/${amcId}/invoice/download`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${amcId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading invoice:", error);
    alert("Failed to download invoice. Please try again later.");
  }
};


export const getAmcInvoice = async (amcPurchaseId) => {
  try {
    const response = await axiosInstance.get(`/amc-invoice/${amcPurchaseId}/invoice`);
    console.log("kjebckjbke",response);
    return response.data;
  } catch (error) {
    console.error("Error fetching AMC invoice:", error);
    throw error;
  }
};

export const cancelRefundRequest = async (refundRequestId) => {
  try {
    console.log("kewjckbjk",refundRequestId);
    console.log("jecw jebjhbe");
    const response = await axiosInstance.put(`/amc-refund/refund-request/${refundRequestId}/cancel`);
    console.log("nwcbjbejbjwe",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching AMC invoice:", error);
    throw error;
  }
};

