import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Guidance from "../asmr/Guidance";

import { volumeCircle, volumeLine, close } from "../../static/images/index";

const SoundTrack = (props) => {
  const [effect, setEffect] = useState(false);

  let [b, setB] = useState(0);
  let [ios, setMobile] = useState(false);

  const Mobile = () => {
    return (ios = /iPhone|iPad/i.test(navigator.userAgent));
  };

  useEffect(() => {
    dragElement(document.getElementById(props.id));
    setEffect(true);
  }, []);

  const Click = () => {
    dragElement(document.getElementById(props.id));
  };

  function dragElement(elmnt) {
    Mobile();
    let clientX_gap = 0,
      clientX = 0;

    elmnt.onmousedown = dragMouseDown;

    if (ios === false) {
      elmnt.ontouchstart = dragMouseDown;
    } else if (ios === true && !props.guidance && effect) {
      props.setGuidance(true);
      props.setGuidanceTitle(props.title);
      const timeout = setTimeout(() => {
        props.setGuidance(false);
        props.setGuidanceTitle(null);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }

    function dragMouseDown(e) {
      e.preventDefault();
      clientX = e.clientX;
      document.onmouseup = closeDragElement;
      if (ios === false) {
        document.addEventListener("touchend", closeDragElement);
        document.addEventListener("touchmove", elementDrag);
      }

      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();

      if (e.changedTouches) {
        e.clientX = e.changedTouches[0].clientX;
      }
      clientX_gap = e.clientX - clientX;
      clientX = e.clientX;

      let leftVal = 0;
      let parentElmnt = elmnt.parentNode;

      if (
        elmnt.offsetLeft + clientX_gap < 0 ||
        clientX < parentElmnt.offsetLeft
      ) {
        leftVal = 0;
      } else if (elmnt.offsetLeft + clientX_gap > parentElmnt.clientWidth) {
        leftVal = parentElmnt.clientWidth;
      } else {
        leftVal = elmnt.offsetLeft + clientX_gap;
      }
      elmnt.style.left = leftVal + "px";
      b = elmnt.style.left.split("px")[0] * 0.006;
      props.song.volume = b;
      props.setVolume(b * 100);
      setB(b);
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.removeEventListener("touchend", closeDragElement);
      document.onmousemove = null;
      document.removeEventListener("touchmove", elementDrag);
    }
  }

  return (
    <>
      <Record>
        <Sound>
          <IconImage>
            <Image src={props.icon} alt="" />
            <Text>{props.title}</Text>
          </IconImage>
        </Sound>
        <VolumeWrap>
          <Volume categoryImage={volumeLine}>
            {props.guidanceTitle === props.title && (
              <Guidance left={props.volume} />
            )}
            <Circle id={props.id} value={props.volume * 1.58}>
              <Span categoryImage={volumeCircle} onTouchStart={Click} />
            </Circle>
          </Volume>
        </VolumeWrap>
        <Icon
          categoryImage={close}
          onClick={() => {
            props.deleteSong(props.song);
          }}
        />
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

const VolumeWrap = styled.div`
  width: 158px;
  height: 30px;
  position: relative;
  top: 28px;
  box-sizing: border-box;
  padding: 5px;
`;

const Volume = styled.div`
  position: relative;
  width: 158px;
  height: 3px;
  background-image: url(${(props) => props.categoryImage});
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

const Circle = styled.div`
  cursor: grab;
  position: absolute;
  left: ${(props) => `${props.value}px;`};
  top: 5px;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  touch-action: none;
`;

const Span = styled.span`
  position: absolute;
  display: block;
  width: 14px;
  line-height: 14px;
  height: 14px;
  text-align: center;
  background-image: url(${(props) => props.categoryImage});
`;

export default SoundTrack;
