import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='min-h-full'>
      <Header />
      <main className='px-16 h-[70vh]'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
