import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='min-h-full'>
      <Header />
      <main className='pb-20'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
