import React from "react";
import styled from "styled-components";

// --- components ---
import { Icon } from "../../elements";

// --- images ---
import path from "../../static/images/mypage/arrow_R_W.svg";
import path_B from "../../static/images/mypage/arrow_B_W.svg";
import path_T from "../../static/images/mypage/arrow_T_W.svg";

const List = (props) => {
  const { _onClick, children, icon, src, is_toggle } = props;
  const [click, setClick] = React.useState(false);
  console.log(click);
  console.log(props.toggle);

  if (is_toggle) {
    <ListBox onClick={_onClick}>
      <ListTitle>
        <Icon src={icon} marginR="10px"></Icon>
        {children}
      </ListTitle>
      <Icon
        src={path_B}
        // onClick={() => {
        //   console.log("111");
        //   setClick(!click);
        // }}
      ></Icon>
    </ListBox>;
  }

  return (
    <ListBox onClick={_onClick}>
      <ListTitle>
        <Icon src={icon} marginR="10px"></Icon>
        {children}
      </ListTitle>
      <Icon src={path}></Icon>
    </ListBox>
  );
};

List.defaultProps = {
  children: null,
  _onClick: () => {},
};

// --- styled-components ---
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
