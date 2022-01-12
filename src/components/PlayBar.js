import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { deleteSong } from "../pages/Asmr";

import playIcon from "../static/images/play/play.svg";
import volumeIcon from "../static/images/play/volume.svg";
import closeIcon from "../static/images/play/close.svg";
import pauseIcon from "../static/images/play/pause.svg";

const PlayBar = (props) => {
  const [toggle, setToggle] = React.useState(false);
  const [playbar, setPlaybar] = React.useState([]);
  history.setPlaybar = setPlaybar;

  const play = () => {
    history.audio1 && history.audio1.play();
    history.audio2 && history.audio2.play();
    history.audio3 && history.audio3.play();
    history.audio4 && history.audio4.play();
  };

  const pause = () => {
    history.audio1 && history.audio1.pause();
    history.audio2 && history.audio2.pause();
    history.audio3 && history.audio3.pause();
    history.audio4 && history.audio4.pause();
  };

  const reset = () => {
    setPlaybar([]);
    if (history.audio1) {
      history.audio1.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state1);
        history.state1 = "";
        history.audio1 = "";
        history.title1 = "";
        history.icon1 = "";

        history.setSong1(new Audio());
        history.setPlay([]); // 모든 음원 리스트 리셋
      }

      //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
      history.state1 = "";
      history.audio1 = "";
      history.title1 = "";
      history.icon1 = "";
      history.setPlay([]); // 모든 음원 리스트 리셋

      console.log(history);
    }
    if (history.audio2) {
      history.audio2.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state2);
        history.state2 = "";
        history.audio2 = "";
        history.title2 = "";
        history.icon2 = "";

        history.setSong2(new Audio());
        history.setPlay([]); // 모든 음원 리스트 리셋
      }

      //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
      history.state2 = "";
      history.audio2 = "";
      history.title2 = "";
      history.icon2 = "";
      history.setPlay([]); // 모든 음원 리스트 리셋
    }
    if (history.audio3) {
      history.audio3.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state3);
        history.state3 = "";
        history.audio3 = "";
        history.title3 = "";
        history.icon3 = "";

        history.setSong3(new Audio());
        history.setPlay([]); // 모든 음원 리스트 리셋
        console.log("여기");
      }

      //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
      history.state3 = "";
      history.audio3 = "";
      history.title3 = "";
      history.icon3 = "";
      history.setPlay([]); // 모든 음원 리스트 리셋
      history.arr = [];
      console.log(history);
    }
    if (history.audio4) {
      history.audio4.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state4);
        history.state4 = "";
        history.audio4 = "";
        history.title4 = "";
        history.icon4 = "";
        history.arr = [];
        history.setSong4(new Audio());
        history.setPlay([]); // 모든 음원 리스트 리셋
        console.log("여기");
      }

      //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
      history.state4 = "";
      history.audio4 = "";
      history.title4 = "";
      history.icon4 = "";
      history.setPlay([]); // 모든 음원 리스트 리셋
      history.arr = [];
      console.log(history);
    }
    setPlaybar([]);
  };

  return (
    <React.Fragment>
      {playbar.length > 0 ? (
        <Wrap>
          <Text>{toggle ? "pause..." : "편안하게 소리를 감상해보세요"}</Text>
          {toggle ? (
            <>
              <Icon src={volumeIcon} onClick={() => history.push("/asmrPop")} />
              <Icon
                src={playIcon}
                onClick={() => (play(), setToggle(!toggle))}
              />
            </>
          ) : (
            <>
              <Icon src={volumeIcon} onClick={() => history.push("/asmrPop")} />
              {/* 임시이미지 적용중 */}
              <Icon
                src={pauseIcon}
                onClick={() => (pause(), setToggle(!toggle))}
              />
            </>
          )}
          <Icon className="lastIcon" src={closeIcon} onClick={() => reset()} />
        </Wrap>
      ) : null}
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: calc(100% - 40px);
  height: 72px;
  position: absolute;
  bottom: 76px;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  border-radius: 12px;
  margin: 0 20px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  justify-content: space-evenly;
  padding: 18px 20px;
  box-sizing: border-box;
  & .lastIcon:last-child {
    margin: 0;
  }
  z-index: 135;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  color: white;
  flex-grow: 2;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

const Icon = styled.div`
  min-width: 36px;
  min-height: 36px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  margin-right: 12px;
`;

export default PlayBar;
