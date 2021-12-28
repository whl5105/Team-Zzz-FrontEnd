import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import sleep1 from '../images/character/sleep1.png'

const Diary = () => {
  const [getMoment, setMoment] = React.useState(moment());
  const [monthDay, setMonthDay] = React.useState(0);
  const arr = new Array(monthDay).fill(1); // 한꺼번에 배열 채우기
  const diaryList = useSelector((state) => state.diary.diaryList);
  const [test, setTest] = React.useState(arr);

  React.useEffect(() => {
    const today = new Date(moment()); // 오늘 날짜
    const day = new Date(getMoment); // 사용자가 선택한 날짜

    if (
      today.getFullYear() + (today.getMonth() + 1) ===
      day.getFullYear() + (day.getMonth() + 1)
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
      if (day.getMonth + 1 > today.getMonth() + 1) {
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

    setTest(arr);
  }, [getMoment, monthDay]);

  const diaryDetail = (index) => {
    const day = new Date(getMoment);
    console.log(day.getMonth() + 1 + "월", index + "일");
  };

  return (
    <>
      <div>
        <div>
          <button
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, "month"));
            }}
          >
            이전달
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
        <p>{monthDay}</p>
        <div
          style={{
            backgroundColor: "gray",
            width: "50%",
            height: "80vh",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
          }}
        >
          {test.map((item, index) => {
            return (
              <div key={index + 1 + "days"}>
                <div
                  style={{
                    // eslint-disable-next-line no-template-curly-in-string
                    backgroundImage: `url(${sleep1})`,
                    width: "70px",
                    margin: "12px",
                  }}
                  onClick={() => {
                    diaryDetail(index + 1);
                  }}
                >
                  {item.feelScore ? (
                    <div style={{ height: "80px" }}>
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <img
                        src={require(`../images/character/feel${item.feelScore}.png`)}
                      />
                    </div>
                  ) : (
                    <div style={{ height: "80px" }}>
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <img src={require(`../images/character/feel1.png`)} />
                    </div>
                  )}
                </div>
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
