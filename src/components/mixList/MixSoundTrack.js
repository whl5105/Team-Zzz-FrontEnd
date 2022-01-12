import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

// --- components ---
import Icon from "../../elements/Icon";

// --- images ---
import Vector from "../../static/images/mixList/vector.png";

const MixSoundTrack = (props) => {
  const { key, mixTitle, mix1, mix2, mix3, mix4 } = props;
  const [song1, setSong1] = React.useState(new Audio());
  const [song2, setSong2] = React.useState(new Audio());
  const [song3, setSong3] = React.useState(new Audio());
  const [song4, setSong4] = React.useState(new Audio());
  const [play, setPlay] = React.useState([]);

  React.useEffect(() => {
    let arr = [];

    if (mix1) {
      arr.push(mix1.asmrUrl1);
    }

    if (mix2) {
      arr.push(mix2.asmrUrl2);
    }

    if (mix3) {
      arr.push(mix3.asmrUrl3);
    }

    if (mix4) {
      arr.push(mix4.asmrUrl4);
    }

    setPlay(arr);
  }, []);

  const playSoundSetting = () => {
    if (mix1) {
      song1.src = mix1.asmrUrl1; // 음원 url
      song1.volume = mix1.sound1 / 100; // 볼륨
      history.audio1 = song1; // 음원 audio 객체
      history.setSong1 = setSong1; // 음원 setState
      history.icon1 = mix1.iconUrl1; // 아이콘 url
      history.state1 = mix1.asmrUrl1; //음원 url
      history.title1 = mix1.title1; // 음원 제목
    }

    if (mix2) {
      song2.src = mix2.asmrUrl2;
      song2.volume = mix2.sound2 / 100;
      history.audio2 = song2;
      history.setSong2 = setSong2;
      history.icon2 = mix2.iconUrl2;
      history.state2 = mix2.asmrUrl2;
      history.title2 = mix2.title2;
    }

    if (mix3) {
      song3.src = mix3.asmrUrl3;
      song3.volume = mix3.sound3 * 100;
      history.audio3 = song3;
      history.setSong3 = setSong3;
      history.icon3 = mix3.iconUrl3;
      history.state3 = mix3.asmrUrl3;
      history.title3 = mix3.title3;
    }

    if (mix4) {
      song4.src = mix4.asmrUrl4;
      song4.volume = mix4.sound4 * 100;
      history.audio4 = song4;
      history.setSong4 = setSong4;
      history.icon4 = mix4.iconUrl4;
      history.state4 = mix4.asmrUrl4;
      history.title4 = mix4.title;
    }
  };

  const playSoundTrack = async () => {
    await playSoundSetting();
    history.play = play;
    history.setPlay = setPlay;
    history.setPlaybar(play);
  };

  return (
    <>
      <Wrap>
        <PlayIcon key={key}>
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
