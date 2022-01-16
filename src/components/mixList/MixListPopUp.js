import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";

// --- components ---
import ModalPopUp from "../ModalPopUp";
import Icon from "../../elements/Icon";
import MixSoundTrack from "./MixSoundTrack";
import NoMixList from "./NoMixList";

// --- images ---
import MixSetting from "../../static/images/mixList/setting.png";

const MixListPopUp = (props) => {
  const playListInfo = useSelector((state) => state.asmr.playList);
  const [playList, setPlayList] = React.useState(
    playListInfo ? playListInfo : []
  );

  React.useEffect(() => {
    history.mixListModal = true;
    history.setMixListModal = props.setMixListModal;
  }, []);

  const myPageMixList = () => {
    props.close();
    history.push("/myPage/mixList");
  };

  return (
    <ModalPopUp close={props.close} backgroundNull zIndex="120">
      <Container>
        <Bar></Bar>
        <Title justifySB>
          <p>나의 믹스</p>
          <Icon src={MixSetting} alt="환경설정" _onClick={myPageMixList}></Icon>
        </Title>
        <MixList>
          {playList.length > 0 ? (
            playList.map((item) => {
              return (
                <div key={item.mixIdx}>
                  <MixSoundTrack
                    mixTitle={item.mixTitle}
                    mixList={item.mixList}
                  ></MixSoundTrack>
                </div>
              );
            })
          ) : (
            <NoMixList marginT="60"></NoMixList>
          )}
        </MixList>
      </Container>
    </ModalPopUp>
  );
};

// --- styled-components ---
const Container = styled.div`
  position: relative;
  width: 375px;
  height: 75vh;
  bottom: -4vh;
  padding: ${({ theme }) => theme.paddings.xxxxl};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.bg};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
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
  position: relative;
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
