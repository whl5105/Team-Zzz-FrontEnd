import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Navigation = (props) => {
  const history = useHistory();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "20%",
          backgroundColor: "#dddddd",
          margin: "auto",
          marginTop: `${props.marginTop ? props.marginTop : ""}`,
          padding: "20px",
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
        <div
          onClick={() => {
            history.push("/diary");
          }}
        >
          <Icon></Icon>다이어리
        </div>
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
