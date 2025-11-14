import axiosInstance from "./axiosInstance";

export const getUserVehicles = async () => {
  const res = await axiosInstance.get("/vehicle/user-vehicles");
  return res.data?.data?.vehicles || [];
};

export const updateUserVehicle = async (vehicleId, updateData) => {
  const res = await axiosInstance.put(`/vehicle/user-vehicles/${vehicleId}`, updateData);
  return res.data;
};

export const deleteUserVehicle = async (vehicleId) => {
  const res = await axiosInstance.delete(`/vehicle/delete-without-amc/${vehicleId}`);
  return res.data;
};

export const getVehicleData = async () => {
  const res = await axiosInstance.get("/users/services");
  return res.data;
};

export const addUserVehicle = async (vehicleData) => {
  const res = await axiosInstance.post("/vehicle/add-user-vehicles", vehicleData);
  return res;
};

export const searchUserVehicle = async (vehicleNumber) => {
  console.log("jkkwcnkjbejec",vehicleNumber);
    const res = await axiosInstance.get(`/vehicle/search?vehicleNumber=${vehicleNumber}`);
    return res.data;
};

export const getUserVehicleWithoutAMC = async () => {
  console.log("kjwcdbjkbjk")
  const res = await axiosInstance.get("/vehicle/without-amc");
  console.log("kjejcjbjkbjb",res.data.data.vehicles);
  return res.data?.data?.vehicles || [];
};

export const updateAMCPurchaseVehicle = async (purchaseId, vehicleData) => {
  console.log("lkengwkjnjknjnjknjknknkn");
  const res = await axiosInstance.post("/amc-purchase/update-amc-vehicle", {
    purchaseId,
    ...vehicleData
  });
  console.log("kjksacbjkbjkassscs",res);
  return res.data;
};

export const addUserVehicleWithoutAMC = async (vehicleData) => {
  console.log("ekjqbjkbjqbhjbhj");
  const res = await axiosInstance.post("/vehicle/add-vehicle-without-amc", vehicleData);
  console.log("ejcbjbehjbew",res);
  return res;
};