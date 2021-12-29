import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Asmr = ({ location }) => {
  const [getCategory, setCategory] = React.useState(
    location.category ? location.category : "all"
  );
  const history = useHistory();
  const dispatch = useDispatch();
  // const asmrInfo = useSelector((state)=>state.asmr.asmrList);

  React.useEffect(() => {
    const arr = ["all", "nature", "place", "object"];

    arr.forEach((arrItem) => {
      if (arrItem !== getCategory) { // 비활성화
        document.getElementById(arrItem).style.color = "black";
      }
      document.getElementById(getCategory).style.color = "white"; // 활성화
    });

    // 카테고리 값(getCategory)가 바뀌면 dispatch를 새로한다.
    // 조건문 써서 카테고리별로 분류해서 보내던 지 전체랑 다른 카테고리로 나눠서 보내면 될 듯
  }, [getCategory]);

  return (
    <>
      <div
        onClick={() => {
          history.push("/");
        }}
      >
        ASMR 페이지
      </div>
      <div style={{ display: "flex", margin: "0px 40%" }}>
        <Category
          id="all"
          onClick={() => {
            setCategory("all");
          }}
        >
          전체
        </Category>
        <Category
          id="nature"
          onClick={() => {
            setCategory("nature");
          }}
        >
          자연
        </Category>
        <Category
          id="place"
          onClick={() => {
            setCategory("place");
          }}
        >
          공간
        </Category>
        <Category
          id="object"
          onClick={() => {
            setCategory("object");
          }}
        >
          물체
        </Category>
      </div>
      <p>{getCategory}</p>
    </>
  );
};

const Category = styled.div`
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: gray;
`;

export default Asmr;
