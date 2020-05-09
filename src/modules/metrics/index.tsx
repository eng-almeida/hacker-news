import React from "react";
import { Row, Col, Typography, Space, Button } from "antd";
import { LineChartOutlined, FundOutlined, PieChartOutlined, RadarChartOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import Metric from "../../components/metric";

type IconPlaceholderProps = {
  color: string;
}

const { Title } = Typography;

const IconPlaceholder = styled('div') <IconPlaceholderProps>`
  background: ${props => props.color};
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #ffffff;
    font-size: 20px;
  }
`

const Metrics = () => {
  return <section>
    <Row gutter={16}>
      <Col span={6}>
        <Metric>
          {{
            name: "revenue",
            value: "$580",
            variation: 50,
            icon: <IconPlaceholder color="#73d7db"><LineChartOutlined /></IconPlaceholder>
          }}
        </Metric>
      </Col>
      <Col span={6}>
        <Metric>
          {{
            name: "impressions",
            value: "$12.2M",
            variation: 12,
            icon: <IconPlaceholder color="#4285f4"><FundOutlined /></IconPlaceholder>
          }}
        </Metric>
      </Col>
      <Col span={6}>
        <Metric>
          {{
            name: "fill rate",
            value: "37.5%",
            variation: -12,
            icon: <IconPlaceholder color="#1f29ae"><PieChartOutlined /></IconPlaceholder>
          }}
        </Metric>
      </Col>
      <Col span={6}>
        <Metric>
          {{
            name: "ecpm",
            value: "$2.4",
            variation: 32,
            icon: <IconPlaceholder color="#04127b"><RadarChartOutlined /></IconPlaceholder>
          }}
        </Metric>
      </Col>
    </Row>
  </section>
}

export default Metrics;