import React, { useState } from "react";
import styled from "styled-components";

import { Button, Icon } from "../../elements";
import MixDeletePopup from "../mixList/MixDeletePopup";
import PlayList from "../mixList/MixTitle";

const MixBox = (props) => {
  const [deletemodal, setDeletemodal] = useState(false);
  const [editmodal, setEditmodal] = useState(false);
  const [modalData, setModalData] = useState();
  
  const { mixList, mixTitle, playlistIdx } = props;
  
  const deleteClick = () => {
    setDeletemodal(true);
    const data = {
      mixList: mixList,
      playlistIdx: playlistIdx,
    };
    setModalData(data);
  };

  const editClick = () => {
    setEditmodal(true);
    const data = {
      mixName: mixTitle,
      playlistIdx: playlistIdx,
    };
    setModalData(data);
  };

  const closeModal = () => {
    setDeletemodal(false);
    setEditmodal(false);
  };

  return (
    <>
      <Box>
        {mixList.map((item, idx) => {
          return (
            <Item key={idx}>
              <IconBox>
                <Icon src={item.iconUrl} />
                <p>{item.title}</p>
              </IconBox>
              <Sound>{item.sound}%</Sound>
            </Item>
          );
        })}
        <ButtonBox>
          <Button
            type="boderBtn"
            text="삭제하기"
            _onClick={deleteClick}
            bg="#ffffff"
            color="gray7"
          />
          <Button text="수정 하기" _onClick={editClick} />
        </ButtonBox>

        {deletemodal && <MixDeletePopup close={closeModal} data={modalData} />}
        {editmodal && <PlayList close={closeModal} data={modalData} is_edit />}
      </Box>
    </>
  );
};
const Box = styled.div`
  background: #22265e;
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  padding: 20px;
  color: #aaa;
  flex-direction: column;

  & div:nth-child(4) {
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
  height: 70px;
  background: #3a3e74;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & p {
    padding-top: 2px;
  }
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
