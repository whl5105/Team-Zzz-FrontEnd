import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as noticeActions } from "../redux/modules/notice";

// --- images ---
import user from "../static/images/mypage/user_white.svg";
import notice from "../static/images/mypage/notes_white.svg";
import mixList from "../static/images/mypage/mixList_W.svg";

// --- components ---
import Title from "../components/Title";
import List from "../components/mypage/List";
import AlarmBanner from "../components/mypage/AlarmBanner";

const Mypage = (props) => {
  const Mobile = () => {
    return (ios = /iPhone|iPad/i.test(navigator.userAgent)), setIos(ios);
  };

  const dispatch = useDispatch();
  const userIdx = localStorage.getItem("userIdx");
  const token = localStorage.getItem("token");
  const [is_token, setLogin] = React.useState(token);
  let [ios, setIos] = React.useState(false);
  console.log(ios);
  React.useEffect(() => {
    setLogin(token);
    dispatch(noticeActions.getNoticeDB());
    Mobile();
  }, []);

  if (is_token) {
    return (
      <React.Fragment>
        <Container>
          <Title is_token justifySB>
            마이페이지
          </Title>
          {ios ? null : (
            <>
              <AlarmBanner
                _onClick={() => history.push(`/mypageNotice/${userIdx}`)}
              ></AlarmBanner>
              <div
                style={{
                  width: "100%",
                  height: "20px",
                  backgroundColor: "rgba(7,9,34,0.8)",
                  marginTop: "10px",
                }}
              ></div>
            </>
          )}

          <List icon={notice} _onClick={() => history.push("/notice")}>
            공지사항
          </List>
          <List icon={mixList} _onClick={() => history.push("/myPage/mixList")}>
            나의 믹스
          </List>
        </Container>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Container>
        <Title>마이페이지</Title>
        <List _onClick={() => history.push("/login")} icon={user}>
          로그인 하기
        </List>
        <List icon={notice} _onClick={() => history.push("/notice")}>
          공지사항
        </List>
      </Container>
    </React.Fragment>
  );
};

// --- styled-components ---
const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 0;
`;

export default Mypage;
