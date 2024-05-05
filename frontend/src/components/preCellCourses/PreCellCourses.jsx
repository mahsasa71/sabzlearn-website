import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from '../componentHeader/SectionHeader';
import CourseBox from "../courseBox/CourseBox";

import "swiper/css";
import "swiper/css/pagination";

import './PreCellCourses.css'


export default function PreCellCourses() {

  const [presellCourses, setPresellCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((allPresellCourses) => {
        console.log(allPresellCourses);
        setPresellCourses(allPresellCourses);
      });
  }, []);

    return (
      <div className="popular">
      <div className="container">
        <SectionHeader
          title="دوره های در حال پیش فروش"
          desc="متن تستی برای توضیحات دوره های پیش فروش"
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
                {presellCourses.map((course) => (
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
