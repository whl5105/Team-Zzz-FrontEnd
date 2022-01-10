import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";

// images
import closeIcon from "../static/images/asmr/closeIcon.svg";

// components
import { deleteSong } from "../pages/Asmr";

const AsmrPopUp = (props) => {
  const [song1, setSong1] = React.useState(props.play);
  const [song2, setSong2] = React.useState(props.play2);
  const [song3, setSong3] = React.useState(props.play3);
  const [Volume, setVolume] = React.useState(song1.volume * 100);
  const [Volume2, setVolume2] = React.useState(song2.volume * 100);
  const [Volume3, setVolume3] = React.useState(song3.volume * 100);
  const [songList, setSongList] = React.useState(props.list);

  const VolumeChange = (e) => {
    setVolume(e.target.value);
    song1.volume = e.target.value * 0.01;
  };
  const VolumeChange2 = (e) => {
    setVolume2(e.target.value);
    song2.volume = e.target.value * 0.01;
  };
  const VolumeChange3 = (e) => {
    setVolume3(e.target.value);
    song3.volume = e.target.value * 0.01;
  };

  const deleteVolume = (e) => {
    if (song1.src) {
      deleteSong(song1.src);
      history.state = "";
      history.audio = "";
      history.title = "";
      history.icon = "";
      song1.pause();
      props.setPlay(new Audio());
      let arr = [];
      if (props.list.includes(song1.src)) {
        // 비활성화
        arr = [...props.list];
        console.log(arr);
        // eslint-disable-next-line array-callback-return

        arr = arr.filter((item) => {
          if (song1.src !== item) {
            return item;
          }
        });

        setSong1(new Audio());
      }
      props.setList(arr);
      setSongList(arr);
    }
  };
  const deleteVolume2 = (e) => {
    if (song2.src) {
      deleteSong(song2.src);
      history.state2 = "";
      history.audio2 = "";
      history.title2 = "";
      history.icon2 = "";
      song2.pause();
      props.setPlay2(new Audio());
      let arr = [];
      if (props.list.includes(song2.src)) {
        // 비활성화
        arr = [...props.list];
        console.log(arr);
        // eslint-disable-next-line array-callback-return
        arr = arr.filter((item) => {
          if (song2.src !== item) {
            return item;
          }
        });
        setSong2(new Audio());
      }
      props.setList(arr);
      setSongList(arr);
      console.log(songList);
    }
  };
  const deleteVolume3 = (e) => {
    if (song3.src) {
      deleteSong(song3.src);
      history.state3 = "";
      history.audio3 = "";
      history.title3 = "";
      history.icon3 = "";
      song3.pause();
      props.setPlay3(new Audio());
      var arr = [];
      if (props.list.includes(song3.src)) {
        // 비활성화
        arr = [...props.list];
        console.log(arr);
        // eslint-disable-next-line array-callback-return
        arr = arr.filter((item) => {
          if (song3.src !== item) {
            return item;
          }
        });
        console.log(song3.src);
        setSong3(new Audio());
      }
      props.setList(arr);
      setSongList(arr);
    }
  };

  return (
    <>
      <FullScreen>
        <CloseVolume onClick={() => props.closeModal(false)}></CloseVolume>
        <VolumePopUp>
          {songList.length === 0 && (
            <>
              <NoList>선택된 소리가 없어요!</NoList>
            </>
          )}

          {song1.src !== "" ? (
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
                    <Image src={`${props.playIcon}`} alt=""></Image>
                    <Text>{props.title}</Text>
                  </div>
                </Sound>

                <input
                  type="range"
                  id="volume"
                  value={Volume}
                  min="0"
                  max="100"
                  style={{ width: "158px", cursor: "pointer" }}
                  onChange={VolumeChange}
                />
                <Icon
                  categoryImage={closeIcon}
                  width="24px"
                  height="24px"
                  onClick={deleteVolume}
                  style={{ position: "relative", top: "22px", left: "-10px" }}
                ></Icon>
              </div>
            </>
          ) : null}

          {song2.src !== "" ? (
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
                    <Image src={`${props.play2Icon}`} alt=""></Image>
                    <Text>{props.title2}</Text>
                  </div>
                </Sound>

                <input
                  type="range"
                  id="volume2"
                  value={Volume2}
                  min="0"
                  max="100"
                  style={{ width: "158px" }}
                  onChange={VolumeChange2}
                />
                <Icon
                  categoryImage={closeIcon}
                  width="24px"
                  height="24px"
                  onClick={deleteVolume2}
                  style={{ position: "relative", top: "22px", left: "-10px" }}
                ></Icon>
              </div>
            </>
          ) : null}
          {song3.src !== "" ? (
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
                    <Image src={`${props.play3Icon}`} alt=""></Image>
                    <Text>{props.title3}</Text>
                  </div>
                </Sound>
                <input
                  type="range"
                  id="volume3"
                  value={Volume3}
                  min="0"
                  max="100"
                  style={{ width: "158px" }}
                  onChange={VolumeChange3}
                />
                <Icon
                  categoryImage={closeIcon}
                  width="24px"
                  height="24px"
                  onClick={deleteVolume3}
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
              onClick={() => props.closeModal(false)} //  나중에 볼륨조절한거 데이터를 dispatch 해서 넣는걸 하면 될듯하다
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
  /* height: 812px; */
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 990;
  position: absolute;
  top: 0;
  left: 0;
`;

const VolumePopUp = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 999;
  background-color: #101340;
  width: 100%;
  height: 356px;
  box-sizing: border-box;
  border: 1px solid #272a52;
  border-radius: 16px 16px 0px 0px;
  padding: 20px 0px 0px 10px;
`;

const CloseVolume = styled.div`
  height: 55%;
  width: 375px;
`;

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
