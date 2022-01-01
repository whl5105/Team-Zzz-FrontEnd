import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../redux/modules/diary";
import { history } from "../redux/configureStore";
import Charater from "../elements/Charater";

import Navigation from "../components/Navigation";
import DiaryWrite from "../components/DiaryWrite";

const Diary = () => {
  const [getMoment, setMoment] = React.useState(moment());
  const [monthDay, setMonthDay] = React.useState(0);
  const arr = new Array(monthDay).fill(1); // 한꺼번에 배열 채우기
  const diaryList = useSelector((state) => state.diary.diaryList);
  const sleepAvg = diaryList[diaryList.length - 1].sleepAvg;
  const [list, setList] = React.useState(arr);
  const dispatch = useDispatch();

  const scoreList = ["1", "3", "5", "4", "2"];

  const getDiaryInfo = async (year, month) => {
    await dispatch(diaryActions.getDiaryDB(year, month));
  };

  React.useEffect(() => {
    const today = new Date(moment()); // 오늘 날짜
    const day = new Date(getMoment); // 사용자가 선택한 날짜

    if (!diaryList) {
      getDiaryInfo(day.getFullYear(), day.getMonth() + 1); // 해당 년, 월 데이터 불러오기
    }

    if (
      today.getFullYear() + "_" + today.getMonth() ===
      day.getFullYear() + "_" + day.getMonth()
    ) {
      // 오늘
      const days = new Date(today).getDate();
      setMonthDay(days);
    } else if (today.getFullYear() + 1 < day.getFullYear() + 1) {
      // 다음년도
      setMonthDay(0);
    } else if (today.getFullYear() + 1 > day.getFullYear() + 1) {
      // 전년도
      const days = new Date(day.getFullYear(), day.getMonth(), 0).getDate(); // 사용한 선택한 날짜의 일수
      setMonthDay(days);
    } else {
      // 이번년도
      if (day.getMonth() + 1 > today.getMonth() + 1) {
        // 다음달
        setMonthDay(0);
      } else {
        const days = new Date(day.getFullYear(), day.getMonth(), 0).getDate(); // 사용한 선택한 날짜의 일수
        setMonthDay(days);
      }
    }

    // 년, 월이 바뀔 때마다 서버에 데이터를 새로 요청한다.
    console.log("년, 월에 맞춰 api 새로 dispatch 하기")
    // getDiaryInfo(day.getFullYear(), day.getMonth() + 1);

    // index => 0, diaryList => day랑 서로 일치를 해야 함.
    // 1) 해당 월의 일수 길이만큼의 배열에 배열 연산자 forEach를 돌린다.
    // 2) 서버에서 가져온 diaryList 배열의 길이만큼 forEach를 돌린다.
    // ※ 이중 반복문을 돌리는 것과 같다.
    // 3) diaryIndex에 있는 객체 데이터를 arr의 index에 넣는다. (이때, index는 0부터 시작하기 때문에 +1을 해줘서 일(day)와 맞춘다.)
    arr.forEach((arrItem, arrIndex) => {
      diaryList.forEach((diaryItem, diaryIndex) => {
        if (arrIndex + 1 === parseInt(diaryList[diaryIndex].day)) {
          arr[arrIndex] = diaryList[diaryIndex];
        }
      });
    });

    setList(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMoment, monthDay]);

  const diaryDetail = (index) => {
    const day = new Date(getMoment);
    console.log(day.getMonth() + 1 + "월", index + "일");
    history.push({
      pathname: "/diaryWrite",
      year: String(day.getFullYear()),
      month: String(day.getMonth() + 1),
      day: String(index),
    });
  };

  return (
    <>
      <div style={{ marginTop: "3%" }}>
        <div>
          <button
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, "month"));
            }}
          >
            저번달
          </button>
          &nbsp;
          <span>{getMoment.format("YYYY 년 MM 월")}</span>
          {/* YYYY는 년도 MM 은 달입니다. */}
          &nbsp;
          <button
            onClick={() => {
              setMoment(getMoment.clone().add(1, "month"));
            }}
          >
            다음달
          </button>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "aliceblue",
            width: "300px",
            minHeight: "600px",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
          }}
        >
          {list.map((item, index) => {
            return (
              <div key={index + 1 + "days"}>
                {item.feelScore && item.sleepScore ? (
                  <>
                    <Charater
                      shape="charater"
                      size="40"
                      position="absolute"
                      feelNumber={scoreList.indexOf(item.feelScore) + 1}
                      sleepNumber={scoreList.indexOf(item.sleepScore) + 1}
                      _onClick={() => {
                        diaryDetail(index + 1);
                      }}
                      margin="10px"
                    />
                  </>
                ) : (
                  <Charater
                    shape="charater"
                    size="40"
                    position="absolute"
                    feelNumber={0}
                    sleepNumber={0}
                    _onClick={() => {
                      diaryDetail(index + 1);
                    }}
                    margin="10px"
                  />
                )}
                <div>{index + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <p>
        {sleepAvg === "user not data send"
          ? "수면 기록이 없으세요! 수면 기록을 남겨 주세요"
          : sleepAvg}
      </p>
      <br />
      {/* <Navigation></Navigation> */}
    </>
  );
};

export default Diary;
