import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCreators as asmrActions } from "../redux/modules/asmr";
import { history } from "../redux/configureStore";

// -- components --
import Spinner from "../components/Spinner";

// -- images --
import All from "../static/images/asmr/background/전체.svg";
import Nature from "../static/images/asmr/background/네이쳐.svg";
import Place from "../static/images/asmr/background/플레이스.svg";
import Object from "../static/images/asmr/background/오브젝트.svg";

export const deleteSong = (url) => {
  const deleteItem = document.getElementById(url);
  deleteItem.style.backgroundColor = "#3A3E74";
};

const Asmr = (props) => {
  const location = useLocation();
  const [song1, setSong1] = React.useState(new Audio());
  const [song2, setSong2] = React.useState(new Audio());
  const [song3, setSong3] = React.useState(new Audio());
  const [song4, setSong4] = React.useState(new Audio());
  const [song1Icon, setSong1Icon] = React.useState();
  const [song2Icon, setSong2Icon] = React.useState();
  const [song3Icon, setSong3Icon] = React.useState();
  const [song4Icon, setSong4Icon] = React.useState();
  const [song1Title, setSong1Title] = React.useState();
  const [song2Title, setSong2Title] = React.useState();
  const [song3Title, setSong3Title] = React.useState();
  const [song4Title, setSong4Title] = React.useState();
  const [getCategory, setCategory] = React.useState(
    location.category ? location.category : "전체"
  );
  const [imageUrl, setImageUrl] = React.useState(All);
  const [sound, setSound] = React.useState([]);
  const asmrInfo = useSelector((state) => state.asmr.asmrList);
  const [play, setPlay] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (getCategory === "전체") {
      setImageUrl(All);
    } else if (getCategory === "네이쳐") {
      setImageUrl(Nature);
    } else if (getCategory === "플레이스") {
      setImageUrl(Place);
    } else if (getCategory === "오브젝트") {
      setImageUrl(Object);
    }
  }, [getCategory]);

  React.useEffect(() => {
    // 1) 카테고리별 활성화 유무
    const arr = ["전체", "네이쳐", "플레이스", "오브젝트"];

    // 2) 음원 데이터 유무
    if (!asmrInfo || asmrInfo.length === 0) {
      // 음원 데이터가 없을 때
      dispatch(asmrActions.getAsmrDB());
    } else {
      // 음원 데이터가 있을 때
      arr.forEach((arrItem) => {
        if (arrItem !== getCategory) {
          // 비활성화
          document.getElementById(arrItem).style.backgroundColor = "#272a52";
        }
        document.getElementById(getCategory).style.backgroundColor = "#FBC037"; // 활성화

        // 3) 음원을 출력하기 전에 카테고리에 맞게 필터링
        if (getCategory === "전체") {
          setSound(asmrInfo);
        } else if (getCategory === "네이쳐") {
          const nature = asmrInfo.filter((item) => {
            if (item.categoryName === "자연") {
              return item;
            }
          });
          setSound(nature);
        } else if (getCategory === "플레이스") {
          const place = asmrInfo.filter((item) => {
            if (item.categoryName === "공간") {
              return item;
            }
          });
          setSound(place);
        } else if (getCategory === "오브젝트") {
          const object = asmrInfo.filter((item) => {
            if (item.categoryName === "물체") {
              return item;
            }
          });
          setSound(object);
        }

        // 4) 카테고리가 바뀌면 활성화된 음원 초기화
        setPlay([]);

        // 5) 카테고리가 바뀌면 play 중이던 음원 싹다 중지
        song1.pause();
        song2.pause();
        song3.pause();
        song4.pause();
        setSong1(new Audio());
        setSong2(new Audio());
        setSong3(new Audio());
        setSong4(new Audio());
      });
    }
  }, [getCategory, asmrInfo]);

  // 카테고리 변경 시 모든 음원 비활성화
  React.useEffect(() => {
    sound.forEach((item) => {
      const style = document.getElementById(item.asmrUrl);
      style.style.backgroundColor = "#3a3e74";
    });
  }, [sound]);

  React.useEffect(() => {
    let selectItem;
    let setTime1;
    let setTime2;
    let setTime3;
    let setTime4;
    let arr = [];

    if (history.state1) {
      setTime1 = setTimeout(
        () => (
          (selectItem = document.getElementById(history.state1)),
          (selectItem.style.backgroundColor = "#FBC037"),
          setSong1(history.audio1),
          (arr = [...arr, history.audio1.src]),
          setPlay(arr),
          setSong1Icon(history.icon1),
          setSong1Title(history.title1)
        ),
        500
      );
    }
    if (history.state2) {
      setTime2 = setTimeout(
        () => (
          (selectItem = document.getElementById(history.state2)),
          (selectItem.style.backgroundColor = "#FBC037"),
          setSong2(history.audio2),
          (arr = [...arr, history.audio2.src]),
          setPlay(arr),
          console.log(arr),
          setSong2Icon(history.icon2),
          setSong2Title(history.title2)
        ),
        500
      );
    }
    if (history.state3) {
      setTime3 = setTimeout(
        () => (
          (selectItem = document.getElementById(history.state3)),
          (selectItem.style.backgroundColor = "#FBC037"),
          setSong3(history.audio3),
          (arr = [...arr, history.audio3.src]),
          setPlay(arr),
          setSong3Icon(history.icon3),
          setSong3Title(history.title3)
        ),
        500
      );
    }
    if (history.state4) {
      setTime4 = setTimeout(
        () => (
          (selectItem = document.getElementById(history.state4)),
          (selectItem.style.backgroundColor = "#FBC037"),
          setSong4(history.audio4),
          (arr = [...arr, history.audio4.src]),
          setPlay(arr),
          setSong4Icon(history.icon4),
          setSong4Title(history.title4)
        ),
        500
      );
    }

    return () => {
      clearTimeout(setTime1);
      clearTimeout(setTime2);
      clearTimeout(setTime3);
      clearTimeout(setTime4);
    };
  }, []);

  const select = (asmrUrl, iconUrl, title) => {
    if (play.includes(asmrUrl)) {
      // 비활성화
      let arr = [...play];
      arr = arr.filter((item) => {
        if (asmrUrl !== item) {
          return item;
        }
      });
      setPlay(arr);
      history.setPlaybar(arr) // 버튼 비활성화시 플레이어바 arr 도 바뀌게 해줌 
      // 비활성화 시 음원도 해당 음원 재생 정지
      if (song1.src.indexOf(asmrUrl) !== -1) {
        song1.pause();
        setSong1(new Audio());
        setSong1Icon(null);
        setSong1Title(null);
        history.state1 = "";
        history.audio1 = "";
        history.title1 = "";
        history.icon1 = "";
      } else if (song2.src.indexOf(asmrUrl) !== -1) {
        song2.pause();
        setSong2(new Audio());
        setSong2Icon(null);
        setSong2Title(null);
        history.state2 = "";
        history.audio2 = "";
        history.title2 = "";
        history.icon2 = "";
      } else if (song3.src.indexOf(asmrUrl) !== -1) {
        song3.pause();
        setSong3(new Audio());
        setSong3Icon(null);
        setSong3Title(null);
        history.state3 = "";
        history.audio3 = "";
        history.title3 = "";
        history.icon3 = "";
      } else if (song4.src.indexOf(asmrUrl) !== -1) {
        song4.pause();
        setSong4(new Audio());
        setSong4Icon(null);
        setSong4Title(null);
        history.state4 = "";
        history.audio4 = "";
        history.title4 = "";
        history.icon4 = "";
      }

      // 선택한 음원 비활성화 style
      const deleteItem = document.getElementById(asmrUrl);
      deleteItem.style.backgroundColor = "#3A3E74";
    } else {
      // 활성화
      if (play.length > 3) {
        window.alert("음원은 최대 4개까지만 담으실 수 있습니다.");
      } else {
        const arr = [...play, asmrUrl];
        setPlay(arr);
       
        history.setPlay=setPlay;
        history.setPlaybar(arr) // 플레이어바 활성화 비활성화를 위한 array를 담는다.

        // 음원 선택 시 활성화 되면서 음원 재생
        if (!song1.src) {
          setSong1Icon(iconUrl);
          setSong1Title(title);
          song1.src = asmrUrl;
          song1.volume = 0.1;
          song1.loop = true;
          song1.play();
          history.state1 = asmrUrl;
          history.audio1 = song1;
          history.icon1 = iconUrl;
          history.title1 = title;
          history.setSong1= setSong1;
        } else if (!song2.src) {
          setSong2Icon(iconUrl);
          setSong2Title(title);
          song2.src = asmrUrl;
          song2.volume = 0.1;
          song2.loop = true;
          song2.play();
          history.state2 = asmrUrl;
          history.audio2 = song2;
          history.icon2 = iconUrl;
          history.title2 = title;
          history.setSong2= setSong2;
        } else if (!song3.src) {
          setSong3Icon(iconUrl);
          setSong3Title(title);
          song3.src = asmrUrl;
          song3.volume = 0.1;
          song3.loop = true;
          song3.play();
          history.state3 = asmrUrl;
          history.audio3 = song3;
          history.icon3 = iconUrl;
          history.title3 = title;
          history.setSong3= setSong3
        } else if (!song4.src) {
          setSong4Icon(iconUrl);
          setSong4Title(title);
          song4.src = asmrUrl;
          song4.volume = 0.1;
          song4.loop = true;
          song4.play();
          history.state4 = asmrUrl;
          history.audio4 = song4;
          history.icon4 = iconUrl;
          history.title4 = title;
          history.setSong4= setSong4;
        }

        // 선택한 음원 활성화 style
        const selectItem = document.getElementById(asmrUrl);
        selectItem.style.backgroundColor = "#FBC037";
      }
    }
  };

  const asmrPopUp = () => {
    history.push({
      pathname: "/asmrPop",
      setList: setPlay,
      list: play,
      play1: song1,
      play2: song2,
      play3: song3,
      play4: song4,
      setPlay1: setSong1,
      setPlay2: setSong2,
      setPlay3: setSong3,
      setPlay4: setSong4,
      play1Icon: song1Icon,
      play2Icon: song2Icon,
      play3Icon: song3Icon,
      play4Icon: song4Icon,
      title1: song1Title,
      title2: song2Title,
      title3: song3Title,
      title4: song4Title,
    });
  };

  // -- jsx --
  return (
    <Container>
      {!asmrInfo || asmrInfo.length === 0 ? (
        <Spinner height="100vh"></Spinner>
      ) : (
        <PageWrap imgUrl={imageUrl}>
          {/* 나중에 여기로 전체 크기 핸드폰 사이즈로 바꿔야함 */}
          <CategorySelect>
            <Category
              id="전체"
              onClick={() => {
                setCategory("전체");
              }}
            >
              전체
            </Category>
            <Category
              id="네이쳐"
              onClick={() => {
                setCategory("네이쳐");
              }}
            >
              네이쳐
            </Category>
            <Category
              id="플레이스"
              onClick={() => {
                setCategory("플레이스");
              }}
            >
              플레이스
            </Category>
            <Category
              id="오브젝트"
              onClick={() => {
                setCategory("오브젝트");
              }}
            >
              오브젝트
            </Category>
          </CategorySelect>
          <SoundSelect>
            {sound.map((item) => {
              return (
                <Sound
                  id={item.asmrUrl}
                  key={item.asmrUrl}
                  onClick={() => {
                    select(item.asmrUrl, item.iconUrl, item.title);
                  }}
                >
                  <Icon src={item.iconUrl} alt=""></Icon>
                  <Text>{item.title}</Text>
                </Sound>
              );
            })}
          </SoundSelect>
          <Button
            margin={getCategory !== "전체" ? "235px" : "20px"}
            onClick={asmrPopUp}
          >
            소리 조절 하기
          </Button>
        </PageWrap>
      )}
    </Container>
  );
};

// --- styled-components ---
const Container = styled.div``;

const PageWrap = styled.div`
  width: 100%;
  height: 812px;
  background-color: ${({ theme }) => theme.colors.bg};
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px ${({ theme }) => theme.paddings.xxxxl} 0;
  box-sizing: border-box;
`;

const CategorySelect = styled.div`
  width: 100%;
  height: 7%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.back};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  cursor: pointer;
`;

const Category = styled.div`
  width: 100%;
  height: 36px;
  border-radius: 8px;
  line-height: 36px;
  background-color: ${({ theme }) => theme.colors.back};
  text-align: center;
  color: white;
  margin: auto;
  padding: 1px 3px;
  @media (max-width: 500px) {
    height: 45px;
    line-height: 45px;
  }
`;

const SoundSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  max-height: 66.5%;
  margin-top: 20px;
  padding-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 500px) {
    max-height: 75%;
  }
`;

const Sound = styled.div`
  width: 70px;
  height: 53px;
  padding-top: 17px;
  /* width: 62.7%;
  height: 61.37%; */
  padding-bottom: 5px;
  border-radius: 8px;
  background-color: #3a3e74;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  margin: auto;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

const Button = styled.button`
  width: 90%;
  height: 6.5%;
  position: absolute;
  bottom: 74px;
  /* margin: 20px; */
  margin-top: ${(props) => props.margin};
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.main_1};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

export default Asmr;
