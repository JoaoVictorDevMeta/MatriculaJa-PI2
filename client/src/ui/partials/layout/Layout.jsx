import React from 'react'
import { Outlet } from 'react-router-dom'
import './Layout.scss'

//components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default Layout