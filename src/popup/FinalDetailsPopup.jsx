import { Check, Link, X } from 'lucide-react'
import React, { useEffect } from 'react'
// import { useAMCPlans } from '../context/AmcPlanContext';

export default function FinalDetailsPopup({ vehicle }) {
// onClose, plan, in function shift in bractes 
    const purchaseData =JSON.parse(localStorage.getItem('selectedPlanOfSuccess'))
    const paymentResult = JSON.parse(localStorage.getItem('paymentResponse'));
    const vehicleOfSuccessPurchase = paymentResult?.purchase?.vehicle;
    const originalPrice = purchaseData?.originalPrice || 0;
    const discount = purchaseData?.discount || 0;
    const discountPercent = purchaseData?.discountPercent || 0;
    const gstPercent = purchaseData?.gstPercent || 18;
    const gstAmount = purchaseData?.gstAmount || 0;
    const totalAmount = purchaseData?.totalAmount || 0;
    const billing = [
        { label: "Items", value: "1" },
        { label: "Amount", value: `₹${originalPrice.toLocaleString()}` },
        { label: `Discount (${discountPercent}%)`, value: `-₹${discount.toLocaleString()}` },
        { label: `GST (${gstPercent}%)`, value: `₹${Math.round(gstAmount).toLocaleString()}` },
    ];  
    const validityService = purchaseData?.servicesIncluded?.find(s => s.serviceName === "Validity");
    const servicePerYear = purchaseData?.servicesIncluded?.find(s => s.serviceName === "Number of Service Per Year");
    const planStart = purchaseData?.planStart;
     const stats = [
        { label: "Service", value: servicePerYear?.value || "Unlimited" },
        { label: "Validity", value: validityService ? `${validityService.value} Days` : "365 Days" },
        { label: "Plan Start After", value: planStart ? `${planStart} Hours` : "24 Hours" }
    ];
    // useEffect(async ()=>{
    //     const result = await getPaymentStatus(txnid);
    // },[])

     const excludedServices = ["Validity", "Number of Service Per Year"];
         const features = purchaseData?.servicesIncluded?.filter(s => !excludedServices.includes(s.serviceName)).map(s => ({
             label: s.serviceName,
             type: s.serviceType,
             value: s.value
         })) || [];
         const renderFeatureValue = (feature) => {
             if (feature.type === "bool") {
                 return feature.value === 1 ? (
                     <div className="w-5 h-5 rounded-full bg-[#21830F] flex items-center justify-center mr-3">
                         <Check size={13} className="text-white" />
                     </div>
                 ) : (
                     <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mr-3">
                         <X size={13} className="text-white" />
                     </div>
                 );
             } else if (feature.type === "range") {
                 return <span className="font-semibold">{feature.value} KM</span>;
             } else if (feature.type === "unlimited") {
                 return <span className="font-semibold">Unlimited</span>;
             } else if (feature.type === "days") {
                 return <span className="font-semibold mr-3">{feature.value} Days</span>;
             }
             return <span className="font-semibold mr-3">{feature.value}</span>;
         };
     

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);
    return (
        <div className='fixed inset-0 bg-black/40 top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center'>
           <div className="bg-gray-50 md:w-[50vw] w-[90vw] max-w-[600px] rounded-md max-h-[90dvh] flex flex-col">


                {/* <header className='mb-2 flex justify-end p-4 py-1'>
                    <button onClick={() => { onClose() }}>
                        <X size={25} />
                    </button>
                </header> */}

                <div className='py-1 px-2 my-1 border-b border-gray-200'>
                    <h2 className='text-center md:text-3xl text-xl font-semibold'>Thank You For Your Purchase!</h2>
                    

                </div>
               <div className="p-3 flex-1 overflow-y-auto hide-scrollbar">

                    <main className='mb-2'>

                        <div className='flex md:flex-row flex-col gap-3 items-center md:justify-between justify-center bg-blue-500 md:py-4 py-2 text-white md:px-5 px-2 rounded-md'>  
                            <div><h1 className='font-semibold md:text-3xl text-xl'>{paymentResult?.purchase?.planName}</h1>
                                <p className='py-1'>Your Plan is Valid for {purchaseData?.validFor}</p>
                                <p className='py-1'>Order ID : {paymentResult.purchase._id}</p>
                            </div>
                            <div className='text-2xl md:self-start'>₹{purchaseData.price}</div>
                        </div>
                        <div className='md:px-5 px-3 py-2 bg-white md:my-5 my-2 shadow-md rounded-md'>
                            <h2 className='font-semibold py-1 md:text-2xl text-lg border-b border-gray-200'>Vehicle Details</h2>
                            <div className='flex justify-between items-center'
                            >
                                <p className='py-1 text-[16px]'>Vehicle Number</p>
                                <p className='py-1 text-[16px]'>{vehicleOfSuccessPurchase?.vehicleNumber || vehicle?.vehicleNumber}</p>
                            </div>
                            <div className='flex justify-between items-center'
                            >
                                <p className='py-1 text-[16px]'>Vehicle Brand</p>
                                <p className='py-1 text-[16px]'>{vehicleOfSuccessPurchase?.brand || vehicle.brand}</p>
                            </div>
                            <div className='flex justify-between items-center'
                            >
                                <p className='py-1 text-[16px]'>Vehicle Model</p>
                                <p className='py-1 text-[16px]'>{ vehicleOfSuccessPurchase?.model || vehicle.model}</p>
                            </div>
                        </div>

                        

                        <div className="grid md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-4 md:my-5 my-2">
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

                        <div className="bg-white rounded-xl overflow-hidden md:mb-20  mb-7 mt-5">
                            <div className="px-6 py-5">
                                <h3 className="font-semibold text-[#333333] mb-4 md:text-2xl text-lg ">
                                    Billing Details
                                </h3>
                                {billing.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between py-2 text-[#555555] text-base"
                                    >
                                        <span>{item.label}</span>
                                        <span className="font-medium">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center py-4 px-6 bg-[#E9F0FC] text-black">
                                <span className="text-xl">Total Payable</span>
                                <span className="text-xl">₹{Math.round(totalAmount).toLocaleString()}</span>
                            </div>
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
