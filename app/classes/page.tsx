"use client";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Typography,
  Tabs,
  List,
  Collapse,
  Badge,
  Button,
  Flex,
  ConfigProvider,
  Tag,
} from "antd";
import React from "react";
const { Header, Content, Footer } = Layout;
import PageHeader from "@/components/header";
import AddClassBtn from "@/components/AddClassBtn";
import { Dumbbell, SmilePlus } from "lucide-react";
import moment from "moment";
import { getClasses } from "@/actions/db";
const { Title } = Typography;

export default function Home() {
  // Initialize an empty array to hold the tab items
  const items = [];
  const [classes, setClasses] = React.useState<any>([]);

  async function handleClass() {
    const response = await getClasses();
    console.log(response);
    setClasses(response);
  }

  function classDisplay(index: any) {
    return <>Hello + {index}</>;
  }

  for (let i = 0; i < 5; i++) {
    const date = moment().add(i, "days");
    const dateLabel = date.format("dddd DD MMMM");

    // Filter classes to only include those that match the current date
    const filteredClasses = classes.filter((item: any) =>
      moment(item.start).isSame(date, "day"),
    );

    items.push({
      key: (i + 1).toString(),
      label: dateLabel,
      children: (
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                contentPadding: 0,
                headerPadding: 0,
              },
            },
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={filteredClasses}
            renderItem={(item: any, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Dumbbell />}
                  title={
                    <Flex justify="space-between">
                      <strong>
                        {moment(item.start).format("h:mm a")} - {item.type}
                      </strong>
                      <Button type="primary" size="small">
                        Reserve
                      </Button>
                    </Flex>
                  }
                  description={
                    <>
                      <Collapse
                        ghost
                        size="small"
                        items={[
                          {
                            key: "1",
                            label: "WOD",
                            children: (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.notes.replace(/\n/g, "<br />"),
                                }}
                              ></p>
                            ),
                          },
                        ]}
                      />
                      <Collapse
                        ghost
                        size="small"
                        items={[
                          {
                            key: "1",
                            label: (
                              <Tag color="green">
                                Attendees:{" "}
                                {item.attendees !== null &&
                                item.attendees !== undefined
                                  ? item.attendees
                                  : 0}{" "}
                                / 10
                              </Tag>
                            ),
                            children: <p>{item.attendees}</p>,
                          },
                        ]}
                      />
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </ConfigProvider>
      ),
    });
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  React.useEffect(() => {
    handleClass();
  }, []);

  return (
    <Layout>
      <PageHeader pageKey={1} />
      <Content style={{ padding: "0 20px" }}>
        <AddClassBtn />
        <br></br>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "auto",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title level={3}>Classes</Title>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
