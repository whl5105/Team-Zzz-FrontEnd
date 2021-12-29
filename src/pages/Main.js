import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";

const Main = (props) => {
  const history = useHistory();
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
            history.push({ pathname: "/asmr", category: "all" });
          }}
        >
          더보기
        </Category>
        <Category
          onClick={() => {
            history.push({ pathname: "/asmr", category: "nature" });
          }}
        >
          자연
        </Category>
        <Category
          onClick={() => {
            history.push({ pathname: "/asmr", category: "place" });
          }}
        >
          공간
        </Category>
        <Category
          onClick={() => {
            history.push({ pathname: "/asmr", category: "object" });
          }}
        >
          물체
        </Category>
      </div>
      <Navigation marginTop="30%"></Navigation>
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
