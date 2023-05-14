import React, { useState } from 'react'
import swell from 'swell-js'
import Image from 'next/image';
import SizeSelector from '@/components/SizeSelector';

export async function getStaticPaths() {

    swell.init('faux-nostalgia', 'pk_YaAeXicBttHi8HXD9T6AVUsAs4qproCf');
    const swellProducts = await swell.products.list({
        limit: 25
    })

    const swellProductsArr = swellProducts.results;

    const paths = swellProductsArr.map((product) => ({
        params: { slug: product.id}
    }));
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    swell.init('faux-nostalgia', 'pk_YaAeXicBttHi8HXD9T6AVUsAs4qproCf');
    const swellProduct = await swell.products.get(params.slug);
    return {
        props: {
            swellProduct
        },
        revalidate: 1,
    }
}


const slugPage = ({swellProduct}) => {

    async function handleSubmit(e) {
      e.preventDefault();
      swell.init('faux-nostalgia', 'pk_YaAeXicBttHi8HXD9T6AVUsAs4qproCf');
      await swell.cart.setItems([]);
      await swell.cart.addItem({
        product_id: swellProduct.id,
        quantity: 1
      })
      
      const cart = await swell.cart.get();
      
      window.location.href = `${cart.checkout_url}`;

    }

    const [quantity, setQuantity] = useState(1);


  return (
    <div className='flex gap-10 justify-center'>
       <div className='w-1/3'>
         <Image src={swellProduct.images[0].file.url} alt="" width={640} height={640}/>
       </div>
       <div className='w-1/3'>
         <h1 className='text-3xl'>{swellProduct.name}</h1>
         {/* <p className='text-lg pt-3'>${parseFloat(products[0].variants[0].price).toFixed(2)} USD</p> */}
         <form onSubmit={handleSubmit}>
           <label className="block mb-2 text-slate-400">Size</label>
           <SizeSelector />
           <div className='grid grid-cols-1 md:grid-cols-2 my-2 gap-3'>
             <div className="">
               <label className="block mb-2 text-slate-400">Quantity</label>
               <input className="rounded-lg border border-gray-700  p-2" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)}
                />
             </div>
           </div>
           <input type="submit" className="my-2 w-full bg-gray-100 hover:bg-gray-200 text-gray font-bold py-2 px-4 shadow-xl rounded" value="Check Out"/>
         </form>
         <p className='p-2'>{swellProduct.description}</p>
       </div>
    </div>
  )
}

export default slugPage
