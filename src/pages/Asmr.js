import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {actionCreators as asmrActions} from "../redux/modules/asmr";

const Asmr = ({ location }) => {
  const [getCategory, setCategory] = React.useState(
    location.category ? location.category : "전체"
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const asmrInfo = useSelector((state)=>state.asmr.asmrList);
  // 메인에서는 전체 서버에 요청해서 데이터를 가져온다.

  React.useEffect(() => {
    // 카테고리별 활성화 유무
    const arr = ["전체", "자연", "공간", "물체"];

    arr.forEach((arrItem) => {
      if (arrItem !== getCategory) { // 비활성화
        document.getElementById(arrItem).style.color = "black";
      }
      document.getElementById(getCategory).style.color = "white"; // 활성화
    });

    if(!asmrInfo){ // 음원  데이터가 없다면
      // dispatch()
      console.log("??")
    }

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
          id="전체"
          onClick={() => {
            setCategory("전체");
          }}
        >
          전체
        </Category>
        <Category
          id="자연"
          onClick={() => {
            setCategory("자연");
          }}
        >
          자연
        </Category>
        <Category
          id="공간"
          onClick={() => {
            setCategory("공간");
          }}
        >
          공간
        </Category>
        <Category
          id="물체"
          onClick={() => {
            setCategory("물체");
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
