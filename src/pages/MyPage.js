import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as noticeActions } from "../redux/modules/notice";

import { user, notice, mixList } from "../static/images";

import Title from "../components/Title";
import List from "../components/mypage/List";
import AlarmBanner from "../components/mypage/AlarmBanner";

const Mypage = (props) => {
  function Mobile() {
    return /iPhone|iPad/i.test(navigator.userAgent);
  }
  const [ios, setIos] = useState(Mobile());

  const dispatch = useDispatch();
  const userIdx = localStorage.getItem("userIdx");
  const token = localStorage.getItem("token");
  const [is_token, setLogin] = useState(token);

  useEffect(() => {
    setLogin(token);
    if (token && !ios) {
      dispatch(noticeActions.getNoticeDB());
    }
  }, []);

  if (is_token) {
    return (
      <Container>
        <Title is_token justifySB>
          마이페이지
        </Title>

        {ios ? null : (
          <>
            <AlarmBanner
              _onClick={() => history.push(`/mypage/notification/${userIdx}`)}
            ></AlarmBanner>
            <Space></Space>
          </>
        )}

        <List icon={notice} _onClick={() => history.push("/mypage/notice")}>
          공지사항
        </List>
        <List icon={mixList} _onClick={() => history.push("/myPage/mixList")}>
          나의 믹스
        </List>
      </Container>
    );
  }
  return (
    <Container>
      <Title>마이페이지</Title>
      <List _onClick={() => history.push("/user/login")} icon={user}>
        로그인 하기
      </List>
      <List icon={notice} _onClick={() => history.push("/mypage/notice")}>
        공지사항
      </List>
    </Container>
  );
};

// --- styled-components ---
const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 0;
`;

const Space = styled.div`
  width: 100%;
  height: 20px;
  background-color: rgba(7, 9, 34, 0.8);
  margin-top: 10px;
`;

export default Mypage;
