import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCreators as asmrActions } from "../redux/modules/asmr";
import { history } from "../redux/configureStore";

import Spinner from "../components/Spinner";
import AsmrCategory from "../components/asmr/AsmrCategory";
import AsmrList from "../components/asmr/AsmrList";
import Success from "../components/Success";

import {
  asmr_category_all,
  asmr_category_nature,
  asmr_category_object,
  asmr_category_space,
} from "../static/images";

export const deleteSong = (url) => {
  const deleteItem = document.getElementById(url);
  deleteItem.style.backgroundColor = "#3A3E74";
};

const Asmr = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(
    useSelector((state) => state.asmr.is_write)
  );

  const [song1, setSong1] = useState(new Audio());
  const [song2, setSong2] = useState(new Audio());
  const [song3, setSong3] = useState(new Audio());
  const [song4, setSong4] = useState(new Audio());
  const [getCategory, setCategory] = useState(
    location.category === undefined ? "전체" : location.category
  );

  const [imageUrl, setImageUrl] = useState(asmr_category_all);
  const [soundTrack, setSoundTrack] = useState([]);
  const asmrInfo = useSelector((state) => state.asmr.asmrList);
  const playListInfo = useSelector((state) => state.asmr.playList);
  const [play, setPlay] = useState([]);

  useCallback(() => {
    if (!playListInfo) {
      dispatch(asmrActions.getPlayListDB());
    }
  }, []);

  useEffect(() => {
    if (success === true) {
      dispatch(asmrActions.set_write());
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [success]);

  useEffect(() => {
    if (getCategory === "전체") {
      setImageUrl(asmr_category_all);
    } else if (getCategory === "네이쳐") {
      setImageUrl(asmr_category_nature);
    } else if (getCategory === "플레이스") {
      setImageUrl(asmr_category_space);
    } else if (getCategory === "오브젝트") {
      setImageUrl(asmr_category_object);
    } else {
      setImageUrl(asmr_category_all);
    }
  }, [getCategory]);

  useEffect(() => {
    const arr = ["전체", "네이쳐", "플레이스", "오브젝트"];

    if (!asmrInfo || asmrInfo.length === 0) {
      dispatch(asmrActions.getAsmrDB());
    } else {
      arr.forEach((arrItem) => {
        if (arrItem !== getCategory) {
          document.getElementById(arrItem).style.backgroundColor = "#272a52";
        }
        document.getElementById(getCategory).style.backgroundColor = "#FBC037";

        if (getCategory === "전체") {
          setSoundTrack(asmrInfo);
        } else if (getCategory === "네이쳐") {
          const nature = asmrInfo.filter((item) => {
            if (item.categoryName === "자연") {
              return item;
            }
          });
          setSoundTrack(nature);
        } else if (getCategory === "플레이스") {
          const place = asmrInfo.filter((item) => {
            if (item.categoryName === "공간") {
              return item;
            }
          });
          setSoundTrack(place);
        } else if (getCategory === "오브젝트") {
          const object = asmrInfo.filter((item) => {
            if (item.categoryName === "물체") {
              return item;
            }
          });
          setSoundTrack(object);
        }
      });
    }
  }, [asmrInfo, getCategory]);

  const select = (asmrUrl, iconUrl, title) => {
    if (play.includes(asmrUrl)) {
      let arr = [...play];
      arr = arr.filter((item) => {
        if (asmrUrl !== item) {
          return item;
        }
      });
      setPlay(arr);
      history.setPlaybar(arr);
      history.play = arr;

      songInitialzation(asmrUrl);
      songDelete(asmrUrl);
    } else {
      if (play.length > 3) {
        window.alert("음원은 최대 4개까지만 담으실 수 있습니다.");
      } else {
        songSetting(asmrUrl, iconUrl, title);
        songSelect(asmrUrl);
      }
    }
  };

  const songInitialzation = (asmrUrl) => {
    if (song1.src.indexOf(asmrUrl) !== -1) {
      song1.pause();
      setSong1(new Audio());
      history.state1 = "";
      history.audio1 = "";
      history.title1 = "";
      history.icon1 = "";
    } else if (song2.src.indexOf(asmrUrl) !== -1) {
      song2.pause();
      setSong2(new Audio());
      history.state2 = "";
      history.audio2 = "";
      history.title2 = "";
      history.icon2 = "";
    } else if (song3.src.indexOf(asmrUrl) !== -1) {
      song3.pause();
      setSong3(new Audio());
      history.state3 = "";
      history.audio3 = "";
      history.title3 = "";
      history.icon3 = "";
    } else if (song4.src.indexOf(asmrUrl) !== -1) {
      song4.pause();
      setSong4(new Audio());
      history.state4 = "";
      history.audio4 = "";
      history.title4 = "";
      history.icon4 = "";
    }
  };

  const songDelete = (asmrUrl) => {
    const deleteItem = document.getElementById(asmrUrl);
    deleteItem.style.backgroundColor = "#3A3E74";
  };

  const songSetting = (asmrUrl, iconUrl, title) => {
    const arr = [...play, asmrUrl];
    setPlay(arr);

    history.play = arr;
    history.setPlay = setPlay;
    history.setPlaybar(arr);
    if (!song1.src) {
      song1.src = asmrUrl;
      song1.volume = 0.1;
      song1.loop = true;
      song1.play();
      history.state1 = asmrUrl;
      history.audio1 = song1;
      history.icon1 = iconUrl;
      history.title1 = title;
      history.setSong1 = setSong1;
    } else if (!song2.src) {
      song2.src = asmrUrl;
      song2.volume = 0.1;
      song2.loop = true;
      song2.play();
      history.state2 = asmrUrl;
      history.audio2 = song2;
      history.icon2 = iconUrl;
      history.title2 = title;
      history.setSong2 = setSong2;
    } else if (!song3.src) {
      song3.src = asmrUrl;
      song3.volume = 0.1;
      song3.loop = true;
      song3.play();
      history.state3 = asmrUrl;
      history.audio3 = song3;
      history.icon3 = iconUrl;
      history.title3 = title;
      history.setSong3 = setSong3;
    } else if (!song4.src) {
      song4.src = asmrUrl;
      song4.volume = 0.1;
      song4.loop = true;
      song4.play();
      history.state4 = asmrUrl;
      history.audio4 = song4;
      history.icon4 = iconUrl;
      history.title4 = title;
      history.setSong4 = setSong4;
    }
  };

  const songSelect = (asmrUrl) => {
    const selectItem = document.getElementById(asmrUrl);
    selectItem.style.backgroundColor = "#FBC037";
  };

  return (
    <>
      {!asmrInfo || asmrInfo.length === 0 ? (
        <Spinner />
      ) : (
        <PageWrap imgUrl={imageUrl}>
          <AsmrCategory setCategory={setCategory} />
          <AsmrList
            soundTrack={soundTrack}
            select={select}
            setSong1={setSong1}
            setSong2={setSong2}
            setSong3={setSong3}
            setSong4={setSong4}
            setPlay={setPlay}
          />

          {success && (
            <Wrap>
              <Success
                alt="플레이리스트 작성 완료"
                text="저장에 성공하였습니다."
              />
            </Wrap>
          )}
        </PageWrap>
      )}
    </>
  );
};

const PageWrap = styled.div`
  width: 100%;
  height: inherit;
  background: url(${(props) => props.imgUrl}) no-repeat;
  background-position: 50% 100%;
  background-size: 100%;
  padding: 50px ${({ theme }) => theme.paddings.xxxxl} 0;
  box-sizing: border-box;
  position: relative;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 50px ${({ theme }) => theme.paddings.xxxxl} 0;
  box-sizing: border-box;
  z-index: 140;
`;

export default Asmr;
