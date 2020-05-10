import React from 'react';
import styled from '@emotion/styled';
import { DownOutlined } from '@ant-design/icons';
import { colors } from '../../theme';
import { Row, Col } from 'antd';

const Line = styled.span`
  border-bottom: 1px solid ${colors['line-color']};
  flex: 1;
`;
const Before = styled(Line)`
  transform: translate(5px, -10px);
`;
const After = styled(Line)`
  transform: translate(-5px, -10px);
`;
const Arrow = styled(DownOutlined)`
  position: absolute;
  left: calc(50% - 12px);
  top: calc(50% - 8px);
  background: ${colors['white']};
  padding: 6px;
  border-radius: 50%;
  box-shadow: 0px 0px 20px 4px rgba(0,0,0,0.05);
  color: ${colors['line-color']};
`;
const Round = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid ${colors['line-color']};
  position: relative;
  clip-path: circle(50% at 25px 54px)
`;
const Container = styled(Col)`
  display: flex;
  position: relative;
`;
const Separator = () => (
  <Row align="middle">
    <Container span={24}>
      <Arrow />
      <Before />
      <Round />
      <After />
    </Container>
  </Row>
);

export default Separator;