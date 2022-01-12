import React from "react";
import styled from "styled-components";

// --- components ---
import Icon from "../../elements/Icon";

// --- images ---
import Vector from "../../static/images/mixList/vector.png";

const MixSoundTrack = (props) => {
  const { key, mixTitle, mix1, mix2, mix3, mix4 } = props;

  const play = () => {
    console.log("음원이가 재생 되어야 한다네");
  };

  return (
    <>
      <Wrap>
        <PlayIcon key={key}>
          <Icon
            width="30px"
            height="30px"
            position="relative"
            top="10px"
            left="10px"
            src={Vector}
            alt="playIcon"
            _onClick={play}
          ></Icon>
        </PlayIcon>
        <Text>{mixTitle}</Text>
      </Wrap>
      <Hr></Hr>
    </>
  );
};

const Wrap = styled.div`
  width: 295px;
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
`;

const PlayIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.main_1};
  margin-top: 20px;
  margin-left: 20px;
`;

const Text = styled.p`
  color: white;
  margin-top: 30px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeight.base};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
`;

const Hr = styled.hr`
  width: 295px;
  border: 1px solid #ffffff;
  margin: auto;
  opacity: 0.1;
`;

export default MixSoundTrack;
