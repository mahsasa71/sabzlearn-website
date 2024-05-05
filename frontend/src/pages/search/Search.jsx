import React, { useEffect, useState } from "react";
import './Search.css'
import { useParams } from "react-router-dom";
import Topbar from '../../components/topBar/TopBar'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/NavBar'
import CourseBox from "../../components/courseBox/CourseBox";
import ArticleBox from "../../components/articleBox/ArticleBox";
import SectionHeader from "../../components/componentHeader/SectionHeader";
export default function Search() {

    const [courses, setCourses] = useState([]);
    const [articles, setArticles] = useState([]);
    const { value } = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:4000/v1/search/${value}`)
        .then((res) => res.json())
        .then((allData) => {
          console.log(allData);
          setArticles(allData.allResultArticles);
          setCourses(allData.allResultCourses);
        });
    }, []);

  return (
    <>
    <Topbar />
    <Navbar />
    <div className="courses">
      <div className="container">
        <SectionHeader
          title="نتیجه دوره‌ها برای جستجوی شما"
          desc="سکوی پرتاپ شما به سمت موفقیت"
        />
        <div className="courses-content">
          <div className="container">
            <div className="row">
              {courses.length === 0 ? (
                <div className="alert alert-warning">
                  دوره‌ای برای جستجوی شما وجود ندارد
                </div>
              ) : (
                <>
                  {courses.map((course) => (
                    <CourseBox key={course._id} {...course} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="courses">
      <div className="container">
        <SectionHeader
          title="نتیجه مقالات برای جستجوی شما"
          desc="پیش به سوی ارتقای دانش"
        />
        <div className="articles__content">
          <div className="row">
            {articles.length === 0 ? (
              <div className="alert alert-warning">
                مقاله‌ای برای جستجوی شما وجود ندارد
              </div>
            ) : (
              <>
                {articles.map((article) => (
                  <ArticleBox {...article} key={article._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </>
    
  )
}
