import React from 'react'
import NavBar from '../navbar/NavBar'
import TopBar from '../topBar/TopBar'
import './Header.css'
import Landing from '../landing/Landing'
export default function Header() {
  return (
    <header class="header">
        <TopBar/>
        <NavBar/>
        <Landing/>

</header>
  )
}
