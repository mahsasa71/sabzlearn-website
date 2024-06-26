import React, { useEffect, useState } from "react";import './PopularCourses.css'
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from '../componentHeader/SectionHeader';
import CourseBox from "../courseBox/CourseBox";

import "swiper/css";
import "swiper/css/pagination";


export default function PopularCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/popular`)
      .then((res) => res.json())
      .then((popularCourses) => {
        console.log(popularCourses);
        setCourses(popularCourses);
      });
  }, []);

    return (
      <div className="popular">
      <div className="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />

        <div className="courses-content">
          <div className="container">
            <div className="row">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="mySwiper"
              >
                {courses.map((course) => (
                  <SwiperSlide>
                    <CourseBox {...course} isSlider={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
