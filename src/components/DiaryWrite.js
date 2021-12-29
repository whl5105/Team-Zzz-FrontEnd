import React from "react";

import ModalPopUp from "./ModalPopUp";
import Charater from "../elements/Charater";

import { useSelector, useDispatch } from "react-redux";

const DiaryWrite = (props) => {
  const diaryList = useSelector((state) => state.diary.diaryList); //다이어리 데이터
  const diaryDayId = props.match.params.dayId; //선택된 일자
  const isDay = diaryDayId ? true : false;
  let diaryData = isDay ? diaryList.find((p) => p.day === diaryDayId) : null; //다이어리 해당일자 데이터 찾기
  const [dayData, setDayData] = React.useState(diaryData ? diaryData : null);

  const [edit, setEdit] = React.useState(false); // 수정 버튼

  const arr_list = new Array(5).fill("");
  const [arr, setArr] = React.useState(arr_list);

  const [state, setState] = React.useState({
    feelScore: "0",
    sleepScore: "0",
  });
  const { feelScore, sleepScore } = state;

  //아이콘 클릭
  const iconClick = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.dataset.value,
    });
  };

  React.useEffect(() => {
    if (dayData) {
      setState({
        ...state,
        feelScore: dayData.feelScore,
        sleepScore: dayData.sleepScore,
      });
    }
  }, []);

  return (
    <React.Fragment>
      <ModalPopUp>
        {!dayData ? (
          <div>
            <Charater
              shape="charater"
              size="180"
              position="absolute"
              feelNumber={feelScore}
              sleepNumber={sleepScore}
            />
            <div>
              <p>자고 일어난 후 느낌</p>
              <div style={{ display: "flex" }}>
                {arr.map((arr, idx) => {
                  return (
                    <div key={idx}>
                      <Charater
                        shape="feel"
                        size="40"
                        feelNumber={idx + 1}
                        _onClick={iconClick}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p>수면시간이 충분했는지</p>
              <div style={{ display: "flex" }}>
                {arr.map((arr, idx) => {
                  return (
                    <div key={idx}>
                      <Charater
                        shape="sleep"
                        size="40"
                        sleepNumber={idx + 1}
                        _onClick={iconClick}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <input type="text"></input>
            <button>등록하기</button>
          </div>
        ) : (
          <div>
            <Charater
              shape="charater"
              size="180"
              position="absolute"
              feelNumber={feelScore}
              sleepNumber={sleepScore}
            />
            <div>
              <p>자고 일어난 후 느낌</p>
              {edit ? (
                <div style={{ display: "flex" }}>
                  {arr.map((arr, idx) => {
                    return (
                      <div key={idx}>
                        <Charater
                          shape="feel"
                          size="40"
                          feelNumber={idx + 1}
                          _onClick={iconClick}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  {arr.map((arr, idx) => {
                    return (
                      <div key={idx}>
                        <Charater
                          shape="charater"
                          size="40"
                          position="absolute"
                          feelNumber={idx + 1}
                          sleepNumber={0}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <p>수면시간이 충분했는지</p>
              {edit ? (
                <div style={{ display: "flex" }}>
                  {arr.map((arr, idx) => {
                    return (
                      <div key={idx}>
                        <Charater
                          shape="sleep"
                          size="40"
                          sleepNumber={idx + 1}
                          _onClick={iconClick}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  {arr.map((arr, idx) => {
                    return (
                      <div key={idx}>
                        <Charater
                          shape="sleep"
                          size="40"
                          sleepNumber={idx + 1}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <p>{dayData.comment}</p>
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              {edit ? "등록" : "수정하기"}
            </button>
          </div>
        )}
      </ModalPopUp>
    </React.Fragment>
  );
};

export default DiaryWrite;
