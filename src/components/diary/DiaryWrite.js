import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

import ModalPopUp from "../ModalPopUp";
import FeelBox from "../diary/FeelBox";
import SleepBox from "../diary/SleepBox";
import DayCharater from "../diary/DayCharater";
import { Input, Button, Charater } from "../../elements/index";

import { reset } from "../../static/images/index";

const DiaryWrite = ({ modalData, close }) => {
  const dispatch = useDispatch();

  const diaryList = useSelector((state) => state.diary.diaryList);
  const [recordDate, setRecordDate] = useState({
    Data: `${modalData.year}/${modalData.month}/${modalData.day}`,
    yearMonth: modalData.yearMonth,
    day: modalData.day,
    comment: "",
    feel: 0,
    feelScore: 0,
    sleep: 0,
    sleepScore: 0,
  });
  const { Data, yearMonth, day, comment, feel, feelScore, sleep, sleepScore } =
    recordDate;
  const isDay = recordDate ? true : false;
  let diaryData = isDay
    ? diaryList[yearMonth].find((data) => data.day === day)
    : null;
  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);
  const [edit, setEdit] = React.useState(false);

  const scoreColor = [
    "#A1A1A1",
    "#6CA8FF",
    "#90D3CC",
    "#FCD371",
    "#EE8BA7",
    "#C793DC",
  ];

  useEffect(() => {
    const scoreList = [1, 3, 5, 4, 2];
    if (dayData) {
      setRecordDate({
        ...recordDate,
        feel: scoreList.indexOf(dayData.feelScore) + 1,
        feelScore: dayData.feelScore,
        sleep: scoreList.indexOf(dayData.sleepScore) + 1,
        sleepScore: dayData.sleepScore,
        comment: dayData.comment,
      });
    }
  }, []);

  // 자고 일어난후 느낌 클릭 시
  const feelClick = (e) => {
    setRecordDate({
      ...recordDate,
      feel: Number(e.target.dataset.value),
      feelScore: Number(e.target.dataset.score),
    });
  };

  // 수면시간 클릭시 
  const sleepClick = (e) => {
    setRecordDate({
      ...recordDate,
      sleep: Number(e.target.dataset.value),
      sleepScore: Number(e.target.dataset.score),
    });
  };

  // comment 입력
  const inputChange = (e) => {
    setRecordDate({
      ...recordDate,
      comment: e.target.value,
    });
  };

  // comment 초기화
  const onReset = (e) => {
    setRecordDate({
      ...recordDate,
      [e.target.name]: "",
    });
  };

  const addClick = async () => {
    if (feel === 0 || sleep === 0) {
      window.alert("두개 다 선택 해야 합니다.");
    } else {
      const diaryListInfo = { day, feelScore, sleepScore, comment };
      await dispatch(diaryActions.addDiaryDB(yearMonth, diaryListInfo));
      close();
    }
  };

  const editClick = async () => {
    const diaryListInfo = {
      feelScore,
      sleepScore,
      comment,
      diaryIdx: dayData.diaryIdx,
    };

    await dispatch(diaryActions.editDiaryDB(yearMonth, diaryListInfo));
    close();
  };

  const deleteClick = async () => {
    await dispatch(diaryActions.deleteDiaryDB(yearMonth, dayData.diaryIdx));
    close();
  };

  return (
    <ModalPopUp close={close} height="100%">
      <Container>
        {!dayData ? (
          <>
            <DayCharater
              newData={Data}
              feel={feel}
              scoreColor={scoreColor[sleep]}
            />

            <Input
              resetInput
              placeholder="메모를 남겨보세요(최대22자)"
              name="comment"
              value={comment}
              onChange={inputChange}
              src={reset}
              alt="resetButton"
              onClick={onReset}
              height="52px"
              marginT="20px"
            />
            <ScoreGrop>
              <FeelBox edit _onClick={feelClick} previewFeel={feel} />
              <SleepBox edit _onClick={sleepClick} previewSleep={sleep} />
            </ScoreGrop>
            <ButtonBox>
              <Button
                type="boderBtn"
                _onClick={() => {
                  close();
                }}
                text="취소"
              />
              <Button _onClick={addClick} text="완료" />
            </ButtonBox>
          </>
        ) : (
          <>
            {edit ? (
              <>
                <DayCharater
                  newData={Data}
                  feel={feel}
                  scoreColor={scoreColor[sleep]}
                />
                <Input
                  resetInput
                  placeholder="메모를 남겨보세요(최대22자)"
                  name="comment"
                  value={comment}
                  onChange={inputChange}
                  src={reset}
                  alt="resetButton"
                  onClick={onReset}
                  height="52px"
                  marginT="20px"
                />
                <ScoreGrop>
                  <FeelBox edit _onClick={feelClick} previewFeel={feel} />
                  <SleepBox edit _onClick={sleepClick} previewSleep={sleep} />
                </ScoreGrop>
                <ButtonBox>
                  <Button
                    type="boderBtn"
                    _onClick={() => {
                      close();
                    }}
                    text="취소"
                  >
                    취소
                  </Button>
                  <Button text="완료" _onClick={editClick} />
                </ButtonBox>
              </>
            ) : (
              <>
                <DayCharater
                  newData={Data}
                  feel={feel}
                  scoreColor={scoreColor[sleep]}
                />

                {comment.length > 0 && (
                  <Input
                    type="text"
                    placeholder={comment}
                    height="52px"
                    disabled
                  />
                )}
                <ScoreGrop>
                  <FeelBox previewFeel={feel} />
                  <SleepBox previewSleep={sleep} />
                </ScoreGrop>
                <ButtonBox>
                  <Button
                    type="boderBtn"
                    text="기록 삭제"
                    _onClick={deleteClick}
                  ></Button>
                  <Button
                    text="수정"
                    _onClick={() => {
                      setEdit(!edit);
                    }}
                  >
                    수정
                  </Button>
                </ButtonBox>
              </>
            )}
          </>
        )}
      </Container>
    </ModalPopUp>
  );
};

const Container = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
`;

const ScoreGrop = styled.div`
  margin-top: ${({ theme }) => theme.margins.xxxxl};
`;

const ButtonBox = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.paddings.xxxxl};
  display: flex;
  justify-content: space-between;

  & Button {
    margin-right: 9px;
  }
  
  & Button:last-child {
    margin-right: 0;
  }
`;

export default DiaryWrite;
