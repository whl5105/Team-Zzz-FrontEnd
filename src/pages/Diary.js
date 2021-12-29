import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import Charater from "../elements/Charater";

import Navigation from '../components/Navigation'

const Diary = () => {
  const [getMoment, setMoment] = React.useState(moment());
  const [monthDay, setMonthDay] = React.useState(0);
  const arr = new Array(monthDay).fill(1); // 한꺼번에 배열 채우기
  const diaryList = useSelector((state) => state.diary.diaryList);
  const sleepAvg = diaryList[diaryList.length - 1].sleepAvg;
  const [list, setList] = React.useState(arr);

  React.useEffect(() => {
    const today = new Date(moment()); // 오늘 날짜
    const day = new Date(getMoment); // 사용자가 선택한 날짜

    if (
      today.getFullYear() + "_" + today.getMonth() ===
      day.getFullYear() + "_" + day.getMonth()
    ) {
      // 오늘
      const days = new Date(today).getDate();
      setMonthDay(days);
    } else if (today.getFullYear() < day.getFullYear()) {
      // 다음년도
      setMonthDay(0);
    } else if (today.getFullYear() > day.getFullYear()) {
      // 전년도
      const days = new Date(day.getFullYear(), day.getMonth(), 0).getDate(); // 사용한 선택한 날짜의 일수
      setMonthDay(days);
    } else {
      // 이번년도
      if (day.getMonth > today.getMonth()) {
        // 다음달
        setMonthDay(0);
      } else {
        // 저번달
        const days = new Date(day.getFullYear(), day.getMonth(), 0).getDate(); // 사용한 선택한 날짜의 일수
        setMonthDay(days);
      }
    }

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
  }, [getMoment, monthDay]);

  const diaryDetail = (index) => {
    const day = new Date(getMoment);
    console.log(day.getMonth() + 1 + "월", index + "일");
    history.push(`/diaryWrite/${index}`);
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
        <div
          style={{
            backgroundColor: "aliceblue",
            width: "300px",
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
                  <Charater
                    shape="charater"
                    size="40"
                    position="absolute"
                    feelNumber={item.feelScore}
                    sleepNumber={item.sleepScore}
                    _onClick={() => {
                      diaryDetail(index + 1);
                    }}
                    margin="10px"
                  />
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

      <p>저번주보다 {sleepAvg}% 더 잘 주무셨어요!</p>

      <Navigation></Navigation>
    </>
  );
};

export default Diary;
