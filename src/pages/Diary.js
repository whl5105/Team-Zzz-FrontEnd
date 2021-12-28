import React from "react";
import { history } from "../redux/configureStore";

const Diary = () => {
  return (
    <>
      <p>다이어리 페이지</p>
      
      <button
        onClick={() => {
          history.push(`/diaryWrite/4`);
        }}
      >
        다이어리 생성,수정
      </button>
    </>
  );
};

export default Diary;
