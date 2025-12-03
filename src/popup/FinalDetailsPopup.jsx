import { Check, Link, X } from 'lucide-react'
import React, { useEffect } from 'react'

export default function FinalDetailsPopup({onClose,purchaseData,plan,vehicle,calledFrom}) {

    
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
  console.log('plan',plan);
  console.log('purchase',purchaseData);
  console.log('called',calledFrom);
   useEffect(() => {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }, []);
  return (
    <div className='fixed inset-0 bg-black/40 top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center'>
        <div className='bg-gray-50 md:w-[50vw] w-full'>
            <header className='mb-2 flex justify-end p-4 py-1'>
                <button onClick={()=>{onClose()}}>
                    <X size={25}/>
                </button>
            </header>
             <div className=' p-5 h-[80vh] hide-scrollbar overflow-y-scroll relative'>
            <main className='mb-2'>
               
                <div className='flex gap-3 items-center justify-between bg-blue-600 py-4 text-white px-5 rounded-md'>
                    <div><h1 className='font-semibold text-3xl'>Car Luxury Plan</h1>
                    <p>...</p>
                    <p>Order ID .</p>
                    </div>
                    <div className='text-2xl self-start'>2938</div>
                </div>
                <div className='px-5 py-2 bg-white my-3 shadow-md rounded-md'>
                    <h2 className='font-semibold py-1 text-2xl'>Vehicle Details</h2>
                    <div className='flex justify-between items-center'
                    >
                        <p className='py-1 text-[16px]'>Vehicle Number</p>
                        <p className='py-1 text-[16px]'>{vehicle?.vehicleNumber}</p>
                    </div>
                    <div className='flex justify-between items-center'
                    >
                        <p className='py-1 text-[16px]'>Vehicle Brand</p>
                        <p className='py-1 text-[16px]'>{vehicle.brand}</p>
                    </div>
                    <div className='flex justify-between items-center'
                    >
                        <p className='py-1 text-[16px]'>Vehicle Model</p>
                        <p className='py-1 text-[16px]'>{vehicle.model}</p>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-3 my-5'>
                <div className='bg-white  border border-blue-500 rounded-xl py-3 px-3'>
                    <h3>Services</h3>
                    <p>Unlimited</p>
                </div>
                <div className='bg-white border border-blue-500 rounded-xl py-3 px-3'>
                    <h3>Validity</h3>
                    <p>365 Days</p>
                </div>
                <div className='bg-white border border-blue-500 rounded-xl py-3 px-3'>
                    <h3>Plan Start After</h3>
                    <p>48 Hours</p>
                </div>
                </div>
                 <div className="bg-white rounded-xl border-0.5 border-[#BCD2F5] overflow-hidden">
          <div className="flex justify-between items-center md:px-8 px-2 py-4 border-[#BCD2F5] border-0.5 text-[#242424] font-bold text-base">
            {/* <p className="">Number of Service Per Year</p>
            <div className="w-5 h-5 flex items-center justify-center mr-20">
              <span>{servicePerYear?.value || "Unlimited"}</span>
            </div> */}
            <p className="whitespace-normal">Number of Service Per Year</p>
            <p className="">{"Unlimited"}</p>
          </div>

        
            <div
              
              className={`flex justify-between items-center md:px-8 px-2 py-4 border-[#BCD2F5] border-t-1 `}
            >
              <div className="flex items-center gap-2 text-[#242424] text-base font-semibold">
                <span>{}</span>
              </div>
              {/* {feature.value === 1 ? ( */}
                <div className="w-5 h-5 rounded-full bg-[#21830F] flex items-center justify-center">
                  <Check size={13} className="text-white" />
                </div>
              {/* ) : ( */}
                {/* <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center ">
                  <X size={13} className="text-white" />
                </div> */}
              {/* )} */}
            </div>
          
        </div>

        <div className="bg-white rounded-xl overflow-hidden mb-20">
          <div className="px-6 py-5">
            <h3 className="font-semibold text-[#333333] mb-4 text-2xl">
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
                
                <div className="w-full px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-white sticky bottom-0">
            <a href={'/my-account?view=amc'} className='w-full p-2 rounded-2xl bg-blue-600 text-white block text-center  bottom-0'>View My AMC</a>
          </div>
            </footer>
        


        </div>
    </div>
  )
}
