import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCreators as asmrActions } from "../redux/modules/asmr";
import { history } from "../redux/configureStore";

// -- components --
import AsmrPopUp from "../components/AsmrPopUp";
import Spinner from "../components/Spinner";

// -- images --
import All from "../static/images/asmr/background/전체.svg";
import Nature from "../static/images/asmr/background/네이쳐.svg";
import Place from "../static/images/asmr/background/플레이스.svg";
import Object from "../static/images/asmr/background/오브젝트.svg";

export const deleteSong = (url) => {
  console.log(url);
  const deleteItem = document.getElementById(url);
  deleteItem.style.backgroundColor = "#3A3E74";
};

const Asmr = (props) => {
  const location = useLocation();
  console.log(history);
  const [song1, setSong1] = React.useState(new Audio());
  const [song2, setSong2] = React.useState(new Audio());
  const [song3, setSong3] = React.useState(new Audio());
  const [song1Icon, setSong1Icon] = React.useState();
  const [song2Icon, setSong2Icon] = React.useState();
  const [song3Icon, setSong3Icon] = React.useState();
  const [song1Title, setSong1Title] = React.useState();
  const [song2Title, setSong2Title] = React.useState();
  const [song3Title, setSong3Title] = React.useState();
  const [getCategory, setCategory] = React.useState(
    location.category ? location.category : "전체"
  );
  const [imageUrl, setImageUrl] = React.useState(All);
  const [sound, setSound] = React.useState([]);
  const asmrInfo = useSelector((state) => state.asmr.asmrList);
  const [play, setPlay] = React.useState([]);

  const dispatch = useDispatch();
  const [openModal, setOpenmodal] = React.useState(false);

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
        setSong1(new Audio());
        setSong2(new Audio());
        setSong3(new Audio());
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
    let arr = [];

    if (history.state) {
      setTime1 = setTimeout(
        () => (
          (selectItem = document.getElementById(history.state)),
          (selectItem.style.backgroundColor = "#FBC037"),
          setSong1(history.audio),
          (arr = [...arr, history.audio.src]),
          setPlay(arr),
          console.log(arr),
          setSong1Icon(history.icon),
          setSong1Title(history.title)
          // console.log(play)
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

    return () => {
      clearTimeout(setTime1);
      clearTimeout(setTime2);
      clearTimeout(setTime3);
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
      // 비활성화 시 음원도 해당 음원 재생 정지
      if (song1.src.indexOf(asmrUrl) !== -1) {
        song1.pause();
        setSong1(new Audio());
        setSong1Icon(null);
        setSong1Title(null);
        history.state = "";
        history.audio = "";
        history.title = "";
        history.icon = "";
      } else if (song2.src.indexOf(asmrUrl) !== -1) {
        song2.pause();
        setSong2(new Audio());
        setSong2Icon(null);
        setSong1Title(null);
        history.state2 = "";
        history.audio2 = "";
        history.title2 = "";
        history.icon2 = "";
      } else if (song3.src.indexOf(asmrUrl) !== -1) {
        song3.pause();
        setSong3(new Audio());
        setSong3Icon(null);
        setSong1Title(null);
        history.state3 = "";
        history.audio3 = "";
        history.title3 = "";
        history.icon3 = "";
      }

      // 선택한 음원 비활성화 style
      const deleteItem = document.getElementById(asmrUrl);
      deleteItem.style.backgroundColor = "#3A3E74";
    } else {
      // 활성화
      if (play.length > 2) {
        window.alert("음원은 3개까지만 담으실 수 있습니다.");
      } else {
        const arr = [...play, asmrUrl];
        setPlay(arr);

        // 음원 선택 시 활성화 되면서 음원 재생
        if (!song1.src) {
          setSong1Icon(iconUrl);
          setSong1Title(title);
          song1.src = asmrUrl;
          song1.volume = 0.1;
          song1.loop = true;
          song1.play();
          history.state = asmrUrl;
          history.audio = song1;
          history.icon = iconUrl;
          history.title = title;
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
        }

        // 선택한 음원 활성화 style
        const selectItem = document.getElementById(asmrUrl);
        selectItem.style.backgroundColor = "#FBC037";
      }
    }
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
                  <img
                    style={{ width: "24px", height: "24px" }}
                    src={item.iconUrl}
                    alt=""
                  ></img>
                  <Text>{item.title}</Text>
                </Sound>
              );
            })}
          </SoundSelect>
          <Button
            margin={getCategory !== "전체" ? "235px" : "20px"}
            onClick={() => {
              setOpenmodal(true);
            }}
          >
            소리 조절 하기
          </Button>
          {openModal && (
            <AsmrPopUp
              setList={setPlay}
              list={play}
              play={song1}
              play2={song2}
              play3={song3}
              playIcon={song1Icon}
              play2Icon={song2Icon}
              play3Icon={song3Icon}
              setPlay={setSong1}
              setPlay2={setSong2}
              setPlay3={setSong3}
              title={song1Title}
              title2={song2Title}
              title3={song3Title}
              closeModal={setOpenmodal}
            />
          )}
        </PageWrap>
      )}
    </Container>
  );
};

// --- styled-components ---
const Container = styled.div`
  /* padding: 50px ${({ theme }) => theme.paddings.xxxxl}; */
`;

const PageWrap = styled.div`
  width: 100%;
  height: 812px;
  background-color: ${({ theme }) => theme.colors.bg};
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px ${({ theme }) => theme.paddings.xxxxl} 0;
  box-sizing: border-box;
  @media (max-width: 500px) {
    height: 95vh;
  }
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
  overflow: hidden;
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
