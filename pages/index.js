import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import Router from 'next/router'
import ProductCard from '@/components/ProductCard'

export async function getServerSideProps(context) {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27'
  })

  const res = await stripe.prices.list({
    limit: 10,
    expand: ['data.product']
  })

  const prices = res.data.filter(price => price.active)

  return {
    props: { prices }
  }
}

export default function Home({prices}) {

  async function checkout() {
    const lineItems = [{
      price: prices[0].id,
      quantity: 1
    }]
    const res = await fetch('api/checkout', {
      method: 'POST',
      body: JSON.stringify({lineItems})
    })
    console.log(res)
    const data = await res.json()
    Router.push(data.session.url);
  } 


  return (
    <div className='px-16 h-[70vh]'>
      {/* Card HTML below */}
      <ProductCard />
    </div>
  )
}
