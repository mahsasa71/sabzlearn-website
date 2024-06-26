
import './CourseBox.css'
import CircleSnippet from '../circleSnippet/CircleSnippet'
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false)

  const onImageLoaded = () => setIsImgShow(true)

  const onImageError = () => {
    // Codes
  }


  return (
    <div class="col-4" style={{width: `${props.isSlider && '100%'}`}}>
      <div class="course-box">
      <Link to={`/course-info/${props.shortName}`}>
          <img
            src={`http://localhost:4000/courses/covers/${props.cover}`}
            // src="https://placeimg.com/295/295/any/tech?t=190129384"
            alt="Course img"
            className="course-box__img"
            onLoad={onImageLoaded}
            onError={onImageError}
          />
          {!isImgShow && <CircleSnippet />}
        </Link>
      
        <div class="course-box__main">
        <Link to={`/course-info/${props.shortName}`} className="course-box__title">
            {props.name}
          </Link>
          <div class="course-box__rating-teacher">
            <div class="course-box__teacher">
              <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" class="course-box__teacher-link">
               {
                props.creator
               }
              </a>
            </div>

            <div className="course-box__rating">
              {
                Array(5 - props.courseAverageScore).fill(0).map(item => (

                  <img src="/images/svgs/star.svg" alt="score" className="course-box__star" />
                ))
              }



              {
                Array(props.courseAverageScore).fill(0).map(item => (

                  <img src="/images/svgs/star_fill.svg" alt="score" className="course-box__star" />
                ))
              }

            </div>



          </div>

          <div class="course-box__status">
            <div class="course-box__users">
              <i class="fas fa-users course-box__users-icon"></i>
              <span class="course-box__users-text">
                {props.registers}
              </span>
            </div>
            <span class="course-box__price">
            {
                props.price === 0 ? 'رایگان' : props.price.toLocaleString()
              }
            </span>
          </div>
        </div>

        <div class="course-box__footer">
        <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__footer-link"
          >
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>


        {( props.price !== 0 && props.discount) && (
          <span class="courses-box__price-discount courses-box__discount">%{props.discount}</span>
        )}
      </div>
    </div>
  )
}
