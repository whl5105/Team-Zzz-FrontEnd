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
  // 메인에서는 전체 서버에 요청해서 데이터를 가져온다.

  React.useEffect(() => {
    // 카테고리별 활성화 유무
    const arr = ["전체", "자연", "공간", "물체"];

    arr.forEach((arrItem) => {
      if (arrItem !== getCategory) {
        // 비활성화
        document.getElementById(arrItem).style.color = "black";
      }
      document.getElementById(getCategory).style.color = "white"; // 활성화
    });

    if (!asmrInfo) {
      // 음원 데이터가 없다면
      dispatch(asmrActions.getAsmrDB());
    }

    // 음원을 출력하기 전에 카테고리에 맞게 필터링
    if (getCategory === "전체") {
      console.log("전체 음원 데이터 가져오기");
      const all = asmrInfo.filter((item, index) => {
        if (item.categoryName === "전체") {
          return item;
        }
      });
      setSound(all);
    } else if (getCategory === "자연") {
      console.log("자연 음원 데이터 가져오기");
      const nature = asmrInfo.filter((item, index) => {
        if (item.categoryName === "자연") {
          return item;
        }
      });
      setSound(nature);
    } else if (getCategory === "공간") {
      console.log("공간 음원 데이터 가져오기");
      const place = asmrInfo.filter((item, index) => {
        if (item.categoryName === "공간") {
          return item;
        }
      });
      setSound(place);
    } else if (getCategory === "물체") {
      console.log("물체 음원 데이터 가져오기");
      const object = asmrInfo.filter((item, index) => {
        if (item.categoryName === "물체") {
          return item;
        }
      });
      setSound(object);
    }
  }, [getCategory]);

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
      <div style={{margin:"0px 40%", display: "flex", flexWrap: "wrap"}}>
        {sound.map((item) => {
          return (
            <Sound
              key={item.categoryIdx}
              onClick={() => {
                console.log(item.asmrUrl);
              }}
            >
              <p>{item.asmrUrl}</p>
              <p>{item.title}</p>
            </Sound>
          );
        })}
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
`

export default Asmr;
