import React from 'react'

const ProductCard = () => {
  return (
   <div>
        <div className='p-4 w-64 shadow-xl rounded-2xl cursor-pointer hover:shadow-2xl'>
          <div className='rounded-2xl'>
            <img src='/products/absolute-zip-hoodie/front-view.jpg' alt=''/>           
          </div>
          <div className=''>
            <h3 className='text-md text-center'>Absolute Zip Hoodie "Honeydew"</h3>
            <h2 className='text-md mt-4 text-center'>$94.00 CAD</h2>
          </div>
        </div>
    </div>
  )
}

export default ProductCard
