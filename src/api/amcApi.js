import axiosInstance from "./axiosInstance";

export const getAMCPlansByCategory = async (vehicleType, category) => {
    try {
      const res = await axiosInstance.get(`/amcplan/plans/${vehicleType}/${category}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching AMC plans by category:", error);
      throw error;
    }
  };

