import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as asmrActions } from "../../redux/modules/asmr";

import ModalPopUp from "../ModalPopUp";
import MixSoundTrack from "./MixSoundTrack";
import NoMixList from "./NoMixList";
import { Icon } from "../../elements/index";

import { mix_setting } from "../../static/images/index";

const MixListPopUp = (props) => {
  const dispatch = useDispatch();
  const playList = useSelector((state) => state.asmr.playList);

  const { close, setMixListModal } = props;

  useEffect(() => {
    if (!playList) {
      dispatch(asmrActions.getPlayListDB());
    }

    history.mixListModal = true;
    history.setMixListModal = setMixListModal;
  }, []);

  const myPageMixList = () => {
    close();
    history.push("/myPage/mixList");
  };

  return (
    <ModalPopUp
      close={close}
      backgroundNull
      zIndex="120"
      width="100%"
      marginNull
    >
      <Container>
        <Bar />
        <Title justifySB>
          <p>나의 믹스</p>
          <Icon src={mix_setting} alt="환경설정" _onClick={myPageMixList} />
        </Title>
        <MixList>
          {playList && playList.length > 0 ? (
            playList.map((item) => {
              return (
                <div key={item.playlistIdx}>
                  <MixSoundTrack
                    mixTitle={item.mixTitle}
                    mixList={item.mixList}
                  />
                </div>
              );
            })
          ) : (
            <NoMixList />
          )}
        </MixList>
      </Container>
    </ModalPopUp>
  );
};

const Container = styled.div`
  width: inherit;
  height: 75vh;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: 12px 12px 0 0;
  z-index: 120;
`;

const MixList = styled.div`
  max-height: 65%;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Bar = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 12px;
  margin: auto;
  top: 20px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.5;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  ${(props) => (props.justifySB ? `justify-content: space-between;` : "")};
  color: white;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
  align-items: center;
  margin-top: 20px;

  & p {
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontWeight.Bold};
  }
`;

export default MixListPopUp;
