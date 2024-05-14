
import Index from "./pages/index/Index";
import Category from "./pages/categoryInfo/CategoryInfo";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import ArticleInfo from "./pages/articleInfo/ArticleInfo";
import Courses from "./pages/courses/Courses";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import Articles from "./pages/articles/Articles";
import Contact from "./pages/contact/Contact";
import Search from "./pages/search/Search";
import Users from "./pages/adminPanel/users/Users";
import AdminArticles from "./pages/adminPanel/articles/AdminArticles";
import AdminCourses from "./pages/adminPanel/courses/AdminCourses";
import Menues from "./pages/adminPanel/menues/Menues";
import AdminPanel from './pages/adminPanel/Index'
import AdminCategory from './pages/adminPanel/category/Category'
import AdminContact from "./pages/adminPanel/contact/AdminContact";
import Session from "./pages/adminPanel/session/Sessions";
import Sessions from "./pages/sessions/Sessions";
import Comments from "./pages/adminPanel/comment/Comments";
import Offs from "./pages/adminPanel/offs/Offs";
import Drafts from "./pages/adminPanel/articles/Drafts";
import AdminIndex from "./pages/adminPanel/index/AdminIndex";
import UserPanel from "./pages/userAdmin/Index"
import UserIndex from "./pages/userAdmin/userIndex/UserIndex";
import UserOrder from "./pages/userAdmin/orders/UserOrder";
import UserPanelCourses from "./pages/userAdmin/courses/Courses";
import SendTicket from "./pages/userAdmin/tickets/SendTicket"
import UserPanelTickets from "./pages/userAdmin/tickets/Ticket"
import UserPanelTicketAnswer from './pages/userAdmin/tickets/TicketAnswer'
import UserPanelEditAccount from './pages/userAdmin/editAccount/EditAccount'
import PAdminPrivate from "./components/private/PAdminPrivate";
import TicketsAdmin from "./pages/adminPanel/ticket/TicketsAdmin";
import Discounts from "./pages/adminPanel/dicount/Discount"




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
  { path: '/contact', element: <Contact /> },
  { path: '/search/:value', element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Sessions /> },

  {
    path: "/p-admin/*",
   
    element: (
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <AdminIndex /> },
        { path: "users", element: <Users /> },
        { path: "courses", element: <AdminCourses /> },
        { path: "menus", element: <Menues /> },
        { path: "articles", element: <AdminArticles /> },
        { path: "articles/draft/:shortName", element: <Drafts /> },
        { path: "category", element: <AdminCategory /> },
        { path: "contacts", element: <AdminContact /> },
        { path: "sessions", element: <Session /> },
        { path: "comments", element: <Comments/> },
        { path: "offs", element: <Offs /> },
        { path: "discounts", element: <Discounts /> },
        { path: "tickets", element: < TicketsAdmin/> },
    ],
  },


  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserIndex /> },
      { path: "orders", element: <UserOrder /> },
      { path: "buyed", element: <UserPanelCourses/> },
      { path: "tickets", element: <UserPanelTickets /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "tickets/answer/:id", element: <UserPanelTicketAnswer /> },
      { path: "edit-account", element: <UserPanelEditAccount /> },

    ],
  },


];

export default routes;
