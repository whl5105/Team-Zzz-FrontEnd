import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useLocation } from "react-router-dom";

// images
import closeIcon from "../static/images/asmr/closeIcon.svg";

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

  React.useEffect(() => {
    console.log(song1, song2, song3, song4);
  }, []);

  const changeVolume1 = (e) => {
    setVolume(e.target.value);
    song1.volume = e.target.value * 0.01;
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
      <FullScreen>
        <VolumePopUp>
          {songList ? (
            <>
              {songList.length === 0 ? (
                <NoList>선택된 소리가 없어요!</NoList>
              ) : null}
            </>
          ) : (
            history.push("/asmr")
          )}

          {song1 && song1.src !== "" ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "0px 0px 12px 0px",
                }}
              >
                <Sound>
                  <div
                    style={{
                      position: "relative",
                      top: "15px",
                      left: "0",
                    }}
                  >
                    <Image src={`${location.play1Icon}`} alt=""></Image>
                    <Text>{location.title1}</Text>
                  </div>
                </Sound>

                <input
                  type="range"
                  id="volume"
                  value={volume1}
                  min="0"
                  max="100"
                  style={{ width: "158px", cursor: "pointer" }}
                  onChange={changeVolume1}
                />
                <Icon
                  categoryImage={closeIcon}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    deleteSong(song1);
                  }}
                  style={{ position: "relative", top: "22px", left: "-10px" }}
                ></Icon>
              </div>
            </>
          ) : null}

          {song2 && song2.src !== "" ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "0px 0px 12px 0px",
                }}
              >
                <Sound>
                  <div
                    style={{
                      position: "relative",
                      top: "15px",
                    }}
                  >
                    <Image src={`${location.play2Icon}`} alt=""></Image>
                    <Text>{location.title2}</Text>
                  </div>
                </Sound>

                <input
                  type="range"
                  id="volume2"
                  value={volume2}
                  min="0"
                  max="100"
                  style={{ width: "158px" }}
                  onChange={changeVolume2}
                />
                <Icon
                  categoryImage={closeIcon}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    deleteSong(song2);
                  }}
                  style={{ position: "relative", top: "22px", left: "-10px" }}
                ></Icon>
              </div>
            </>
          ) : null}
          {song3 && song3.src !== "" ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "0px 0px 12px 0px",
                }}
              >
                <Sound>
                  <div
                    style={{
                      position: "relative",
                      top: "15px",
                    }}
                  >
                    <Image src={`${location.play3Icon}`} alt=""></Image>
                    <Text>{location.title3}</Text>
                  </div>
                </Sound>
                <input
                  type="range"
                  id="volume3"
                  value={volume3}
                  min="0"
                  max="100"
                  style={{ width: "158px" }}
                  onChange={changeVolume3}
                />
                <Icon
                  categoryImage={closeIcon}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    deleteSong(song3);
                  }}
                  style={{ position: "relative", top: "22px", left: "-10px" }}
                ></Icon>
              </div>
            </>
          ) : null}
          {song4 && song4.src !== "" ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "0px 0px 12px 0px",
                }}
              >
                <Sound>
                  <div
                    style={{
                      position: "relative",
                      top: "15px",
                    }}
                  >
                    <Image src={`${location.play4Icon}`} alt=""></Image>
                    <Text>{location.title4}</Text>
                  </div>
                </Sound>
                <input
                  type="range"
                  id="volume4"
                  value={volume4}
                  min="0"
                  max="100"
                  style={{ width: "158px" }}
                  onChange={changeVolume4}
                />
                <Icon
                  categoryImage={closeIcon}
                  width="24px"
                  height="24px"
                  onClick={() => {
                    deleteSong(song4);
                  }}
                  style={{ position: "relative", top: "22px", left: "-10px" }}
                ></Icon>
              </div>
            </>
          ) : null}
          <div
            style={{
              display: "flex",
              alignContent: "flex-end",
              position: "absolute",
              bottom: "0px",
              width: "100%",
            }}
          >
            <Button
              onClick={close} //  나중에 볼륨조절한거 데이터를 dispatch 해서 넣는걸 하면 될듯하다
            >
              창닫기
            </Button>
          </div>
        </VolumePopUp>
      </FullScreen>
    </>
  );
};

// styled-components
const FullScreen = styled.div`
  width: 100%;
  height: 812px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 990;
  position: absolute;
  top: 0;
  left: 0;
`;

const VolumePopUp = styled.div`
  /* position: absolute;
  bottom: 0;
  z-index: 999; */
  background-color: #101340;
  width: 100%;
  height: 812px;
  box-sizing: border-box;
  border: 1px solid #272a52;
  border-radius: 16px 16px 0px 0px;
  padding: 20px 0px 0px 10px;
`;

// const CloseVolume = styled.div`
//   height: 55%;
//   width: 375px;
// `;

const NoList = styled.p`
  width: 100%;
  color: white;
  position: relative;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 250px; // 세로 가운데 정렬
  letter-spacing: 0.3px;
`;

const Icon = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  width: 90%;
  height: 52px;
  border: none;
  border-radius: 8px;
  position: relative;
  top: -30px;
  left: 10px;
  color: #fff;
  background-color: #fbc037;
`;

const Sound = styled.div`
  width: 70px;
  height: 70px;
  /* padding-top: 15px; */
  border-radius: 8px;
  background-color: #3a3e74;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  /* margin-top: 20px; */
  /* margin-right: 21px; */
  /* margin-left: 20px; */
  text-align: center;
  cursor: pointer;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

export default AsmrPopUp;
