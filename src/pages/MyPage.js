import { textAlign } from "@mui/system";
import React from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as noticeActions } from "../redux/modules/notice";
import styled from "styled-components";
import "../static/fonts/font.css";


// 아이콘 이미지 import
import userIcon from "../static/images/mypage/userIcon.svg"
import noticeIcon from "../static/images/mypage/noticeIcon.svg"


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
          // display: "inline-block",
          position: "relative",
          width: "375px",
          height: "812px",
          // backgroundColor: "#2a2245",
          // opacity: "0.9",
          // alignContent: "center",
        }}
      >
        <p
          style={{
            position: "absolute",
            width: "102px",
            height: "22px",
            left: "20px",
            top: "70px",
            fontSize:"22px",
            lineHeight:"100%",
            color: "white",
            margin: "0px",
          }}
        >
          마이페이지
        </p>
        {/* <div style={{ position: "relative", top: "80px" }}> */}
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
            top:"112px",
            margin: "0px",
            boxSizing:"border-box",
          }}
        >
          <div
            style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"flex-start",
              padding: "0px",
              
              position : "static",
              width: "305px",
              height: "24px",
              left: "0px",
              top: "16px",
              color: "white",
              flex:"none",
              order: "0",
              flexGrow:"1",
              margin: "0px 6px",
            }}
            onClick={() => history.push("/login")}
          >
            <Box>
            <Icon 
            categoryImage={userIcon}
            
            ></Icon>
            </Box>
            <p
            style={{
              position:"static",
              width: "271px",
              height: "24px",
              left: "34px",
              top: `calc(50%-24/2)`,
              margin: "0px",
              lineHeight:"24px",
              letterSpacing:"-0.3px"
              
            }}
          >
            로그인 하기
            </p>
          </div>
        </div>

        <div style={{ 
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
          padding: "16px 0px",
          position:"absolute",
          width:"335px",
          height:"56px",
          left:"20px",
          top:"168px",
          boxSizing:"border-box", 
          }}>
            <div style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"flex-start",
              padding:"0px",
              position: "static",
              width:"305px",
              height:"24px",
              left:"0px",
              top:"16px",
              flex:"none",
              order: "0",
              flexGrow:"1",
              margin:"0px 6px",

            }}>
               <Box>
            <Icon 
            categoryImage={noticeIcon}
            
            ></Icon>
            </Box>
          <p
            style={{
              position:"static",
              width: "271px",
              height:"24px",
              left: "34px",
              top:`calc(50%-24/2)`,
              color: "white",
              fontSize:"16px",
              lineHeight:"24px",
              letterSpacing:"-0.3px",
              margin: "0px",
            }}
          >
            공지사항
          </p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </React.Fragment>
  );
};
const Box  = styled.div`
  width: 24px;
  height: 24px;
  /* background-size: cover; */
  margin: 0px 10px;
 
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  /* background-size: cover; */
  margin: 0px;
`;

export default Mypage;
