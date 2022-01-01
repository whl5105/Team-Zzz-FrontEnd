import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../redux/modules/diary";

import ModalPopUp from "./ModalPopUp";
import Charater from "../elements/Charater";
import FeelBox from "./FeelBox";
import SleepBox from "./SleepBox";

const DiaryWrite = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const scoreList = ["1", "3", "5", "4", "2"];

  //crud적용 후 다이어리로 넘겨줄 데이터
  const pushData = {
    pathname: "/diary",
    year: location.year,
    month: location.month,
  };

  const diaryList = useSelector((state) => state.diary.diaryList); //다이어리 데이터
  // const previewList = useSelector((state) => state.diary.preview); //프리뷰 데이터
  const diaryDayId = location.day; //선택된 일자
  const isDay = diaryDayId ? true : false;
  let diaryData = isDay ? diaryList.find((p) => p.day === diaryDayId) : null; //다이어리 해당일자 데이터 찾기
  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);
  const [comment, setComment] = React.useState(
    diaryData ? diaryData.comment : ""
  );
  const [edit, setEdit] = React.useState(false);
  const [editPreview, setEditPreview] = React.useState(false); // 수정 미리보기 활성, 비활성

  //다이어리 데이터
  const [state, setState] = React.useState({
    feel: 0,
    sleep: 0,
    feelScore: 0,
    sleepScore: 0,
  });
  console.log(state);
  const { feel, sleep, feelScore, sleepScore } = state;

  //다이어리 데이터
  React.useEffect(() => {
    const scoreList = ["1", "3", "5", "4", "2"];
    if (dayData) {
      setState({
        feel: String(scoreList.indexOf(dayData.feelScore) + 1),
        sleep: String(scoreList.indexOf(dayData.sleepScore) + 1),
        feelScore: dayData.feelScore,
        sleepScore: dayData.sleepScore,
      });
      console.log(state);
    } else {
      return;
    }
    console.log(scoreList.indexOf(dayData.feelScore) + 1);
    console.log(state);
  }, []);

  //추가 버튼 클릭
  const addClick = () => {
    if (feel === "0" || sleep === "0") {
      window.alert("두개 다 선택 해야합니다.");
    } else {
      const diaryListInfo = {
        day: location.day,
        feelScore: feelScore,
        sleepScore: sleepScore,
        comment: comment,
      };
      dispatch(
        diaryActions.addDiaryDB(
          location.year,
          location.month,
          diaryListInfo,
          pushData
        )
      );
    }
  };
  const editChange = () => {
    setEdit(!edit);
  };
  console.log(edit);
  // 수정
  const editClick = () => {
    if (feel === "0" || sleep === "0") {
      window.alert("두개 다 선택 해야합니다.");
    } else {
      const diaryListInfo = {
        day: location.day,
        feelScore: feelScore,
        sleepScore: sleepScore,
        comment: comment,
      };
      dispatch(
        diaryActions.editDiaryDB(
          location.year,
          location.month,
          diaryListInfo,
          pushData
        )
      );
    }
  };
  // 삭제
  const deleteClick = () => {
    dispatch(
      diaryActions.deleteDiaryDB(
        location.year,
        location.month,
        diaryDayId,
        pushData
      )
    );
  };

  //Comment Input
  const inputChange = (e) => {
    setComment(e.target.value);
  };

  //아이콘 클릭 1
  const feelClick = (e) => {
    setState({
      ...state,
      feel: e.target.dataset.value,
      feelScore: e.target.name,
    });
    // setEditPreview(true);
  };
  //아이콘 클릭 2
  const sleepClick = (e) => {
    setState({
      ...state,
      sleep: e.target.dataset.value,
      sleepScore: e.target.name,
    });
    // setEditPreview(true);
  };

  return (
    <React.Fragment>
      <ModalPopUp pushData={pushData}>
        {/* 다이어리 데이터가 없을 경우 - 활성 */}
        {!dayData ? (
          <>
            <Charater
              shape="charater"
              size="180"
              position="absolute"
              feelNumber={feel}
              sleepNumber={sleep}
            />
            <FeelBox edit _onClick={feelClick} previewFeel={feel} />
            <SleepBox edit _onClick={sleepClick} previewSleep={sleep} />
            <Input value={comment} onChange={inputChange} />

            <button onClick={addClick}>적용하기</button>
          </>
        ) : (
          // 다이어리 데이터가 있을경우
          <div>
            {/* 수정 중- 활성 상태*/}
            {edit ? (
              <>
                {/* // 변경 전 캐릭터 정보 */}
                <Charater
                  shape="charater"
                  size="180"
                  position="absolute"
                  feelNumber={scoreList.indexOf(feelScore) + 1}
                  sleepNumber={scoreList.indexOf(sleepScore) + 1}
                />
                {/* )} */}
                <FeelBox edit _onClick={feelClick} previewFeel={feel} />
                <SleepBox edit _onClick={sleepClick} previewSleep={sleep} />
                <Input value={comment} onChange={inputChange} />
                <button onClick={editClick}>수정완료</button>
              </>
            ) : (
              // 수정 전 - 비활성 상태
              <>
                <Charater
                  shape="charater"
                  size="180"
                  position="absolute"
                  feelNumber={scoreList.indexOf(feelScore) + 1}
                  sleepNumber={scoreList.indexOf(sleepScore) + 1}
                />
                <FeelBox />
                <SleepBox />
                <div>{dayData.comment}</div>
                <button onClick={deleteClick}>삭제하기</button>
                <button onClick={editChange}>수정하기</button>
              </>
            )}
          </div>
        )}
      </ModalPopUp>
    </React.Fragment>
  );
};

const Input = (props) => {
  const { onChange, value } = props;

  return (
    <>
      <input type="text" value={value} onChange={onChange} />
    </>
  );
};

export default DiaryWrite;
