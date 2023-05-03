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
    const response = await fetch(
        'https://faux-nostalgia-1.myshopify.com/api/2023-04/graphql.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: `
            query($handle: String!) {
              product(handle: $handle) {
                id
                title
                description
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
              }
            }`
            ,
            variables : {
              'handle': params.handle
            },
          }),
        }
      );
    
      const { data } = await response.json();
      console.log(data)

      const product = {
        id: 1,
        title: data.product.title,
        description: data.product.description,
        imageSrc: data.product.images.edges[0].node.url
      };

    return {
      props: {
        product,
      },
      revalidate: 1,
    }
}

const productPage = ({product}) => {

  const [quantity, setQuantity] = useState(1);

  return (
    <div className='flex gap-10 justify-center'>
      <div className='w-1/3'>
        <Image src={product.imageSrc} alt="" width={640} height={640}/>
      </div>
      <div className='w-1/3'>
        <h1 className='text-3xl'>{product.title}</h1>
        {/* <p className='text-lg pt-3'>${parseFloat(products[0].variants[0].price).toFixed(2)} USD</p> */}
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
        <p className='p-2'>{product.description}</p>
      </div>
    </div>
  )
}

export default productPage
