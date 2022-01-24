import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

import ModalPopUp from "../ModalPopUp";
import FeelBox from "../diary/FeelBox";
import SleepBox from "../diary/SleepBox";
import { Input, Button, Charater } from "../../elements/index";

import { reset } from "../../static/images/index";

const DiaryWrite = (props) => {
  const dispatch = useDispatch();

  const scoreColor = [
    "#A1A1A1",
    "#6CA8FF",
    "#90D3CC",
    "#FCD371",
    "#EE8BA7",
    "#C793DC",
  ];
  //props 일자 저장
  const [recordDate, setRecordDate] = useState({
    Data: `${props.data.year}/${props.data.month}/${props.data.day}`,
    yearMonth: props.data.yearMonth,
    year: props.data.year,
    month: props.data.month,
    day: props.data.day,
  });
  const diaryList = useSelector((state) => state.diary.diaryList);
  const isDay = recordDate ? true : false;
  let diaryData = isDay
    ? diaryList[recordDate.yearMonth].diaryRecord.find(
        (data) => data.day === recordDate.day
      )
    : null;
  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);
  const [edit, setEdit] = React.useState(false);
  const [data, setData] = React.useState({
    comment: "",
    day: 0,
    feel: 0,
    feelScore: 0,
    sleep: 0,
    sleepScore: 0,
  });

  useEffect(() => {
    const scoreList = [1, 3, 5, 4, 2];
    if (dayData) {
      setData({
        ...dayData,
        feel: scoreList.indexOf(dayData.feelScore) + 1,
        sleep: scoreList.indexOf(dayData.sleepScore) + 1,
      });
    }
  }, []);

  const feelClick = (e) => {
    setData({
      ...data,
      feel: Number(e.target.dataset.value),
      feelScore: Number(e.target.dataset.score),
    });
  };

  const sleepClick = (e) => {
    setData({
      ...data,
      sleep: Number(e.target.dataset.value),
      sleepScore: Number(e.target.dataset.score),
    });
  };

  const inputChange = (e) => {
    setData({
      ...data,
      comment: e.target.value,
    });
  };

  const onReset = (e) => {
    setData({
      ...data,
      [e.target.name]: "",
    });
  };

  const { feel, sleep, feelScore, sleepScore } = data;
  const { close } = props;

  const addClick = async () => {
    if (feel === 0 || sleep === 0) {
      window.alert("두개 다 선택 해야 합니다.");
    } else {
      const diaryListInfo = {
        day: props.data.day,
        feelScore: feelScore,
        sleepScore: sleepScore,
        comment: data.comment,
      };
      await dispatch(
        diaryActions.addDiaryDB(
          props.data.year,
          props.data.month,
          diaryListInfo
        )
      );
      close();
    }
  };

  const editClick = async () => {
    const diaryListInfo = {
      feelScore: feelScore,
      sleepScore: sleepScore,
      comment: data.comment,
      diaryIdx: dayData.diaryIdx,
    };
    await dispatch(diaryActions.editDiaryDB(diaryListInfo));
    close();
  };

  const deleteClick = async () => {
    await dispatch(diaryActions.deleteDiaryDB(dayData.diaryIdx));
    close();
  };
  return (
    <ModalPopUp close={props.close} height="100%">
      <Container>
        {!dayData ? (
          <>
            <DayCharater
              newData={recordDate.Data}
              feel={feel}
              scoreColor={scoreColor[sleep]}
            />
            <Input
              resetInput
              placeholder="메모를 남겨보세요(최대22자)"
              name="comment"
              value={data.comment}
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
                  newData={recordDate.Data}
                  feel={feel}
                  scoreColor={scoreColor[sleep]}
                />
                <Input
                  resetInput
                  placeholder="메모를 남겨보세요(최대22자)"
                  name="comment"
                  value={data.comment}
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
                  newData={recordDate.Data}
                  feel={feel}
                  scoreColor={scoreColor[sleep]}
                />

                {data.comment.length > 0 && (
                  <Input
                    type="text"
                    placeholder={data.comment}
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

function DayCharater(props) {
  const { feel, scoreColor, newData } = props;
  return (
    <CharaterBox>
      <p>{newData}</p>
      <Charater
        shape="charater"
        size="85"
        feelNumber={feel}
        scoreColor={scoreColor}
      />
    </CharaterBox>
  );
}

const Container = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
`;

const CharaterBox = styled.div`
  padding: ${({ theme }) => theme.margins.base};
  background: ${({ theme }) => theme.colors.gray_1};
  text-align: center;

  & p {
    padding-bottom: ${({ theme }) => theme.margins.base};
    font-family: "Roboto", sans-serif;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: ${({ theme }) => theme.lineHeight.lg};
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
  }
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
  & Button {
    max-width: 141px;
  }
`;

export default DiaryWrite;
