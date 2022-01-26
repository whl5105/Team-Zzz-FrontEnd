import React, { useEffect, useCallback } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as asmrActions } from "../redux/modules/asmr";

import Title from "../components/Title";
import List from "../components/mypage/List";
import MixBox from "../components/mypage/MixBox";
import NoMixList from "../components/mixList/NoMixList";

import { mixList, arrow_B_W, arrow_T_W } from "../static/images";

const MypageMixList = (props) => {
  const dispatch = useDispatch();
  const myMixList = useSelector((state) => state.asmr.playList);
  const [toggle, setToggle] = React.useState({});

  useEffect(() => {
    if (!myMixList) {
      dispatch(asmrActions.getPlayListDB());
    }
  }, []);

  const toggleComment = useCallback((idx) => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      [idx]: !prevToggle[idx],
    }));
  }, []);

  return (
    <Container>
      <Title backIcon>나의 믹스</Title>
      <MixContent>
        {myMixList && myMixList.length > 0 ? (
          <>
            {myMixList.map((item) => {
              return (
                <div key={item.playlistIdx}>
                  <List
                    icon={mixList}
                    src={toggle[item.playlistIdx] ? arrow_T_W : arrow_B_W}
                    _onClick={() => toggleComment(item.playlistIdx)}
                  >
                    {item.mixTitle}
                  </List>
                  {toggle[item.playlistIdx] && (
                    <MixBox
                      mixList={item.mixList}
                      playlistIdx={item.playlistIdx}
                      mixTitle={item.mixTitle}
                      toggle={toggle}
                    />
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <NoMixList />
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

export default MypageMixList;
