import axiosInstance from "./axiosInstance";

export const submitMechanicForm = async (formData) => {
  const response = await axiosInstance.post("/api/mechanicform/submit", formData);
  return response.data;
};
