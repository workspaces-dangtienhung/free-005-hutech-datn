import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Layout, theme, Button, Avatar, Dropdown } from "antd";
import { getLocalStorage } from "../../utils";
import { Roles } from "../../types/roles.type";
import { HOME, SIGNIN } from "../../constants/route";
import { removeLocalStorage } from "../../utils/localStorage";
type Props = {};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const DoctorLayout = (props: Props) => {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  // useEffect(() => {
  //   if (user && user.user.roleId !== Roles.staff) {
  //     navigate(HOME);
  //   }
  //   if (!user) {
  //     console.log("chua dang nhap");

  //     navigate(SIGNIN);
  //   }
  // }, []);
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content, Footer } = Layout;
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const items: MenuProps["items"] = [
    {
      key: "4",
      danger: true,
      label: "Đăng Xuất",
      onClick: () => {
        removeLocalStorage("user");
        navigate(SIGNIN);
        // window.location.reload();
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

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Quản lý lịch khám",
      onClick: () => {
        navigate("/staff/dashboard");
      },
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Quản lý tài liệu y tế",
      onClick: () => {
        navigate("/staff/medical-record");
      },
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          <h1 className="m-0 text-primary">
            <i className="fa fa-tooth me-2"></i> {!collapsed ? "DentCare" : ""}
          </h1>
        </div>
        <Menu
          theme={"dark"}
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          // selectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between align-items-center px-3 "
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items }} arrow trigger={["click"]}>
            <Avatar
              style={{
                backgroundColor: "#f56a00",
                verticalAlign: "middle",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              size="large"
            >
              {user && user?.user?.userName?.split("")[0]}
            </Avatar>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DoctorLayout;
