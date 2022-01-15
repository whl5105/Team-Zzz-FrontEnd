import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as asmrActions } from "../redux/modules/asmr";

// --- components ---

import Title from "../components/Title";
import List from "../components/mypage/List";
import MixBox from "../components/mypage/MixBox";
import NoMixList from "../components/mixList/NoMixList";

import mixList from "../static/images/mypage/mixList_W.svg";
import path_B from "../static/images/mypage/arrow_B_W.svg";
import path_T from "../static/images/mypage/arrow_T_W.svg";

const MixList = (props) => {
  const dispatch = useDispatch();
  const playListInfo = useSelector((store) => store.asmr.playList);
  console.log(playListInfo);
  console.log("111");

  const [playList, setPlayList] = React.useState(
    playListInfo ? playListInfo : null
  );
  const [toggle, setToggle] = React.useState({});

  React.useEffect(() => {
    if (playList) {
      return;
    }
    dispatch(asmrActions.getPlayListDB());
  }, []);
  React.useEffect(() => {
    setPlayList(playListInfo ? playListInfo : null);
  }, [playListInfo]);

  const toggleComment = (idx) => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      [idx]: !prevToggle[idx],
    }));
  };
  return (
    <Container>
      <Title backIcon>나의 믹스</Title>
      <MixContent>
        {playList !== null ? (
          <>
            {playList.map((item, idx) => {
              return (
                <div key={idx}>
                  <List
                    icon={mixList}
                    src={toggle[item.playlistIdx] ? path_T : path_B}
                    _onClick={() => toggleComment(item.playlistIdx)}
                  >
                    {item.mixTitle}
                  </List>
                  {toggle[item.playlistIdx] ? (
                    <MixBox
                      mixList={item.mixList}
                      playlistIdx={item.playlistIdx}
                      mixTitle={item.mixTitle}
                      toggle={toggle}
                    ></MixBox>
                  ) : null}
                </div>
              );
            })}
          </>
        ) : (
          <NoMixList></NoMixList>
        )}
      </MixContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 0;
`;
const MixContent = styled.div`
  width: 100%;
  height: calc(100vh - 291px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MixList;
