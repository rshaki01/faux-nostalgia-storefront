import { useState, useEffect } from 'react'
import Head from 'next/head'
import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/utils/Shopify'
import swell from 'swell-js'

export async function getStaticProps() {

  
  const products = await fetchProducts();
  return {
    props: {
      products
    },
    revalidate: 1,
  }
}

export default function Home({products}) {
  
  const [swellProducts, setSwellProducts] = useState([]);

  useEffect(() => {
    async function getSwellProducts() {
      swell.init('faux-nostalgia', 'pk_YaAeXicBttHi8HXD9T6AVUsAs4qproCf');
      const swellProducts = await swell.products.list({
        limit: 25
      })
      setSwellProducts(swellProducts.results); 
    }
    getSwellProducts();
  }, [])

  return (
    <div className='flex justify-center'>
      <Head>
        <title>Faux Nostalgia</title>
      </Head>
      {/* Card HTML below */}
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        {/* {products.map((product, index) => {
            return <ProductCard key={index} id={product.id} product={product}/>
        })} */}
        {swellProducts.map((product, index) => {
            return <ProductCard key={index} price={product.price} id={product.id} productTitle={product.name} imageSrc={product.images[0].file.url} slug={product.slug} />
        })}
      </div>      
    </div>
  )
}
