import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

// --- images ---
import backIcon from "../static/images/asmr/backIcon.svg";

// --- components ---
import SoundTrack from "../components/asmr/SoundTrack";
import PlayList from "../components/asmr/PlayList";
import Button from "../elements/Button";
import Icon from "../elements/Icon";

const AsmrPopUp = (props) => {
  const [song1, setSong1] = React.useState(history.audio1 && history.audio1);
  const [song2, setSong2] = React.useState(history.audio2 && history.audio2);
  const [song3, setSong3] = React.useState(history.audio3 && history.audio3);
  const [song4, setSong4] = React.useState(history.audio4 && history.audio4);
  const [volume1, setVolume1] = React.useState(song1 && song1.volume * 100);
  const [volume2, setVolume2] = React.useState(song2 && song2.volume * 100);
  const [volume3, setVolume3] = React.useState(song3 && song3.volume * 100);
  const [volume4, setVolume4] = React.useState(song4 && song4.volume * 100);
  const [songList, setSongList] = React.useState(history.play);

  const [playListModal, setPlayListModal] = React.useState(false);

  const deleteSong = (song) => {
    let arr = [];

    if (song.src === song1.src) {
      history.state1 = "";
      history.audio1 = "";
      history.title1 = "";
      history.icon1 = "";
      song1.pause();
      history.setSong1(new Audio());

      if (songList.includes(song1.src)) {
        // 비활성화
        arr = songList.filter((item) => {
          if (song1.src !== item) {
            return item;
          }
        });

        setSong1(new Audio());
      }
    } else if (song.src === song2.src) {
      history.state2 = "";
      history.audio2 = "";
      history.title2 = "";
      history.icon2 = "";
      song2.pause();
      history.setSong2(new Audio());

      if (songList.includes(song2.src)) {
        // 비활성화

        arr = songList.filter((item) => {
          if (song2.src !== item) {
            return item;
          }
        });

        setSong2(new Audio());
      }
    } else if (song.src === song3.src) {
      history.state3 = "";
      history.audio3 = "";
      history.title3 = "";
      history.icon3 = "";
      song3.pause();
      history.setSong3(new Audio());

      if (songList.includes(song3.src)) {
        // 비활성화
        arr = songList.filter((item) => {
          if (song3.src !== item) {
            return item;
          }
        });

        setSong3(new Audio());
      }
    } else if (song.src === song4.src) {
      history.state4 = "";
      history.audio4 = "";
      history.title4 = "";
      history.icon4 = "";
      song4.pause();
      history.setSong4(new Audio());

      if (history.play.includes(song4.src)) {
        // 비활성화
        arr = songList.filter((item) => {
          if (song4.src !== item) {
            return item;
          }
        });

        setSong4(new Audio());
      }
    }

    history.setPlay(arr);
    setSongList(arr);
  };

  const close = () => {
    history.push("/asmr");
  };

  const titleWrite = () => {
    setPlayListModal(true);
  };

  return (
    <>
      <Container>
        <Icon
          src={backIcon}
          top="22px"
          position="relative"
          _onClick={close}
        ></Icon>
        {songList ? (
          <>
            {songList.length === 0 ? (
              <NoSoundList>
                <p id="content">선택된 소리가 없어요!</p>
                <p id="subContent">
                  나만의 믹스를 만드려면 <br></br> 소리를 선택해 주세요
                </p>
              </NoSoundList>
            ) : (
              <>
                <SongList>
                  {song1 && song1.src !== "" ? (
                    <SoundTrack
                      setVolume={setVolume1}
                      song={song1}
                      icon={history.icon1}
                      title={history.title1}
                      id="volume1"
                      volume={volume1}
                      deleteSong={deleteSong}
                    ></SoundTrack>
                  ) : null}
                  {song2 && song2.src !== "" ? (
                    <SoundTrack
                      setVolume={setVolume2}
                      song={song2}
                      icon={history.icon2}
                      title={history.title2}
                      id="volume2"
                      volume={volume2}
                      deleteSong={deleteSong}
                    ></SoundTrack>
                  ) : null}
                  {song3 && song3.src !== "" ? (
                    <SoundTrack
                      setVolume={setVolume3}
                      song={song3}
                      icon={history.icon3}
                      title={history.title3}
                      id="volume3"
                      volume={volume3}
                      deleteSong={deleteSong}
                    ></SoundTrack>
                  ) : null}
                  {song4 && song4.src !== "" ? (
                    <SoundTrack
                      setVolume={setVolume4}
                      song={song4}
                      icon={history.icon4}
                      title={history.title4}
                      id="volume4"
                      volume={volume4}
                      deleteSong={deleteSong}
                    ></SoundTrack>
                  ) : null}

                  <Button
                    type="bgBtn"
                    size="16"
                    marginT="0"
                    _onClick={titleWrite} //  나중에 볼륨 조절 한 거 데이터를 dispatch 해서 넣는 걸 하면 될 듯 하다
                  >
                    내 믹스 저장하기
                  </Button>
                </SongList>

                {playListModal && (
                  <PlayList
                    modal={playListModal}
                    setPlayListModal={setPlayListModal}
                  ></PlayList>
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

// styled-components
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

export default AsmrPopUp;
