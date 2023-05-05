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
        params: { slug: product.slug}
    }));
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const swellProduct = await swell.products.get(params.slug);
    return {
        props: {
            swellProduct
        },
        revalidate: 1,
    }
}


const slugPage = ({swellProduct}) => {

    console.log(swellProduct);

  return (
    <div>
        {swellProduct.name}
    </div>
  )
}

export default slugPage
