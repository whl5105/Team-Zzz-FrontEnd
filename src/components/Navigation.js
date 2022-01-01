import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import RequireLogin from "../components/RequireLogin";

// 아이콘 이미지 import
import homeIcon from "../images/navigation/homeIcon.svg";
import asmrIcon from "../images/navigation/asmrIcon.svg";
import diaryIcon from "../images/navigation/diaryIcon.svg";
import myPageIcon from "../images/navigation/myPageIcon.svg";

const Navigation = (props) => {
  const history = useHistory();
  const [diaryModal, setDiaryModal] = React.useState(false);

  const diary = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setDiaryModal(true);
    } else {
      history.push("/diary");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "375px",
          height: "48px",
          backgroundColor: "#2A2245",
          color: "white",
          margin: "auto",
          marginTop: `${props.marginTop ? props.marginTop : ""}`,
          padding: "10px 20px",
        }}
      >
        <div
          onClick={() => {
            history.push("/");
          }}
        >
          <Icon categoryImage={homeIcon}></Icon>홈
        </div>
        <div
          onClick={() => {
            history.push("/asmr");
          }}
        >
          <Icon categoryImage={asmrIcon}></Icon>ASMR
        </div>
        <div onClick={diary}>
          <Icon categoryImage={diaryIcon}></Icon>다이어리
        </div>
        {diaryModal && (
          <RequireLogin
            modal={diaryModal}
            setDiaryModal={setDiaryModal}
          ></RequireLogin>
        )}
        <div
          onClick={() => {
            history.push("/mypage");
          }}
        >
          <Icon categoryImage={myPageIcon}></Icon>마이
        </div>
      </div>
    </>
  );
};

const Icon = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
`;

export default Navigation;
