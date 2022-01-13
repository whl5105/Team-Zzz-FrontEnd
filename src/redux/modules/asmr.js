import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const GET_ASMR = "GETASMR";
const SET_PLAYLIST = "SETPLAYLIST";
const GET_PLAYLIST = "GETPLAYLIST";
const SET_WRITE = "SETWRITE";
const DELETE_PLAYLIST = "DELETEPLAYLIST";
const EDIT_PLAYLIST = "EDITPLAYLIST";

// -- action creators --
const get_asmr = createAction(GET_ASMR, (asmrListInfo) => ({
  asmrListInfo,
}));

const set_playList = createAction(SET_PLAYLIST, () => ({}));

const get_playList = createAction(GET_PLAYLIST, (playList) => ({
  playList,
}));

const set_write = createAction(SET_WRITE, () => ({}));
const delete_playList = createAction(DELETE_PLAYLIST, (playlistIdx) => ({
  playlistIdx,
}));
const edit_playList = createAction(EDIT_PLAYLIST, (playlistIdx, mixTitle) => ({
  playlistIdx,
  mixTitle,
}));

// -- initialState --
const initialState = {
  asmrList: [],
  playList: [
    // 초기값은 무조건 null로
    {
      mixIdx: "1",
      mixTitle: "음원 이거 내꺼",
      mixList: [
        {
          asmrUrl:
            "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B3%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB.mp3",
          sound: "22",
          iconUrl:
            "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(png)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB.png",
          title: "공원",
        },
        {
          asmrUrl:
            "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B3%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB.mp3",
          sound: "23",
          iconUrl:
            "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(png)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%B5.png",
          title: "공원",
        },
      ],
    },
    {
      playlistIdx: 2,
      mixTitle: "음원 이거 내꺼2",
      mixList: [
        {
          asmrUrl:
            "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B3%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB.mp3",
          sound: "22",
          iconUrl:
            "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(png)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB.png",
          title: "공원",
        },
        {
          asmrUrl:
            "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B3%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB.mp3",
          sound: "23",
          iconUrl:
            "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(png)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%B5.png",
          title: "공원",
        },
      ],
    },
  ],
  is_write: false,
};

// -- middleware actions --
const writeInitial = () => {
  return async function (dispatch, getState, { history }) {
    try {
      await dispatch(set_write());
    } catch (error) {
      console.log("writeInitial Error : ", error);
    }
  };
};

const getAsmrDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await apis.getAsmr();
      dispatch(get_asmr(res.data.items));
    } catch (error) {
      console.log("getAsmrDB Error : ", error);
    }
  };
};

const setPlayListDB = (playLists) => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await apis.postPlayList(playLists);
      console.log(res);
      dispatch(set_playList());
    } catch (error) {
      console.log("setPlayList Error : ", error);
    }
  };
};

const getPlayListDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const userIdx = localStorage.getItem("userIdx");
      const res = await apis.getPlayList(userIdx);
      dispatch(get_playList(res));
    } catch (error) {
      console.log("setPlayList Error : ", error);
    }
  };
};
//-- 믹스 리스트 삭제 --
const DeletePlayListDB = (playlistIdx) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(playlistIdx);
      const userIdx = localStorage.getItem("userIdx");
      const res = await apis.deletePlayList(playlistIdx, userIdx);
      console.log(res);
      dispatch(delete_playList(playlistIdx));
    } catch (error) {}
  };
};
//-- 믹스 리스트 제목 수정 --
const editPlayListDB = (playlistIdx, mixTitle) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(playlistIdx, mixTitle);
      const userIdx = localStorage.getItem("userIdx");
      const res = await apis.editPlayList(playlistIdx, userIdx, mixTitle);
      console.log(res);
      dispatch(edit_playList(playlistIdx, mixTitle));
    } catch (error) {
      console.log("setPlayList Error : ", error);
    }
  };
};

// -- reducer --
export default handleActions(
  {
    [GET_ASMR]: (state, action) =>
      produce(state, (draft) => {
        draft.asmrList = action.payload.asmrListInfo;
      }),
    [SET_PLAYLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.is_write = true;
      }),
    [GET_PLAYLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.playList = action.payload.playList;
      }),
    [SET_WRITE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_write = false;
      }),
    [DELETE_PLAYLIST]: (state, action) =>
      produce(state, (draft) => {
        const new_playList = draft.playList.filter((l, idx) => {
          return action.playList.playlistIdx !== l.playlistIdx;
        });
        draft.diaryList = new_playList;
      }),
    [EDIT_PLAYLIST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.playList.findIndex(
          (l) => l.playlistIdx === action.payload.playlistIdx
        );
        draft.playList[idx].mixTitle = action.payload.mixTitle;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getAsmrDB,
  setPlayListDB,
  getPlayListDB,
  writeInitial,
  DeletePlayListDB,
  editPlayListDB,
};

export { actionCreators };
