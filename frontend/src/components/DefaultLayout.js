import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { FormOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Define menu items
  const menuItems = [
    {
      key: "1",
      icon: <FormOutlined />,
      label: <Link to="/">Patient Form</Link>,
    },
    {
      key: "2",
      icon: <UnorderedListOutlined />,
      label: <Link to="/patient-list">Patient List</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <div className="logo" style={{ color: "white", textAlign: "center", margin: "16px" }}>
          <h2>Hospital</h2>
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", textAlign: "center", padding: 0 }}>
          <h1>Hospital Management System</h1>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
