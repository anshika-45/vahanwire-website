import axiosInstance from "./axiosInstance";

export const getAMCPlansByCategory = async (vehicleType, category) => {
  try {
    const res = await axiosInstance.get(
      `/amc-plans/${vehicleType}/${category}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching AMC plans by category:", error);
    throw error;
  }
};

export const getMyAMCPlans = async () => {
  try {
    const response = await axiosInstance.get("/users/my-plans");
    return response.data;
  } catch (error) {
    console.error("Get payment status error:", error);
    throw error;
  }
};

export const selectAMCVehicle = async (vehicleData) => {
  const res = await axiosInstance.post(
    "/amc-purchase/select-amc-vehicle",
    vehicleData
  );
  console.log("Select AMC vehicle response:", res.data);
  return res.data;
};

export const createAMCPurchase = async (purchaseData) => {
  try {
    const res = await axiosInstance.post(
      "/amc-purchase/create-amc-purchase",
      purchaseData
    );
    return res.data;
  } catch (err) {
    console.error("createAMCPurchase API error:", err);
    throw err.response?.data || { message: "Failed to create AMC purchase" };
  }
};
