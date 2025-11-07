import axiosInstance from "./axiosInstance";

export const sendOtp = async (phone) => {
  console.log("API called with phone:", phone);
  const res = await axiosInstance.post("/users/send-otp", { phone });
  console.log("Response:", res);
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
  console.log("updateeeee");
  const res = await axiosInstance.put("/users/profile", updateData);
  console.log(res);
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
  try {
    const response = await axiosInstance.post("/users/contact", contactData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};
