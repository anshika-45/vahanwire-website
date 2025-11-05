import axiosInstance from "./axiosInstance";

export const getUserVehicles = async () => {
    console.log("get user vehicles");
    const res = await axiosInstance.get("/vehicle/user-vehicles");
    console.log("res",res.data.data.vehicles);
    return res.data?.data?.vehicles || [];
  };

  export const updateUserVehicle = async (vehicleId, updateData) => {
    const res = await axiosInstance.put(`/vehicle/user-vehicles/${vehicleId}`, updateData);
    return res.data;
  };

  export const deleteUserVehicle = async (vehicleId) => {
    const res = await axiosInstance.delete(`/vehicle/user-vehicles/${vehicleId}`);
    return res.data;
  };

  export const getVehicleData = async () => {
    const res = await axiosInstance.get("/users/services");
    return res.data;
  };


  export const addUserVehicle = async (vehicleData) => {
    console.log("add user vehicle");
    console.log(vehicleData);
    const res = await axiosInstance.post("/vehicle/add-user-vehicles", vehicleData);
    console.log(res);
    return res;
  };
  
  export const searchUserVehicle = async (vehicleNumber) => {
    console.log("search by vehicle:", vehicleNumber);
    const res = await axiosInstance.get(`/vehicle/search?vehicleNumber=${vehicleNumber}`);
    console.log(res.data);
    return res.data;
  };
  