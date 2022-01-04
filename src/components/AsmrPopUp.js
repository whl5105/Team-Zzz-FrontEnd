import { fontWeight, margin, textAlign } from "@mui/system";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { history } from "../redux/configureStore";
import { deleteSong } from "../pages/Asmr";
import styled from "styled-components";

// 아이콘 이미지 import
import fireIcon from "../static/images/asmr/fireIcon.svg";
import rainIcon from "../static/images/asmr/rainIcon.svg";
import seaIcon from "../static/images/asmr/seaIcon.svg";


const AsmrPopUp = (props) => {
  //   const [modal, setModal] = React.useState(true); // 모달창

  const [song1, setSong1] = React.useState(props.play);
  const [song2, setSong2] = React.useState(props.play2);
  const [song3, setSong3] = React.useState(props.play3);
  const [Volume, setVolume] = React.useState(song1.volume * 100);
  const [Volume2, setVolume2] = React.useState(song2.volume * 100);
  const [Volume3, setVolume3] = React.useState(song3.volume * 100);
 
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
      song1.pause();
      props.setPlay(new Audio());
      var arr = [];
      if (props.list.includes(song1.src)) {
        // 비활성화
        arr = [...props.list];
        console.log(arr);
        arr = arr.filter((item) => {
          if (song1.src !== item) {
            return item;
          }
        });

        setSong1(new Audio());
      }
      props.setList(arr);
    }
  };
  const deleteVolume2 = (e) => {
    if (song2.src) {
      deleteSong(song2.src);
      song2.pause();
      props.setPlay2(new Audio());
      var arr = [];
      if (props.list.includes(song2.src)) {
        // 비활성화
        arr = [...props.list];
        console.log(arr);
        arr = arr.filter((item) => {
          if (song2.src !== item) {
            return item;
          }
        });
        console.log(song2.src);
        setSong2(new Audio());
      }
      props.setList(arr);
    }
  };
  const deleteVolume3 = (e) => {
    if (song3.src) {
      deleteSong(song3.src);
      song3.pause();
      props.setPlay3(new Audio());
      var arr = [];
      if (props.list.includes(song3.src)) {
        // 비활성화
        arr = [...props.list];
        console.log(arr);
        arr = arr.filter((item) => {
          if (song3.src !== item) {
            return item;
          }
        });
        console.log(song3.src);
        setSong3(new Audio());
      }
      props.setList(arr);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <FullScreen>
        <VolumePopUp>
          
            {/* <p
              style={{
                fontSize: "13px",
                fontWeight: "700",
                textAlign: "center",
                margin: "40px 0px 0px 0px",
                color: "white",
              }}
            >
              플레이중인 오디오
            </p> */}
            {song1.src !== "" ? (
              <>
                {/* <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    textAlign: "center",
                    margin: "10px 0px 0px 0px",
                    color: "white",
                  }}
                >
                  볼륨조절
                  {Volume}%
                </p> */}
                
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Icon categoryImage={fireIcon}> </Icon>
                  <input
                    type="range"
                    id="volume"
                    value={Volume}
                    min="0"
                    max="100"
                    onChange={VolumeChange}
                  />
                  {/* <p style={{ color: "white" }}>음원 이름</p> */}
                  <p
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      fontSize: "20px",
                      borderRadius: "5px",
                      height: "20px",
                    }}
                    onClick={deleteVolume}
                  >
                    x
                  </p>
                </div>
              </>
            ) : null}

            {song2.src !== "" ? (
              <>
                {/* <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    textAlign: "center",
                    margin: "10px 0px 0px 0px",
                  }}
                >
                  볼륨조절
                  {Volume2}%
                </p> */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Icon categoryImage={seaIcon}> </Icon>
                  <input
                    type="range"
                    id="volume2"
                    value={Volume2}
                    min="0"
                    max="100"
                    onChange={VolumeChange2}
                  />
                  {/* <p>음원 이름</p> */}
                  <p
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      fontSize: "20px",
                      borderRadius: "5px",
                      height: "20px",
                    }}
                    onClick={deleteVolume2}
                  >
                    x
                  </p>
                </div>
              </>
            ) : null}
            {song3.src !== "" ? (
              <>
                {/* <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    textAlign: "center",
                    margin: "10px 0px 0px 0px",
                  }}
                >
                  볼륨조절
                  {Volume3}%
                </p> */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Icon categoryImage={rainIcon}> </Icon>
                  <input
                    type="range"
                    id="volume3"
                    value={Volume3}
                    min="0"
                    max="100"
                    onChange={VolumeChange3}
                  />
                  {/* <p>음원 이름</p> */}
                  <p
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      fontSize: "20px",
                      borderRadius: "5px",
                      height: "20px",
                    }}
                    onClick={deleteVolume3}
                  >
                    x
                  </p>
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
            <button
              style={{ width: "100%", height: "50px", border: "none",  }}
              onClick={() => props.closeModal(false)} //  나중에 볼륨조절한거 데이터를 dispatch 해서 넣는걸 하면 될듯하다

            >
              나만의 사운드 듣기
            </button>
          </div>
        </VolumePopUp>
      </FullScreen>
    </>
  );
};

const FullScreen = styled.div`
  width: 100%;
  height: 812px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 990;
  position: absolute;
  bottom: 0;
`;

const VolumePopUp = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 999;
  background-color: #101340;
  width: 375px;
  height: 300px;
  box-sizing: border-box;
  border: 1px solid #272a52;
  border-radius: 16px 16px 0px 0px;
`;

const Icon = styled.div`
  width: 70px;
  height: 70px;
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  /* background-size: cover; */
  /* margin: 2px 0px; */
  /* cursor: pointer; */
`;

export default AsmrPopUp;
