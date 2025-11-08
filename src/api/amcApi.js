import axiosInstance from "./axiosInstance";

export const getAMCPlansByCategory = async (vehicleType, category) => {
    const res = await axiosInstance.get(`/amc-plans/${vehicleType}/${category}`);
    return res.data;
};

export const getMyAMCPlans = async () => {
    const response = await axiosInstance.get("/users/my-plans");
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
