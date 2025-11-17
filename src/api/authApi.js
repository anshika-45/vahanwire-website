import axiosInstance from "./axiosInstance";

export const sendOtp = async (phone) => {
  const response = await axiosInstance.post("/users/send-otp", { phone });
  return response.data;
};

export const verifyOtp = async (phone, otp) => {
  const response = await axiosInstance.post("/users/verify-otp", { phone, otp });
  return response.data;
};

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

export const updateMyProfile = async (updateData) => {
  const response = await axiosInstance.put("/users/profile", updateData);
  return response.data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);
  const response = await axiosInstance.post(
    "/users/upload-profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const createContact = async (contactData) => {
    const response = await axiosInstance.post("/users/contact", contactData);
    return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/users/user/logout");
  return response.data;
};

export const getActiveCities = async () => {
  const response = await axiosInstance.get(`/amc-admin-city/active`);
  return response;
};

export const updateCity = async (cityData) => {
  const response = await axiosInstance.put(`/users/update-city`, cityData);
  return response.data;
};

export const getAmcInvoice = async (amcPurchaseId) => {
  const response = await axiosInstance.get(`/amc-invoice/${amcPurchaseId}/invoice`);
  return response.data;
};
