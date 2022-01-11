import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import noticeIcon from "../static/images/mypage/noticeIcon.svg";
import path from "../static/images/mypage/path.svg";

const List = (props) => {
  return (
    <div onClick={() => history.push("/notice")}>
      <Icon categoryImage={noticeIcon}></Icon>
      <p>{props.children}</p>
      <div></div>
    </div>
  );
};

export default List;
