import React from 'react'
import noPlanFallback from "../assets/noplanfallback.svg"
export default function NoPlansFallback() {
  return (
    <div className='bg-white text-black'>
        <div className='w-[300px] h-[200px] mx-auto my-3'>
            <img className='w-full h-full object-contain' src={noPlanFallback} alt="" />
        </div>
        <div className='text-center my-2 font-semibold text-2xl'>No Plans Available in Your City Yet</div>
        <div className='text-center my-2 text-lg'>We're expanding quickly - this service will be available in your city soon.</div>
    </div>
  )
}
