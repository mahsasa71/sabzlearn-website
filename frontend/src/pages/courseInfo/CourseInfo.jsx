import React, { useState, useEffect } from "react";
import Topbar from '../../components/topBar/TopBar'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/NavBar'
import BraedCrump from '../../components/beadCrump/BraedCrump'
import CourseDeatails from '../../components/courseDetails/CourseDeatails'
import CommentTextArea from '../../components/commentTextAria/CommentTextAria'
import Accordion from "react-bootstrap/Accordion";
import './CourseInfo.css'
import { useParams, Link } from "react-router-dom"; import swal from 'sweetalert'

export default function CourseInfo() {
  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [courseDetails, setCourseDetails] = useState({});
  const [courseTeacher, setCourseTeacher] = useState({})
  const [courseCategory, setCourseCategory] = useState({})
  const [relatedCourses, setRelatedCourses] = useState([]);
  const { courseName } = useParams()
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/courses/${courseName}`, {

      headers: {
        Authorization: `Bearer ${localStorageData === null ? null : localStorageData.token
          }`,
      },
    })
      .then(res => res.json())
      .then(courseInfo => {
        setComments(courseInfo.comments);
        setSessions(courseInfo.sessions);
        setCourseDetails(courseInfo);
        setCreatedAt(courseInfo.createdAt);
        setUpdatedAt(courseInfo.updatedAt);
        setCourseTeacher(courseInfo.creator)
        setCourseCategory(courseInfo.categoryID)

        // console.log(courseInfo);
      })



      fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then((res) => res.json())
      .then((allData) => {
        console.log(allData);
        setRelatedCourses(allData);
      });

  }, [])

  function getCourseDetails() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData === null ? null : localStorageData.token
          }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        setComments(courseInfo.comments);
        setSessions(courseInfo.sessions);
        setCourseDetails(courseInfo);
        setCreatedAt(courseInfo.createdAt);
        setUpdatedAt(courseInfo.updatedAt);
        setCourseTeacher(courseInfo.creator);
        setCourseCategory(courseInfo.categoryID);
      });
  }



  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore

      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: 'کامنت موردنظر با موفقیت ثبت شد',
          icon: 'success',
          buttons: 'تایید'
        })
      });
  };


  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                }`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: course.price,
            }),
          }).then((res) => {
            console.log(res);
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                getCourseDetails();
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          swal({
            title: "در صورت داشتن کد تخفیف وارد کنید:",
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((code) => {
            if (code === null) {
              fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  price: course.price,
                }),
              }).then((res) => {
                console.log(res);
                if (res.ok) {
                  swal({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    buttons: "اوکی",
                  }).then(() => {
                    getCourseDetails();
                  });
                }
              });
            } else {
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  course: course._id,
                }),
              })
                .then((res) => {
                  console.log(res);

                  if (res.status == 404) {
                    swal({
                      title: "کد تخفیف معتبر نیست",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else if (res.status == 409) {
                    swal({
                      title: "کد تخفیف قبلا استفاده شده :/",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else {
                    return res.json();
                  }
                })
                .then((code) => {
                  fetch(
                    `http://localhost:4000/v1/courses/${course._id}/register`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                          }`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        price: course.price - (course.price * code.percent / 100)
                      }),
                    }
                  ).then((res) => {
                    console.log(res);
                    if (res.ok) {
                      swal({
                        title: "ثبت نام با موفقیت انجام شد",
                        icon: "success",
                        buttons: "اوکی",
                      }).then(() => {
                        getCourseDetails();
                      });
                    }
                  });
                });
            }
          });
        }
      });
    }
  };
  return (
    <>
      <Topbar />
      <Navbar />

      <BraedCrump
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "آموزش برنامه نویسی فرانت‌اند",
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: "دوره متخصص جاوا اسکریپت",
            to: "course-info/js-expert",
          },
        ]}
      />

      <section class="course-info">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <a href="#" class="course-info__link">
                {
                  courseCategory.title
                }
              </a>
              <h1 class="course-info__title">
                {courseDetails.name}              </h1>
              <p class="course-info__text">
                {courseDetails.description}
              </p>
              <div class="course-info__social-media">
                <a href="#" class="course-info__social-media-item">
                  <i class="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" class="course-info__social-media-item">
                  <i class="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" class="course-info__social-media-item">
                  <i class="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div class="col-6">
              <video
                src=""
                poster="/images/courses/js_project.png"
                class="course-info__video"
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>

      <main class="main">
        <div class="container">
          <div class="row">
            <div class="col-8">
              <div class="course">
                <div class="course-boxes">
                  <div class="row">
                    <CourseDeatails
                      icon="graduation-cap"
                      title="وضعیت دوره:"
                      text={
                        courseDetails.isComplete === 1
                          ? "به اتمام رسیده"
                          : "در حال برگزاری"
                      }
                    />
                    <CourseDeatails
                      icon="clock"
                      title=" مدت زمان دوره:"
                      text={createdAt.slice(0, 10)}
                    />
                    <CourseDeatails
                      icon="calendar-alt"
                      title="آخرین بروزرسانی:"
                      text={updatedAt.slice(0, 10)}
                    />

                  </div>
                </div>
                {/* Start Course Progress */}
                <div class="course-progress">
                  <div class="course-progress__header">
                    <i class="fas fa-chart-line course-progress__icon"></i>
                    <span class="course-progress__title">
                      درصد پیشرفت دوره: 100%
                    </span>
                  </div>
                  <div class="progress course-progress__bar">
                    <div
                      class="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                {/* Finish Course Progress */}

                {/* Start Introduction */}

                <div class="introduction">
                  <div class="introduction__item">
                    <span class="introduction__title title">
                      آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                    </span>
                    <img
                      src="/images/info/1.gif"
                      alt="course info image"
                      class="introduction__img img-fluid"
                    />
                    <p class="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p class="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div class="introduction__item">
                    <span class="introduction__title title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt="course info image"
                      class="introduction__img img-fluid"
                    />
                    <p class="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p class="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                      مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                      بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                      کرده باشد{" "}
                    </p>
                    <p class="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p class="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p class="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div class="introduction__btns">
                    <a href="#" class="introduction__btns-item">
                      دانلود همگانی ویدیوها
                    </a>
                    <a href="#" class="introduction__btns-item">
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div class="introduction__topic">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0" className="accordion">
                        <Accordion.Header>معرفی دوره</Accordion.Header>
                        {sessions.map((session, index) => (
                          <Accordion.Body
                            key={session._id}
                            className="introduction__accordion-body"
                          >
                            {session.free === 1 ||
                              courseDetails.isUserRegisteredToThisCourse ? (
                              <>
                                <div className="introduction__accordion-right">
                                  <span className="introduction__accordion-count">
                                    {index + 1}
                                  </span>
                                  <i className="fab fa-youtube introduction__accordion-icon"></i>
                                  <Link
                                    to={`/${courseName}/${session._id}`}
                                    className="introduction__accordion-link"
                                  >
                                    {session.title}
                                  </Link>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time">
                                    {session.time}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="introduction__accordion-right">
                                  <span className="introduction__accordion-count">
                                    {index + 1}
                                  </span>
                                  <i className="fab fa-youtube introduction__accordion-icon"></i>
                                  <span
                                    className="introduction__accordion-link"
                                  >
                                    {session.title}
                                  </span>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time">
                                    {session.time}
                                  </span>
                                  <i className="fa fa-lock"></i>
                                </div>
                              </>
                            )}
                          </Accordion.Body>
                        ))}
                      </Accordion.Item>
                      <Accordion.Item eventKey="1" className="accordion">
                        <Accordion.Header>
                          اصطلاحات مقدماتی مربوط به بک‌اند
                        </Accordion.Header>
                        <Accordion.Body className="introduction__accordion-body">
                          <div class="introduction__accordion-right">
                            <span class="introduction__accordion-count">
                              1
                            </span>
                            <i class="fab fa-youtube introduction__accordion-icon"></i>
                            <a href="#" class="introduction__accordion-link">
                              معرفی دوره + چرا یادگیری کتابخانه ها ضروری است؟
                            </a>
                          </div>
                          <div class="introduction__accordion-left">
                            <span class="introduction__accordion-time">
                              18:34
                            </span>
                          </div>
                        </Accordion.Body>
                        <Accordion.Body className="introduction__accordion-body">
                          <div class="introduction__accordion-right">
                            <span class="introduction__accordion-count">
                              1
                            </span>
                            <i class="fab fa-youtube introduction__accordion-icon"></i>
                            <a href="#" class="introduction__accordion-link">
                              جلسه دوم این فصل
                            </a>
                          </div>
                          <div class="introduction__accordion-left">
                            <span class="introduction__accordion-time">
                              18:34
                            </span>
                          </div>
                        </Accordion.Body>
                        <Accordion.Body className="introduction__accordion-body">
                          <div class="introduction__accordion-right">
                            <span class="introduction__accordion-count">
                              1
                            </span>
                            <i class="fab fa-youtube introduction__accordion-icon"></i>
                            <a href="#" class="introduction__accordion-link">
                              جلسه سوم این فصل
                            </a>
                          </div>
                          <div class="introduction__accordion-left">
                            <span class="introduction__accordion-time">
                              18:34
                            </span>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                {/* Finish Introduction */}

                {/* Finish Introduction */}

                {/* Start Teacher Details */}

                <div class="techer-details">
                  <div class="techer-details__header">
                    <div class="techer-details__header-right">
                      <img
                        src="/images/info/teacher.jfif"
                        alt="Teacher Profile"
                        class="techer-details__header-img"
                      />
                      <div class="techer-details__header-titles">
                        <a href="#" class="techer-details__header-link">
                          {
                            courseTeacher.name
                          }
                        </a>
                        <span class="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div class="techer-details__header-left">
                      <i class="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span class="techer-details__header-name">مدرس</span>
                    </div>
                  </div>
                  <p class="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                    سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                    زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>


                {/* Finish Teacher Details */}

                <CommentTextArea comments={comments} submitComment={submitComment} />
              </div>
            </div>

            <div class="col-4">
              <div class="courses-info">
                <div class="course-info">
                  <div class="course-info__register">
                    {courseDetails.isUserRegisteredToThisCourse === true ? (
                      <span className="course-info__register-title">
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>
                        دانشجوی دوره هستید
                      </span>
                    ) : (
                      <span className="course-info__register-title"
                        onClick={() => registerInCourse(courseDetails)}

                      >
                        ثبت نام در دوره
                      </span>
                    )}
                  </div>
                </div>
                <div class="course-info">
                  <div class="course-info__total">
                    <div class="course-info__top">
                      <div class="course-info__total-sale">
                        <i class="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span class="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span class="course-info__total-sale-number">   {courseDetails.courseStudentsCount}</span>
                      </div>
                    </div>
                    <div class="course-info__bottom">
                      <div class="course-info__total-comment">
                        <i class="far fa-comments course-info__total-comment-icon"></i>
                        <span class="course-info__total-comment-text">
                          67 دیدگاه
                        </span>
                      </div>
                      <div class="course-info__total-view">
                        <i class="far fa-eye course-info__total-view-icon"></i>
                        <span class="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="course-info">
                  <div class="course-info__header-short-url">
                    <i class="fas fa-link course-info__short-url-icon"></i>
                    <span class="course-info__short-url-text">لینک کوتاه</span>
                  </div>
                  <span class="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div class="course-info">
                  <span class="course-info__topic-title">سرفصل های دوره</span>
                  <span class="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href="#" style={{ color: 'blue', fontWeight: 'bold' }}>
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                {relatedCourses.length !== 0 && (
                  <div className="course-info">
                    <span className="course-info__courses-title">
                      دوره های مرتبط
                    </span>
                    <ul className="course-info__courses-list">
                      {relatedCourses.map((course) => (
                        <li className="course-info__courses-list-item">
                          <Link
                            to={`/course-info/${course.shortName}`}
                            className="course-info__courses-link"
                          >
                            <img
                              src={`http://localhost:4000/courses/covers/${course.cover}`}
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              {course.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
