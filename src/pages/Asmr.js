import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCreators as asmrActions } from "../redux/modules/asmr";
import { history } from "../redux/configureStore";
import { ThemeContext } from "../shared/ThemeContext";

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
  const playList = useSelector((state) => state.asmr.playList);

  const {
    song1,
    setSong1,
    song2,
    setSong2,
    song3,
    setSong3,
    song4,
    setSong4,
    play,
    setPlay,
    setToggle,
    setPlaybar,
    setTitle1,
    setTitle2,
    setTitle3,
    setTitle4,
    setIcon1,
    setIcon2,
    setIcon3,
    setIcon4,
  } = useContext(ThemeContext);
  const [getCategory, setCategory] = useState(
    location.category === undefined ? "전체" : location.category
  );

  const [imageUrl, setImageUrl] = useState(asmr_category_all);
  const asmrInfo = useSelector((state) => state.asmr.asmrList);
  const [soundTrack, setSoundTrack] = useState([]);

  useEffect(() => {
    if (!playList) {
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
  }, []);

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
      setPlaybar(arr);

      songInitialzation(asmrUrl);
      deleteSong(asmrUrl);
    } else {
      if (play.length > 3) {
        window.alert("음원은 최대 4개까지 담으실 수 있습니다.");

        return;
      } else {
        songSetting(asmrUrl, iconUrl, title);
        songSelect(asmrUrl);
      }

      setToggle(false);
    }
  };

  const songInitialzation = (asmrUrl) => {
    if (song1.src.indexOf(asmrUrl) !== -1) {
      song1.pause();
      setSong1(new Audio());
      setTitle1("");
      setIcon1("");
    } else if (song2.src.indexOf(asmrUrl) !== -1) {
      song2.pause();
      setSong2(new Audio());
      setTitle2("");
      setIcon2("");
    } else if (song3.src.indexOf(asmrUrl) !== -1) {
      song3.pause();
      setSong3(new Audio());
      setTitle3("");
      setIcon3("");
    } else if (song4.src.indexOf(asmrUrl) !== -1) {
      song4.pause();
      setSong4(new Audio());
      setTitle4("");
      setIcon4("");
    }
  };

  const songSetting = (asmrUrl, iconUrl, title) => {
    const arr = [...play, asmrUrl];

    setPlay(arr);
    setPlaybar(arr);
    if (!song1.src) {
      song1.src = asmrUrl;
      song1.volume = 0.1;
      song1.loop = true;
      song1.play();
      setIcon1(iconUrl);
      setTitle1(title);
    } else if (!song2.src) {
      song2.src = asmrUrl;
      song2.volume = 0.1;
      song2.loop = true;
      song2.play();
      setIcon2(iconUrl);
      setTitle2(title);
    } else if (!song3.src) {
      song3.src = asmrUrl;
      song3.volume = 0.1;
      song3.loop = true;
      song3.play();
      setIcon3(iconUrl);
      setTitle3(title);
    } else if (!song4.src) {
      song4.src = asmrUrl;
      song4.volume = 0.1;
      song4.loop = true;
      song4.play();
      setIcon4(iconUrl);
      setTitle4(title);
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
          <AsmrList soundTrack={soundTrack} select={select} />

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
