import React from "react";
import { Row, Col, Typography, Button } from "antd";
import styled from "@emotion/styled";
import Icon from "@ant-design/icons";
import { WelcomeIcon } from "../../components/welcome";
import { TitleProps } from "antd/lib/typography/Title";

const { Text, Title, Paragraph } = Typography;

const Section = styled.section`
  position: relative;
`;

const Container = styled(Col)`
  background: #1f29ae;
  height: 140px;
  border-radius: 4px;
`;

const Greetings = styled(Title) <TitleProps>`
  color: #ffffff !important;
  font-weight: 300 !important;
`

const UserName = styled.span`
  font-weight: 600;
`

const Description = styled(Paragraph)`
  color: #a4a5ef !important;
  font-weight: 100 !important;
`

const Welcome = () => {
  return <Section>
    <Icon component={WelcomeIcon} style={{ position: "absolute", top: "-24px", left: "52px", zIndex: 1 }} />
    <Row>
      <Container span={24}>
        <Row align="middle" style={{ height: "100%" }}>
          <Col span={10} offset={7}>
            <Greetings level={3}>Welcome back<UserName> Gregory</UserName></Greetings>
            <Description>Nodolor sit amet, consectetur adipisicing elit. Aperiam odio expedita nostrum eius, sapiente commodi in tenetur facilis</Description>
          </Col>
          <Col span={5} offset={1}>
            <Button type="primary" size="large" style={{ width: "100%", background: "#04127b", borderRadius: "4px" }}>
              Hide Alert
            </Button>
          </Col>
        </Row>
      </Container>
    </Row>
  </Section>
}

export default Welcome;