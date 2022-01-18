import React from "react";
import styled from "styled-components";

// --- images ---
import SpinnerImage from "../static/images/spinner/SpinnerBack.png";
import MoonImage from "../static/images/spinner/Moon.png";

const Spinner = (props) => {
  return (
    <>
      <Outter height={props.height}>
        <Inner>
          <img src={MoonImage} alt=""></img>
          <div>
            <label>Z</label>
            <label>z</label>
            <label>z</label>
            <label>.</label>
            <label>.</label>
            <label>.</label>
          </div>
        </Inner>
      </Outter>
    </>
  );
};

// --- styled-components ---
const Outter = styled.div`
  background-image: url(${SpinnerImage});
  background-repeat: no-repeat;
  background-size: cover;

  position: relative;
  width: 100%;
  height: 100vh;
`;

const Inner = styled.div`
  width: 64px;

  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > img {
    src: ${(props) => props.src};
    width: 64px;
    height: 64px;
    margin-bottom: 10px;
  }

  & > div {
    width: 64px;

    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
    color: ${({ theme }) => theme.colors.white};
    text-align: center;

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
  }
`;

export default Spinner;
