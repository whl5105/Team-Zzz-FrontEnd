import React from "react";
import styled from "styled-components";

import { Button, Icon } from "../../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as asmrActions } from "../../redux/modules/asmr";

const MixBox = (props) => {
  const dispatch = useDispatch();
  const userIdx = localStorage.getItem("userIdx");
  const deleteMix = () => {
    console.log("삭제클릭");
    dispatch(asmrActions.DeletePlayListDB(props.playlistIdx, userIdx));
  };
  //-- 다이어리 팝업 모달 --
  const [modalOpen, setModalOpen] = React.useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Box>
      {props.mixList.map((item, idx) => {
        return (
          <Item key={idx}>
            <IconBox>
              <Icon src={item.iconUrl}></Icon>
              {item.title}
              {/* <Icon src={item.iconUrl}></Icon> */}
            </IconBox>
            <Sound>{item.sound}%</Sound>
          </Item>
        );
      })}
      <ButtonBox>
        <Button type="boderBtn" text="삭제하기" _onClick={deleteMix} />
        <Button text="수정 하기" />
      </ButtonBox>

      {/* -- 삭제 팝업 모달 -- */}
      {/* {modalOpen ? <DiaryWrite close={closeModal} data={modalData} /> : ""} */}
    </Box>
  );
};
const Box = styled.div`
  background: #22265e;
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  padding: 20px;
  color: #aaa;
  flex-direction: column;

  & div:last-child {
    margin-right: 0;
  }
`;
const Item = styled.div`
  width: 70px;
  margin-right: 18px;
  text-align: center;
  display: inline-block;
`;
const IconBox = styled.div`
  width: 70px;

  background: #3a3e74;
  padding: 13px 23px;
  border-radius: 8px;
  box-sizing: border-box;
`;
const Sound = styled.div`
  padding-top: 10px;
`;
const ButtonBox = styled.div`
  display: flex;
  margin-top: 20px;
  & Button {
    margin-right: 10px;
  }
  & Button:last-child {
    margin-right: 0;
  }
`;
export default MixBox;
