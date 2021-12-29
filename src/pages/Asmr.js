import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Asmr = ({ location }) => {
  const [getCategory, setCategory] = React.useState(
    location.category ? location.category : "all"
  );
  const dispatch = useDispatch();
  // const asmrInfo = useSelector((state)=>state.asmr.asmrList);
 
  React.useEffect(() => {
    console.log("컴포넌트 마운트");

    // 카테고리 값(getCategory)가 바뀌면 dispatch를 새로한다.
    // 조건문 써서 카테고리별로 분류해서 보내던 지 전체랑 다른 카테고리로 나눠서 보내면 될 듯
  }, [getCategory]);

  return (
    <>
      <p>ASMR 페이지</p>
      <div style={{ display: "flex", margin: "0px 40%" }}>
        <Category
          onClick={() => {
            setCategory("all");
          }}
        >
          전체
        </Category>
        <Category
          onClick={() => {
            setCategory("nature");
          }}
        >
          자연
        </Category>
        <Category
          onClick={() => {
            setCategory("place");
          }}
        >
          공간
        </Category>
        <Category
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
  color: white;
`;

export default Asmr;
