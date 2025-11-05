import React, { useState, useEffect } from "react";
import uploadIcon from "../assets/upload.webp";
import { getMyProfile, updateMyProfile, uploadProfileImage } from "../api/authApi";

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [previewUrl, setPreviewUrl] = useState("https://i.pravatar.cc/160");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        const data = res?.data || res;
        if (data) {
          setFormData({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
          });
          if (data.profileUrl) {
            setPreviewUrl(data.profileUrl);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);

    try {
      const res = await uploadProfileImage(file);
      const imageUrl = res?.data?.profileUrl || res?.profileUrl;
      if (imageUrl) setPreviewUrl(imageUrl);
      console.log("Image uploaded successfully:", res);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateMyProfile({
        name: formData.name,
        email: formData.email,
      });

      const updatedData = res?.data || res;
      if (updatedData) {
        setFormData((prev) => ({
          ...prev,
          name: updatedData.name || prev.name,
          email: updatedData.email || prev.email,
        }));
      }

      console.log("Profile updated successfully:", res);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <section className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 mb-0">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10">
        <div className="flex flex-col items-center md:w-1/3 gap-4 mt-10 sm:mt-[60px] md:mt-[80px] w-full">
          <div className="relative">
            <img
              src={previewUrl}
              alt="Avatar"
              loading="lazy"
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow"
            />
            <label
              htmlFor="upload"
              className="absolute -bottom-1 right-2 px-2 py-2 sm:px-3 sm:py-3 rounded-full bg-[#266DDF] hover:bg-blue-700 text-white shadow cursor-pointer"
            >
              <img src={uploadIcon} loading="lazy" alt="Upload" className="w-3 h-3 sm:w-4 sm:h-4" />
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex items-center gap-2 text-amber-500 mt-2">
            <span>★</span>
            <span className="text-slate-700 text-base sm:text-lg font-medium">4.8</span>
          </div>
        </div>

        <div className="md:w-2/3 w-full">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full h-10 sm:h-11 md:h-12 rounded-lg border border-[#D9E7FE] text-[#000000] px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-[#D9E7FE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  disabled
                  className="w-full h-10 sm:h-11 md:h-12 rounded-lg border border-[#D9E7FE] text-[#000000] px-3 sm:px-4 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full h-10 sm:h-11 md:h-12 rounded-lg border bg-white border-[#D9E7FE] text-[#000000] px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-[#D9E7FE]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-[#266DDF] hover:bg-blue-700 text-white rounded-lg py-2 sm:py-3 font-medium shadow w-full sm:w-1/2 md:w-1/3"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <div>
                <p className="text-sm text-[#333333] mb-1">Name</p>
                <p className="text-base sm:text-lg font-semibold text-[#000000]">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm text-[#333333] mb-1">Phone Number</p>
                <p className="text-base sm:text-lg font-semibold text-[#000000]">{formData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-[#333333] mb-1">Email Address</p>
                <p className="text-base sm:text-lg font-semibold text-[#000000]">{formData.email}</p>
              </div>
              <button
                onClick={handleEdit}
                className="mt-4 bg-[#266DDF] hover:bg-blue-700 text-white rounded-lg py-2 sm:py-3 font-medium shadow w-full sm:w-1/2 md:w-1/3"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
