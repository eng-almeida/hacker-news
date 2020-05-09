import styled from '@emotion/styled';

type MenuButtonProps = {
  selected?: boolean;
}

export const MenuButton = styled('button') <MenuButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #2a13bd;
  & svg {
    font-size: 20px;
  }
`

export const SelectableMenuButton = styled(MenuButton) <MenuButtonProps>`
  opacity: ${props =>
    props.selected ? '1' : '0.5'};
`