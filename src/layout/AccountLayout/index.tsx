import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Footer, TopBar } from "../../components/layout";
import { Tabs, Layout, Avatar, Dropdown, MenuProps } from "antd";
import { LogoutOutlined, LockOutlined } from "@ant-design/icons";
import { MyBookingPage, MyHistoryBookingPage } from "../../pages";
import { HOME } from "../../constants/route";
import { getLocalStorage, removeLocalStorage } from "../../utils/localStorage";
type Props = {};

const AccountLayout = (props: Props) => {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  const items: MenuProps["items"] = [
    {
      key: "2",
      icon: (
        <LockOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
      label: <Link to={"/change-password"}>Đổi mật khẩu</Link>,
    },
    {
      key: "4",
      danger: true,
      label: "Đăng Xuất",
      onClick: () => {
        removeLocalStorage("user");
        navigate(HOME);
      },
      icon: (
        <LogoutOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
    },
  ];
  const { Header } = Layout;
  return (
    <div>
      <TopBar />
      <Header className="d-flex justify-content-between align-items-center">
        <Link to={HOME} className="navbar-brand p-0">
          <h1 className="m-0 text-primary">
            <i className="fa fa-tooth me-2"></i>DentCare
          </h1>
        </Link>
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
      </Header>
      <div
        className="mb-4 mt-4 container"
        style={{
          minHeight: "100vh",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          // type="card"
          size={"large"}
          items={[
            {
              key: "1",
              label: "Quản lý lịch hẹn",
              children: <MyBookingPage />,
            },
            {
              key: "2",
              label: "Lịch sử đặt lịch",
              children: <MyHistoryBookingPage />,
            },
          ]}
        />
      </div>
      <Footer />
    </div>
  );
};

export default AccountLayout;
