import React from 'react'
import Link from 'next/link'

const ProductCard = ({price, id, productTitle, imageSrc, slug}) => {

  return (
   <Link href={`/products/${slug}`}>
        <div className='p-4 w-64 shadow-xl rounded-2xl cursor-pointer hover:shadow-2xl hover:opacity-80'>
          <div className='rounded-2xl'>
            <img  src={imageSrc} alt=''/>           
          </div>
          <div className=''>
            <h3 className='text-md text-center'>{productTitle}</h3>
            <h2 className='text-xl mt-4 text-center'>${parseFloat(price).toFixed(2)} USD</h2>
          </div>
        </div>
    </Link>
  )
}

export default ProductCard
