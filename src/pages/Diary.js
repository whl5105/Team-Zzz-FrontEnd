import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as diaryActions } from "../redux/modules/diary";

// -- components --
import Charater from "../elements/Charater";
import Rectangle from "../elements/Rectangle";
import Spinner from "../components/Spinner";
import DiaryWrite from "../components/DiaryWrite";

// -- images --
import NoInfo from "../static/images/diary/NoInfo.png";
import Left from "../static/images/diary/left 화살표.svg";
import Right from "../static/images/diary/right 화살표.svg";

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
    console.log("저번달, 이번달, 다음달 조절하는 부분");

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
      const days = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate(); // 사용한 선택한 날짜의 일수 setMonthDay(days);
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
    console.log("해당 월의 일자에 맞춰 배열 생성 해주는 부분");

    if (!diaryList) {
      dispatch(diaryActions.getDiaryDB(day.getFullYear(), day.getMonth() + 1));
    } else {
      arr.forEach((arrItem, arrIndex) => {
        diaryList.forEach((diaryItem, diaryIndex) => {
          if (arrIndex + 1 === parseInt(diaryList[diaryIndex].day)) {
            arr[arrIndex] = diaryList[diaryIndex];
          }
        });
      });

      setList(arr);
    }
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
    console.log(day.getMonth() + 1 + "월", index + "일");
    const data = {
      year: day.getFullYear(),
      month: day.getMonth() + 1,
      day: index,
    };
    setModalData(data);
  };

  // --- jsx ---
  return (
    <Container>
      <div>
        {list.length === 0 && !nextMonth ? (
          <Spinner height="100vh"></Spinner>
        ) : (
          <>
            <WrapBox>
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
            </WrapBox>
            <br></br>
            {nextMonth ? (
              <NoRecordBox>
                <NoRecord></NoRecord>
              </NoRecordBox>
            ) : (
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
                              sleepNumber={
                                scoreList.indexOf(item.sleepScore) + 1
                              }
                              scoreColor={
                                scoreColor[
                                  scoreList.indexOf(item.sleepScore) + 1
                                ]
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
                        <Text>{index + 1}</Text>
                      </div>
                    );
                  })}
                </Content>
                {list.length > 0 && (
                  <Rectangle
                    top={list.length >= 30 ? "-80px" : "263px"}
                    text={sleepAvg}
                  ></Rectangle>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {/* -- 다이어리 팝업 모달 -- */}
      {modalOpen ? <DiaryWrite close={closeModal} data={modalData} /> : ""}
    </Container>
  );
};

// --- styled-components ---
const Container = styled.div`
  /* padding: 50px 0;
  box-sizing: border-box; */
`;
const WrapBox = styled.div`
  padding-top: 50px;
  margin: 0 20px;
  box-sizing: border-box;
`;
const Wrap = styled.div`
  width: 100%;
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
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
`;

const Content = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg}};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  min-width:335px;
  max-height: 515px;
  margin: 5px auto;
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: 0 ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

`;

const Text = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  line-height: ${({ theme }) => theme.lineHeight.small};
  vertical-align: top;
`;

const NoRecordBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;
const NoRecord = styled.div`
  position: relative;
  height: 800px;
  height: 620px;
  margin-top: 20px;

  background-image: url(${NoInfo});
  background-repeat: no-repeat;
  background-size: 100%;
  bottom: 0;
`;

export default Diary;
