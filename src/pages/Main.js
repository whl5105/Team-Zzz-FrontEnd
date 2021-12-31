import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";

const Main = (props) => {
  const history = useHistory();
  React.useEffect(() => {
    const noticeSet = localStorage.getItem("noticeSet");

    if (!noticeSet) {
      history.push("/pushNotication");
    } else {
      console.log("알림 설정 했어요");
    }
  }, []);
  return (
    <div>
      <div>main page</div>
      <div
        style={{
          width: "250px",
          margin: "auto",
          flexWrap: "wrap",
          display: "flex",
        }}
      >
        <Category
          onClick={() => {
            history.push({ pathname: "/asmr", category: "전체" });
          }}
        >
          더보기
        </Category>
        <Category
          onClick={() => {
            history.push({ pathname: "/asmr", category: "자연" });
          }}
        >
          자연
        </Category>
        <Category
          onClick={() => {
            history.push({ pathname: "/asmr", category: "공간" });
          }}
        >
          공간
        </Category>
        <Category
          onClick={() => {
            history.push({ pathname: "/asmr", category: "물체" });
          }}
        >
          물체
        </Category>
      </div>
      <Navigation marginTop="20%"></Navigation>
    </div>
  );
};

const Category = styled.div`
  width: 100px;
  height: 100px;
  line-height: 100px;
  background-color: gray;
  margin: 15px auto;
`;

export default Main;
