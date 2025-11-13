import axiosInstance from "./axiosInstance";

export const sendOtp = async (phone) => {
  const res = await axiosInstance.post("/users/send-otp", { phone });
  return res.data;
};

export const verifyOtp = async (phone, otp) => {
  const res = await axiosInstance.post("/users/verify-otp", { phone, otp });
  return res.data;
};

export const getMyProfile = async () => {
  const res = await axiosInstance.get("/users/profile");
  return res.data;
};

export const updateMyProfile = async (updateData) => {
  const res = await axiosInstance.put("/users/profile", updateData);
  return res.data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);
  const res = await axiosInstance.post(
    "/users/upload-profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const createContact = async (contactData) => {
    const response = await axiosInstance.post("/users/contact", contactData);
    return response.data;
};

export const getCityFromCoords = async (lat, lon) => {
  const response = await axiosInstance.get("/users/get-city", {
    params: { lat, lon },
  });
  return response.data;
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/users/user/logout");
    return response.data;
  } catch (error) {
    console.error("Logout API Error:", error);
    throw error;
  }
};

export const getActiveCities = async () => {
  try {
    const response = await axiosInstance.get(`/amc-admin-city/active`);
    console.log("kjbecjkbkje",response);
    return response;
  } catch (error) {
    console.error("Error fetching active cities:", error);
    throw error;
  }
};
export const updateCity = async (cityData) => {
  try {
    console.log("Updating city:", cityData);
    const response = await axiosInstance.put(`/users/update-city`, cityData);
    console.log("City update response:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating city:", error);
    throw error;
  }
};
