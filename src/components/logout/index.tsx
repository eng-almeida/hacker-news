import React from 'react';
import { Typography } from 'antd';
import { LogoutOutlined } from "@ant-design/icons";
import { MenuButton } from '../menu-button';

const { Text } = Typography;

const Logout = () => (
  <MenuButton>
    <LogoutOutlined style={{ fontSize: "20px" }} />
    <Text style={{ fontSize: "10px" }}>Log out</Text>
  </MenuButton>
);

export default Logout;