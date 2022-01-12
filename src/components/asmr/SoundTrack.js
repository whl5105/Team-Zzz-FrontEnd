import React from "react";
import styled from "styled-components";

// --- images ---
import closeIcon from "../../static/images/asmr/closeIcon.svg";

const SoundTrack = (props) => {

  let [b, setB] =React.useState(0);
  React.useEffect(() => {

    dragElement(document.getElementById(props.id));
    
  }, []);

  function dragElement(elmnt) {
    let clientX_gap = 0,
      clientX = 0;
    if (document.getElementById(elmnt.id)) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id).onmousedown = dragMouseDown; // onmousedown 은 마우스가 클릭했을떄 event 발생
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      // e = e || window.event; // window.event 는 검색해보면 this feature is no longer recommended 라고 뜬다
      e.preventDefault();
      // get the mouse cursor position at startup:
      clientX = e.clientX;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag; //마우스가 움직일때마다 elementDrag 함수 발생, 근데 클릭하는 이벤트 함수에서 있으므로 누르고 움직일때 발생
    }

    function elementDrag(e) {
      // e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      clientX_gap = e.clientX - clientX; // 실질적으로 값이 0 이라고 생각할수있지만 코드 순서상 최신 clientX 값이 1이라고 한다면 눌르고 마우스 이동하면 e.clienX이 2가 되고 2-1이므로 1이라는 gap이 생긴다.
      clientX = e.clientX;
      console.log(elmnt.offsetLeft)
      let leftVal = 0;
      let parentElmnt = elmnt.parentNode; // 선택한 태그의 부모노트값을 가져온다.
      console.log(elmnt.offsetLeft+clientX_gap, parentElmnt.clientWidth, clientX, parentElmnt.offsetLeft + parentElmnt.clientWidth);
      if (
        elmnt.offsetLeft + clientX_gap < 0 ||
        clientX < parentElmnt.offsetLeft
      ) {
        leftVal = 0;
      }
       else if (
        elmnt.offsetLeft + clientX_gap > parentElmnt.clientWidth 
      ) {
        leftVal = parentElmnt.clientWidth;
        console.log("여기?", leftVal, elmnt.offsetLeft + clientX_gap ,parentElmnt.clientWidth)
      } // 부모노트의 전체 가로길이보다 이동한 바의 위치가 더 클때

      // set the element's new position:
      //offsetLeft는 브라우저의 좌표(e.clientX)가 아닌현재 선택한 태그의 전체를 둘러싼 위치에서 시작해서 그곳에서 떨어진 x값이 된다.
      else {
        leftVal = elmnt.offsetLeft + clientX_gap;
        console.log(leftVal, elmnt.offsetLeft);
      }
      elmnt.style.left = leftVal + "px"; // 실질적으로 이동시키는 소스, 해당 style에 left 값을 수정, pos1은 -1이므로 +1씩 이동된다고 생각하면 된다.

      b=elmnt.style.left.split('px')[0]*0.01; // 내가 필요한 실질적으로 볼륨 값
      props.song.volume= b;
      props.setVolume(b*100);
      console.log(props.volmue, props.song.volmue)
      setB(b);
      console.log(b)
      
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null; // 마우스를 대면 움직일때 발생했던 함수도 초기화 해서 아무 함수에도 들어가지 않게 해준다.
    }
  }

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
        <VolumeWrap>
          <Volume >
            <Circle id={props.id} value={props.volume}>
              <Span></Span>
            </Circle>
          </Volume>
        </VolumeWrap>

        {/* <Volume
          type="range"
          id={props.id}
          value={props.volume}
          min="0"
          max="100"
          onChange={changeVolume}
        /> */}
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
 width:100px;
  height:30px;
  position:relative;
  top:24px;
   box-sizing:border-box;
   padding:5px;
`;

const Volume = styled.div`
  /* margin: 50px auto; */
  position: relative;
  width: 100px;
  height: 10px;
  background: #222;
  border-radius: 5px;
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
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
`;

const Span = styled.span`
  position: absolute;
  display: block;
  width: 20px;
  line-height: 30px;
  height: 20px;
  background: #2196f3;
  border-radius: 100%;
  text-align: center;
`;

export default SoundTrack;
