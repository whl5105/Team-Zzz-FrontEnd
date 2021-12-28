import React from "react";
import moment from "moment";

import { history } from "../redux/configureStore";


const Diary = () => {
  const [getMoment, setMoment] = React.useState(moment());
  const [monthDay, setMonthDay] = React.useState(0);
  const month = getMoment; // month === moment();
  const arr = new Array(monthDay).fill(""); // 한꺼번에 배열 채우기

  React.useEffect(() => {
    const today = new Date(moment()); // 오늘 날짜
    const day = new Date(month); // 사용자가 선택한 날짜

    if (
      today.getFullYear() + today.getMonth() ===
      day.getFullYear() + day.getMonth()
    ) {
      // 오늘
      const days = new Date(today).getDate();
      setMonthDay(days);
    } else if (today.getFullYear() < day.getFullYear()) {
      // 다음년도
      setMonthDay(0);
    } else if (today.getFullYear() > day.getFullYear()) {
      // 전년도
      const days = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate(); // 사용한 선택한 날짜의 일수
      setMonthDay(days);
    } else {
      // 이번년도
      if (day.getMonth > today.getMonth()) {
        // 다음달
        setMonthDay(0);
      } else {
        // 저번달
        const days = new Date(
          day.getFullYear(),
          day.getMonth() + 1,
          0
        ).getDate(); // 사용한 선택한 날짜의 일수
        setMonthDay(days);
      }
    }
  }, [month]);

  const diaryDetail = (index) => {
    const day = new Date(month);
    console.log(day.getMonth() + 1 + "월", index + "일");
  };

  return (
    <>
      <div style={{ marginTop: "5%" }}>
        <div>
          <button
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, "month"));
            }}
          >
            이전달
          </button>
          &nbsp;
          <span>{month.format("YYYY 년 MM 월")}</span>
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
        <p>{monthDay}</p>
        <div
          style={{
            backgroundColor: "gray",
            width: "30%",
            height: "70vh",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
          }}
        >
          {arr.map((item, index) => {
            return (
              <div style={{ height: "90px" }}>
                <div
                  key={index + 1 + "days"}
                  style={{
                    backgroundColor: "pink",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                    margin: "12px",
                  }}
                  onClick={() => {
                    diaryDetail(index + 1);
                  }}
                ></div>
                <div>{index + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => {
          history.push(`/diaryWrite/4`);
        }}
      >
        다이어리 생성,수정
      </button>

    </>
  );
};

export default Diary;
