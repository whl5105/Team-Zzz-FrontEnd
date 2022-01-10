import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { deleteSong } from "../pages/Asmr";
import { push } from "connected-react-router";

const PlayBar = (props) => {
  const [song1, setSong] = React.useState();
  const [toggle, setToggle] = React.useState(false);
  const [playbar, setPlaybar] = React.useState([]);
  //   console.log(list)
  history.setPlaybar = setPlaybar;

  const play = () => {
    history.audio1 && history.audio1.play();
    history.audio2 && history.audio2.play();
    history.audio3 && history.audio3.play();
    history.audio4 && history.audio4.play();
  };

  const pause = () => {
    //    setSong(history.audio1);
    history.audio1 && history.audio1.pause();
    history.audio2 && history.audio2.pause();
    history.audio3 && history.audio3.pause();
    history.audio4 && history.audio4.pause();
  };

  const reset = () => {
    if (history.audio1.src) {
      history.audio1.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state1);
        history.state1 = "";
        history.audio1 = "";
        history.title1 = "";
        history.icon1 = "";
        history.arr = [];
        history.setSong1(new Audio());
        history.setPlay([]); // 모든 음원 리스트 리셋
        console.log("여기");
      }

      //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
      history.state1 = "";
      history.audio1 = "";
      history.title1 = "";
      history.icon1 = "";
      history.setPlay([]); // 모든 음원 리스트 리셋
      history.arr = [];
      console.log(history);
    }
    if (history.audio2.src) {
      history.audio2.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state2);
        history.state2 = "";
        history.audio2 = "";
        history.title2 = "";
        history.icon2 = "";
        history.arr = [];
        history.setSong2(new Audio());
        history.setPlay([]); // 모든 음원 리스트 리셋
        console.log("여기");
      }

      //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
      history.state2 = "";
      history.audio2 = "";
      history.title2 = "";
      history.icon2 = "";
      history.setPlay([]); // 모든 음원 리스트 리셋
      history.arr = [];
      console.log(history);
    }
    if (history.audio3.src) {
      history.audio3.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state3);
        history.state3 = "";
        history.audio3 = "";
        history.title3 = "";
        history.icon3 = "";
        history.arr = [];
        history.setSong3(new Audio());
        history.setPlay([]); // 모든 음원 리스트 리셋
        console.log("여기");
      }

      //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
      history.state3 = "";
      history.audio3 = "";
      history.title3 = "";
      history.icon3 = "";
      history.setPlay([]); // 모든 음원 리스트 리셋
      history.arr = [];
      console.log(history);
    }
    if (history.audio4.src) {
      history.audio4.pause();
      if (history.location.pathname === "/asmr") {
        deleteSong(history.state4);
        history.state4 = "";
        history.audio4 = "";
        history.title4 = "";
        history.icon4 = "";
        history.arr = [];
        history.setSong4(new Audio());
        history.setPlay([]); // 모든 음원 리스트 리셋
        console.log("여기");
      }

      //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
      history.state4 = "";
      history.audio4 = "";
      history.title4 = "";
      history.icon4 = "";
      history.setPlay([]); // 모든 음원 리스트 리셋
      history.arr = [];
      console.log(history);
    }
  };

  return (
    <React.Fragment>
      {playbar.length > 0 ? (
        <Wrap>
          {toggle ? (
            <>
              <Text>pause...</Text>
              <Button
                onClick={() => history.push("/asmrPop")}
              >{`setting`}</Button>
              <Button
                onClick={() => (play(), setToggle(!toggle))}
              >{`>`}</Button>
            </>
          ) : (
            <>
              <Text>playing...</Text>
              <Button
                onClick={() => history.push("/asmrPop")}
              >{`setting`}</Button>
              <Button onClick={() => (pause(), setToggle(!toggle))}>||</Button>
            </>
          )}
          <Button onClick={() => (reset(), setPlaybar([]))}>{`x`}</Button>
        </Wrap>
      ) : null}
    </React.Fragment>
  );
};

const Wrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  top: 680px;
  left: 40px;
  width: 300px;
  height: 50px;
  background: rgba(100, 100, 100, 0.6);
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  color: white;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
`;

export default PlayBar;
