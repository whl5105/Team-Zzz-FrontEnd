import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { actionCreators as asmrActions } from "../../redux/modules/asmr";
import { useDispatch, useSelector } from "react-redux";

// --- components ---
import ModalPopUp from "../ModalPopUp";
import { Button } from "../../elements";

const MixDeletePopup = (props) => {
  const dispatch = useDispatch();
  const userIdx = localStorage.getItem("userIdx");
  const { close, data } = props;
  console.log(props);
  const deleteMix = () => {
    console.log("삭제클릭");
    console.log(data.playlistIdx);
    console.log(data.playlistIdx, userIdx);
    dispatch(asmrActions.DeletePlayListDB(data.playlistIdx));
    close();
  };
  return (
    <ModalPopUp close={props.close}>
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
