import React from "react";
import Modal from "react-modal";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";

const DiaryWrite = (props) => {
  const diaryList = useSelector((state) => state.diary.diaryList); //다이어리 데이터
  console.log(diaryList);

  const [modal, setModal] = React.useState(true); // 모달창

  const diaryDayId = props.match.params.dayId; //선택된 일자
  // console.log(typeof diaryDayId);
  // console.log(diaryDayId);
  const isDay = diaryDayId ? true : false;
  let diaryData = isDay ? diaryList.find((p) => p.day === diaryDayId) : null; //다이어리 해당일자 데이터 찾기
  // console.log(isDay);
  // console.log(diaryData);
  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);
  // console.log(dayData);
  const modalOff = () => {
    setModal(false);
    history.push("/diary");
  };

  React.useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Modal
        isOpen={modal}
        ariaHideApp={false}
        onRequestClose={modalOff}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 15, 15, 0.79)",
          },
          content: {
            position: "absolute",
            top: "60px",
            left: "35%",
            width: "30%",
            height: "80%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <div>기본이미지</div>
        <div>자고 일어난 후 느낌</div>
        <div>수면시간이 충분했는지</div>
        <div>메모</div>
        <button>수정하기</button>
      </Modal>
    </React.Fragment>
  );
};

export default DiaryWrite;
