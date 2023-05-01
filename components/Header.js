import Router from 'next/router'
import React from 'react'

const Header = () => {
  return (
    <div className='min-w-full mt-5 mb-24'>
        <div className='flex justify-between px-12 py-5 items-center'>
            <div className='flex gap-8 items-center'>
                <div onClick={() => Router.push('/')} className='p-2 text-4xl cursor-pointer'>
                    Faux Nostalgia
                </div>
                <div className='flex gap-2'>
                    <div className='p-2'>Home</div>
                    <div className='p-2'>Contact</div>
                    <div className='p-2'>FAQ</div>
                </div>
            </div>
            <div className='p-2'>Cart</div>
        </div>
    </div>
  )
}

export default Header
