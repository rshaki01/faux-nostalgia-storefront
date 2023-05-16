import React, { useState } from 'react'
import swell from 'swell-js'
import Image from 'next/image';

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

    const [quantity, setQuantity] = useState(1);
    const [sizeSelected, setSizeSelected] = useState('S');
    const [imageSelected, setImageSelected] = useState(swellProduct.images[0].file.url);
    console.log(swellProduct);
    const variantName = swellProduct.options[0] ? swellProduct.options[0].name : '';
    const sizes = swellProduct.options[0] ? swellProduct.options[0].values.map((variant) => (variant.name)) : [];
    
    async function handleSubmit(e) {
      e.preventDefault();
      swell.init('faux-nostalgia', 'pk_YaAeXicBttHi8HXD9T6AVUsAs4qproCf');
      await swell.cart.setItems([]);
      await swell.cart.addItem({
        product_id: swellProduct.id,
        quantity: quantity
      })
      const cart = await swell.cart.get();
      window.location.href = `${cart.checkout_url}`;
    }

    const handleSizeSelected = (size) => {
      setSizeSelected(size === sizeSelected ? '' : size);
    }

    const handleImageSelected = (imageSrc) => {
      setImageSelected(imageSrc);
    }

  return (
    <div className='flex flex-col md:flex-row gap-10 justify-center'>
       {/*Image Gallery */}
       <div className='md:w-1/3 md:order-1'>
         <Image className='p-4' src={imageSelected} alt="" width={640} height={640}/>
         <div className='flex'>
          {swellProduct.images.map((image) => (
            <Image className='cursor-pointer' onClick={() => handleImageSelected(image.file.url)} src={image.file.url} alt="" width={80} height={80}/>
          ))}
         </div>
       </div>
       {/*Product Information */}
       <div className='text-center md:w-1/3 md:order-2 md:text-left'>
         <h1 className='text-3xl'>{swellProduct.name}</h1>
         <p className='text-lg pt-3'>${parseFloat(swellProduct.price).toFixed(2)} USD</p>
         <form onSubmit={handleSubmit} className='text-center md:text-left'>
           <label className="block my-2 text-slate-400">{variantName}</label>
           {/* Size Selector */}
           <div className='flex gap-2 justify-center'>
            {sizes.map((size) => (
              <p key={size} onClick={() => handleSizeSelected(size)} className={`rounded-lg px-5 py-1 cursor-pointer ${sizeSelected === size ? 'bg-black text-white' : 'bg-white'}`}>
                  {size}
              </p>
            ))}
           </div>
           {/* Quantity Selector */}
           <div className='grid grid-cols-1 md:grid-cols-2 my-2 gap-3'>
             <div>
              <label className="block mb-2 text-slate-400">Quantity</label>
              <input className="rounded-lg border border-gray-700  p-2" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
             </div>
           </div>
           <input type="submit" className="my-2 w-1/2 bg-gray-100 hover:bg-gray-200 text-gray font-bold py-2 px-4 shadow-xl rounded cursor-pointer" value="Check Out"/>
         </form>
         <p className='mt-2 p-2'>{swellProduct.description}</p>
       </div>
    </div>
  )
}

export default slugPage
