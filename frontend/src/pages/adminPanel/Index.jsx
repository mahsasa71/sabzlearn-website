import React from 'react'
import { Outlet } from "react-router-dom";
import SideBar from '../../components/adminPanel/sideBar/SideBar';
import TopBar from '../../components/adminPanel/topBar/TopBar';
import './Index.css'

export default function Index() {
  return (
    <>
 <div id="content">
        <SideBar />

        <div id="home" class="col-10">
          <TopBar />

          <div class="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
  </>
  )
}
