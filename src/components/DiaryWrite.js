import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../redux/modules/diary";

import ModalPopUp from "./ModalPopUp";
import FeelBox from "./FeelBox";
import SleepBox from "./SleepBox";
import Charater from "../elements/Charater";

const DiaryWrite = (props) => {
  const dispatch = useDispatch();

  const scoreList = [1, 3, 5, 4, 2];
  const scoreColor = [
    "#A1A1A1",
    "#6CA8FF",
    "#90D3CC",
    "#FCD371",
    "#EE8BA7",
    "#C793DC",
  ];

  const diaryList = useSelector((state) => state.diary.diaryList); //다이어리 데이터

  const diaryDayId = props.data.day; //선택된 일자
  const isDay = diaryDayId ? true : false;
  let diaryData = isDay ? diaryList.find((p) => p.day === diaryDayId) : null; //다이어리 해당일자 데이터 찾기

  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);
  const [comment, setComment] = React.useState(
    diaryData ? diaryData.comment : ""
  );
  const [edit, setEdit] = React.useState(false);

  console.log(diaryList);
  console.log(diaryDayId);
  console.log(isDay);
  console.log(diaryData);
  console.log(dayData);
  console.log(comment);

  //-- 다이어리 데이터 --
  const [state, setState] = React.useState({
    feel: 0,
    sleep: 0,
    feelScore: 0,
    sleepScore: 0,
  });

  React.useEffect(() => {
    const scoreList = [1, 3, 5, 4, 2];
    if (dayData) {
      setState({
        feel: scoreList.indexOf(dayData.feelScore) + 1,
        sleep: scoreList.indexOf(dayData.sleepScore) + 1,
        feelScore: dayData.feelScore,
        sleepScore: dayData.sleepScore,
      });
    }
  }, []);

  //--  추가 클릭 --
  const addClick = () => {
    if (feel === 0 || sleep === 0) {
      window.alert("두개 다 선택 해야합니다.");
    } else {
      const diaryListInfo = {
        day: props.data.day,
        feelScore: feelScore,
        sleepScore: sleepScore,
        comment: comment,
      };
      dispatch(
        diaryActions.addDiaryDB(
          props.data.year,
          props.data.month,
          diaryListInfo
        )
      );
    }
    props.close();
  };
  //-- 수정 클릭 --
  const editClick = () => {
    if (feel === 0 || sleep === 0) {
      window.alert("두개 다 선택 해야합니다.");
    } else {
      const diaryListInfo = {
        day: props.data.day,
        feelScore: feelScore,
        sleepScore: sleepScore,
        comment: comment,
      };
      dispatch(
        diaryActions.editDiaryDB(
          props.data.year,
          props.data.month,
          diaryListInfo
        )
      );
    }
  };
  //-- 삭제 클릭 --
  const deleteClick = () => {
    dispatch(
      diaryActions.deleteDiaryDB(props.data.year, props.data.month, diaryDayId)
    );
  };

  //-- 다이어리 코멘트 입력 --
  const inputChange = (e) => {
    setComment(e.target.value);
  };

  //-- 다이어리 선택된 아이콘 feel --
  const feelClick = (e) => {
    setState({
      ...state,
      feel: Number(e.target.dataset.value),
      feelScore: Number(e.target.name),
    });
    // setEditPreview(true);
  };
  //-- 다이어리 선택된 아이콘 sleep --
  const sleepClick = (e) => {
    console.log(typeof e.target.dataset.value);
    setState({
      ...state,
      sleep: Number(e.target.dataset.value),
      sleepScore: Number(e.target.name),
    });
    // setEditPreview(true);
  };

  const { feel, sleep, feelScore, sleepScore } = state;

  return (
    <React.Fragment>
      <ModalPopUp close={props.close}>
        {/* 다이어리 데이터가 없을 경우 - 활성 */}
        {!dayData ? (
          <div style={{ width: "200px" }}>
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
          </div>
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
                  // sleepNumber={scoreList.indexOf(sleepScore) + 1}
                  scoreColor={scoreColor[scoreList.indexOf(sleepScore) + 1]}
                />

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
                  // sleepNumber={scoreList.indexOf(sleepScore) + 1}
                  scoreColor={scoreColor[scoreList.indexOf(sleepScore) + 1]}
                />
                <FeelBox />
                <SleepBox />
                <div>{dayData.comment}</div>
                <button onClick={deleteClick}>삭제하기</button>
                <button
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  수정하기
                </button>
              </>
            )}
          </div>
        )}
      </ModalPopUp>
    </React.Fragment>
  );
};

//-- Input --
const Input = (props) => {
  const { onChange, value } = props;
  return (
    <>
      <input type="text" value={value} onChange={onChange} />
    </>
  );
};

export default DiaryWrite;
