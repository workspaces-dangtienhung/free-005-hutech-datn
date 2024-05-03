import React, { useState } from "react";
import { Outlet } from "react-router-dom";
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

const menuItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "nav 1",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "nav 2",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "nav 3",
  },
];

const items: MenuProps["items"] = [
  {
    key: "4",
    danger: true,
    label: "Đăng Xuất",
    icon: (
      <LogoutOutlined
        style={{
          fontSize: "18px",
        }}
      />
    ),
  },
];

const DoctorLayout = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content, Footer } = Layout;
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
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
              D
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
