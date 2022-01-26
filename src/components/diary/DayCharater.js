import React, { useMemo } from "react";
import styled from "styled-components";
import { Charater } from "../../elements/index";

const DayCharater = ({ feel, scoreColor, newData }) => {
  return (
    <div>
      <CharaterBox>
        <p>{newData}</p>
        <Charater
          shape="charater"
          size="85"
          feelNumber={feel}
          scoreColor={scoreColor}
        />
      </CharaterBox>
    </div>
  );
};
const CharaterBox = styled.div`
  padding: ${({ theme }) => theme.margins.base};
  background: ${({ theme }) => theme.colors.gray_1};
  text-align: center;

  & p {
    padding-bottom: ${({ theme }) => theme.margins.base};
    font-family: "Roboto", sans-serif;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: ${({ theme }) => theme.lineHeight.lg};
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
  }
`;
export default DayCharater;
