import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='px-28'>
      <div>
        <h2>Mobiles</h2>
        <div className='p-4 w-64 shadow-lg rounded-xl'>
          <div className='rounded-2xl'>
            <img src='/products/absolute-zip-hoodie/front-view.jpg' alt=''/>           
          </div>
          <div className=''>
            <h3 className='font-bold text-md text-center'>Absolute Zip Hoodie "Honeydew"</h3>
            <h2 className='font-bold text-md mt-4 text-center'>$94.00 CAD</h2>
          </div>
        </div>
      </div>

    </div>
  )
}
