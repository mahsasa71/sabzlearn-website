import React, { useEffect, useState } from "react";
import SectionHeader from '../componentHeader/SectionHeader';
import ArticleBox from '../articleBox/ArticleBox';
import './LastArticle.css'
export default function LastArticle() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        console.log(allArticles);
        setArticles(allArticles);
      });
  }, []);



    return (
        <section class="articles">
          <div class="container">
    
              <SectionHeader
                title="جدیدترین مقاله ها"
                desc="پیش به سوی ارتقای دانش"
                btnTitle="تمامی مقاله ها"
                btnHref='articles/1'
              />

<div class="articles__content">
          <div class="row">
          {articles.slice(0, 3).map((article) => (
              <ArticleBox {...article} />
            ))}
          </div>
        </div>
    
          </div>
        </section>
      );
}
