import { fontWeight, margin, textAlign } from "@mui/system";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { history } from "../redux/configureStore";
import { test } from "../pages/Asmr";

const AsmrPopUp = ({
  closeModal,
  test1,
  list,
  play,
  play2,
  play3,
  setPlay,
  setPlay2,
  setPla3,
}) => {
  //   const [modal, setModal] = React.useState(true); // 모달창

  const [song1, setSong1] = React.useState(play);
  const [song2, setSong2] = React.useState(play2);
  const [song3, setSong3] = React.useState(play3);
  const [Volume, setVolume] = React.useState(song1.volume * 100);
  const [Volume2, setVolume2] = React.useState(song2.volume * 100);
  const [Volume3, setVolume3] = React.useState(song3.volume * 100);
  // play.pause()   // props로 가져온걸 그대로 쓰거나
  // song1.volume=0.1;   //useState로 담아서 쓰거나 결정, 반응에 따라 선택할것

  // var x = document.getElementById("hz").value;
  // document.getElementById("demo").innerHTML = x;

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
    if (song1) {
      console.log(list);
      test(list);
      song1.pause();
      setPlay(new Audio());
      var arr = [];
      if (list.includes(list[0])) {
        // 비활성화
        arr = [...list];
        console.log(arr);
        arr = arr.filter((item) => {
          if (list[0] !== item) {
            return item;
          }
        });
      }
      test1(arr);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Modal
        isOpen={true}
        ariaHideApp={false}
        onRequestClose={() => closeModal(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0)",
          },
          content: {
            position: "absolute",
            zIndex: "1",
            top: "250px",
            left: "10%",
            width: "80%",
            height: "40%",
            border: "1px solid #ccc",
            background: "#C4C4C4ff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "30px 30px 0px 0px",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <div>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "700",
              textAlign: "center",
              margin: "40px 0px 0px 0px",
            }}
          >
            플레이중인 오디오
          </p>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "500",
              textAlign: "center",
              margin: "10px 0px 0px 0px",
            }}
          >
            볼륨조절
            {Volume}%
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <input
              type="range"
              id="volume"
              value={Volume}
              min="0"
              max="100"
              onChange={VolumeChange}
            />
            <p onClick={deleteVolume}>delete</p>
          </div>

          {song2.src !== "" ? (
            <>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  textAlign: "center",
                  margin: "10px 0px 0px 0px",
                }}
              >
                볼륨조절
                {Volume2}%
              </p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <input
                  type="range"
                  id="volume2"
                  value={Volume2}
                  min="0"
                  max="100"
                  onChange={VolumeChange2}
                />
                <p onClick={() => console.log("삭제")}>delete</p>
              </div>
            </>
          ) : null}
          {song3.src !== "" ? (
            <>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  textAlign: "center",
                  margin: "10px 0px 0px 0px",
                }}
              >
                볼륨조절
                {Volume3}%
              </p>
              <input
                type="range"
                id="volume3"
                value={Volume3}
                min="0"
                max="100"
                onChange={VolumeChange3}
              />
            </>
          ) : null}
        </div>
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
            style={{ width: "100%", height: "50px", border: "none" }}
            onClick={() => closeModal(false)} //  나중에 볼륨조절한거 데이터를 dispatch 해서 넣는걸 하면 될듯하다
          >
            x
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AsmrPopUp;
