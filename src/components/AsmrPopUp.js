import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useLocation } from "react-router-dom";

// images
import closeIcon from "../static/images/asmr/closeIcon.svg";
import backIcon from "../static/images/asmr/backIcon.svg";

const AsmrPopUp = (props) => {
  const location = useLocation();
  const [song1, setSong1] = React.useState(location.play1 && location.play1);
  const [song2, setSong2] = React.useState(location.play2 && location.play2);
  const [song3, setSong3] = React.useState(location.play3 && location.play3);
  const [song4, setSong4] = React.useState(location.play4 && location.play4);
  const [volume1, setVolume] = React.useState(song1 && song1.volume * 100);
  const [volume2, setVolume2] = React.useState(song2 && song2.volume * 100);
  const [volume3, setVolume3] = React.useState(song3 && song3.volume * 100);
  const [volume4, setVolume4] = React.useState(song4 && song4.volume * 100);
  const [songList, setSongList] = React.useState(location.list);

  const changeVolume1 = (e) => {
    setVolume(e.target.value);
    song1.volume = e.target.value * 0.01; // 볼륨 바의 value 범위를 1~100에서 주었고 audio경우 0~1 이 범위이기때문에 0.01을 곱해줌
  };

  const changeVolume2 = (e) => {
    setVolume2(e.target.value);
    song2.volume = e.target.value * 0.01;
  };

  const changeVolume3 = (e) => {
    setVolume3(e.target.value);
    song3.volume = e.target.value * 0.01;
  };
  
  const changeVolume4 = (e) => {
    setVolume4(e.target.value);
    song4.volume = e.target.value * 0.01;
  };

  const deleteSong = (song) => {
    let arr = [];

    if (song.src === song1.src) {
      history.state1 = "";
      history.audio1 = "";
      history.title1 = "";
      history.icon1 = "";
      song1.pause();
      location.setPlay1(new Audio());

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
      location.setPlay2(new Audio());

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
      location.setPlay3(new Audio());

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
      location.setPlay4(new Audio());

      if (location.list.includes(song4.src)) {
        // 비활성화
        arr = songList.filter((item) => {
          if (song4.src !== item) {
            return item;
          }
        });

        setSong4(new Audio());
      }
    }

    location.setList(arr);
    setSongList(arr);
  };

  const close = () => {
    history.push("/asmr");
  };

  return (
    <>
      <Container>
        <Icon
          categoryImage={backIcon}
          width="24px"
          height="24px"
          onClick={close}
          style={{ position: "relative", top: "20px", bottom: "20px" }}
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
                    <>
                      <Record>
                        <Sound>
                          <IconImage>
                            <Image src={`${location.play1Icon}`} alt=""></Image>
                            <Text>{location.title1}</Text>
                          </IconImage>
                        </Sound>

                        <Volume
                          type="range"
                          id="volume"
                          value={volume1}
                          min="0"
                          max="100"
                          onChange={changeVolume1}
                        />
                        <Icon
                          categoryImage={closeIcon}
                          width="24px"
                          height="24px"
                          onClick={() => {
                            deleteSong(song1);
                          }}
                        ></Icon>
                      </Record>
                    </>
                  ) : null}

                  {song2 && song2.src !== "" ? (
                    <>
                      <Record>
                        <Sound>
                          <IconImage>
                            <Image src={`${location.play2Icon}`} alt=""></Image>
                            <Text>{location.title2}</Text>
                          </IconImage>
                        </Sound>

                        <Volume
                          type="range"
                          id="volume2"
                          value={volume2}
                          min="0"
                          max="100"
                          onChange={changeVolume2}
                        />
                        <Icon
                          categoryImage={closeIcon}
                          width="24px"
                          height="24px"
                          onClick={() => {
                            deleteSong(song2);
                          }}
                        ></Icon>
                      </Record>
                    </>
                  ) : null}
                  {song3 && song3.src !== "" ? (
                    <>
                      <Record>
                        <Sound>
                          <IconImage>
                            <Image src={`${location.play3Icon}`} alt=""></Image>
                            <Text>{location.title3}</Text>
                          </IconImage>
                        </Sound>
                        <Volume
                          type="range"
                          id="volume3"
                          value={volume3}
                          min="0"
                          max="100"
                          onChange={changeVolume3}
                        />
                        <Icon
                          categoryImage={closeIcon}
                          width="24px"
                          height="24px"
                          onClick={() => {
                            deleteSong(song3);
                          }}
                        ></Icon>
                      </Record>
                    </>
                  ) : null}
                  {song4 && song4.src !== "" ? (
                    <>
                      <Record>
                        <Sound>
                          <IconImage>
                            <Image src={`${location.play4Icon}`} alt=""></Image>
                            <Text>{location.title4}</Text>
                          </IconImage>
                        </Sound>
                        <Volume
                          type="range"
                          id="volume4"
                          value={volume4}
                          min="0"
                          max="100"
                          onChange={changeVolume4}
                        />
                        <Icon
                          categoryImage={closeIcon}
                          width="24px"
                          height="24px"
                          onClick={() => {
                            deleteSong(song4);
                          }}
                        ></Icon>
                      </Record>
                    </>
                  ) : null}
                </SongList>
                <Button
                  onClick={close} //  나중에 볼륨 조절 한 거 데이터를 dispatch 해서 넣는 걸 하면 될 듯 하다
                >
                  내 믹스 저장하기
                </Button>
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

const Record = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 40px;
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
  height: 440px;
  background-color: ${({ theme }) => theme.colors.back};
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 12px;
  margin-top: 40px;
  padding: 0px 20px;
  padding-top: 20px;
  box-sizing: border-box;
`;

const IconImage = styled.div`
  position: relative;
  top: 15px;
  left: 0;
`;

const Icon = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  position: relative;
  top: 22px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  width: 335px;
  height: 52px;
  border: none;
  border-radius: 8px;
  position: absolute;
  bottom: 80px;
  color: #fff;
  background-color: #fbc037;
`;

const Sound = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background-color: #3a3e74;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  text-align: center;
  cursor: pointer;
`;

const Volume = styled.input`
  width: 158px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

export default AsmrPopUp;
