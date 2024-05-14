import React from 'react'
import { Outlet } from 'react-router-dom'
import './Index.css'
import SideBar from '../../components/userPanel/sideBar/SideBar'
import Topbar from '../../components/topBar/TopBar'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/NavBar'

export default function Index() {
    return (
        <>
          <Topbar />
          <Navbar />
  
          <section class="content">
          <div class="content-header">
              <div class="container">
                  <span class="content-header__title">حساب کاربری من</span>
                  <span class="content-header__subtitle">پیشخوان</span>
              </div>
          </div>
          <div class="content-main">
              <div class="container">
                  <div class="row">
                      <SideBar />
  
                      <Outlet />
  
                  </div>
              </div>
          </div>
      </section>
  
          <Footer />
        </>
    )
}
