import { fontWeight, margin, textAlign } from "@mui/system";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { history } from "../redux/configureStore";
import { deleteSong } from "../pages/Asmr";

const AsmrPopUp = (props) => {
  //   const [modal, setModal] = React.useState(true); // 모달창

  const [song1, setSong1] = React.useState(props.play);
  const [song2, setSong2] = React.useState(props.play2);
  const [song3, setSong3] = React.useState(props.play3);
  const [Volume, setVolume] = React.useState(song1.volume * 100);
  const [Volume2, setVolume2] = React.useState(song2.volume * 100);
  const [Volume3, setVolume3] = React.useState(song3.volume * 100);
  // play.pause()   // props로 가져온걸 그대로 쓰거나
  // song1.volume=0.1;   //useState로 담아서 쓰거나 결정, 반응에 따라 선택할것

  // var x = document.getElementById("hz").value;
  // document.getElementById("demo").innerHTML = x;
  // console.log(song1.src)
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
      <Modal
        isOpen={true}
        ariaHideApp={false}
        onRequestClose={() => props.closeModal(false)}
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
            height: "50%",
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
          {song1.src !== "" ? (
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
                <p>{song1.src}</p>
                <p onClick={deleteVolume}>delete</p>
              </div>
            </>
          ) : null}

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
                <p>{song2.src}</p>
                <p onClick={deleteVolume2}>delete</p>
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
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <input
                  type="range"
                  id="volume3"
                  value={Volume3}
                  min="0"
                  max="100"
                  onChange={VolumeChange3}
                />
                <p>{song3.src}</p>
                <p onClick={deleteVolume3}>delete</p>
              </div>
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
            onClick={() => props.closeModal(false)} //  나중에 볼륨조절한거 데이터를 dispatch 해서 넣는걸 하면 될듯하다
          >
            x
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AsmrPopUp;
