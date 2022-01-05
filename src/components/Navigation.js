import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import RequireLogin from "../components/RequireLogin";
import { useDispatch } from "react-redux";

// 아이콘 이미지 import
import homeIcon from "../static/images/navigation/homeIcon.svg";
import asmrIcon from "../static/images/navigation/asmrIcon.svg";
import diaryIcon from "../static/images/navigation/diaryIcon.svg";
import myPageIcon from "../static/images/navigation/myPageIcon.svg";

const Navigation = () => {
  const history = useHistory();
  const [diaryModal, setDiaryModal] = React.useState(false);

  const diary = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setDiaryModal(true);
    } else {
      history.push("/diary");
    }
  };

  const closeModal = () => {
    setDiaryModal(false);
  };

  const loginModal = () => {
    setDiaryModal(false);
    history.push("/login");
  };

  return (
    <div>
      <Gnb>
        <Box
          onClick={() => {
            history.push("/");
          }}
        >
          <Icon categoryImage={homeIcon} />홈
        </Box>

        <Box
          onClick={() => {
            history.push({ pathname: "/asmr" });
          }}
        >
          <Icon categoryImage={asmrIcon} />
          ASMR
        </Box>

        <Box onClick={diary}>
          <Icon categoryImage={diaryIcon} />
          다이어리
        </Box>

        <Box
          onClick={() => {
            history.push("/mypage");
          }}
        >
          <Icon categoryImage={myPageIcon} />
          마이
        </Box>
      </Gnb>
      {diaryModal && (
        <RequireLogin close={closeModal} move={loginModal}></RequireLogin>
      )}
    </div>
  );
};

const Gnb = styled.div`
  width: 375px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 4px 20px 2px 20px;
  text-align: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  line-height: ${({ theme }) => theme.lineHeight.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};

  ::before {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #2a2245;
  }
`;
const Box = styled.div`
  width: 75px;
`;
const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  margin: auto;
`;

export default Navigation;
