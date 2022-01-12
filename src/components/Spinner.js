import React from "react";
import styled from "styled-components";

// --- images ---
import SpinnerImage from "../static/images/spinner/Spinner.png";

const Spinner = (props) => {
  // --- jsx ---
  return (
    <>
      <Outter height={props.height}>
        <Loading>
          <label>Z</label>
          <label>z</label>
          <label>z</label>
          <label>.</label>
          <label>.</label>
          <label>.</label>
        </Loading>
      </Outter>
    </>
  );
};

// --- styled-components ---
const Outter = styled.div`
  height: ${(props) => props.height};
  background-image: url(${SpinnerImage});
  background-repeat: no-repeat;
  background-position: center center;
`;

const Loading = styled.div`
  position: absolute;
  top: 430px;
  left: 45%;
  width: 53px;
  height: 18px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  color: ${({ theme }) => theme.colors.white};

  & > Label:nth-child(1) {
    animation: jumb 2s infinite;
    animation-delay: 0.1s;
  }
  & > Label:nth-child(2) {
    animation: jumb 2s infinite;
    animation-delay: 0.3s;
  }
  & > Label:nth-child(3) {
    animation: jumb 2s infinite;
    animation-delay: 0.5s;
  }
  & > Label:nth-child(4) {
    animation: jumb 2s infinite;
    animation-delay: 0.7s;
  }
  & > Label:nth-child(5) {
    animation: jumb 2s infinite;
    animation-delay: 0.9s;
  }
  & > Label:nth-child(6) {
    animation: jumb 2s infinite;
    animation-delay: 1.1s;
  }

  @keyframes jumb {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default Spinner;
