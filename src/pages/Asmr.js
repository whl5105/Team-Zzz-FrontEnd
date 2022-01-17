import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCreators as asmrActions } from "../redux/modules/asmr";
import { history } from "../redux/configureStore";

// -- components --
import Spinner from "../components/Spinner";
import AsmrCategory from "../components/asmr/AsmrCategory";
import AsmrList from "../components/asmr/AsmrList";
import Success from "../components/Success";

// -- images --
// import All from "../static/images/asmr/background/전체.svg";
// import Nature from "../static/images/asmr/background/네이쳐.svg";
// import Place from "../static/images/asmr/background/플레이스.svg";
// import Object from "../static/images/asmr/background/오브젝트.svg";
import All from "../static/images/asmr/background/asmr_category_all.png";
import Nature from "../static/images/asmr/background/asmr_category_nature.png";
import Place from "../static/images/asmr/background/asmr_category_space.png";
import Object from "../static/images/asmr/background/asmr_category_object.png";

export const deleteSong = (url) => {
  const deleteItem = document.getElementById(url);
  deleteItem.style.backgroundColor = "#3A3E74";
};

const Asmr = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [success, setSuccess] = React.useState(
    useSelector((state) => state.asmr.is_write)
  );

  const [song1, setSong1] = React.useState(new Audio());
  const [song2, setSong2] = React.useState(new Audio());
  const [song3, setSong3] = React.useState(new Audio());
  const [song4, setSong4] = React.useState(new Audio());
  const [getCategory, setCategory] = React.useState(
    location.category === undefined ? "전체" : location.category
  );
  const [imageUrl, setImageUrl] = React.useState(All);
  const [soundTrack, setSoundTrack] = React.useState([]);
  const asmrInfo = useSelector((state) => state.asmr.asmrList);
  const playListInfo = useSelector((state) => state.asmr.playList);
  const [play, setPlay] = React.useState([]);

  React.useEffect(() => {
    if (!playListInfo) {
      dispatch(asmrActions.getPlayListDB());
    }
  }, []);

  React.useEffect(() => {
    if (success === true) {
      dispatch(asmrActions.writeInitial());
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [success]);

  React.useEffect(() => {
    if (getCategory === "전체") {
      setImageUrl(All);
    } else if (getCategory === "네이쳐") {
      setImageUrl(Nature);
    } else if (getCategory === "플레이스") {
      setImageUrl(Place);
    } else if (getCategory === "오브젝트") {
      setImageUrl(Object);
    } else {
      setImageUrl(All);
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
          setSoundTrack(asmrInfo);
        } else if (getCategory === "네이쳐") {
          const nature = asmrInfo.filter((item) => {
            if (item.categoryName === "자연") {
              return item;
            }
          });
          setSoundTrack(nature);
        } else if (getCategory === "플레이스") {
          const place = asmrInfo.filter((item) => {
            if (item.categoryName === "공간") {
              return item;
            }
          });
          setSoundTrack(place);
        } else if (getCategory === "오브젝트") {
          const object = asmrInfo.filter((item) => {
            if (item.categoryName === "물체") {
              return item;
            }
          });
          setSoundTrack(object);
        }
      });
    }
  }, [asmrInfo, getCategory]);

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
      history.setPlaybar(arr); // 버튼 비활성화시 플레이어바 arr 도 바뀌게 해줌
      // 비활성화 시 음원도 해당 음원 재생 정지
      if (song1.src.indexOf(asmrUrl) !== -1) {
        song1.pause();
        setSong1(new Audio());
        history.state1 = "";
        history.audio1 = "";
        history.title1 = "";
        history.icon1 = "";
      } else if (song2.src.indexOf(asmrUrl) !== -1) {
        song2.pause();
        setSong2(new Audio());
        history.state2 = "";
        history.audio2 = "";
        history.title2 = "";
        history.icon2 = "";
      } else if (song3.src.indexOf(asmrUrl) !== -1) {
        song3.pause();
        setSong3(new Audio());
        history.state3 = "";
        history.audio3 = "";
        history.title3 = "";
        history.icon3 = "";
      } else if (song4.src.indexOf(asmrUrl) !== -1) {
        song4.pause();
        setSong4(new Audio());
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

        history.play = arr;
        history.setPlay = setPlay;
        history.setPlaybar(arr); // 플레이어바 활성화 비활성화를 위한 array를 담는다.

        // 음원 선택 시 활성화 되면서 음원 재생
        if (!song1.src) {
          song1.src = asmrUrl;
          song1.volume = 0.1;
          song1.loop = true;
          song1.play();
          history.state1 = asmrUrl;
          history.audio1 = song1;
          history.icon1 = iconUrl;
          history.title1 = title;
          history.setSong1 = setSong1;
        } else if (!song2.src) {
          song2.src = asmrUrl;
          song2.volume = 0.1;
          song2.loop = true;
          song2.play();
          history.state2 = asmrUrl;
          history.audio2 = song2;
          history.icon2 = iconUrl;
          history.title2 = title;
          history.setSong2 = setSong2;
        } else if (!song3.src) {
          song3.src = asmrUrl;
          song3.volume = 0.1;
          song3.loop = true;
          song3.play();
          history.state3 = asmrUrl;
          history.audio3 = song3;
          history.icon3 = iconUrl;
          history.title3 = title;
          history.setSong3 = setSong3;
        } else if (!song4.src) {
          song4.src = asmrUrl;
          song4.volume = 0.1;
          song4.loop = true;
          song4.play();
          history.state4 = asmrUrl;
          history.audio4 = song4;
          history.icon4 = iconUrl;
          history.title4 = title;
          history.setSong4 = setSong4;
        }

        // 선택한 음원 활성화 style
        const selectItem = document.getElementById(asmrUrl);
        selectItem.style.backgroundColor = "#FBC037";
      }
    }
  };

  return (
    <>
      {!asmrInfo || asmrInfo.length === 0 ? (
        <Spinner></Spinner>
      ) : (
        <PageWrap imgUrl={imageUrl}>
          {/* 나중에 여기로 전체 크기 핸드폰 사이즈로 바꿔야함 */}
          <AsmrCategory setCategory={setCategory}></AsmrCategory>
          <AsmrList
            soundTrack={soundTrack}
            select={select}
            setSong1={setSong1}
            setSong2={setSong2}
            setSong3={setSong3}
            setSong4={setSong4}
            setPlay={setPlay}
          ></AsmrList>

          {success ? (
            <Wrap>
              <Success
                alt="플레이리스트 작성 완료"
                text="저장에 성공하였습니다."
              ></Success>
            </Wrap>
          ) : null}
        </PageWrap>
      )}
    </>
  );
};

// --- styled-components ---
const PageWrap = styled.div`
  width: 100%;
  height: inherit;
  background-color: ${({ theme }) => theme.colors.bg};
  background: url(${(props) => props.imgUrl}) no-repeat;
  background-position: 50% 100%;
  background-size: 100%;
  /* padding: 50px 1.25rem 0; */
  /* box-sizing: border-box; */
  padding: 50px ${({ theme }) => theme.paddings.xxxxl} 0;
  box-sizing: border-box;
  position: relative;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 50px ${({ theme }) => theme.paddings.xxxxl} 0;
  box-sizing: border-box;
  z-index: 140;
`;

export default Asmr;
