import React from "react";
import styled from "styled-components";

// -- components --
import Icon from "../../elements/Icon";

const AsmrList = (props) => {
  const { soundTrack, select } = props;

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
              <Icon src={item.iconUrl}></Icon>
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
  width: 100%;
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
