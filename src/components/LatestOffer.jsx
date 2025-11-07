import React from 'react'
import Slider from './Slider';
const LatestOffer = () => {
    return (
        <div className='h-auto  justify-items-center py-8 md:py-[35px] bg-[#FAFCFF]'>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium text-center text-[#242424]'>Latest Offers for You</h1>
        <p className='text-xs sm:text-sm text-[#5C5C5C] text-center pt-2 md:pt-4'>Get exclusive deals on vehicle services, fuel delivery, and more —<br />
                updated in real time from our partner network.</p>
                <Slider />
            </div>
        </div>
    )
}
export default LatestOffer;