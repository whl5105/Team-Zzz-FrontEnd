import React from "react";
import Modal from "react-modal";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import Charater from "../elements/Charater";

const DiaryWrite = (props) => {
  const diaryList = useSelector((state) => state.diary.diaryList); //다이어리 데이터
  // console.log(diaryList);
  const feel = React.useRef();
  console.log(feel);

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

  const handleChange = (e) => {
    console.log("ddd");
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
        {!dayData ? (
          <Charater
            shape="charater"
            size="180"
            positoin="absolute"
            feelNumber="0"
            sleepNumber="0"
          />
        ) : (
          <Charater
            shape="charater"
            size="180"
            positoin="absolute"
            feelNumber={dayData.feelScore}
            sleepNumber={dayData.sleepScore}
          />
        )}

        <div style={{ display: "felx" }}>
          <p>자고 일어난 후 느낌</p>
          <Charater
            shape="feel"
            size="40"
            feelNumber="1"
            name="2"
            _onClicke={handleChange}
            // defaultValue={dayData.day}
          />
          <Charater shape="feel" size="40" feelNumber="2" />
          <Charater shape="feel" size="40" feelNumber="3" />
          <Charater shape="feel" size="40" feelNumber="4" />
          <Charater shape="feel" size="40" feelNumber="5" />
        </div>
        <div style={{ display: "felx" }}>
          <p>수면시간이 충분했는지</p>
          <Charater shape="sleep" size="40" sleepNumber="1" />
          <Charater shape="sleep" size="40" sleepNumber="2" />
          <Charater shape="sleep" size="40" sleepNumber="3" />
          <Charater shape="sleep" size="40" sleepNumber="4" />
          <Charater shape="sleep" size="40" sleepNumber="5" />
        </div>
        <div>
          메모
          {!dayData ? (
            <input type="text" ref={feel}></input>
          ) : (
            <p>{dayData.comment}</p>
          )}
        </div>
        {!dayData ? <button>등록하기</button> : <button>수정하기</button>}
      </Modal>
    </React.Fragment>
  );
};

export default DiaryWrite;
