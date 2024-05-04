import React, { useEffect, useState } from "react";
import './LastCourse.css'
import SectionHeader from '../componentHeader/SectionHeader';
import CourseBox from "../courseBox/CourseBox";
export default function LastCourse() {
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }, []);


    return (
        <>
          <div class="courses">
            <div class="container">
    
            <SectionHeader
              title='جدیدترین دوره ها'
              desc='سکوی پرتاپ شما به سمت موفقیت'
              btnTitle="تمامی دوره ها"
              btnHref='courses/1'
            />
                      <div class="courses-content">
            <div class="container">
              <div class="row">
              {courses.splice(0, 6).map((course) => (
                  <CourseBox {...course} />
                ))}
              </div>
            </div>
          </div>
    
            </div>
          </div>
        </>
      );
}
