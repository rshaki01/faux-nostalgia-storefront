import React from 'react'

const contact = () => {
  return (
    <div className='p-2 w-full mb-20 md:w-1/2'>
      <form className='p-2'>
        <h1 className='text-4xl pb-10'>Contact</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 mb-4 gap-3'>
            <div>
              <input className="rounded-lg border border-gray-700 p-3 w-full text-xl" type="text" placeholder="Name"/>
            </div>
            <div>
              <input className="rounded-lg border border-gray-700 p-3 w-full text-xl" type="text" placeholder="Email"/>
            </div>
        </div>
        <div className='mb-4'>
              <input className="rounded-lg border border-gray-700 p-3 w-full text-xl" type="tel" placeholder="Phone Number"/>
        </div>
        <div className="h-full overflow-y-scroll className=mb-4">
              <input className="rounded-lg border border-gray-700 p-3 w-full text-xl min-h-[100px]" type="text" placeholder="Comment"/>
        </div>
        <button className="w-1/4 mt-8 p-2 shadow-lg rounded-lg border border-gray-700">Send</button>
      </form>
    </div>
  )
}

export default contact
