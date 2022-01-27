import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { withRouter } from "react-router-dom";

import { deleteSong } from "../pages/Asmr";

import {
  playBar_close,
  playBar_pause,
  playBar_volume,
  playBar_play,
} from "../static/images/index";

const PlayBar = withRouter((props) => {
  const [toggle, setToggle] = useState(false);
  const [playbar, setPlaybar] = useState([]);
  history.setPlaybar = setPlaybar;
  history.setToggle = setToggle;

  useEffect(() => {
    play();
    setToggle(false);
  }, [playbar]);

  const play = () => {
    setToggle(false);

    history.audio1 && history.audio1.play();
    history.audio2 && history.audio2.play();
    history.audio3 && history.audio3.play();
    history.audio4 && history.audio4.play();
  };

  const pause = () => {
    setToggle(true);

    history.audio1 && history.audio1.pause();
    history.audio2 && history.audio2.pause();
    history.audio3 && history.audio3.pause();
    history.audio4 && history.audio4.pause();
  };

  const reset = () => {
    if (history.audio1) {
      history.audio1.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state1);
        history.state1 = "";
        history.audio1 = "";
        history.title1 = "";
        history.icon1 = "";

        history.setSong1(new Audio());
        history.setPlay([]);
      }

      history.state1 = "";
      history.audio1 = "";
      history.title1 = "";
      history.icon1 = "";
      history.setPlay([]);
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
        history.setPlay([]);
      }

      history.state2 = "";
      history.audio2 = "";
      history.title2 = "";
      history.icon2 = "";
      history.setPlay([]);
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
        history.setPlay([]);
      }

      history.state3 = "";
      history.audio3 = "";
      history.title3 = "";
      history.icon3 = "";
      history.setPlay([]);
      history.arr = [];
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
        history.setPlay([]);
      }

      history.state4 = "";
      history.audio4 = "";
      history.title4 = "";
      history.icon4 = "";
      history.setPlay([]);
      history.arr = [];
    }
    setPlaybar([]);
    history.play = [];

    asmrMove();
  };

  const asmrMove = () => {
    if (props.location.pathname === "/asmr/asmrVolumeControl") {
      history.push("/asmr");
    }
  };

  const asmrPopMove = () => {
    if (history.mixListModal) {
      history.setMixListModal(false);
    }
    history.push("/asmr/asmrVolumeControl");
  };

  return (
    <>
      {playbar.length > 0 ? (
        <Wrap>
          <Text>
            {toggle ? "음원 일시정지 중입니다" : "편안하게 소리를 감상해보세요"}
          </Text>
          {toggle ? (
            <>
              <Icon src={playBar_volume} onClick={asmrPopMove} />
              <Icon src={playBar_play} onClick={play} />
            </>
          ) : (
            <>
              <Icon src={playBar_volume} onClick={asmrPopMove} />
              <Icon src={playBar_pause} onClick={pause} />
            </>
          )}
          <Icon className="lastIcon" src={playBar_close} onClick={reset} />
        </Wrap>
      ) : null}
    </>
  );
});

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
