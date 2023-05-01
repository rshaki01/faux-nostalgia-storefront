import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/utils/Shopify'

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

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   async function getProducts() {
  //     const products = await fetchProducts();
  //     setProducts(products)
  //   }
  //   getProducts();
  // }, [])

  console.log(products);


  return (
    <div className='flex justify-center'>
      <Head>
        <title>Faux Nostalgia</title>
      </Head>
      {/* Card HTML below */}
      <div className='grid grid-cols-1 gap-10 md:grid-cols-1'>
        {products.map((product, index) => {
            return <ProductCard key={index} id={product.id} product={product}/>
        })}
      </div>
      <div id='product-component-1682487638588'></div>
      
    </div>
  )
}
