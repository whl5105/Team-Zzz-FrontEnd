import React, { useState, useContext } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { ThemeContext } from "../shared/ThemeContext";

import { arrow_L_W } from "../static/images";
import SoundTrack from "../components/asmr/SoundTrack";
import RequireLogin from "../components/RequireLogin";
import PlayList from "../components/mixList/MixTitle";
import { Button, Icon } from "../elements/index";

const AsmrVolumeControl = (props) => {
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
    setPlaybar,
  } = useContext(ThemeContext);

  const [volume1, setVolume1] = useState(song1 && song1.volume * 100);
  const [volume2, setVolume2] = useState(song2 && song2.volume * 100);
  const [volume3, setVolume3] = useState(song3 && song3.volume * 100);
  const [volume4, setVolume4] = useState(song4 && song4.volume * 100);

  const [playListModal, setPlayListModal] = useState(false);
  const [requireLoginModal, setRequireLoginModal] = useState(false);

  const closePlayListModal = () => {
    setPlayListModal(false);
  };

  const closeRequireModal = () => {
    setRequireLoginModal(false);
  };

  const loginModal = () => {
    setRequireLoginModal(false);
    history.push("/user/login");
  };

  const [guidance, setGuidance] = useState();
  const [guidanceTitle, setGuidanceTitle] = useState();
  let arr = [];

  const deleteSong = (song) => {
    if (song.src === song1.src) {
      history.title1 = "";
      history.icon1 = "";
      song1.pause();
      setSong1(new Audio());

      deleteSoundTrack(song1.src);
    } else if (song.src === song2.src) {
      history.title2 = "";
      history.icon2 = "";
      song2.pause();

      deleteSoundTrack(song2.src);

      setSong2(new Audio());
    } else if (song.src === song3.src) {
      history.title3 = "";
      history.icon3 = "";
      song3.pause();

      deleteSoundTrack(song3.src);

      setSong3(new Audio());
    } else if (song.src === song4.src) {
      history.title4 = "";
      history.icon4 = "";
      song4.pause();

      deleteSoundTrack(song4.src);

      setSong4(new Audio());
    }

    setPlay(arr);
    setPlaybar(arr);
  };

  const deleteSoundTrack = (src) => {
    if (play.includes(src)) {
      arr = play.filter((item) => {
        if (src !== item) {
          return item;
        }
      });
    }
  };

  const close = () => {
    history.push("/asmr");
  };

  const titleWrite = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRequireLoginModal(true);
    } else {
      setPlayListModal(true);
    }
  };

  return (
    <>
      <Container>
        <Icon src={arrow_L_W} top="22px" position="relative" _onClick={close} />
        {play ? (
          <>
            {play.length === 0 ? (
              <NoSoundList>
                <p id="content">선택된 소리가 없어요!</p>
                <p id="subContent">
                  나만의 믹스를 만드려면 <br /> 소리를 선택해 주세요
                </p>
              </NoSoundList>
            ) : (
              <>
                <SongList>
                  {song1 && song1.src !== "" && (
                    <SoundTrack
                      setVolume={setVolume1}
                      song={song1}
                      icon={history.icon1}
                      title={history.title1}
                      id="volume1"
                      volume={volume1}
                      deleteSong={deleteSong}
                      guidance={guidance}
                      setGuidance={setGuidance}
                      guidanceTitle={guidanceTitle}
                      setGuidanceTitle={setGuidanceTitle}
                    />
                  )}
                  {song2 && song2.src !== "" && (
                    <SoundTrack
                      setVolume={setVolume2}
                      song={song2}
                      icon={history.icon2}
                      title={history.title2}
                      id="volume2"
                      volume={volume2}
                      deleteSong={deleteSong}
                      guidance={guidance}
                      setGuidance={setGuidance}
                      guidanceTitle={guidanceTitle}
                      setGuidanceTitle={setGuidanceTitle}
                    />
                  )}
                  {song3 && song3.src !== "" && (
                    <SoundTrack
                      setVolume={setVolume3}
                      song={song3}
                      icon={history.icon3}
                      title={history.title3}
                      id="volume3"
                      volume={volume3}
                      deleteSong={deleteSong}
                      guidance={guidance}
                      setGuidance={setGuidance}
                      guidanceTitle={guidanceTitle}
                      setGuidanceTitle={setGuidanceTitle}
                    />
                  )}
                  {song4 && song4.src !== "" && (
                    <SoundTrack
                      setVolume={setVolume4}
                      song={song4}
                      icon={history.icon4}
                      title={history.title4}
                      id="volume4"
                      volume={volume4}
                      deleteSong={deleteSong}
                      guidance={guidance}
                      setGuidance={setGuidance}
                      guidanceTitle={guidanceTitle}
                      setGuidanceTitle={setGuidanceTitle}
                    />
                  )}

                  <Button
                    type="bgBtn"
                    size="16"
                    marginT="0"
                    _onClick={titleWrite}
                  >
                    내 믹스 저장하기
                  </Button>
                </SongList>

                {requireLoginModal ? (
                  <RequireLogin close={closeRequireModal} move={loginModal} />
                ) : (
                  playListModal && <PlayList close={closePlayListModal} />
                )}
              </>
            )}
          </>
        ) : (
          history.push("/asmr")
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg};
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px ${({ theme }) => theme.paddings.xxxxl} 0;
  box-sizing: border-box;
`;

const NoSoundList = styled.div`
  width: 100%;
  border-radius: 12px;
  margin-top: 40px;
  padding: 0px 20px;
  padding-top: 20px;
  box-sizing: border-box;
  text-align: center;
  margin-top: 258px;

  & #content {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
    margin-bottom: 12px;
  }

  & #subContent {
    color: ${({ theme }) => theme.colors.gray_5};
    font-size: ${({ theme }) => theme.fontSizes.ssmall};
    font-weight: ${({ theme }) => theme.fontWeight.Regular};
  }
`;

const SongList = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.back};
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 12px;
  margin-top: 40px;
  padding: 20px 20px;
  box-sizing: border-box;
`;

export default AsmrVolumeControl;
