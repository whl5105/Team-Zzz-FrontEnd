import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as asmrActions } from "../redux/modules/asmr";

const Asmr = ({ location }) => {
  const [getCategory, setCategory] = React.useState(
    location.category ? location.category : "전체"
  );
  const [sound, setSound] = React.useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const asmrInfo = useSelector((state) => state.asmr.asmrList);
  const [play, setPlay] = React.useState([]);

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
  }, [getCategory]);

  const select = (categoryIdx, asmrUrl) => {
    if (play.includes(asmrUrl)) {
      // 비활성화
      let arr = [...play];
      arr = arr.filter((item) => {
        if (asmrUrl !== item) {
          return item;
        }
      });
      setPlay(arr);

      // 선택한 음원 비활성화 style
      const deleteItem = document.getElementById(categoryIdx);
      deleteItem.style.backgroundColor = "gray";

      // 음원 재생 중지 시킴
      soundPause(asmrUrl);
    } else {
      // 활성화
      if (play.length > 2) {
        window.alert("음원은 3개까지만 담으실 수 있습니다.");
      } else {
        const arr = [...play, asmrUrl];
        setPlay(arr);

        // 선택한 음원 활성화 style
        const selectItem = document.getElementById(categoryIdx);
        selectItem.style.backgroundColor = "#dddddd";

        // 음원 재생 시킴
        soundPlay(asmrUrl);
      }
    }
  };

  // 음원 재생
  const soundPlay = (asmrUrl) => {
    const audio = new Audio(asmrUrl); // Audio 객체를 생성해서 음악을 재생한다.
    audio.loop = true; // 반복재생 여부
    audio.volume = 1; // 볼륨
    audio.play(); // 음원 재생
  };

  // 음원 중지
  const soundPause = (asmrUrl) => {
    const audio = new Audio(asmrUrl);
    audio.pause(); // 음원 재생 중지
  };

  return (
    <>
      <div
        onClick={() => {
          history.push("/");
        }}
      >
        ASMR 페이지
      </div>
      <div style={{ display: "flex", margin: "0px 40%" }}>
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
      <div style={{ margin: "0px 40%", display: "flex", flexWrap: "wrap" }}>
        {sound.map((item) => {
          return (
            <Sound
              id={item.categoryIdx}
              key={item.categoryIdx}
              onClick={() => {
                select(item.categoryIdx, item.asmrUrl);
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
            console.log("음원 url 가지고 이동!!!", play);
          }}
        >
          음량 조절 하러 가기
        </button>
      ) : null}
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
