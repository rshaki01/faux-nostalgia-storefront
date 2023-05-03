import React, { useState } from 'react'
import { fetchProducts } from '@/utils/Shopify';
import SizeSelector from '@/components/SizeSelector';
import Image from 'next/image';


export async function getStaticPaths() {
    const products = await fetchProducts();
    const paths = products.map((product) => ({
        params: { handle: product.handle}
    }));
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const products = await fetchProducts();
    return {
      props: {
        products,
      },
      revalidate: 1,
    }
}

const productPage = ({products, params}) => {


  const [quantity, setQuantity] = useState(1);

  return (
    <div className='flex gap-10 justify-center'>
      <div className='w-1/3'>
        <Image src={products[0].imageSrc} alt="" width={640} height={640}/>
      </div>
      <div className='w-1/3'>
        <h1 className='text-3xl'>{products[0].title}</h1>
        <p className='text-lg pt-3'>${parseFloat(products[0].variants[0].price).toFixed(2)} USD</p>
        <form>
          <label className="block mb-2 text-slate-400">Size</label>
          <SizeSelector />
          <div className='grid grid-cols-1 md:grid-cols-2 my-2 gap-3'>
            <div className="">
              <label className="block mb-2 text-slate-400">Quantity</label>
              <input className="rounded-lg border border-gray-700  p-2" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)}
               />
            </div>
          </div>
          <input type="submit" className="my-2 w-full bg-gray-100 hover:bg-gray-200 text-gray font-bold py-2 px-4 shadow-xl rounded" value="Sold Out"/>
        </form>
        <p className='p-2'>{products[0].description}</p>
      </div>
    </div>
  )
}

export default productPage
