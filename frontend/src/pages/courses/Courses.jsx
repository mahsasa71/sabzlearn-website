import React, { useEffect, useState } from "react";
import CourseBox from "../../components/courseBox/CourseBox";
import Topbar from '../../components/topBar/TopBar'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/NavBar'
import BraedCrump from '../../components/beadCrump/BraedCrump'
import Pagination from "../../components/pagination/Pagination";



import './Courses.css'
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([])




  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }, []);
    return (
        <>
          <Topbar />
          <Navbar />
    
          <BraedCrump
            links={[
              { id: 1, title: "خانه", to: "" },
              {
                id: 2,
                title: "تمامی دوره ها",
                to: "courses",
              },
            ]}
          />
    
          {/* <!--------------------------------  Courses-Section  --------------------------------> */}
          <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownCourses.map((course) => (
                  <CourseBox {...course} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={courses}
            itemsCount={5}
            pathname="/courses"
            setShownCourses={setShownCourses}
          />
        </div>
      </section>
          {/* <!--------------------------------  Courses-Section  --------------------------------> */}
    
          <Footer />
        </>
      );
  
}
