import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../redux/modules/diary";

import Spinner from "../components/Spinner";
import DiaryWrite from "../components/diary/DiaryWrite";
import DiaryDate from "../components/diary/DiaryDate";
import NoRecord from "../components/diary/NoRecord";
import DiaryRecord from "../components/diary/DiaryRecord";

const Diary = () => {
  const dispatch = useDispatch();
  const diaryList = useSelector((state) => state.diary.diaryList);
  const sleepAvg = useSelector((state) => state.diary.sleepAvg);
  const [getMoment, setMoment] = useState(moment());
  const [monthDay, setMonthDay] = useState(0);
  const arr = new Array(monthDay).fill(1);
  const [list, setList] = useState(arr);
  const day = new Date(getMoment);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

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

  const getData = () => {
    dispatch(diaryActions.getDiaryDB(day.getFullYear(), day.getMonth() + 1));
  };

  useEffect(() => {
    getData();

    const today_date = new Date(moment());
    const todayCondition =
      today_date.getFullYear() + "_" + today_date.getMonth() ===
      day.getFullYear() + "_" + day.getMonth();
    const nextYearCondition =
      today_date.getFullYear() + 1 < day.getFullYear() + 1;
    const previousYearCondition =
      today_date.getFullYear() + 1 > day.getFullYear() + 1;
    const nextMonthCondition = day.getMonth() + 1 > today_date.getMonth() + 1;

    if (todayCondition) {
      today(today_date);
    } else if (nextYearCondition) {
      nextYearOrMonth();
    } else if (previousYearCondition) {
      previousYear();
    } else {
      if (nextMonthCondition) {
        nextYearOrMonth();
      } else {
        thisMonth();
      }
    }
  }, [getMoment]);

  const today = (today_date) => {
    const days = new Date(today_date).getDate();
    setMonthDay(days);
  };

  const nextYearOrMonth = () => {
    setMonthDay(0);
  };

  const previousYear = () => {
    const days = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate(); // 사용한 선택한 날짜의 일수
    setMonthDay(days);
  };

  const thisMonth = () => {
    const days = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate();
    setMonthDay(days);
  };

  useEffect(() => {
    arr.forEach((arrItem, arrIndex) => {
      diaryList.forEach((diaryItem, diaryIndex) => {
        if (arrIndex + 1 === parseInt(diaryList[diaryIndex].day)) {
          arr[arrIndex] = diaryList[diaryIndex];
        }
      });
    });

    setList(arr);
  }, [diaryList]);

  const closeModal = () => {
    setModalOpen(false);
  };

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
      {list.length === 0 && !nextMonth ? (
        <Spinner></Spinner>
      ) : (
        <>
          <DiaryDate
            setMoment={setMoment}
            getMoment={getMoment}
            nextMonth={nextMonth}
            sleepAvg={sleepAvg}
          />
          <br />
          {nextMonth ? (
            <NoRecord />
          ) : (
            <DiaryRecord
              list={list}
              scoreList={scoreList}
              scoreColor={scoreColor}
              diaryDetail={diaryDetail}
            />
          )}
        </>
      )}
      {modalOpen && <DiaryWrite close={closeModal} data={modalData} />}
    </>
  );
};

export default Diary;
