import { Link, useLocation } from "react-router-dom";

import {
  ABOUT,
  APPOINTMENT,
  CONTACT,
  HOME,
  PRICE,
  SERVICE,
  TEAM,
  TESTIMONIAL,
} from "../../../constants/route";
type Props = {};

const NavBar = (props: Props) => {
  const { pathname } = useLocation();
  console.log(pathname);

  const navItems = [
    { title: "Trang Chủ", link: HOME },
    { title: "Giới Thiệu", link: ABOUT },
    { title: "Dịch Vụ", link: SERVICE },
    {
      title: "Pages",
      link: "#",
      children: [
        { title: "Chuyên Khoa", link: PRICE },
        { title: "Đội Ngũ Nha Sĩ", link: TEAM },
        { title: "Đánh Giá Của Khách Hàng", link: TESTIMONIAL },
        { title: "Đặt Lịch", link: APPOINTMENT },
      ],
    },
    { title: "Liên Hệ", link: CONTACT },
  ];
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
      <Link to={HOME} className="navbar-brand p-0">
        <h1 className="m-0 text-primary">
          <i className="fa fa-tooth me-2"></i>DentCare
        </h1>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0">
          {navItems.map((item) =>
            item.children ? (
              <div className="nav-item dropdown" key={item.title}>
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Pages
                </span>
                <div className="dropdown-menu m-0 ">
                  {item.children.map((child) => (
                    <Link
                      to={child.link}
                      key={child.title}
                      className={`dropdown-item ${
                        child.link === pathname ? "active" : ""
                      }`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                to={item.link}
                className={`nav-item nav-link ${
                  item.link === pathname ? "active" : ""
                }`}
                key={item.title}
              >
                {item.title}
              </Link>
            )
          )}
        </div>
        <button
          type="button"
          className="btn text-dark"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <i className="fa fa-search"></i>
        </button>
        <Link to={APPOINTMENT} className="btn btn-primary py-2 px-4 ms-3">
          Đặt lịch
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
