import React, { useState, useContext } from "react";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as asmrActions } from "../../redux/modules/asmr";
import { ThemeContext } from "../../shared/ThemeContext";

import ModalPopUp from "../ModalPopUp";
import { Input, Button } from "../../elements/index";

import { reset } from "../../static/images/index";

const PlayList = (props) => {
  const { data, is_edit, close } = props;
  const [title, setTitle] = useState(is_edit ? data.mixName : "");
  const dispatch = useDispatch();

  const { song1, song2, song3, song4 , icon1, icon2, icon3, icon4, title1, title2, title3, title4 } = useContext(ThemeContext);

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
      mixList: [],
    };

    if (song1.src) {
      playLists.mixList.push({
        asmrUrl: song1.src,
        sound: String(song1.volume),
        iconUrl: icon1,
        title: title1,
      });
    }

    if (song2.src) {
      playLists.mixList.push({
        asmrUrl: song2.src,
        sound: String(song2.volume),
        iconUrl: icon2,
        title: title2,
      });
    }

    if (song3.src) {
      playLists.mixList.push({
        asmrUrl: song3.src,
        sound: String(song3.volume),
        iconUrl: icon3,
        title: title3,
      });
    }

    if (song4.src) {
      playLists.mixList.push({
        asmrUrl: song4.src,
        sound: String(song4.volume),
        iconUrl: icon4,
        title: title4,
      });
    }

    dispatch(asmrActions.setPlayListDB(playLists));
    close();
  };

  const editTilteSubmit = () => {
    let mixTitle = title;
    if (!title) {
      mixTitle = "나의 믹스";
    }

    dispatch(asmrActions.editPlayListDB(data.playlistIdx, mixTitle));
    close();
  };

  return (
    <>
      <ModalPopUp close={close}>
        <Wrap>
          <Title>{is_edit ? "믹스명 수정하기" : "나의 믹스 만들기"}</Title>
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
          />
          {is_edit ? (
            <Button marginT="20" _onClick={editTilteSubmit} text="저장하기 " />
          ) : (
            <Button
              marginT="20"
              _onClick={titleSubmit}
              text="내 믹스 저장하기"
            />
          )}
        </Wrap>
      </ModalPopUp>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  line-height: ${({ theme }) => theme.lineHeight.lg};
  color: ${({ theme }) => theme.colors.gray_9};
`;

export default PlayList;
