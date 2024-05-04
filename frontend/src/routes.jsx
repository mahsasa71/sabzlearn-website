// import Index from "./pages/index/Index";
// import CategoryInfo from './pages/categoryInfo/CategoryInfo'
// import CourseInfo from "./pages/courseInfo/CourseInfo";
// import ArticleInfo from "./pages/articleInfo/ArticleInfo";

// const routes = [
//   { path: "/", element: <Index /> },
//   { path: "/course-info/:courseName", element: <CourseInfo /> },
//   { path: "/category-info/:categoryName", element: <CategoryInfo /> },
//   { path: "/article-info/:articleName", element: <ArticleInfo /> },
// ];

// export default routes;

import Index from "./pages/index/Index";
import Category from "./pages/categoryInfo/CategoryInfo";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import ArticleInfo from "./pages/articleInfo/ArticleInfo";
import Courses from "./pages/courses/Courses";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import Articles from "./pages/articles/Articles";
const routes = [
  { path: "/", element: <Index /> },
  { path: '/category-info/:categoryName/:page', element: <Category /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: '/courses', element: <Courses /> },
  { path: '/courses/:page', element: <Courses /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/articles/:page', element: <Articles /> },
];

export default routes;
