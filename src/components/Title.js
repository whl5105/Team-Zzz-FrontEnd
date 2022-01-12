import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

import { Icon } from "../elements";
import back from "../static/images/mypage/path_L_white.png";

const Title = (props) => {
  const { is_token, backIcon, justifySB } = props;
  const dispatch = useDispatch();
  const styles = {
    justifySB: justifySB,
  };
  return (
    <TilteBox {...styles}>
      {backIcon && (
        <Icon
          src={back}
          marginR="15px"
          _onClick={() => {
            history.goBack();
          }}
        ></Icon>
      )}
      <h3>{props.children}</h3>
      {is_token && (
        <p onClick={() => dispatch(userActions.logoutDB())}>로그아웃</p>
      )}
    </TilteBox>
  );
};
//-- defaultProps --
Title.defaultProps = {
  justifySB: false,
};
const TilteBox = styled.div`
  width: 100%;
  display: flex;
  ${(props) => (props.justifySB ? `justify-content: space-between;` : "")};

  color: white;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
  align-items: center;
}
  & h3 {
    font-size: 22px;
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
  }
  & p {
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.Medium};
  }
`;

export default Title;
