import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as asmrActions } from "../redux/modules/asmr";

// --- components ---

import Title from "../components/Title";
import List from "../components/mypage/List";
import MixBox from "../components/mypage/MixBox";

import mixList from "../static/images/mypage/mixList_W.svg";
import path_B from "../static/images/mypage/arrow_B_W.svg";

const MixList = (props) => {
  const dispatch = useDispatch();
  const playListInfo = useSelector((store) => store.asmr.playList);
  console.log(playListInfo.mixTitle);

  const [playList, setPlayList] = React.useState(
    playListInfo ? playListInfo : []
  );

  console.log(playList);
  React.useEffect(() => {
    if (!playList) {
      dispatch(asmrActions.getPlayListDB());
    }
  }, []);
  return (
    <Container>
      <Title backIcon>나의 믹스</Title>
      {playList.map((item, idx) => {
        return (
          <div key={idx}>
            <List icon={mixList} src={path_B}>
              {item.mixTitle}
            </List>
            <MixBox
              mixList={item.mixList}
              playlistIdx={item.playlistIdx}
              mixTitle={item.mixTitle}
            ></MixBox>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 0;
`;

export default MixList;
