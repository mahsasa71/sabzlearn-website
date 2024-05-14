import React, { useEffect, useState } from "react";
import NavBar from '../navbar/NavBar'
import TopBar from '../topBar/TopBar'
import './Header.css'
import Landing from '../landing/Landing'
export default function Header() {

  const [indexInfo, setIndexInfo] = useState({})

  useEffect(() => {
    fetch('http://localhost:4000/v1/infos/index')
    .then(res => res.json())
    .then(allInfos => setIndexInfo(allInfos))
  }, [])


  return (
    <header class="header">
        <TopBar />
        <NavBar  />
        <Landing info={indexInfo}/>

</header>
  )
}
