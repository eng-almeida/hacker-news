import React, { useState } from 'react';
import { Layout, Row, Col, Space, Typography } from "antd";
import SideBar from "./modules/side-bar";
import Stories from "./modules/stories";
import Metrics from "./modules/metrics";
import Welcome from "./modules/welcome";
import TimeTags from "./modules/time-tags";
import Separator from "./components/separator";
import { StoriesContext, StoryType } from "./context/stories";

import { colors } from './theme';
import './App.less';
import styled from '@emotion/styled';

const { Title } = Typography;

const { Content, Sider } = Layout;

const Main = styled(Layout)`
  margin-left: 75px;
  background: ${colors['white']};
  main {
    margin: 0 16px
  }
`;

const WelcomeContainer = styled(Row)`
  background: #f6f6f6;
  padding-top: 24px;
  & > .ant-col {
    width: 1168px;
    padding-left: 156px;
  }
`

function App() {
  const [storyType, setStoryType] = useState<StoryType>("topstories");
  return (
    <StoriesContext.Provider value={{ storyType, setStoryType }}>
      <Layout style={{ background: 'none' }}>
        <Sider
          style={{
            background: colors['white'],
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
          width="75"
        >
          <SideBar />
        </Sider>
        <Main>
          <Content>
            <WelcomeContainer>
              <Col>
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
                <Separator />
              </Col>
            </WelcomeContainer>
            <Stories />
          </Content>
        </Main>
      </Layout >
    </StoriesContext.Provider>
  );
}

export default App;
