import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import RequireLogin from "../components/RequireLogin";

// 아이콘 이미지 import
import homeIcon from "../static/images/navigation/homeIcon.svg";
import asmrIcon from "../static/images/navigation/asmrIcon.svg";
import diaryIcon from "../static/images/navigation/diaryIcon.svg";
import myPageIcon from "../static/images/navigation/myPageIcon.svg";

const Navigation = (props) => {
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

  return (
    <Gnb>
      {/* <div
        style={
          {
            // width: "100%",
            // position: "absolute",
            // bottom: "0",
            // display: "flex",
            // justifyContent: "space-between",
            // backgroundColor: "#2A2245",
            // color: "white",
            // padding: "10px 20px",
            // boxSizing: "border-box",
          }
        }
      > */}
      <Box
        onClick={() => {
          history.push("/");
        }}
      >
        <Icon categoryImage={homeIcon}></Icon>홈
      </Box>

      <Box
        onClick={() => {
          history.push("/asmr");
        }}
      >
        <Icon categoryImage={asmrIcon}></Icon>ASMR
      </Box>

      <Box onClick={diary}>
        <Icon categoryImage={diaryIcon}></Icon>다이어리
      </Box>

      {diaryModal && (
        <RequireLogin
          modal={diaryModal}
          setDiaryModal={setDiaryModal}
        ></RequireLogin>
      )}
      <Box
        onClick={() => {
          history.push("/mypage");
        }}
      >
        <Icon categoryImage={myPageIcon}></Icon>마이
      </Box>
      {/* </div> */}
    </Gnb>
  );
};

const Gnb = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background-color: #2a2245; 
  color: white;
  padding: 4px 20px 2px 20px;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  line-height: ${({ theme }) => theme.lineHeight.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
`;
const Box = styled.div`
  width: 75px;
`;
const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  /* background-size: cover; */
  margin: auto;
`;

export default Navigation;
