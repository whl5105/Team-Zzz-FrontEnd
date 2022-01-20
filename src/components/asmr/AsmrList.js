import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

// -- components --
import { Icon } from "../../elements/index";

const AsmrList = (props) => {
  const {
    soundTrack,
    select,
    setSong1,
    setSong2,
    setSong3,
    setSong4,
    setPlay,
  } = props;

  useEffect(() => {
    let playArr = [];
    if (history.play && soundTrack) {
      soundTrack.forEach((item) => {
        if (history.play.includes(item.asmrUrl)) {
          const activation = document.getElementById(item.asmrUrl);
          activation.style.backgroundColor = "#FBC037";
        }
      });

      if (history.audio1) {
        setSong1(history.audio1);
        playArr = [...playArr, history.audio1.src];
      }
      if (history.audio2) {
        setSong2(history.audio2);
        playArr = [...playArr, history.audio2.src];
      }
      if (history.audio3) {
        setSong3(history.audio3);
        playArr = [...playArr, history.audio3.src];
      }
      if (history.audio4) {
        setSong4(history.audio4);
        playArr = [...playArr, history.audio4.src];
      }

      setPlay(playArr);
    }
  }, [soundTrack]);

  return (
    <>
      <SoundSelect>
        {soundTrack.map((item) => {
          return (
            <Sound
              id={item.asmrUrl}
              key={item.asmrUrl}
              onClick={() => {
                select(item.asmrUrl, item.iconUrl, item.title);
              }}
            >
              <Icon src={item.iconUrl} />
              <Text>{item.title}</Text>
            </Sound>
          );
        })}
      </SoundSelect>
    </>
  );
};

// --- styled-components ---
const SoundSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-height: calc(100% - 262px);
  margin-top: 20px;
  padding-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Sound = styled.div`
  width: 70px;
  height: 53px;
  padding-top: 17px;
  padding-bottom: 5px;
  border-radius: 8px;
  background-color: #3a3e74;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  margin: auto;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

export default AsmrList;
