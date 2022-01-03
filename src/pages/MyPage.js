import { textAlign } from "@mui/system";
import React from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as noticeActions } from "../redux/modules/notice";

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
            display: "inline-block",
            width: "375px",
            alignContent: "center",
          }}
        >
          <div style={{ position: "relative", top: "80px" }}>
            <div
              style={{ width: "100%", height: "65px", verticalAlign: "middle" }}
            >
              <p
                style={{
                  margin: "0px",
                  position: "relative",
                  top: "50%",
                  left: "-37%",
                  transform: "translate(-0%, -50%)",
                  cursor: "pointer",
                }}
              >
                내정보
              </p>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "65px",
                background: "#C4C4C4",
                justifyContent: "space-around",
              }}
            >
              <span
                style={{
                  //   margin: "0px",
                  position: "relative",
                  top: "40%",
                  left: "-5%",
                  //   transform: "translate(-0%, -50%)",
                }}
              >
                알림
              </span>
              <span style={{ position: "relative", top: "40%", left: "0%" }}>
                {userNotice.time.sleepChk && userNotice.time.timePA}
                {userNotice.time.sleepChk && userNotice.time.hour}
                {userNotice.time.sleepChk && `:`}
                {userNotice.time.sleepChk && userNotice.time.min}
              </span>
              <span
                style={{
                  //   margin:"0px",
                  position: "relative",
                  top: "40%",
                  cursor: "pointer",
                }}
                onClick={() => history.push(`/mypageNotice/${userIdx}`)}
              >
                편집
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "65px",
                background: "#C4C4C4",
                margin: "10px 0px",
              }}
            >
              <p
                style={{
                  margin: "0px",
                  position: "relative",
                  top: "50%",
                  left: "-35%",
                  transform: "translate(-0%, -50%)",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(userActions.logoutDB())} // dispatch 로 해줘야하는부분
              >
                로그아웃
              </p>
            </div>
            <div
              style={{ width: "100%", height: "65px", background: "#C4C4C4" }}
            >
              <p
                style={{
                  margin: "0px",
                  position: "relative",
                  top: "50%",
                  left: "-35%",
                  transform: "translate(-0%, -50%)",
                  cursor: "pointer",
                }}
              >
                공지사항
              </p>
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
          display: "inline-block",
          width: "375px",
          height: "790px",
          border: "1px solid black",
          alignContent: "center",
        }}
      >
        <div style={{ position: "relative", top: "80px" }}>
          <div
            style={{ width: "100%", height: "65px", verticalAlign: "middle" }}
          >
            <p
              style={{
                margin: "0px",
                position: "relative",
                top: "50%",
                left: "-34%",
                transform: "translate(-0%, -50%)",
                cursor: "pointer",
              }}
              onClick={() => history.push("/login")}
            >
              로그인 하기
            </p>
          </div>

          <div style={{ width: "100%", height: "65px", background: "#C4C4C4" }}>
            <p
              style={{
                margin: "0px",
                position: "relative",
                top: "50%",
                left: "-35%",
                transform: "translate(-0%, -50%)",
                cursor: "pointer",
              }}
            >
              공지사항
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Mypage;
