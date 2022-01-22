import React from "react";
import styled from "styled-components";

const NoMixList = (props) => {
  return (
    <>
      <Wrap>
        <p id="content">생성된 믹스가 없어요!</p>
        <p id="subContent">
          나만의 소리를 제작해
          <br />
          믹스를 만들어 보세요
        </p>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  & #content {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
    margin-bottom: 12px;
  }

  & #subContent {
    color: ${({ theme }) => theme.colors.gray_5};
    font-size: ${({ theme }) => theme.fontSizes.ssmall};
    font-weight: ${({ theme }) => theme.fontWeight.Regular};
  }
`;

export default NoMixList;
