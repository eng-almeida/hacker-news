import React, { useState } from 'react';
import { Layout, Row, Col, Space, Typography } from "antd";
import SideBar from "./modules/side-bar";
import Stories from "./modules/stories";
import Metrics from "./modules/metrics";
import Welcome from "./modules/welcome";
import TimeTags from "./modules/time-tags";
import Separator from "./components/separator";
import { StoriesContext, StoryType } from "./context/stories";

import './App.less';

const { Title } = Typography;

const { Content, Sider } = Layout;

function App() {
  const [storyType, setStoryType] = useState<StoryType>("topstories");
  return (
    <StoriesContext.Provider value={{ storyType, setStoryType }}>
      <Layout style={{ background: 'none' }}>
        <Sider
          style={{
            background: "#fff",
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
          width="75"
        >
          <SideBar />
        </Sider>
        <Layout style={{ marginLeft: "75px", background: "#ffffff" }}>
          <Content style={{ margin: "0 16px" }}>
            <Row style={{ background: "#f6f6f6", paddingTop: "24px", }}>
              <Col style={{ width: "1168px", paddingLeft: "156px" }}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <Welcome />
                  <Row>
                    <Col span={8}>
                      <Title level={3}>Overview</Title>
                    </Col>
                    <Col span={8} offset={8} style={{ textAlign: "right" }}>
                      <TimeTags />
                    </Col>
                  </Row>
                  <Metrics />
                </Space>
                <Row align="middle">
                  <Col span={24} style={{ display: "flex", position: "relative" }}>
                    <Separator />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Stories />
          </Content>
        </Layout>
      </Layout >
    </StoriesContext.Provider>
  );
}

export default App;
