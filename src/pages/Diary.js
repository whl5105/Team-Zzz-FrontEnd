import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../redux/modules/diary";
import Charater from "../elements/Charater";
import { useLocation } from "react-router-dom";
import Rectangle from "../elements/Rectangle";
import NoInfo from "../static/images/diary/NoInfo.png";
import Left from "../static/images/diary/left 화살표.svg";
import Right from "../static/images/diary/right 화살표.svg";
//-- page --
import DiaryWrite from "../components/DiaryWrite";

const Diary = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [getMoment, setMoment] = React.useState(
    location.year && location.month
      ? moment(`${location.year}-${location.month}-01`)
      : moment()
  );
  const diaryInfo = useSelector((state) => state.diary.diaryList);
  const [diaryList, setDiaryList] = React.useState(
    diaryInfo !== undefined && diaryInfo.length !== 0 ? diaryInfo : []
  );
  const [monthDay, setMonthDay] = React.useState(0);
  const arr = new Array(monthDay).fill(1); // 한꺼번에 배열 채우기
  // const sleepAvg = diaryList[diaryList.length - 1].sleepAvg;
  const sleepAvg = useSelector((state) => state.diary.sleepAvg);
  const [list, setList] = React.useState(arr);

  const scoreList = [1, 3, 5, 4, 2];
  const scoreColor = [
    "#A1A1A1",
    "#6CA8FF",
    "#90D3CC",
    "#FCD371",
    "#EE8BA7",
    "#C793DC",
  ];

  const getDiaryInfo = async (year, month) => {
    console.log(year, month);
    await dispatch(diaryActions.getDiaryDB(year, month));
  };

  React.useEffect(() => {
    const today = new Date(moment()); // 오늘 날짜
    const day = new Date(getMoment); // 사용자가 선택한 날짜

    if (diaryList.length === 0) {
      console.log("다이어리 기록이 없어요");
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
    getDiaryInfo(day.getFullYear(), day.getMonth() + 1);

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
    console.log(day.getMonth() + 1 + "월", index + "일");
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
        <Wrap>
          <Button
            left
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, "month"));
            }}
          >
            <img src={Left} alt="left"></img>
          </Button>
          <YearMonth>{getMoment.format("YYYY.MM")}</YearMonth>
          {/* YYYY는 년도 MM 은 달입니다. */}
          <Button
            right
            onClick={() => {
              setMoment(getMoment.clone().add(1, "month"));
            }}
          >
            <img src={Right} alt="right"></img>
          </Button>
        </Wrap>
        <br />
        {list.length > 0 ? (
          <div>
            <Content>
              {list.map((item, index) => {
                return (
                  <div key={index + 1 + "days"}>
                    {item.feelScore && item.sleepScore ? (
                      <>
                        <Charater
                          shape="charater"
                          size="55"
                          position="absolute"
                          feelNumber={scoreList.indexOf(item.feelScore) + 1}
                          sleepNumber={scoreList.indexOf(item.sleepScore) + 1}
                          scoreColor={
                            scoreColor[scoreList.indexOf(item.sleepScore) + 1]
                          }
                          _onClick={() => {
                            diaryDetail(index + 1);
                          }}
                          margin="5px"
                        />
                      </>
                    ) : (
                      <Charater
                        shape="charater"
                        size="55"
                        position="absolute"
                        feelNumber={0}
                        sleepNumber={0}
                        sleepColor={scoreColor[0]}
                        _onClick={() => {
                          diaryDetail(index + 1);
                        }}
                        margin="5px"
                      />
                    )}
                    <div>{index + 1}</div>
                  </div>
                );
              })}
            </Content>
            <Rectangle text={sleepAvg}></Rectangle>
          </div>
        ) : (
          <Content2></Content2>
        )}
      </div>
      {/* -- 다이어리 팝업 모달 -- */}
      {modalOpen ? <DiaryWrite close={closeModal} data={modalData} /> : ""}
    </>
  );
};

const Wrap = styled.div`
  width: 335px;
  height: 52px;
  line-height: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.back};
  border-radius: 12px;
  margin : 0px auto;
  margin-top : 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg}
  line-height: ${({ theme }) => theme.lineHeight.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  display: flex;
`;

const Button = styled.div`
  width: 24px;
  height: 20px;
  margin: auto;
  margin-left: ${(props) => (props.right ? "-5px" : "")};
  margin-right: ${(props) => (props.left ? "-5px" : "")};
`;

const YearMonth = styled.span`
  width: 67px;
  height: 20px;
  margin: 17px 17px 15px 17px;
`;

const Content = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg}};
  color: ${({ theme }) => theme.colors.white};
  width: 330px;
  height: 520px;
  margin: 5px auto;
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content2 = styled.div`
  height: 620px;
  margin-top: 13px;
  background-image: url(${NoInfo});
  background-repeat: no-repeat;
`;

export default Diary;
