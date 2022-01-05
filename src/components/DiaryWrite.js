import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../redux/modules/diary";

import ModalPopUp from "./ModalPopUp";
import FeelBox from "./FeelBox";
import SleepBox from "./SleepBox";
import Charater from "../elements/Charater";
import Input from "../elements/Input";

import reset from "../static/images/icon/reset.svg";

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

  const newData = `${props.data.year}/${props.data.month}/${props.data.day}`;
  const diaryList = useSelector((state) => state.diary.diaryList); //다이어리 데이터
  const diaryDayId = props.data.day; //선택된 일자
  const isDay = diaryDayId ? true : false;
  let diaryData = isDay
    ? diaryList.find((data) => data.day === diaryDayId)
    : null; //다이어리 해당일자 데이터 찾기
  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);

  // 디이어리 수정
  const [edit, setEdit] = React.useState(false);

  //-- 다이어리 데이터 --
  const [data, setData] = React.useState({
    //다이어리에 데이터가 없으면 기본 0을 가짐
    comment: "",
    day: 0,
    feel: 0, //이미지 번호
    feelScore: 0,
    sleep: 0, //이미지 번호
    sleepScore: 0,
  });
  React.useEffect(() => {
    const scoreList = [1, 3, 5, 4, 2];
    if (dayData) {
      setData({
        ...dayData,
        feel: scoreList.indexOf(dayData.feelScore) + 1, //이미지 번호
        sleep: scoreList.indexOf(dayData.sleepScore) + 1, //이미지 번호
      });
    }
  }, []);

  // -- 선택된 아이콘 feel --
  const feelClick = (e) => {
    setData({
      ...data,
      feel: Number(e.target.dataset.value), //이미지 번호
      feelScore: Number(e.target.dataset.score),
    });
  };
  //-- 다이어리 선택된 아이콘 sleep --
  const sleepClick = (e) => {
    console.log(typeof e.target.dataset.value);
    setData({
      ...data,
      sleep: Number(e.target.dataset.value), //이미지 번호
      sleepScore: Number(e.target.dataset.score),
    });
  };

  //-- input 코멘트 입력 --
  const inputChange = (e) => {
    setData({
      ...data,
      comment: e.target.value,
    });
  };
  //--input 코멘트 Reset --
  const onReset = (e) => {
    setData({
      ...data,
      [e.target.name]: "",
    });
  };

  const { feel, sleep, feelScore, sleepScore } = data;
  const { close } = props;

  return (
    <ModalPopUp close={props.close}>
      <Container>
        {!dayData ? (
          <div>
            <DayCharater
              newData={newData}
              feel={feel}
              scoreColor={scoreColor[sleep]}
            ></DayCharater>
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
              <button
                onClick={() => {
                  close();
                }}
              >
                취소
              </button>
              <button>완료</button>
            </ButtonBox>
          </div>
        ) : (
          <div>
            {/* 수정중  */}
            {edit ? (
              <div>
                <DayCharater
                  newData={newData}
                  feel={feel}
                  scoreColor={scoreColor[sleep]}
                ></DayCharater>

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
                  <button
                    onClick={() => {
                      close();
                    }}
                  >
                    취소
                  </button>
                  <button>완료</button>
                </ButtonBox>
              </div>
            ) : (
              <div>
                <DayCharater
                  newData={newData}
                  feel={feel}
                  scoreColor={scoreColor[sleep]}
                ></DayCharater>

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
                  <button>기록 삭제</button>
                  <button
                    onClick={() => {
                      setEdit(!edit);
                    }}
                  >
                    수정
                  </button>
                </ButtonBox>
              </div>
            )}
          </div>
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
        feelNumber={feel} //이미지 번호
        scoreColor={scoreColor} //이미지 색상
      />
    </CharaterBox>
  );
}

const Container = styled.div`
  width: 331px;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
`;

const CharaterBox = styled.div`
  padding: ${({ theme }) => theme.margins.base};
  background: ${({ theme }) => theme.colors.gray_1};
  text-align: center;
  /* margin-top: ${({ theme }) => theme.margins.xxxxl}; */

  & p {
    padding-bottom: ${({ theme }) => theme.margins.base};
    font-family: "Roboto";
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

  & button {
    width: 141px;
    height: 48px;
    border-radius: 12px;
    border: transparent;
    background: transparent;
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: ${({ theme }) => theme.lineHeight.small};
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
  }
  & button:first-child {
    border: 1px solid ${({ theme }) => theme.colors.gray_4};
    color: ${({ theme }) => theme.colors.gray_7};
  }
  & button:last-child {
    border: 1px solid ${({ theme }) => theme.colors.main_1};
    background: ${({ theme }) => theme.colors.main_1};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default DiaryWrite;
