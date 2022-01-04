import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import PushNoticationPop from "../pages/PushNoticationPop";

import Swiper from "../components/Swiper";

import nextIcon from "../static/images/icon/nextIcon.svg";
import all from "../static/images/banner/all_1005px.png";
import nature from "../static/images/banner/nature_1005px.png";
import object from "../static/images/banner/object_1005px.png";
import space from "../static/images/banner/space_1005px.png";

const Main = (props) => {
  const [noticationModal, setNoticationModal] = React.useState(false);

  React.useEffect(() => {
    const noticeSet = JSON.parse(localStorage.getItem("noticeSet"));
    const token = localStorage.getItem("token");

    if (!noticeSet && token) {
      setNoticationModal(true);
    } else {
      console.log("알림 설정 했어요");
    }
  }, []);

  return (
    <Container>
      {/* swiper 부분 */}
      <Swiper />
      {/* <Asmr> */}
      {/* 카테고리 부분 */}
      <Title>당신의 편안한 밤을 위해</Title>
      <Category
        path="/asmr"
        category="자연"
        title="네이쳐"
        bannerImage={nature}
        subTitle="편안한 자연 속으로"
      ></Category>
      <Category
        path="/asmr"
        category="공간"
        title="스페이스"
        bannerImage={space}
        subTitle="다른 공간으로 여행"
      ></Category>
      <Category
        path="/asmr"
        category="물체"
        title="오브젝트"
        bannerImage={object}
        subTitle="차분히 바라보는 물건들"
      ></Category>
      <Category
        path="/asmr"
        category="전체"
        title="모든 소리"
        bannerImage={all}
        subTitle="모든 소리 들어보기"
      ></Category>
      {/* </Asmr> */}

      {/* 첫 로그인 시 알림 설정 팝업 부분 */}
      {noticationModal && (
        <PushNoticationPop
          modal={noticationModal}
          setNoticationModal={setNoticationModal}
        ></PushNoticationPop>
      )}
    </Container>
  );
};

const Category = (props) => {
  const history = useHistory();
  return (
    <>
      <CategoryStyle
        // style={{ display: "flex", justifyContent: "space-between" }}
        onClick={() => {
          history.push({
            pathname: `${props.path}`,
            category: `${props.category}`,
          });
        }}
        bannerImage={props.bannerImage}
      >
        <TextBox>
          <div>
            <h2>{props.title}</h2>
            <small>{props.subTitle}</small>
          </div>

          <div>
            <img src={nextIcon} alt="nextIcon" />
          </div>
        </TextBox>
      </CategoryStyle>
    </>
  );
};

const Container = styled.div`
  overflow-y: scroll;
  height: 88%;
  padding: ${({ theme }) => theme.horizontalityInterval.base};
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.p`
  padding: 30px 0 20px 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: ${({ theme }) => theme.lineHeight.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;
const CategoryStyle = styled.div`
  /* width: 100%; */
  height: 125px;
  border-radius: 12px;
  margin-bottom: ${({ theme }) => theme.margins.xxxxl};
  padding: ${({ theme }) => theme.paddings.xxxxl};
  display: flex;
  box-sizing: border-box;
  background-image: url(${(props) => props.bannerImage});
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ theme }) => theme.colors.white};
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export default Main;
