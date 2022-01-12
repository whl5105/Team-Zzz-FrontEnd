import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as asmrActions } from "../../redux/modules/asmr";

// --- components ---
import ModalPopUp from "../ModalPopUp";
import Input from "../../elements/Input";
import Button from "../../elements/Button";

// --- images ---
import reset from "../../static/images/icon/reset.svg";

const PlayList = (props) => {
  const [title, setTitle] = React.useState();
  const dispatch = useDispatch();

  const close = () => {
    props.setPlayListModal(false);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const titleReset = (e) => {
    setTitle("");
  };

  const titleSubmit = () => {
    let mixTitle = title;
    if (!title) {
      mixTitle = "나의 믹스";
    }

    const playLists = {
      mixTitle: mixTitle,
    };

    if (history.audio1) {
      playLists.mix1 = {
        asmr1: history.audio1.src,
        sound1: history.audio1.volume,
      };
    }

    if (history.audio2) {
      playLists.mix2 = {
        asmr2: history.audio2.src,
        sound2: history.audio2.volume,
      };
    }

    if (history.audio3) {
      playLists.mix3 = {
        asmr3: history.audio3.src,
        sound3: history.audio3.volume,
      };
    }

    if (history.audio4) {
      playLists.mix4 = {
        asmr4: history.audio4.src,
        sound4: history.audio4.volume,
      };
    }

    dispatch(asmrActions.setPlayListDB(playLists));
    props.setPlayListModal(false);

    history.push("/asmr");
  };

  return (
    <>
      <ModalPopUp close={close}>
        <Wrap>
          <Title>나만의 ASMR 믹스 만들기</Title>
          <Input
            resetInput={title === "" || title === undefined ? false : true}
            src={reset}
            alt="resetButton"
            placeholder="나의 믹스(믹스명은 최대 18자 입력 가능)"
            name="mixTitle"
            height="52px"
            marginT="20px"
            type="text"
            onClick={titleReset}
            value={title}
            onChange={titleChange}
            max="18"
          ></Input>
          <Button marginT="20" _onClick={titleSubmit}>
            내 믹스 저장하기
          </Button>
        </Wrap>
      </ModalPopUp>
    </>
  );
};

const Wrap = styled.div`
  width: 335px;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  line-height: ${({ theme }) => theme.lineHeight.lg};
`;

export default PlayList;
