import React, { useState, Suspense } from "react";
import { createContact } from "../api/authApi";
import { MailOpen, Phone, MapPin } from "lucide-react";
import contactBanner from "../assets/ContactUs.svg";
import contactImage from "../assets/contact-us-card.webp";

const AddBanner = React.lazy(() => import("../components/AddBanner"));
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);
const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    reason: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await createContact(formData);
      setMessage({ type: "success", text: response.message });
      setFormData({ fullName: "", email: "", phoneNumber: "", reason: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.message || "Failed to submit contact form.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Suspense fallback={<ComponentFallback />}>
        <PageBanner title="Contact Us" image={contactBanner} seGradientTitle={false}
  useDarkOverlay={false} showTicker={false}
 height="250px"/>
      </Suspense>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch">
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-8 flex flex-col justify-end">
          <div className="md:flex md:items-end md:space-x-6">
            <div className="md:w-2/5">
              <h2 className="text-4xl text-[rgba(51,51,51,1)] mb-6">
                Contact Us
              </h2>
              <ul className="space-y-4 text-gray-700 text-sm">
                <li className="flex items-center space-x-3">
                  <div className="bg-[#FBBA01] rounded-full p-2 shrink-0">
                    <MailOpen size={14} className="text-[#000000]" />
                  </div>
                  <span>Info@Vahanwire.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="bg-[#FBBA01] rounded-full p-2 shrink-0">
                    <MailOpen size={14} className="text-[#000000]" />
                  </div>
                  <span>Amc@Vahanwire.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="bg-[#FBBA01] rounded-full p-2 shrink-0">
                    <Phone size={14} className="text-[#000000]" />
                  </div>
                  <span>01203221368</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-[#FBBA01] rounded-full p-2 shrink-0">
                    <MapPin size={14} className="text-[#000000]" />
                  </div>
                  <span>
                    TOWER B-819, Noida One, 819, Industrial Area, <br /> Sector
                    62, Noida, Uttar Pradesh 201309
                  </span>
                </li>
              </ul>
            </div>

            <div className="md:w-3/5 flex justify-center mt-6 md:mt-0">
              <img
                src={contactImage}
                alt="Contact Illustration"
                className="w-[180px] sm:w-[220px] md:w-[280px] object-contain"
                loading="lazy"
                width={280}  
                height={200}
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Welcome to <span className="text-[#266DDF]">VahanWire!</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border-none rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#266DDF] bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border-none rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#266DDF] bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your number"
                required
                className="w-full border-none rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#266DDF] bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason
              </label>
              <input
                type="text"
                id="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter reason..."
                required
                className="w-full border-none rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#266DDF] bg-gray-100"
              />
            </div>

            {message && (
              <p
                className={`text-sm ${
                  message.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-gray-400" : "bg-[#266DDF] hover:bg-[#1E5BC0]"
              } text-white py-3 rounded-lg font-medium transition-all text-sm shadow-sm`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* <div className="mt-20">
        <Suspense fallback={<ComponentFallback />}>
          <AddBanner />
        </Suspense>
      </div> */}
    </div>
  );
};

export default ContactUs;
