// import React, { useEffect } from "react";

// const features = [
//   { label: "Flat Tyre (Tube)", qty: "10", left: "8" },
//   { label: "Flat Tyre (Tubeless)", qty: "Unlimited", left: "Unlimited" },
//   { label: "Battery Jumpstart", qty: "Unlimited", left: "Unlimited" },
//   { label: "Custody Service", qty: "12", left: "4" },
//   { label: "Key Unlock Assistance", qty: "Unlimited", left: "Unlimited" },
//   { label: "Fuel Delivery", qty: "Unlimited", left: "Unlimited" },
//   { label: "Starting Problem", qty: "Unlimited", left: "Unlimited" },
// ];

// export default function ServiceCoverageDetails({ isOpen, onClose, plan }) {
//   if (!isOpen) return null;

//   useEffect(() => {
//     if (isOpen) {
//       const prev = document.body.style.overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = prev;
//       };
//     }
//   }, [isOpen]);

//   return (
//     <div className="fixed inset-0 z-50 grid place-items-center p-3 md:p-4 bg-black/40 ">
//       <div className="w-full max-w-sm md:max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto hide-scrollbar">
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-[#E9F0FC] relative">
//           <h2 className="absolute left-1/2 -translate-x-1/2 text-sm md:text-base font-semibold text-[#333]">
//             Service Coverage Details
//           </h2>
//           <button
//             aria-label="Close"
//             onClick={onClose}
//             className="ml-auto text-[#242424] hover:text-slate-700 text-lg md:text-xl"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="px-4 md:px-6 pt-4 md:pt-6 mb-3 md:mb-4">
//           <h3 className="text-xs md:text-sm font-semibold">
//             Vahanwire Premium Care
//           </h3>
//           <p className="text-xs text-[#333] mt-1 leading-snug">
//             Experience essential car care with unmatched value through the Gold
//             Member Card. Designed for everyday peace of mind, it includes key
//             services like puncture repairs, car washes, jump-start support...
//           </p>
//         </div>

//         <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 px-4 md:px-6">
//           <div className="p-2 md:p-3 border border-[#BCD2F5] rounded-md bg-white text-xs">
//             <div className="text-gray-500">Service</div>
//             <div className="font-medium text-sm">
//               {plan?.service || "Unlimited"}
//             </div>
//           </div>
//           <div className="p-2 md:p-3 border border-[#BCD2F5] rounded-md bg-white text-xs">
//             <div className="text-gray-500">Validity</div>
//             <div className="font-medium text-sm">
//               {plan?.validity || "207 Days"}
//             </div>
//           </div>
//         </div>

//         <div className="mx-4 md:mx-6 mb-5 border border-[#E9F0FC] rounded-lg overflow-hidden">
//           <div className="grid grid-cols-3 bg-[#F8F8F8] text-[#242424] text-xs md:text-sm border-b border-[#E9F0FC] font-semibold">
//             <div className="px-3 py-3 text-left">Service Package</div>
//             <div className="px-3 py-3 text-center">QTY</div>
//             <div className="px-3 py-3  text-center">Left</div>
//           </div>

//           {features.map((item, i) => (
//             <div
//               key={i}
//               className={`grid grid-cols-3 items-center text-xs md:text-sm border-t border-[#E9F0FC] ${
//                 i % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]"
//               }`}
//             >
//               <div className="px-3 py-3 text-left text-[#242424] font-normal">
//                 {item.label}
//               </div>
//               <div className="px-3 py-3 text-center text-[#242424] font-normal">
//                 {item.qty}
//               </div>
//               <div className="px-3 py-3 text-center text-[#242424] font-normal">
//                 {item.left}
//               </div>
//             </div>
//           ))}

//           <div className="grid grid-cols-3 font-semibold bg-[#E9F0FC] text-[#242424] text-xs md:text-sm border-t border-[#E9F0FC] ">
//             <div className="px-3 py-2 text-left">Total Services</div>
//             <div className="px-3 py-2 text-center">22</div>
//             <div className="px-3 py-2 text-center">12</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Check, Link, X } from 'lucide-react'
import React, { useEffect } from 'react'

export default function ServiceCoverageDetails({ onClose, plan, }) {

    const purchaseData = plan;
    const validityService = purchaseData?.planServices?.find(s => s.serviceName === "Validity");
    const servicePerYear = purchaseData?.planServices?.find(s => s.serviceName === "Number of Service Per Year");
    const planStart = purchaseData?.planStart;
    const stats = [
        { label: "Service", value: servicePerYear?.value || "Unlimited" },
        { label: "Validity", value: validityService ? `${validityService.value} Days` : "365 Days" },
        { label: "Plan Start After", value: planStart ? `${planStart} Hours` : "24 Hours" }
    ];
    const excludedServices = ["Validity", "Number of Service Per Year"];
    const features = purchaseData?.planServices?.filter(s => !excludedServices.includes(s.serviceName)).map(s => ({
        label: s.serviceName,
        type: s.serviceType,
        value: s.value
    })) || [];
    const renderFeatureValue = (feature) => {
        if (feature.type === "bool") {
            return feature.value === 1 ? (
                <div className="w-5 h-5 rounded-full bg-[#21830F] flex items-center justify-center">
                    <Check size={13} className="text-white" />
                </div>
            ) : (
                <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                    <X size={13} className="text-white" />
                </div>
            );
        } else if (feature.type === "range") {
            return <span className="font-semibold">{feature.value} KM</span>;
        } else if (feature.type === "unlimited") {
            return <span className="font-semibold">Unlimited</span>;
        } else if (feature.type === "days") {
            return <span className="font-semibold">{feature.value} Days</span>;
        }
        return <span className="font-semibold">{feature.value}</span>;
    };


    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);
    return (
        <div className='fixed inset-0 bg-black/40 top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center z-50'>
            <div className='bg-gray-50 md:w-[50vw] w-full rounded-md'>
                <header className='flex items-center justify-between rounded-md px-3 sm:px-5 py-2 sm:py-2.5 bg-[#D9E7FE] border-b border-slate-200'>
                    <h2 className='text-sm font-semibold text-slate-800 mx-auto'>Service Coverage Details</h2>
                    <button onClick={() => { onClose() }}>
                        <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                </header>


                <div className=' p-5 h-[80vh] hide-scrollbar overflow-y-scroll relative'>
                    <main className='mb-2'>

                        <div className='flex gap-3 items-center justify-between bg-blue-500 py-4 text-white px-5 rounded-md'>
                            <div><h1 className='font-semibold text-3xl'>{purchaseData?.plan}</h1>
                                <p className='py-1'>Your Plan is Valid for {plan?.validity}</p>
                                <p className='py-1'>Order ID : {purchaseData?.orderId}</p>
                            </div>
                            <div className='text-2xl self-start'>₹{purchaseData.planPrice}</div>
                        </div>
                        <div className='px-5 py-2 bg-white my-5 shadow-md rounded-md'>
                            <h2 className='font-semibold py-1 text-2xl border-b border-gray-200'>Vehicle Details</h2>
                            <div className='flex justify-between items-center'
                            >
                                <p className='py-1 text-[16px]'>Vehicle Number</p>
                                <p className='py-1 text-[16px]'>{purchaseData?.vehicleNumber}</p>
                            </div>
                            <div className='flex justify-between items-center'
                            >
                                <p className='py-1 text-[16px]'>Vehicle Brand</p>
                                <p className='py-1 text-[16px]'>{purchaseData?.vehicleBrand}</p>
                            </div>
                            <div className='flex justify-between items-center'
                            >
                                <p className='py-1 text-[16px]'>Vehicle Model</p>
                                <p className='py-1 text-[16px]'>{purchaseData?.vehicleModel}</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-4 my-5">
                            {stats.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-left justify-left border border-[#BCD2F5] rounded-xl py-3 px-3 bg-white"
                                >
                                    <p className="text-[#242424] text-sm">{item.label}</p>
                                    <p className="font-semibold text-lg text-[#242424] mt-1">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-xl border-0.5 border-[#BCD2F5] overflow-hidden my-5">
                            <div className="flex justify-between items-center bg-[#E9F0FC] text-black md:px-8 px-2 py-3">
            <div className="text-base font-semibold">Service Name</div>
            <div className="text-base font-semibold">Service Quantity</div>
          </div>

                            {features.map((feature, i) => (
                                 <div
              key={i}
              className={`flex justify-between items-center md:px-8 px-2 py-4 border-[#BCD2F5] ${i === 0 ? 'border-t-0.5' : 'border-t-1'} ${i % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"}`}
            >
              <div className="flex items-center gap-2 text-[#242424] text-base font-semibold">
                <span>{feature.label}</span>
              </div>
              {renderFeatureValue(feature)}
            </div>
                            ))}
                            

                        </div>


                    </main>
                </div>
                <footer>

                    {/* <div className="w-full p-1 border-t rounded-b-md border-gray-200 bg-white sticky bottom-0">
                        <a href={'/my-account?view=amc'} className='w-full p-2  bg-blue-500 rounded-md text-white block text-center  bottom-0'>View My AMC </a>
                    </div> */}
                </footer>



            </div>
        </div>
    )
}
