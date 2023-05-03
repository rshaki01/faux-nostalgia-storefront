import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='mt-5 mb-24'>
        <div className='flex justify-between px-12 py-5 items-center'>
            <div className='flex gap-8 items-center'>
                <Link href={`/`} className='p-2 text-4xl cursor-pointer'>
                    Faux Nostalgia
                </Link >
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
