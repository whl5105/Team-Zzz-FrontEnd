import React from "react";
import styled from "styled-components";

// --- images ---
import { Loading_B, Loading_C, Loading_T } from "../static/images/index";

const Spinner = (props) => {
  return (
    <>
      <Outter height={props.height}>
        <Inner>
          <img src={Loading_C} alt="spinner" />
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
  width: 100%;
  height: inherit;
  background-image: url(${Loading_B}), url(${Loading_T});
  background-size: 110vh, 35vh;
  background-position: 50% 140%, 50% 15%;
  background-repeat: no-repeat;

  @media (max-width: 500px) {
    background-size: 70vh, 30vh;
    background-position: 50% 90%, 50% 15%;
  }
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
