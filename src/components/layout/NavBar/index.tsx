import { Link, useLocation } from "react-router-dom";
import { Avatar, Dropdown, MenuProps } from "antd";
import { LogoutOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  ABOUT,
  APPOINTMENT,
  CONTACT,
  HOME,
  PRICE,
  SERVICE,
  SIGNIN,
  SIGNUP,
  TEAM,
  TESTIMONIAL,
} from "../../../constants/route";
import { getLocalStorage } from "../../../utils";
import { removeLocalStorage } from "../../../utils/localStorage";
import { useEffect } from "react";
type Props = {};

const NavBar = (props: Props) => {
  const user = getLocalStorage("user");

  const { pathname } = useLocation();

  const handleLogout = () => {
    removeLocalStorage("user");
    window.location.reload();
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: (
        <UserOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
      label: <Link to={"account"}>Tài khoản</Link>,
    },
    {
      key: "2",
      icon: (
        <LockOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
      label: <Link to={"change-password"}>Đổi mật khẩu</Link>,
    },
    {
      key: "4",
      danger: true,
      label: "Đăng Xuất",
      onClick: handleLogout,
      icon: (
        <LogoutOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
    },
  ];

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
      <div
        className="collapse navbar-collapse d-flex align-items-center"
        id="navbarCollapse"
      >
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
        {/* <button
          type="button"
          className="btn text-dark"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <i className="fa fa-search"></i>
        </button> */}

        {user ? (
          <Dropdown menu={{ items }} arrow trigger={["click"]}>
            <Avatar
              style={{
                backgroundColor: "#f56a00",
                verticalAlign: "middle",
                fontWeight: "bold",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              size="default"
            >
              {user && user?.user?.userName?.split("")[0]}
            </Avatar>
          </Dropdown>
        ) : (
          <>
            <Link to={SIGNIN} className="btn btn-primary py-2 px-4 ms-3">
              Đăng nhập
            </Link>
            <Link to={SIGNUP} className="btn btn-primary py-2 px-4 ms-3">
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
