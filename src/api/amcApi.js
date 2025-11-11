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


export const getRefundRequestStatus = async (amcPurchaseId) => {
  console.log("cbedhbhj",amcPurchaseId);
  const res = await axiosInstance.get(`/amc-refund/refund-data/${amcPurchaseId}`);
  console.log("kwndjkebjhb",res.data.data);
  return res.data;
}