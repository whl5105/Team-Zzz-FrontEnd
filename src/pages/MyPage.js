import React from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as noticeActions } from "../redux/modules/notice";
import styled from "styled-components";

// 아이콘 이미지 import
import userIcon from "../static/images/mypage/userIcon.svg";
import noticeIcon from "../static/images/mypage/noticeIcon.svg";
import path from "../static/images/mypage/path.svg";
import alarmBanner from "../static/images/mypage/alarmBanner.svg";

import Title from "../components/Title";
import List from "../components/mypage/List";

const Mypage = (props) => {
  const dispatch = useDispatch();
  const userIdx = localStorage.getItem("userIdx");
  const userNotice = useSelector((state) => state.notice);
  const token = localStorage.getItem("token");
  const [is_token, setLogin] = React.useState(token);
  React.useEffect(() => {
    setLogin(token);
    dispatch(noticeActions.getNoticeDB());
  }, []);

  if (is_token) {
    return (
      <React.Fragment>
        <Container>
          <Title is_token>마이페이지</Title>
          <BannerBox>
            <Banner
              categoryImage={alarmBanner}
              onClick={() => history.push(`/mypageNotice/${userIdx}`)}
            >
              <div>
                <span
                  style={{
                    position: "absolute",
                    left: "8.98%",
                    right: "83.23%",
                    top: "19.59%",
                    bottom: "30.93%",
                    width: "30px",

                    fontSize: "14px",
                    lineHeight: "24px",
                    letterSpacing: "-0.3px",
                    color: "white",
                  }}
                >
                  알림
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: "8.98%",
                    right: "77.84%",
                    top: "50.52%",
                    bottom: "0%",
                    width: "120px",
                    height: "24px",

                    fontWeight: "bold",
                    fontSize: "24px",
                    lineHeight: "24px",
                    letterSpacing: "-0.3px",
                    color: "white",
                  }}
                >
                  {userNotice.time.sleepChk === false && "알림 OFF"}
                  {userNotice.time.sleepChk
                    ? userNotice.time.timePA === "AM"
                      ? "오전"
                      : "오후"
                    : null}{" "}
                  &nbsp;
                  {userNotice.time.sleepChk ? userNotice.time.hour : null}
                  {userNotice.time.sleepChk ? `:` : null}
                  {userNotice.time.sleepChk
                    ? userNotice.time.min < 10
                      ? "0" + userNotice.time.min
                      : userNotice.time.min
                    : null}
                </span>
              </div>

              <div
                style={{
                  position: "absolute",
                  width: "24px",
                  height: "16px",
                  left: "83.88%",
                  right: "8.96%",
                  top: "52.42%",
                  bottom: "24.27%",
                }}
              >
                <Box
                  style={{
                    width: "10px",
                    height: "16px",

                    backgroundImage: `url(${path})`,
                  }}
                ></Box>
              </div>
            </Banner>
          </BannerBox>

          <div
            style={{
              width: "100%",
              height: "20px",
              backgroundColor: "rgba(7,9,34,0.8)",
              marginTop: "30px",
            }}
          ></div>

          <List
            // style={{
            //   display: "flex",
            //   flexDirection: "row",
            //   alignItems: "center",
            //   padding: "16px 20px",
            //   // position: "absolute",
            //   // width: "335px",
            //   width: "100%",
            //   height: "56px",
            //   // left: "20px",
            //   // top: "271px",
            //   boxSizing: "border-box",
            // }}
            onClick={() => history.push("/notice")}
          >
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: "0px",
                padding: "0px",
                position: "static",
                width: "305px",
                height: "24px",
                left: "0px",
                top: "16px",
                flex: "none",
                order: "0",
                flexGrow: "1",
                margin: "0px 6px",
              }}
            > */}
            <Box>
              <Icon categoryImage={noticeIcon}></Icon>
            </Box>
            공지사항
            {/* </div> */}
            {/* <div
            style={{
              width: "24px",
              height: "16px",
              left: "0px",
              top: "0px",
            }}
            >
              <Box
                style={{
                  width: "10px",
                  height: "16px",
                  margin: "0px",
                  backgroundImage: `url(${path})`,
                }}
              ></Box>
            </div> */}
          </List>
        </Container>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Container>
        <Title>마이페이지</Title>
        <div
          style={{
            display: "flex",
            padding: "16px 20px",
            boxSizing: "border-box",
          }}
          onClick={() => history.push("/login")}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              padding: "0px",

              position: "static",
              width: "305px",
              height: "24px",
              left: "0px",
              top: "16px",
              color: "white",
              flex: "none",
              order: "0",
              flexGrow: "1",
              // margin: "0px 6px",
            }}
          >
            <Box>
              <Icon categoryImage={userIcon}></Icon>
            </Box>
            <p
              style={{
                position: "static",
                width: "271px",
                height: "24px",
                left: "34px",
                top: `calc(50%-24/2)`,
                margin: "0px",
                lineHeight: "24px",
                letterSpacing: "-0.3px",
                cursor: "pointer",
              }}
            >
              로그인 하기
            </p>
          </div>
          <div
            style={{
              width: "24px",
              height: "16px",
              left: "0px",
              top: "0px",
            }}
          >
            <Box
              style={{
                width: "10px",
                height: "16px",
                margin: "0px",
                backgroundImage: `url(${path})`,
              }}
            ></Box>
          </div>
        </div>

        <div
          style={{
            display: "flex",

            padding: "16px 20px",

            boxSizing: "border-box",
          }}
          onClick={() => history.push("/notice")}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              padding: "0px",
              position: "static",
              width: "305px",
              height: "24px",
              left: "0px",
              top: "16px",
              flex: "none",
              order: "0",
              flexGrow: "1",
              // margin: "0px 6px",
            }}
          >
            <Box>
              <Icon categoryImage={noticeIcon}></Icon>
            </Box>
            <Title>공지사항</Title>
          </div>
          <div
            style={{
              width: "24px",
              height: "16px",
              left: "0px",
              top: "0px",
            }}
          >
            <Box
              style={{
                width: "10px",
                height: "16px",
                margin: "0px",
                backgroundImage: `url(${path})`,
              }}
            ></Box>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  width: 100%;
  /* background: #af2222; */
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 0;
  /* padding: 50px ${({ theme }) => theme.paddings.xxxxl}; */
`;
const Box = styled.div`
  width: 24px;
  height: 24px;
  /* background-size: cover; */
  margin-right: 10px;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  /* background-size: cover; */
  margin: 2px 0px;
  cursor: pointer;
`;
const BannerBox = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
`;

const Banner = styled.div`
  position: relative;
  /* width: 335px; */
  width: 100%;
  height: 107px;
  /* left: 20px; */
  /* top: 112px; */
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 12px;
  cursor: pointer;
`;

export default Mypage;
