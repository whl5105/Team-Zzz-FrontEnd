import React from "react";
import styled from "styled-components";

import { Icon } from "../../elements";

import { arrow_R_W } from "../../static/images/index";

const List = (props) => {
  const { _onClick, children, icon, src } = props;

  return (
    <ListBox onClick={_onClick}>
      <ListTitle>
        <Icon src={icon} marginR="10px" alt="titleIcon" />
        {children}
      </ListTitle>
      <Icon src={src ? src : arrow_R_W} alt="rightIcon" />
    </ListBox>
  );
};

List.defaultProps = {
  children: null,
  _onClick: () => {},
};

const ListBox = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 ${({ theme }) => theme.paddings.xxxxl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const ListTitle = styled.div`
  display: flex;
  align-items: center;
`;

export default List;
