import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

// --- components ---
import Icon from "../../elements/Icon";

// --- images ---
import Vector from "../../static/images/mixList/vector.png";

const MixSoundTrack = (props) => {
  const { mixTitle, mixList } = props;

  const [song1, setSong1] = React.useState(new Audio());
  const [song2, setSong2] = React.useState(new Audio());
  const [song3, setSong3] = React.useState(new Audio());
  const [song4, setSong4] = React.useState(new Audio());
  const [play, setPlay] = React.useState([]);

  const mix1 = mixList[0];
  const mix2 = mixList[1];
  const mix3 = mixList[2];
  const mix4 = mixList[3];

  React.useEffect(() => {
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
  };

  const playSoundSetting = () => {
    if (mix1) {
      song1.src = mix1.asmrUrl; // 음원 url
      song1.volume = mix1.sound / 100; // 볼륨
      history.audio1 = song1; // 음원 audio 객체
      history.setSong1 = setSong1; // 음원 setState
      history.icon1 = mix1.iconUrl; // 아이콘 url
      history.state1 = mix1.asmrUrl; //음원 url
      history.title1 = mix1.title; // 음원 제목
      song1.play();
    }

    if (mix2) {
      song2.src = mix2.asmrUrl;
      song2.volume = mix2.sound / 100;
      history.audio2 = song2;
      history.setSong2 = setSong2;
      history.icon2 = mix2.iconUrl;
      history.state2 = mix2.asmrUrl;
      history.title2 = mix2.title;
      song2.play();
    }

    if (mix3) {
      song3.src = mix3.asmrUrl;
      song3.volume = mix3.sound * 100;
      history.audio3 = song3;
      history.setSong3 = setSong3;
      history.icon3 = mix3.iconUrl;
      history.state3 = mix3.asmrUrl;
      history.title3 = mix3.title;
      song3.play();
    }

    if (mix4) {
      song4.src = mix4.asmrUrl;
      song4.volume = mix4.sound * 100;
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
            src={Vector}
            alt="playIcon"
            _onClick={playSoundTrack}
          ></Icon>
        </PlayIcon>
        <Text>{mixTitle}</Text>
      </Wrap>
      <Hr></Hr>
    </>
  );
};

// --- styled-components ---
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
  width: 295px;
  border: 1px solid #ffffff;
  margin: auto;
  opacity: 0.1;
`;

export default MixSoundTrack;
