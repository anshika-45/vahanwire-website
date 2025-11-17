import axiosInstance from "./axiosInstance";

export const getUserVehicles = async () => {
  const response = await axiosInstance.get("/vehicle/user-vehicles");
  return response.data?.data?.vehicles || [];
};

export const updateUserVehicle = async (vehicleId, updateData) => {
  const response = await axiosInstance.put(`/vehicle/user-vehicles/${vehicleId}`, updateData);
  return response.data;
};

export const deleteUserVehicle = async (vehicleId) => {
  const response = await axiosInstance.delete(`/vehicle/delete-without-amc/${vehicleId}`);
  return response.data;
};

export const getVehicleData = async () => {
  const response = await axiosInstance.get("/users/services");
  return response.data;
};

export const addUserVehicle = async (vehicleData) => {
  const response = await axiosInstance.post("/vehicle/add-user-vehicles", vehicleData);
  return response;
};

export const searchUserVehicle = async (vehicleNumber) => {
  const response = await axiosInstance.get(`/vehicle/search?vehicleNumber=${vehicleNumber}`);
  return response.data;
};

export const getUserVehicleWithoutAMC = async () => {
  const response = await axiosInstance.get("/vehicle/without-amc");
  return response.data?.data?.vehicles || [];
};

export const updateAMCPurchaseVehicle = async (purchaseId, vehicleData) => {
  const response = await axiosInstance.post("/amc-purchase/update-amc-vehicle", {
    purchaseId,
    ...vehicleData
  });
  return response.data;
};

export const addUserVehicleWithoutAMC = async (vehicleData) => {
  const response = await axiosInstance.post("/vehicle/add-vehicle-without-amc", vehicleData);
  return response;
};

export const updateAMCVehicle = async (vehicleId, vehicleData) => {
  const response = await axiosInstance.put(`/vehicle/update-without-amc/${vehicleId}`,vehicleData);
  console.log(
  "kjjwfivjesiovjs", response.data
  )
  return response.data;
};