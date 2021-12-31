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

  // const textInput = React.useRef();
  console.log(location.pathname);
  console.log(location.year);
  console.log(location.month);
  console.log(location.day);
  // console.log(location.day);
  const diaryList = useSelector((state) => state.diary.diaryList); //다이어리 데이터
  const diaryDayId = location.day; //선택된 일자
  const isDay = diaryDayId ? true : false;
  let diaryData = isDay
    ? diaryList.find((p) => p.day === String(diaryDayId))
    : null; //다이어리 해당일자 데이터 찾기
  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);
  const [comment, setComment] = React.useState(
    diaryData ? diaryData.comment : ""
  );
  // console.log(dayData);

  const [edit, setEdit] = React.useState(false);
  const [editPreview, setEditPreview] = React.useState(false); // 수정 미리보기 활성, 비활성

  console.log(diaryList);
  console.log(typeof diaryDayId);
  console.log(isDay);
  console.log(diaryData);
  console.log(editPreview);

  //프리뷰 데이터
  const previewList = useSelector((state) => state.diary.preview);
  // console.log(previewList);

  const [preview, setPreview] = React.useState({
    previewFeel: "",
    previewSleep: "",
    previewFeelScore: "",
    previewSleepScore: "",
  });
  // console.log(preview);

  //다이어리 데이터
  const [state, setState] = React.useState({
    feelScore: "0",
    sleepScore: "0",
  });

  const { feelScore, sleepScore } = state;
  const { previewFeel, previewSleep } = preview;

  //다이어리 데이터
  React.useEffect(() => {
    if (dayData) {
      setState({
        ...state,
        feelScore: dayData.feelScore,
        sleepScore: dayData.sleepScore,
      });
    }
  }, []);

  //프리뷰 데이터
  React.useEffect(() => {
    setPreview({
      ...preview,
      previewFeel: previewList.previewFeel,
      previewSleep: previewList.previewSleep,
      previewFeelScore: previewList.previewFeelScore,
      previewSleepScore: previewList.previewSleepScore,
    });
  }, [previewList]);

  const addClick = () => {
    if (preview.previewFeelScore === "0" || preview.previewSleepScore === "0") {
      window.alert("두개 다 선택 해야합니다.");
    } else {
      const diaryListInfo = {
        day: location.day,
        feelScore: preview.previewFeelScore,
        sleepScore: preview.previewSleepScore,
        comment: comment,
      };
      console.log(location.year, location.month, diaryListInfo);
      dispatch(
        diaryActions.addDiaryDB(location.year, location.month, diaryListInfo)
      );
    }
  };
  // const editClick = () => {
  //   if (preview.previewFeelScore === "0" || preview.previewSleepScore === "0") {
  //     window.alert("두개 다 선택 해야합니다.");
  //   } else {
  //     const diaryListInfo = {
  //       day: location.day,
  //       feelScore: preview.previewFeelScore,
  //       sleepScore: preview.previewSleepScore,
  //       comment: comment,
  //     };
  //     console.log(location.year, location.month, diaryListInfo);
  //     dispatch(
  //       diaryActions.editDiaryDB(location.year, location.month, diaryListInfo)
  //     );
  //   }
  // };
  //입력값 변경
  const inputChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <React.Fragment>
      <ModalPopUp>
        {/* 다이어리 데이터가 없을 경우 - 활성 */}
        {!dayData ? (
          <>
            <Charater
              shape="charater"
              size="180"
              position="absolute"
              feelNumber={previewFeel}
              sleepNumber={previewSleep}
            />
            <FeelBox edit />
            <SleepBox edit />
            <Input value={comment} onChange={inputChange} />

            <button onClick={addClick}>적용하기</button>
          </>
        ) : (
          // 다이어리 데이터가 있을경우
          <div>
            {/* 수정 중- 활성 상태*/}
            {edit ? (
              <>
                {/* 변경 중인 캐릭터 정보 */}
                {editPreview ? (
                  <Charater
                    shape="charater"
                    size="180"
                    position="absolute"
                    feelNumber={previewFeel}
                    sleepNumber={previewSleep}
                  />
                ) : (
                  // 변경 전 캐릭터 정보
                  <Charater
                    shape="charater"
                    size="180"
                    position="absolute"
                    feelNumber={feelScore}
                    sleepNumber={sleepScore}
                  />
                )}
                <FeelBox edit />
                <SleepBox edit />
                <Input value={comment} onChange={inputChange} />
                {/* <button onClick={editClick}>수정완료</button> */}
              </>
            ) : (
              // 수정 전 - 비활성
              <>
                <Charater
                  shape="charater"
                  size="180"
                  position="absolute"
                  feelNumber={feelScore}
                  sleepNumber={sleepScore}
                />
                <FeelBox />
                <SleepBox />
                <div>{dayData.comment}</div>

                <button>삭제하기</button>
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
const Input = (props) => {
  const { onChange, value } = props;

  return (
    <>
      <input type="text" value={value} onChange={onChange} />
    </>
  );
};

export default DiaryWrite;
