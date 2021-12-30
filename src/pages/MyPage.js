import { textAlign } from "@mui/system";
import React from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Mypage = (props) => {
  const dispatch = useDispatch();
  const userIdx = useSelector((state) => state.user.user.userIdx);
  console.log(userIdx)
  localStorage.setItem("token", "dklfhdlksfdlkfdlfkdl"); // middleware에서 set해야하는데 테스트를위해 token 세팅 예시
  const token = localStorage.getItem("token");
  const [is_token, setLogin] = React.useState(token);
  console.log(is_token);
  React.useEffect(() => {
    setLogin(token);
  }, []);

  if (is_token) {
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
                  left: "-14%",
                  //   transform: "translate(-0%, -50%)",
                  cursor: "pointer",
                }}
              >
                알림
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
                onClick={() => (
                  localStorage.removeItem("token"), history.push("/")
                )} // dispatch 로 해줘야하는부분
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
