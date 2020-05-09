import React from 'react';
import styled from '@emotion/styled';
import { DownOutlined } from '@ant-design/icons';

const Line = styled.span`
  border-bottom: 1px solid #e0e0e0;
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
  background: #fff;
  padding: 6px;
  border-radius: 50%;
  box-shadow: 0px 0px 20px 4px rgba(0,0,0,0.05);
  color: #e0e0e0;
`;
const Round = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  position: relative;
  clip-path: circle(50% at 25px 54px)
`;
const Separator = () => (
  <>
    <Arrow />
    <Before />
    <Round />
    <After />
  </>
);

export default Separator;