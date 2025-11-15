import React, { useEffect, useState } from "react";
import couponLogo from "../assets/Logo-AMC.svg";
import cross from "../assets/x.webp";
import checked from "../assets/radio-checked.svg";
import unchecked from "../assets/radio-unchecked.svg";

export default function ViewCoupons({ handleClick, couponDetails, coupon }) {
   const [selectedCoupon, setSelectedCoupon] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
     const prev = document.body.style.overflow;
     document.body.style.overflow = "hidden";
     return () => {
       document.body.style.overflow = prev;
     };
   }, []);

  const coupons = [
    {
      id: 1,
      title:
        "Invite friends and earn 100 for every friend who signs up and completes their first job.",
      description: "Get 100 Cashback with this code",
      discountAmount: "100",
      code: "NEWUSER100",
      logo: couponLogo,
    },
    {
      id: 2,
      title: "Flat ₹50 off on your next purchase above ₹499.",
      discountAmount: "50",
      description: "Use this coupon to save instantly!",
      code: "SAVE50",
      logo: couponLogo,
    },
    {
      id: 3,
      title: "Get 15% off for new users on their first transaction.",
      discountAmount: "45",
      description: "Limited-time offer for new users.",
      code: "FIRST15",
      logo: couponLogo,
    },
  ];

  const handleRemoveCoupon = () => {
    handleClick();
  };

  const handleSelect = (id) => {
    setSelectedCoupon(id);
  };

  const handleApply = () => {
    if (selectedCoupon !== null) {
      const selected = coupons.find((c) => c.id === selectedCoupon);
      couponDetails(selected);
    }
    handleClick();
  };

  useEffect(() => {
    if (coupon) {
      setSelectedCoupon(coupon.id);
    }
  }, [coupon]);

  // --- Filter coupons based on regex match ---
  const filteredCoupons = coupons.filter((c) => {
    if (!searchQuery.trim()) return true; // no search -> show all
    const regex = new RegExp(searchQuery.trim(), "i"); // case-insensitive match
    return regex.test(c.title) || regex.test(c.code);
  });

  return (
    <div className="py-4 lg:px-15 px-5 bg-[#EFEFEF] max-w-[900px] md:w-[60vw] w-[100vw] rounded-2xl overflow-y-auto h-[90vh] hide-scrollbar relative">
      <h2 className="md:text-2xl text-sm font-bold text-center py-2 flex gap-2 items-center justify-center">
        Coupons
        <span
          onClick={handleRemoveCoupon}
          className="justify-self-end cursor-pointer"
        >
          <img src={cross} alt="cross" className="w-4 h-4 " />
        </span>
      </h2>

      {/* --- Search Input --- */}
      <div className="w-full p-3 rounded-2xl mt-3 bg-white flex">
        <input
          placeholder="Have a Coupon code? Type here"
          className="w-full focus:outline-none focus:ring-0 focus:border-none border-none hover:border-none"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="text-blue-600" role="apply">
          Apply
        </button>
      </div>

      {/* --- Filtered Coupon List --- */}
      {filteredCoupons.length > 0 ? (
        filteredCoupons.map((c) => (
          <div
            key={c.id}
            onClick={() => handleSelect(c.id)}
            className="py-5 px-5 rounded-2xl shadow-md bg-white mt-5 flex items-center gap-4 relative cursor-pointer"
          >
            <div className="self-start py-3 shrink-0">
              <img src={c.logo} alt="" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold lg:text-lg text-sm">{c.title}</h3>
              <p className="text-gray-400 py-2">{c.description}</p>
              <div className="py-2">
                <span className="p-2 border-green-200 border w-auto text-green-700 font-semibold">
                  {c.code}
                </span>
              </div>
            </div>

            <div className="self-start">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={selectedCoupon === c.id}
                  readOnly
                />
                {selectedCoupon === c.id ? (
                  <img src={checked} alt="" />
                ) : (
                  <img src={unchecked} alt="" />
                )}
              </label>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-5">No coupons found</p>
      )}

      <div
        onClick={handleApply}
        className="bg-sky-700 rounded-lg mt-4 text-white flex justify-center items-center py-3 cursor-pointer"
        role="button"
      >
        Tap To Apply
      </div>
    </div>
  );
}
