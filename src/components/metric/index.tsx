import React, { FunctionComponent } from 'react';
import { Typography, Space } from "antd";
import styled from '@emotion/styled';
import Percentage from "../percentage";

const { Title, Text } = Typography;

export type MetricProps = {
  name: string;
  value: string;
  variation: number;
  icon: React.ReactNode;
}
type Props = {
  children: MetricProps
}

const Container = styled.div`
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 20px 4px rgba(0,0,0,0.05);
  border-radius: 4px;
  padding: 16px;
  h3 {
    font-weight: 400;
    line-height: 21px;
    margin: 0;
  }
`

const Label = styled(Text)`
  color: #aaacb7;
  text-transform: uppercase;
`

const SpaceVertical = styled(Space)`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const Metric: FunctionComponent<Props> = ({ children }) => {
  const { icon, name, value, variation } = children;
  return <Container>
    <Space align="start">
      {icon}
      <SpaceVertical>
        <Space>
          <Title level={3}>{value}</Title>
          <Percentage variation={variation} />
        </Space>
        <Label>{name}</Label>
      </SpaceVertical>
    </Space>
  </Container>
}

export default Metric;