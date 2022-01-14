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
import path_T from "../static/images/mypage/arrow_T_W.svg";

const MixList = (props) => {
  const dispatch = useDispatch();
  const playListInfo = useSelector((store) => store.asmr.playList);

  const [playList, setPlayList] = React.useState(
    playListInfo ? playListInfo : null
  );
  const [toggle, setToggle] = React.useState({});

  React.useEffect(() => {
    if (!playListInfo) {
      dispatch(asmrActions.getPlayListDB());
    }
  }, []);
  React.useEffect(() => {
    setPlayList(playListInfo);
  }, [playListInfo]);

  const toggleComment = (idx) => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      [idx]: !prevToggle[idx],
    }));
  };
  console.log(toggle);

  return (
    <Container>
      <Title backIcon>나의 믹스</Title>
      {playList.length > 0 ? (
        <>
          {playList.map((item, idx) => {
            return (
              <div key={idx}>
                <List
                  icon={mixList}
                  src={toggle[idx] ? path_T : path_B}
                  _onClick={() => toggleComment(idx)}
                >
                  {item.mixTitle}
                </List>
                {toggle[idx] ? (
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
        <p>믹스 음원 없음</p>
      )}
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
