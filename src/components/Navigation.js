import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import RequireLogin from "../components/RequireLogin";

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
          width: "300px",
          backgroundColor: "#dddddd",
          margin: "auto",
          marginTop: `${props.marginTop ? props.marginTop : ""}`,
          padding: "10px",
        }}
      >
        <div
          onClick={() => {
            history.push("/");
          }}
        >
          <Icon></Icon>홈
        </div>
        <div
          onClick={() => {
            history.push("/asmr");
          }}
        >
          <Icon></Icon>ASMR
        </div>
        <div onClick={diary}>
          <Icon></Icon>다이어리
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
          <Icon></Icon>마이
        </div>
      </div>
    </>
  );
};

const Icon = styled.div`
  width: 30px;
  height: 30px;
  border: 1px dotted black;
  margin: auto;
`;

export default Navigation;