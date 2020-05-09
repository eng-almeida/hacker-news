import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Typography } from "antd";
import { MetricProps } from "../metric"
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

type Props = Pick<MetricProps, 'variation'>;

const CustomPercentage = styled(Text) <Props>`
  color: ${props => props.variation > 0 ? '#6fc089;' : 'red'};
  font-size: 12px;`

const Percentage: FunctionComponent<Props> = ({ variation }) => {
  return <CustomPercentage variation={variation}>
    {variation > 0 ? <ArrowUpOutlined style={{ fontSize: "8px" }} /> :
      <ArrowDownOutlined style={{ fontSize: "8px" }} />}
    {Math.abs(variation)}%
  </CustomPercentage>
}

export default Percentage;
