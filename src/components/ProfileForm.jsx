import React, { useState, useEffect } from "react";
import uploadIcon from "../assets/upload.webp";
import Button from "./Button";
import {
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
} from "../api/authApi";

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchUserProfile = async () => {
    try {
      const res = await getMyProfile();
      const data = res?.data;
      if (data) {
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
        });
        if (data.profileUrl) setSelectedFile(data.profileUrl);
        setIsEditing(!data.name && !data.email);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const res = await uploadProfileImage(file);
      const imageUrl = res?.data?.profileUrl;
      if (imageUrl) setSelectedFile(imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await updateMyProfile({ name: formData.name, email: formData.email });
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-2 lg:p-10 md:mb-10 mb-5">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex flex-col items-center md:w-1/3 gap-4 w-full mt-4 md:mt-6">
          <div className="relative">
            <img
              src={
                selectedFile ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Avatar"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-30 md:h-30 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-white shadow"
            />
            <label
              htmlFor="upload"
              className="absolute -bottom-1 right-2 px-2 py-2 sm:px-3 sm:py-3 rounded-full bg-[#266DDF] hover:bg-blue-700 text-white shadow cursor-pointer"
            >
              <img
                src={uploadIcon}
                alt="Upload"
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* ---------- Profile Form ---------- */}
        <div className="md:w-2/3 w-full">
          {isEditing ? (
            <form
              onSubmit={handleUpdate}
              className="flex flex-col gap-4 sm:gap-5"
            >
              {/* Name */}
              <div>
                <label className="block text-sm md:text-base text-[#333] mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full h-11 md:h-12 rounded-lg border ${
                    errors.name ? "border-red-400" : "border-[#D9E7FE]"
                  } px-3 sm:px-4 text-sm md:text-base focus:ring-2 focus:ring-[#D9E7FE] outline-none`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm md:text-base text-[#333] mb-1">
                  Phone*
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="w-full h-11 md:h-12 rounded-lg border border-[#D9E7FE] bg-gray-100 px-3 sm:px-4 text-sm md:text-base cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm md:text-base text-[#333] mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full h-11 md:h-12 rounded-lg border ${
                    errors.email ? "border-red-400" : "border-[#D9E7FE]"
                  } px-3 sm:px-4 text-sm md:text-base focus:ring-2 focus:ring-[#D9E7FE] outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#266DDF] hover:bg-blue-700 text-white rounded-lg py-2.5 sm:py-2 md:py-3 font-medium w-full sm:w-[200px] px-4 whitespace-nowrap"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <p className="text-xs text-[#666] mb-1">Name</p>
                <p className="text-sm sm:text-base md:text-lg">
                  {formData.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#666] mb-1">Phone</p>
                <p className="text-sm sm:text-base md:text-lg">
                  {formData.phone}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#666] mb-1">Email</p>
                <p className="text-sm sm:text-base md:text-lg">
                  {formData.email}
                </p>
              </div>

              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-[200px] px-4 lg:w-1/3 py-2.5 md:py-3 bg-[#266DDF] hover:bg-blue-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#D9E7FE] whitespace-nowrap"
                text="Edit Profile"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
