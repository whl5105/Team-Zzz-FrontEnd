import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { actionCreators as asmrActions } from "../redux/modules/asmr";
import AsmrPopUp from "../components/AsmrPopUp";

import asmrUrl1 from "../audio/asmrUrl1.mp3";
import asmrUrl2 from "../audio/asmrUrl2.mp3";
import asmrUrl3 from "../audio/asmrUrl3.mp3";

export const deleteSong = (url) => {
  console.log(url);
  const deleteItem = document.getElementById(url);
  deleteItem.style.backgroundColor = "gray";
};

const Asmr = (props) => {
  const location = useLocation();

  const [song1, setSong1] = React.useState(new Audio());
  const [song2, setSong2] = React.useState(new Audio());
  const [song3, setSong3] = React.useState(new Audio());
  console.log(song1);
  const [getCategory, setCategory] = React.useState(
    location.category ? location.category : "전체"
  );
  const [sound, setSound] = React.useState([]);
  const asmrInfo = useSelector((state) => state.asmr.asmrList);
  const [play, setPlay] = React.useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const [openModal, setOpenmodal] = React.useState(false);
  // const [test1, setTest1] =React.useState(test.arr);

  React.useEffect(() => {
    // 1) 카테고리별 활성화 유무
    const arr = ["전체", "자연", "공간", "물체"];

    arr.forEach((arrItem) => {
      if (arrItem !== getCategory) {
        // 비활성화
        document.getElementById(arrItem).style.color = "black";
      }
      document.getElementById(getCategory).style.color = "white"; // 활성화
    });

    // 2) 음원 데이터 유무
    if (!asmrInfo) {
      dispatch(asmrActions.getAsmrDB());
    }

    // 3) 음원을 출력하기 전에 카테고리에 맞게 필터링
    if (getCategory === "전체") {
      const all = asmrInfo.filter((item) => {
        if (item.categoryName === "전체") {
          return item;
        }
      });
      setSound(all);
    } else if (getCategory === "자연") {
      const nature = asmrInfo.filter((item) => {
        if (item.categoryName === "자연") {
          return item;
        }
      });
      setSound(nature);
    } else if (getCategory === "공간") {
      const place = asmrInfo.filter((item) => {
        if (item.categoryName === "공간") {
          return item;
        }
      });
      setSound(place);
    } else if (getCategory === "물체") {
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

    // 6) 컴포넌트 사라질 때 음원도 정지 시킴
    return () => {
      song1.pause();
      song2.pause();
      song3.pause();
    };
  }, [getCategory]);

  const select = (asmrUrl) => {
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
      } else if (song2.src.indexOf(asmrUrl) !== -1) {
        song2.pause();
        setSong2(new Audio());
      } else if (song3.src.indexOf(asmrUrl) !== -1) {
        song3.pause();
        setSong3(new Audio());
      }

      // 선택한 음원 비활성화 style
      const deleteItem = document.getElementById(asmrUrl);
      deleteItem.style.backgroundColor = "gray";
    } else {
      // 활성화
      if (play.length > 2) {
        window.alert("음원은 3개까지만 담으실 수 있습니다.");
      } else {
        const arr = [...play, asmrUrl];
        setPlay(arr);

        // 음원 선택 시 활성화 되면서 음원 재생
        if (!song1.src) {
          song1.src = asmrUrl;
          song1.volume = 0.5;
          song1.loop = true;
          song1.play();
        } else if (!song2.src) {
          song2.src = asmrUrl;
          song2.volume = 0.5;
          song2.loop = true;
          song2.play();
        } else if (!song3.src) {
          song3.src = asmrUrl;
          song3.volume = 0.5;
          song3.loop = true;
          song3.play();
        }

        // 선택한 음원 활성화 style
        const selectItem = document.getElementById(asmrUrl);
        selectItem.style.backgroundColor = "#dddddd";
      }
    }
  };

  return (
    <>
      <div>
        {" "}
        {/* 나중에 여기로 전체 크기 핸드폰 사이즈로 바꿔야함 */}
        <div
          onClick={() => {
            history.push("/");
          }}
        >
          ASMR 페이지
        </div>
        <div style={{ display: "flex", margin: "auto", width: "350px" }}>
          <Category
            id="전체"
            onClick={() => {
              setCategory("전체");
            }}
          >
            전체
          </Category>
          <Category
            id="자연"
            onClick={() => {
              setCategory("자연");
            }}
          >
            자연
          </Category>
          <Category
            id="공간"
            onClick={() => {
              setCategory("공간");
            }}
          >
            공간
          </Category>
          <Category
            id="물체"
            onClick={() => {
              setCategory("물체");
            }}
          >
            물체
          </Category>
        </div>
        <div style={{ margin: "auto", display: "flex", flexWrap: "wrap" }}>
          {sound.map((item) => {
            return (
              <Sound
                id={item.asmrUrl}
                key={item.categoryIdx}
                onClick={() => {
                  select(item.asmrUrl);
                }}
              >
                <p>{item.asmrUrl}</p>
                <p>{item.title}</p>
              </Sound>
            );
          })}
        </div>
        {play.length > 0 ? (
          <button
            onClick={() => {
              setOpenmodal(true);
              console.log("음원 url 가지고 이동!!!", play);
            }}
          >
            음량 조절 하러 가기
          </button>
        ) : null}
        {openModal && (
          <AsmrPopUp
            setList={setPlay}
            list={play}
            play={song1}
            play2={song2}
            play3={song3}
            setPlay={setSong1}
            setPlay2={setSong2}
            setPlay3={setSong3}
            closeModal={setOpenmodal}
          />
        )}
      </div>
    </>
  );
};

const Category = styled.div`
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: gray;
`;

const Sound = styled.div`
  width: 100px;
  height: 100px;
  background-color: gray;
  margin: 10px;
`;

export default Asmr;
