import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Title = (props) => {
  const { is_token } = props;
  const dispatch = useDispatch();
  return (
    <TilteBox>
      <h3>{props.children}</h3>
      {is_token && (
        <p onClick={() => dispatch(userActions.logoutDB())}>로그아웃</p>
      )}
    </TilteBox>
  );
};
const TilteBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
