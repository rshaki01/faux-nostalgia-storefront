import React from 'react'

const Header = () => {
  return (
    <div className='min-w-full'>
        <div className='flex justify-between bg-black px-12 py-5'>
            <div className='flex text-white gap-8'>
                <div className='border border-white p-2'>
                    Faux Nostalgia
                </div>
                <div className='flex gap-2'>
                    <div className='border border-white p-2'>Home</div>
                    <div className='border border-white p-2'>Contact</div>
                    <div className='border border-white p-2'>FAQ</div>
                </div>
            </div>
            <div className='text-white'>Cart</div>
        </div>
    </div>
  )
}

export default Header
