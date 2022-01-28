import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { withRouter } from "react-router-dom";
import { ThemeContext } from "../shared/ThemeContext";

import { deleteSong } from "../pages/Asmr";

import {
  playBar_close,
  playBar_pause,
  playBar_volume,
  playBar_play,
} from "../static/images/index";

const PlayBar = withRouter((props) => {
  const {
    song1,
    setSong1,
    song2,
    setSong2,
    song3,
    setSong3,
    song4,
    setSong4,
    setPlay,
    toggle,
    setToggle,
    playbar,
    setPlaybar,
    title1,
    title2,
    title3,
    title4,
    icon1,
    icon2,
    icon3,
    icon4,
  } = useContext(ThemeContext);

  useEffect(() => {
    playSound();
    setToggle(false);
  }, [playbar]);

  const playSound = () => {
    setToggle(false);

    song1 && song1.play();
    song2 && song2.play();
    song3 && song3.play();
    song4 && song4.play();
  };

  const pause = () => {
    setToggle(true);

    song1 && song1.pause();
    song2 && song2.pause();
    song3 && song3.pause();
    song4 && song4.pause();
  };

  const reset = () => {
    if (song1.src) {
      if (history.location.pathname === "/asmr") {
        deleteSong(song1.src);
        title1 = "";
        icon1 = "";
      }

      song1.pause();
      setSong1(new Audio());
      setPlay([]);

      title1 = "";
      icon1 = "";
    }

    if (song2.src) {
      if (history.location.pathname === "/asmr") {
        deleteSong(song2.src);
        title2 = "";
        icon2 = "";
      }

      song2.pause();
      setSong2(new Audio());
      setPlay([]);

      title2 = "";
      icon2 = "";
    }

    if (song3.src) {
      if (history.location.pathname === "/asmr") {
        deleteSong(song3.src);
        title3 = "";
        icon3 = "";
      }

      song3.pause();
      setSong3(new Audio());
      setPlay([]);

      title3 = "";
      icon3 = "";
    }

    if (song4.src) {
      if (history.location.pathname === "/asmr") {
        deleteSong(song4.src);
        title4 = "";
        icon4 = "";
      }

      song4.pause();
      setSong4(new Audio());
      setPlay([]);

      title4 = "";
      icon4 = "";
    }

    setPlaybar([]);
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
              <Icon src={playBar_play} onClick={playSound} />
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
