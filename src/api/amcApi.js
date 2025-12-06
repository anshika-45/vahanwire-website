import axiosInstance from "./axiosInstance";

export const getAMCPlansByCategory = async (vehicleType, category, cityName='Noida') => {
  const params = cityName ? { cityName } : {};
  const response = await axiosInstance.get(`/amc-plans/${vehicleType}/${category}`,{params});
  return response.data;
};

export const getMyAMCPlans = async () => {
  const response = await axiosInstance.get("/users/my-plans");
  return response.data;
};

export const selectAMCVehicle = async (vehicleData) => {
  const response = await axiosInstance.post("/amc-purchase/select-amc-vehicle",vehicleData);
  return response.data;
};

export const createAMCPurchase = async (purchaseData) => {
  const response = await axiosInstance.post("/amc-purchase/create-amc-purchase",purchaseData);
  return response.data;
};

