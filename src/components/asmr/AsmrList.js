import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../shared/ThemeContext";

import { Icon } from "../../elements/index";

const AsmrList = (props) => {
  const { soundTrack, select } = props;

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
  } = useContext(ThemeContext);

  useEffect(() => {
    let playArr = [];

    if (play && soundTrack) {
      soundTrack.forEach((item) => {
        if (play.includes(item.asmrUrl)) {
          const activation = document.getElementById(item.asmrUrl);
          activation.style.backgroundColor = "#FBC037";
        }
      });

      if (song1.src) {
        setSong1(song1);
        playArr = [...playArr, song1.src];
      }

      if (song2.src) {
        setSong2(song2);
        playArr = [...playArr, song2.src];
      }

      if (song3.src) {
        setSong3(song3);
        playArr = [...playArr, song3.src];
      }

      if (song4.src) {
        setSong4(song4);
        playArr = [...playArr, song4.src];
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
              <Icon src={item.iconUrl} alt={item.title} />
              <Text>{item.title}</Text>
            </Sound>
          );
        })}
      </SoundSelect>
    </>
  );
};

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
