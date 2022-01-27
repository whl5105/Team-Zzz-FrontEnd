import React from "react";
import styled from "styled-components";

import { actionCreators as asmrActions } from "../../redux/modules/asmr";
import { useDispatch } from "react-redux";

import ModalPopUp from "../ModalPopUp";
import { Button } from "../../elements";

const MixDeletePopup = (props) => {
  const dispatch = useDispatch();
  const { close, data } = props;

  const deleteMix = () => {
    dispatch(asmrActions.deletePlayListDB(data.playlistIdx));
    close();
  };

  return (
    <ModalPopUp close={close}>
      <Container>
        <h3>이 믹스를 정말로 삭제 할까요?</h3>
        <ButtonBox>
          <Button
            type="boderBtn"
            text="취소"
            _onClick={() => {
              close();
            }}
          />
          <Button text="삭제" _onClick={deleteMix} />
        </ButtonBox>
      </Container>
    </ModalPopUp>
  );
};

const Container = styled.div`
  position: relative;
  width: 331px;
  padding: 20px;
  box-sizing: border-box;

  & h3 {
    color: ${({ theme }) => theme.colors.gray_9};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: ${({ theme }) => theme.lineHeight.lg};
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  margin-top: 24px;

  & Button {
    margin-right: 10px;
  }

  & Button:last-child {
    margin-right: 0;
  }
`;

export default MixDeletePopup;
