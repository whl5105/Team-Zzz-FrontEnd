import { textAlign } from "@mui/system";
import React from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as noticeActions } from "../redux/modules/notice";
import styled from "styled-components";
import "../static/fonts/font.css";

// 아이콘 이미지 import
import userIcon from "../static/images/mypage/userIcon.svg";
import noticeIcon from "../static/images/mypage/noticeIcon.svg";
import bound from "../static/images/mypage/bound.svg";
import path from "../static/images/mypage/path.svg";
import alarmBanner from "../static/images/mypage/alarmBanner.svg";

const Mypage = (props) => {
  const dispatch = useDispatch();
  const userIdx = localStorage.getItem("userIdx");
  const userId = useSelector((state) => state.user.user.userId);
  const userNotice = useSelector((state) => state.notice);
  console.log(userNotice);
  const token = localStorage.getItem("token");
  const [is_token, setLogin] = React.useState(token);
  console.log(is_token);
  React.useEffect(() => {
    setLogin(token);
    dispatch(noticeActions.getNoticeDB());
  }, []);

  if (is_token) {
    return (
      <React.Fragment>
        <div
          style={{
            position: "relative",
          }}
        >
          <p
            style={{
              position: "absolute",
              width: "102px",
              height: "22px",
              left: "20px",
              top: "70px",
              fontSize: "22px",
              lineHeight: "100%",
              color: "white",
              margin: "0px",
            }}
          >
            마이페이지
          </p>
          <p
            style={{
              position: "absolute",
              width: "51px",
              height: "24px",
              left: "303px",
              top: "69px",
              color: "white",
              fontSize: "14px",
              lineHeight: "24px",
              letterSpacing: "-0.3px",
              cursor: "pointer",
            }}
            onClick={() => dispatch(userActions.logoutDB())} // dispatch 로 해줘야하는부분
          >
            로그아웃
          </p>

          <Banner
            categoryImage={alarmBanner}
            onClick={() => history.push(`/mypageNotice/${userIdx}`)}
          >
            <div
              style={{
                position: "absolute",
                left: "0%",
                right: "0%",
                top: "0%",
                bottom: "0%",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "8.98%",
                  right: "83.23%",
                  top: "19.59%",
                  bottom: "30.93%",

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
                  width: "100px",
                  height: "24px",

                  fontWeight: "bold",
                  fontSize: "24px",
                  lineHeight: "24px",
                  letterSpacing: "-0.3px",
                  color: "white",
                }}
              >
                {userNotice.time.sleepChk && userNotice.time.timePA} &nbsp;
                {userNotice.time.sleepChk && userNotice.time.hour}
                {userNotice.time.sleepChk && `:`}
                {userNotice.time.sleepChk && userNotice.time.min}
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
                  // margin: "0px",
                  backgroundImage: `url(${path})`,
                }}
              ></Box>
            </div>
          </Banner>

          <div
            style={{
              position: "absolute",
              width: "375px",
              height: "20px",
              left: "0px",
              top: "249px",
              backgroundColor: "rgba(7,9,34,0.8)",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "16px 0px",

              position: "absolute",
              width: "335px",
              height: "56px",
              left: "20px",
              top: "271px",
              boxSizing: "border-box",
            }}
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
                margin: "0px 6px",
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

                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-0.3px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                내 정보
              </p>
            </div>
            <div
              style={{
                // position: "absolute",
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
              flexDirection: "row",
              alignItems: "center",
              padding: "16px 0px",
              position: "absolute",
              width: "335px",
              height: "56px",
              left: "20px",
              top: "327px",
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
                margin: "0px 6px",
              }}
            >
              <Box>
                <Icon categoryImage={noticeIcon}></Icon>
              </Box>
              <p
                style={{
                  position: "static",
                  width: "271px",
                  height: "24px",
                  left: "34px",
                  top: `calc(50%-24/2)`,
                  color: "white",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-0.3px",
                  margin: "0px",
                  cursor: "pointer",
                }}
              >
                공지사항
              </p>
            </div>
            <div
              style={{
                // position: "absolute",
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
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div
        style={{
          position: "relative",
          // width: "375px",
          // height: "812px",
        }}
      >
        <p
          style={{
            position: "absolute",
            width: "102px",
            height: "22px",
            left: "20px",
            top: "70px",
            fontSize: "22px",
            lineHeight: "100%",
            color: "white",
            margin: "0px",
          }}
        >
          마이페이지
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "16px 0px",
            position: "absolute",
            width: "335px",
            height: "56px",
            left: "20px",
            top: "112px",
            margin: "0px",
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
              margin: "0px 6px",
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
              // position: "absolute",
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
            flexDirection: "row",
            alignItems: "center",
            padding: "16px 0px",
            position: "absolute",
            width: "335px",
            height: "56px",
            left: "20px",
            top: "168px",
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
              margin: "0px 6px",
            }}
          >
            <Box>
              <Icon categoryImage={noticeIcon}></Icon>
            </Box>
            <p
              style={{
                position: "static",
                width: "271px",
                height: "24px",
                left: "34px",
                top: `calc(50%-24/2)`,
                color: "white",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-0.3px",
                margin: "0px",
                cursor: "pointer",
              }}
            >
              공지사항
            </p>
          </div>
          <div
            style={{
              // position: "absolute",
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
      </div>
    </React.Fragment>
  );
};
const Box = styled.div`
  width: 24px;
  height: 24px;
  /* background-size: cover; */
  margin: 0px 10px;
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

const Banner = styled.div`
  position: absolute;
  width: 335px;
  height: 103px; // 107px 로 하면 정사이즈가 아니게된다.
  left: 20px;
  top: 112px;
  background-image: url(${(props) => props.categoryImage});
  /* margin: 0px; */
  cursor: pointer;
`;

export default Mypage;
