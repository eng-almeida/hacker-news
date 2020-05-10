import React, { FunctionComponent, useContext, useState, ReactNode } from "react";
import styled from '@emotion/styled';
import { AlignLeftOutlined, AreaChartOutlined } from "@ant-design/icons";
import { Typography, Space } from 'antd';
import Logo from "../../components/logo";
import Logout from "../../components/logout";
import { SelectableMenuButton } from "../../components/menu-button";
import { StoriesContext, StoryType } from "../../context/stories";
import { colors } from "../../theme";

type SideMenu = {
  name: string;
  icon: ReactNode;
  selected: boolean;
  value: StoryType
}

const { Text } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-right: 1px solid ${colors['almost-white']};
  padding: 20px 0;
`;

const MenuButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MENUS: Array<SideMenu> = [{
  name: 'Top Stories',
  icon: <AlignLeftOutlined />,
  selected: true,
  value: 'topstories'
},
{
  name: 'Most recent',
  icon: <AreaChartOutlined />,
  selected: false,
  value: 'newstories'
}];

const SideBar: FunctionComponent = () => {
  const { storyType, setStoryType } = useContext(StoriesContext);
  const [menus, setMenu] = useState(MENUS);

  const handleStoriesType = (value: StoryType) => {
    if (storyType !== value) {
      setStoryType(value);
      setMenu(menus.map(menu => ({
        ...menu,
        selected: menu.value === value
      })));
    }
  }

  return (<Container>
    <MenuButtonsContainer>
      <Logo />
      <Space direction="vertical" size="large">
        {menus.map((menu, i) =>
          <SelectableMenuButton
            key={i}
            selected={menu.selected}
            onClick={() => { handleStoriesType(menu.value as StoryType) }}
          >
            {menu.icon}
            <Text style={{ fontSize: "10px" }}>{menu.name}</Text>
          </SelectableMenuButton>
        )}
      </Space>
    </MenuButtonsContainer>
    <Logout />
  </Container>);
}
export default SideBar;