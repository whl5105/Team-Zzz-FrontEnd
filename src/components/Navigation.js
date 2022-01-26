import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";
import RequireLogin from "../components/RequireLogin";

import { ReactComponent as Main } from "../static/images/icons/navigation/home.svg";
import { ReactComponent as Asmr } from "../static/images/icons/navigation/asmr.svg";
import { ReactComponent as Diary } from "../static/images/icons/navigation/diary.svg";
import { ReactComponent as MyPage } from "../static/images/icons/navigation/myPage.svg";

const Navigation = withRouter((props) => {
  const pathName = props.location.pathname;
  const history = useHistory();
  const [diaryModal, setDiaryModal] = useState(false);
  const [select, setSelect] = useState(
    pathName.split("/")[1] === "" ? "main" : pathName.split("/")[1]
  );

  const diary = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setDiaryModal(true);
    } else {
      history.push("/diary");
    }
  };

  const closeModal = () => {
    setDiaryModal(false);
  };

  const loginModal = () => {
    setDiaryModal(false);
    history.push("/user/login");
  };

  useEffect(() => {
    if (pathName === "/optimalSleepTime" || pathName === "/") {
      setSelect("main");
    } else if (pathName === "/myPage/mixList") {
      setSelect("mypage");
    } else if (pathName === "/asmr/asmrVolumeControl") {
      setSelect("asmr");
    } else {
      setSelect(pathName.split("/")[1]);
    }
  }, [pathName]);

  return (
    <div>
      <Gnb>
        <Box
          select={select !== "main" && "null"}
          onClick={() => {
            history.push("/");
          }}
        >
          <Main
            fill={select === "main" ? "#FBC037" : "#ffffff"}
            width={24}
            height={24}
          />
          <P>홈</P>
        </Box>

        <Box
          select={select !== "asmr" && "null"}
          onClick={() => {
            history.push({ pathname: "/asmr" });
          }}
        >
          <Asmr
            fill={select === "asmr" ? "#FBC037" : "#ffffff"}
            width={24}
            height={24}
          />
          <P>ASMR</P>
        </Box>

        <Box select={select !== "diary" && "null"} onClick={diary}>
          <Diary
            fill={select === "diary" ? "#FBC037" : "#ffffff"}
            width={24}
            height={24}
          />
          <P>다이어리</P>
        </Box>

        <Box
          select={select !== "mypage" && "null"}
          onClick={() => {
            history.push("/mypage");
          }}
        >
          <MyPage
            fill={select === "mypage" ? "#FBC037" : "#ffffff"}
            width={24}
            height={24}
          />
          <P>마이</P>
        </Box>
      </Gnb>
      {diaryModal && <RequireLogin close={closeModal} move={loginModal} />}
    </div>
  );
});

const Gnb = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 8px 24px 6px 24px;
  text-align: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white};

  ::before {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #2a2245;
  }
`;

const Box = styled.div`
  width: 75px;
  color: ${(props) => (props.select !== "null" ? "#FBC037" : "#ffffff")};
  
  & > Div:nth-child(1) {
    color: ${(props) => (props.select !== "null" ? "#FBC037" : "#ffffff")};
  }

  cursor: pointer;
  display: flex;
  flex-direction: column;

  & svg {
    margin: 0 auto;
  }
`;

const P = styled.p`
  width: 75px;
  height: 18px;
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  line-height: ${({ theme }) => theme.lineHeight.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
`;

export default Navigation;
