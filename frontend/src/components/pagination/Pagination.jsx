import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './Pagination.css'
export default function Pagination({ items, itemsCount, pathname, setShownCourses }) {



  const [pagesCount, setPageCount] = useState(null)
  const { page } = useParams()

  useEffect(() => {
    let endIndex = itemsCount * page
    let startIndex = endIndex - itemsCount
    let paginatedItems = items.slice(startIndex, endIndex)
    setShownCourses(paginatedItems)

    let pagesNumber = Math.ceil(items.length / itemsCount)
    setPageCount(pagesNumber)
  }, [page, items])


    return (
        <div class="courses-pagination">
          <ul class="courses__pagination-list">
          {Array(pagesCount)
          .fill(0)
          .map((item, index) => (
            <li className="courses__pagination-item">
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link courses__pagination-link--active"
                >
                  {index + 1}
                </Link>
              ) : (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link"
                >
                  {index + 1}
                </Link>
              )}
            </li>
          ))}

          </ul>
        </div>
      );
}
