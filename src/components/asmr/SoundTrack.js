import React from "react";
import styled from "styled-components";

// --- images ---
import closeIcon from "../../static/images/asmr/closeIcon.svg";

const SoundTrack = (props) => {
  const changeVolume = (e) => {
    props.setVolume(e.target.value);
    props.song.volume = e.target.value * 0.01; // 볼륨 바의 value 범위를 1~100에서 주었고 audio경우 0~1 이 범위이기때문에 0.01을 곱해줌
  };

  return (
    <>
      <Record>
        <Sound>
          <IconImage>
            <Image src={props.icon} alt=""></Image>
            <Text>{props.title}</Text>
          </IconImage>
        </Sound>

        <Volume
          type="range"
          id={props.id}
          value={props.volume}
          min="0"
          max="100"
          onChange={changeVolume}
        />
        <Icon
          categoryImage={closeIcon}
          onClick={() => {
            props.deleteSong(props.song);
          }}
        ></Icon>
      </Record>
    </>
  );
};

const Record = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
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

const IconImage = styled.div`
  position: relative;
  top: 15px;
  left: 0;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
`;

const Volume = styled.input`
  width: 158px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${(props) => props.categoryImage});
  background-repeat: no-repeat;
  position: relative;
  top: 22px;
  cursor: pointer;
`;

export default SoundTrack;
