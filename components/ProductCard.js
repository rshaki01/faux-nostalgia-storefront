import React from 'react'
import Router from 'next/router'

const ProductCard = ({price, id, product}) => {

    console.log(product.imageSrc);

  return (
   <div>
        <div onClick={() => Router.push(`/${id}`)} className='p-4 w-64 shadow-xl rounded-2xl cursor-pointer hover:shadow-2xl hover:opacity-80'>
          <div className='rounded-2xl'>
            <img  src={product.imageSrc} alt=''/>           
          </div>
          <div className=''>
            <h3 className='text-md text-center'>{product.title}</h3>
            <h2 className='text-xl mt-4 text-center'>${parseFloat(product.variants[0].price).toFixed(2)} USD</h2>
          </div>
        </div>
    </div>
  )
}

export default ProductCard
