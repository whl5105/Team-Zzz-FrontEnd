import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../redux/modules/diary";

// --- components ---
import Spinner from "../components/Spinner";
import DiaryWrite from "../components/diary/DiaryWrite";
import DiaryDate from "../components/diary/DiaryDate";
import NoRecord from "../components/diary/NoRecord";
import DiaryRecord from "../components/diary/DiaryRecord";

const Diary = () => {
  const dispatch = useDispatch();
  const diaryList = useSelector((state) => state.diary.diaryList); // 기록 데이터
  const sleepAvg = useSelector((state) => state.diary.sleepAvg); // 평균 데이터
  const [getMoment, setMoment] = React.useState(moment()); // 오늘 날짜
  const [monthDay, setMonthDay] = React.useState(0); // 이번달의 일 수
  const arr = new Array(monthDay).fill(1); // 한꺼번에 배열 채우기
  const [list, setList] = React.useState(arr);
  const day = new Date(getMoment); // 사용자가 선택한 날짜
  const scoreList = [1, 3, 5, 4, 2];
  const scoreColor = [
    "#A1A1A1",
    "#6CA8FF",
    "#90D3CC",
    "#FCD371",
    "#EE8BA7",
    "#C793DC",
  ];
  const nextMonth =
    moment().format("YYYYMM") <
    `${day.getFullYear()}${
      day.getMonth() + 1 < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1
    }`;

  // 저번달, 이번달, 다음달 조절하는 부분
  React.useEffect(() => {
    // "저번달, 이번달, 다음달 조절하는 부분"

    // DB에서 데이터 가져오기
    dispatch(diaryActions.getDiaryDB(day.getFullYear(), day.getMonth() + 1));

    const today = new Date(moment()); // 오늘 날짜

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
      const days = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate(); // 사용한 선택한 날짜의 일수
      setMonthDay(days);
    } else {
      // 이번년도
      if (day.getMonth() + 1 > today.getMonth() + 1) {
        // 다음달
        setMonthDay(0);
      } else {
        const days = new Date(
          day.getFullYear(),
          day.getMonth() + 1,
          0
        ).getDate(); // 사용한 선택한 날짜의 일수
        setMonthDay(days);
      }
    }
  }, [getMoment]);

  // 해당 월의 일자에 맞춰 배열 생성 해주는 부분
  React.useEffect(() => {
    arr.forEach((arrItem, arrIndex) => {
      diaryList.forEach((diaryItem, diaryIndex) => {
        if (arrIndex + 1 === parseInt(diaryList[diaryIndex].day)) {
          arr[arrIndex] = diaryList[diaryIndex];
        }
      });
    });

    setList(arr);
  }, [diaryList]);

  //-- 다이어리 팝업 모달 --
  const [modalOpen, setModalOpen] = React.useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const [modalData, setModalData] = React.useState();

  //다이어리 일자 선택
  const diaryDetail = (index) => {
    setModalOpen(true);
    const day = new Date(getMoment);
    const data = {
      year: day.getFullYear(),
      month: day.getMonth() + 1,
      day: index,
    };
    setModalData(data);
  };

  return (
    <>
      <div>
        {list.length === 0 && !nextMonth ? (
          <Spinner height="100vh"></Spinner>
        ) : (
          <>
            <DiaryDate
              setMoment={setMoment}
              getMoment={getMoment}
              nextMonth={nextMonth}
              sleepAvg={sleepAvg}
            ></DiaryDate>
            <br></br>
            {nextMonth ? (
              <NoRecord></NoRecord>
            ) : (
              <DiaryRecord
                list={list}
                scoreList={scoreList}
                scoreColor={scoreColor}
                diaryDetail={diaryDetail}
              ></DiaryRecord>
            )}
          </>
        )}
      </div>
      {/* -- 다이어리 팝업 모달 -- */}
      {modalOpen ? <DiaryWrite close={closeModal} data={modalData} /> : ""}
    </>
  );
};

export default Diary;
