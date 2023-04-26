import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import Router from 'next/router'

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
  console.log(prices)
  return (
    <div className='px-28'>
      <div>
        <h2>{prices[0].product.name}</h2>
        <div className='p-4 w-64 shadow-lg rounded-xl'>
          <div className='rounded-2xl'>
            <img src='/products/absolute-zip-hoodie/front-view.jpg' alt=''/>           
          </div>
          <div className=''>
            <h3 className='font-bold text-md text-center'>Absolute Zip Hoodie "Honeydew"</h3>
            <h2 className='font-bold text-md mt-4 text-center'>$94.00 CAD</h2>
            <button onClick={checkout}>Checkout</button>
          </div>
        </div>
      </div>

    </div>
  )
}
