import React from 'react'
import Slider from './Slider';
const LatestOffer = () => {
    return (
        <div className='justify-items-center pt-10 pb-12 mt-4 sm:mt-6 md:mt-4 h-auto bg-[#FFFFFF]'>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#242424]'>Latest Offers for You</h1>
        <p className='text-xs sm:text-lg text-[#5C5C5C] text-center pt-2 md:pt-4'>Get exclusive deals on vehicle services, fuel delivery, and more —<br />
                updated in real time from our partner network.</p>
            </div>
                <Slider />
        </div>
    )
}
export default LatestOffer;