"use client";
import { Breadcrumb, Layout, Menu, theme, Typography } from "antd";
const { Header, Content, Footer } = Layout;
import PageHeader from "@/components/header";
const { Title } = Typography;

export default function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <PageHeader pageKey={1} />
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "auto",
            padding: 16,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title level={3}>Home</Title>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
