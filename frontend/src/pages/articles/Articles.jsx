import React, { useEffect, useState } from "react";
import './Articles.css'
import Pagination from "../../components/pagination/Pagination";
import Topbar from '../../components/topBar/TopBar'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/NavBar'
import BraedCrump from '../../components/beadCrump/BraedCrump'
import ArticleBox from "../../components/articleBox/ArticleBox";

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [shownArticles, setShownArticles] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:4000/v1/articles`)
        .then((res) => res.json())
        .then((allArticles) => {
          console.log(allArticles);
          setArticles(allArticles);
        });
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
              title: "تمامی مقاله ها",
              to: "articles/1",
            },
          ]}
        />
  
        {/* <!--------------------------------  Articles-Section  --------------------------------> */}
        <section className="courses">
          <div className="container">
            <div className="courses-content">
              <div className="container">
                <div className="row">
                {shownArticles.filter(article => article.publish === 1).map((article) => (
                    <ArticleBox
                      {...article}
                    />
                  ))}
                </div>
              </div>
            </div>
  
            <Pagination
              items={articles}
              itemsCount={3}
              pathname="/articles"
              setShownCourses={setShownArticles}
            />
          </div>
        </section>
        {/* <!--------------------------------  Articles-Section  --------------------------------> */}
  
        <Footer />
      </>
    );
}
