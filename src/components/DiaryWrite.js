import React from "react";

import ModalPopUp from "./ModalPopUp";
import Charater from "../elements/Charater";

import { useSelector, useDispatch } from "react-redux";
import FeelBox from "./FeelBox";
import SleepBox from "./SleepBox";

const DiaryWrite = (props) => {
  const diaryList = useSelector((state) => state.diary.diaryList); //다이어리 데이터
  const diaryDayId = props.match.params.dayId; //선택된 일자
  const isDay = diaryDayId ? true : false;
  let diaryData = isDay ? diaryList.find((p) => p.day === diaryDayId) : null; //다이어리 해당일자 데이터 찾기
  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);

  const [edit, setEdit] = React.useState(false);
  const [editPreview, setEditPreview] = React.useState(false); // 수정 미리보기 활성, 비활성
  console.log(diaryData);
  console.log(editPreview);

  //프리뷰 데이터
  const previewList = useSelector((state) => state.diary.preview);
  console.log(previewList);
  const [preview, setPreview] = React.useState({
    previewFeel: "",
    previewSleep: "",
    previewFeelScore: "",
    previewSleepScore: "",
  });
  console.log(preview);

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

  const editClick = () => {
    if (preview.previewFeelScore === "0" || preview.previewSleepScore === "0") {
      window.alert("두개 다 선택 해야합니다.");
    } else {
      console.log(preview.previewFeelScore, preview.previewSleepScore);
    }
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
            <input type="text" />
            <button onClick={editClick}>적용하기</button>
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
                <button onClick={editClick}>등록하기</button>
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

export default DiaryWrite;
