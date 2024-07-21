import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 1,
    label: <a>Home</a>,
  },
  {
    key: 2,
    label: <a href="/classes">Classes</a>,
  },
  {
    key: 3,
    label: <a>Performance</a>,
  },
];

export default function PageHeader(pageKey: any) {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="text-white">WOD-MATE</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={pageKey}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}
