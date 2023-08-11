import React from 'react'

export default function Filter() {
  return (
    <div className='shadow-md px-32 pb-2'>
      <div className='flex shadow-inner mt-2 pt-1'>
        <div className='flex'>
            <h4 className='uppercase text-sm font-semibold'>All categories</h4>
            <i className='fa-solid fa-angle-down fa-xl mt-3 ml-2'></i>
        </div>
        <div className='flex gap-5 ml-8 text-sm'>
            <p className='cursor-pointer hover:text-blue-400'>Cars</p>
            <p className='cursor-pointer hover:text-blue-400'>Motorcycles</p>
            <p className='cursor-pointer hover:text-blue-400'>Mobile Phones</p>
            <p className='cursor-pointer hover:text-blue-400'>For Sale: House & Apartments</p>
            <p className='cursor-pointer hover:text-blue-400'>Scooters</p>
            <p className='cursor-pointer hover:text-blue-400'>Commercial & Other Vechicels</p>
            <p className='cursor-pointer hover:text-blue-400'>For Rent: Houses & Apartments</p>
        </div>
      </div>
    </div>
  )
}
