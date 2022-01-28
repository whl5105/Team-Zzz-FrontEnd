import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

import { Icon } from "../../elements/index";
import { mix_play } from "../../static/images/index";
import { ThemeContext } from "../../shared/ThemeContext";

const MixSoundTrack = (props) => {
  const { mixTitle, mixList } = props;
  const {
    song1,
    setSong1,
    song2,
    setSong2,
    song3,
    setSong3,
    song4,
    setSong4,
    play,
    setPlay,
    setTitle1,
    setTitle2,
    setTitle3,
    setTitle4,
    setIcon1,
    setIcon2,
    setIcon3,
    setIcon4,
    setPlaybar,
    setToggle,

  
  }= useContext(ThemeContext);

  // const [song1, setSong1] = useState(new Audio());
  // const [song2, setSong2] = useState(new Audio());
  // const [song3, setSong3] = useState(new Audio());
  // const [song4, setSong4] = useState(new Audio());
  // const [play, setPlay] = useState([]);

  const mix1 = mixList[0];
  const mix2 = mixList[1];
  const mix3 = mixList[2];
  const mix4 = mixList[3];

  useEffect(() => {
    let arr = [];

    if (mix1) {
      arr.push(mix1.asmrUrl);
    }

    if (mix2) {
      arr.push(mix2.asmrUrl);
    }

    if (mix3) {
      arr.push(mix3.asmrUrl);
    }

    if (mix4) {
      arr.push(mix4.asmrUrl);
    }

    setPlay(arr);
  }, []);

  const playInitial = () => {
    if (song1.src) {
      song1.pause();
      song1.pause();
      setSong1("");
      setIcon1("");
      setTitle1("");
      history.state1 = "";
    }

    if (song2.src) {
      song2.pause();
      setSong2("");
      setIcon2("");
      setTitle2("");
      history.state2 = "";
    }

    if (song3.src) {
      song3.pause();
      setSong3("");
      setIcon3("");
      setTitle3("");
      history.state3 = "";
    }

    if (song4.src) {
      song4.pause();
      setSong4("");
      setIcon4("");
      setTitle4("");
      history.state4 = "";
    }

    setPlaybar([]);
    setToggle(false);
  };

  const playSoundSetting = () => {
    if (mix1) {
      song1.src = mix1.asmrUrl;
      song1.volume = Math.ceil(mix1.sound * 100) / 100;
      setSong1(song1);
      setIcon1(mix1.iconUrl);
      history.state1 = mix1.asmrUrl;
      setTitle1(mix1.title);
      song1.play();
    }

    if (mix2) {
      song2.src = mix2.asmrUrl;
      song2.volume = Math.ceil(mix2.sound * 100) / 100;
      setSong2(song2);
      setIcon2(mix2.iconUrl);
      history.state2 = mix2.asmrUrl;
      setTitle2(mix2.title);
      song2.play();
    }

    if (mix3) {
      song3.src = mix3.asmrUrl;
      song3.volume = Math.ceil(mix3.sound * 100) / 100;
      setSong3(song3);
      setIcon3(mix3.iconUrl);
      history.state3 = mix3.asmrUrl;
      setTitle3(mix3.title);
      song3.play();
    }

    if (mix4) {
      song4.src = mix4.asmrUrl;
      song4.volume = Math.ceil(mix4.sound * 100) / 100;
      setSong4(song4);
      setIcon4(mix4.iconUrl);
      history.state4 = mix4.asmrUrl;
      setTitle4(mix3.title);
      song4.play();
    }
  };

  const playSoundTrack = () => {
    playInitial();
    playSoundSetting();
    setPlaybar(play);
  };

  return (
    <>
      <Wrap>
        <PlayIcon>
          <Icon
            width="30px"
            height="30px"
            position="relative"
            top="10px"
            left="10px"
            src={mix_play}
            alt="playIcon"
            _onClick={playSoundTrack}
          />
        </PlayIcon>
        <Text>{mixTitle}</Text>
      </Wrap>
      <Hr />
    </>
  );
};

const Wrap = styled.div`
  width: 295px;
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
`;

const PlayIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.main_1};
  margin-top: 20px;
  margin-left: 20px;
`;

const Text = styled.p`
  color: white;
  margin-top: 30px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeight.base};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
`;

const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid #ffffff;
  box-sizing: border-box;
  margin: auto;
  opacity: 0.1;
`;

export default MixSoundTrack;
