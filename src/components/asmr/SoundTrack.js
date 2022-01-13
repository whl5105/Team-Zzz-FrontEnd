import React from "react";
import styled from "styled-components";

// --- images ---
import closeIcon from "../../static/images/asmr/closeIcon.svg";
import lineIcon from "../../static/images/asmr/lineIcon.svg";
import circleIcon from "../../static/images/asmr/circleIcon.svg";

const SoundTrack = (props) => {
  const Mobile = () => {
    return (ios = /iPhone|iPad/i.test(navigator.userAgent));
  };

  const Click = () => {
    dragElement(document.getElementById(props.id));
  };
  let [b, setB] = React.useState(0);
  let [ios, setMobile] = React.useState(false);

  function dragElement(elmnt) {
    Mobile();
    let clientX_gap = 0,
      clientX = 0;

    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    // elmnt.addEventListener('touchstart',dragMouseDown) //mobile

    if (ios === false) {
      elmnt.ontouchstart = dragMouseDown; // 19번줄이나 20번줄이나 같음
    } else if (ios === true) {
      console.log("Ipone");
      alert("애니메이션 추가해주는부분")
    }

    function dragMouseDown(e) {
      // e = e || window.event; // window.event 는 검색해보면 this feature is no longer recommended 라고 뜬다
      e.preventDefault();
      // get the mouse cursor position at startup:
      clientX = e.clientX;
      document.onmouseup = closeDragElement;
      if (ios === false) {
        document.addEventListener("touchend", closeDragElement); //mobile
        document.addEventListener("touchmove", elementDrag); //mobile
      }

      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag; //마우스가 움직일때마다 elementDrag 함수 발생, 근데 클릭하는 이벤트 함수에서 있으므로 누르고 움직일때 발생
      // document.addEventListener('touchmove',elementDrag); //mobile
    }

    function elementDrag(e) {
      // e = e || window.event;
      e.preventDefault();

      if (e.changedTouches) {
        // mobile
        e.clientX = e.changedTouches[0].clientX; // mobile과 웹 의 clienX 값은 다르긴 하다.
      }
      // calculate the new cursor position:
      clientX_gap = e.clientX - clientX; // 실질적으로 값이 0 이라고 생각할수있지만 코드 순서상 최신 clientX 값이 1이라고 한다면 눌르고 마우스 이동하면 e.clienX이 2가 되고 2-1이므로 1이라는 gap이 생긴다.
      clientX = e.clientX;

      let leftVal = 0;
      let parentElmnt = elmnt.parentNode; // 선택한 태그의 부모노트값을 가져온다.

      if (
        elmnt.offsetLeft + clientX_gap < 0 ||
        clientX < parentElmnt.offsetLeft
      ) {
        leftVal = 0;
      } else if (elmnt.offsetLeft + clientX_gap > parentElmnt.clientWidth) {
        leftVal = parentElmnt.clientWidth;
      } // 부모노트의 전체 가로길이보다 이동한 바의 위치가 더 클때

      // set the element's new position:
      //offsetLeft는 브라우저의 좌표(e.clientX)가 아닌현재 선택한 태그의 전체를 둘러싼 위치에서 시작해서 그곳에서 떨어진 x값이 된다.
      else {
        leftVal = elmnt.offsetLeft + clientX_gap;
      }
      elmnt.style.left = leftVal + "px"; // 실질적으로 이동시키는 소스, 해당 style에 left 값을 수정, pos1은 -1이므로 +1씩 이동된다고 생각하면 된다.

      b = elmnt.style.left.split("px")[0] * 0.006; // 내가 필요한 실질적으로 볼륨 값
      props.song.volume = b;
      props.setVolume(b * 100);
      setB(b);
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.removeEventListener("touchend", closeDragElement);
      document.onmousemove = null; // 마우스를 대면 움직일때 발생했던 함수도 초기화 해서 아무 함수에도 들어가지 않게 해준다.
      document.removeEventListener("touchmove", elementDrag);
    }
  }

  return (
    <>
      <Record>
        <Sound>
          <IconImage>
            <Image src={props.icon} alt=""></Image>
            <Text>{props.title}</Text>
          </IconImage>
        </Sound>
        <VolumeWrap>
          <Volume categoryImage={lineIcon}>
            <Circle id={props.id} value={props.volume} onTouchStart={Click} onClick={Click}>
              <Span categoryImage={circleIcon}></Span>
            </Circle>
          </Volume>
        </VolumeWrap>
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

const VolumeWrap = styled.div`
  width: 158px;
  height: 30px;
  position: relative;
  top: 28px;
  box-sizing: border-box;
  padding: 5px;
`;

const Volume = styled.div`
  /* margin: 50px auto; */
  position: relative;
  width: 158px;
  height: 3px;
  background-image: url(${(props) => props.categoryImage});
  /* background: #222;
  border-radius: 5px; */
`;

// const Volume = styled.input`
//   width: 158px;
// `;

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
  /* background: #2196f3; */
  /* border-radius: 100%; */
  text-align: center;
  background-image: url(${(props) => props.categoryImage});
`;

export default SoundTrack;
