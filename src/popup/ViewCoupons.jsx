import React from "react";
import couponLogo from "../assets/Logo1.webp";
export default function ViewCoupons({ handleClick }) {
  const handleRemoveCoupon = () => {
    handleClick();
  };
  return (
    <div className="py-4 lg:px-15 px-5 bg-[#EFEFEF] max-w-[900px] md:w-[60vw] w-[100vw] rounded-2xl overflow-y-auto h-[90vh]">
      <div className="flex justify-end cursor-pointer">
        <span onClick={handleRemoveCoupon} className="">
          X
        </span>
      </div>
      <h2 className="md:text-2xl text-sm font-bold text-center py-2">
        Coupons
      </h2>
      <div className="w-full p-3 rounded-2xl mt-3 bg-white flex ">
        <input
          placeholder="Have a Coupon code? Type here"
          className="w-full"
          type="text"
        />
        <button className="text-blue-600" role="apply">
          Apply
        </button>
      </div>
      <div className="py-5 px-5 rounded-2xl  shadow-md bg-white mt-5 flex items-center gap-4 relative ">
        <div className="self-start py-3 shrink-0">
          <img src={couponLogo} alt="" />
        </div>
        <div className="relative">
          <h3 className="font-semibold lg:text-lg text-sm">
            Invite friends and earn 100 for every friend who signs up and
            completes their first job.
          </h3>
          <div className="">
            <p className="text-gray-400 py-2">
              Get 100 Cashback with this code
            </p>
            <div className="py-2">
              <span className="p-2 border-green-200 border w-auto text-green-700 font-semibold">
                NEWUSER100
              </span>
            </div>
          </div>
        </div>
        <div className="self-start">
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input type="checkbox" className="peer hidden" />
            <span
              className={`
          w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center
          peer-checked:bg-green-500 
        `}
            >
              <span
                className={`
            w-2.5 h-2.5 bg-white rounded-full 
           
          `}
              ></span>
            </span>
          </label>
        </div>
      </div>
      <div className="py-5 px-5 rounded-2xl  shadow-md bg-white mt-5 flex items-center gap-4 relative ">
        <div className="self-start py-3 shrink-0">
          <img src={couponLogo} alt="" />
        </div>
        <div className="relative">
          <h3 className="font-semibold lg:text-lg text-sm">
            Invite friends and earn 100 for every friend who signs up and
            completes their first job.
          </h3>
          <div className="">
            <p className="text-gray-400 py-2">
              Get 100 Cashback with this code
            </p>
            <div className="py-2">
              <span className="p-2 border-green-200 border w-auto text-green-700 font-semibold">
                NEWUSER100
              </span>
            </div>
          </div>
        </div>
        <div className="self-start">
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input type="checkbox" className="peer hidden" />
            <span
              className={`
          w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center
          peer-checked:bg-green-500  
        `}
            >
              <span
                className={`
            w-2.5 h-2.5 bg-white rounded-full 
           
          `}
              ></span>
            </span>
          </label>
        </div>
      </div>
      <div className="py-5 px-5 rounded-2xl  shadow-md bg-white mt-5 flex items-center gap-4 relative ">
        <div className="self-start py-3 shrink-0">
          <img src={couponLogo} alt="" />
        </div>
        <div className="relative">
          <h3 className="font-semibold lg:text-lg text-sm">
            Invite friends and earn 100 for every friend who signs up and
            completes their first job.
          </h3>
          <div className="">
            <p className="text-gray-400 py-2">
              Get 100 Cashback with this code
            </p>
            <div className="py-2">
              <span className="p-2 border-green-200 border w-auto text-green-700 font-semibold">
                NEWUSER100
              </span>
            </div>
          </div>
        </div>
        <div className="self-start">
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input type="checkbox" className="peer hidden" />
            <span
              className={`
          w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center
          peer-checked:bg-green-500  
        `}
            >
              <span
                className={`
            w-2.5 h-2.5 bg-white rounded-full 
           
          `}
              ></span>
            </span>
          </label>
        </div>
      </div>

      <div
        className="bg-sky-700 rounded-lg mt-4 text-white flex justify-center items-center py-3 cursor-pointer"
        role="button"
      >
        Tap To Apply
      </div>
    </div>
  );
}
