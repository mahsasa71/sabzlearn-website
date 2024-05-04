import React from 'react'
import './Index.css'
import Header from '../../components/header/Header'
import LastCourse from '../../components/lastCourse/LastCourse'
import AboutUs from '../../components/aboutUs/AboutUs'
import PopularCourses from '../../components/popularCourses/PopularCourses'
import PreCellCourses from '../../components/preCellCourses/PreCellCourses'
import LastArticle from '../../components/lastArticle/LastArticle'
import Footer from '../../components/footer/Footer'
export default function Index() {
  return (
    <>
    
    <Header />
    <LastCourse/>
    <AboutUs/>
    <PopularCourses/>
    <PreCellCourses/>
    <LastArticle/>
    <Footer/>

    </>



  )
}
