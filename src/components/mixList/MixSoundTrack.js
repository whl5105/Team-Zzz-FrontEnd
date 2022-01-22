import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

import { Icon } from "../../elements/index";

import { mix_play } from "../../static/images/index";

const MixSoundTrack = (props) => {
  const { mixTitle, mixList } = props;

  const [song1, setSong1] = useState(new Audio());
  const [song2, setSong2] = useState(new Audio());
  const [song3, setSong3] = useState(new Audio());
  const [song4, setSong4] = useState(new Audio());
  const [play, setPlay] = useState([]);

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
  }, [history.play]);

  const playInitial = () => {
    if (history.audio1) {
      song1.pause();
      history.audio1.pause();
      history.audio1 = "";
      history.icon1 = "";
      history.setSong1 = "";
      history.title1 = "";
      history.state1 = "";
    }

    if (history.audio2) {
      song2.pause();
      history.audio2.pause();
      history.audio2 = "";
      history.icon2 = "";
      history.setSong2 = "";
      history.title2 = "";
      history.state2 = "";
    }

    if (history.audio3) {
      song3.pause();
      history.audio3.pause();
      history.audio3 = "";
      history.icon3 = "";
      history.setSong3 = "";
      history.title3 = "";
      history.state3 = "";
    }

    if (history.audio4) {
      song4.pause();
      history.audio4.pause();
      history.audio4 = "";
      history.icon4 = "";
      history.setSong4 = "";
      history.title4 = "";
      history.state4 = "";
    }

    history.setPlaybar([]);
    history.setToggle(false);
  };

  const playSoundSetting = () => {
    if (mix1) {
      song1.src = mix1.asmrUrl; 
      song1.volume = Math.ceil(mix1.sound * 100) / 100;
      history.audio1 = song1; 
      history.setSong1 = setSong1; 
      history.icon1 = mix1.iconUrl; 
      history.state1 = mix1.asmrUrl; 
      history.title1 = mix1.title;
      song1.play();
    }

    if (mix2) {
      song2.src = mix2.asmrUrl;
      song2.volume = Math.ceil(mix2.sound * 100) / 100;
      history.audio2 = song2;
      history.setSong2 = setSong2;
      history.icon2 = mix2.iconUrl;
      history.state2 = mix2.asmrUrl;
      history.title2 = mix2.title;
      song2.play();
    }

    if (mix3) {
      song3.src = mix3.asmrUrl;
      song3.volume = Math.ceil(mix3.sound * 100) / 100;
      history.audio3 = song3;
      history.setSong3 = setSong3;
      history.icon3 = mix3.iconUrl;
      history.state3 = mix3.asmrUrl;
      history.title3 = mix3.title;
      song3.play();
    }

    if (mix4) {
      song4.src = mix4.asmrUrl;
      song4.volume = Math.ceil(mix4.sound * 100) / 100;
      history.audio4 = song4;
      history.setSong4 = setSong4;
      history.icon4 = mix4.iconUrl;
      history.state4 = mix4.asmrUrl;
      history.title4 = mix4.title;
      song4.play();
    }
  };

  const playSoundTrack = () => {
    playInitial();
    playSoundSetting();
    history.play = play;
    history.setPlay = setPlay;
    history.setPlaybar(play);
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
