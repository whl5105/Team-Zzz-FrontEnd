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

const set_playList = createAction(SET_PLAYLIST, (playList, is_write) => ({
  playList,
  is_write,
}));

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
  playList: null,
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
//-- 믹스 리스트 추가 --
const setPlayListDB = (playLists) => {
  return async function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    try {
      await apis.postPlayList(playLists.mixTitle, playLists.mixList);
      dispatch(getPlayListDB(userIdx));

      history.push("/asmr");
    } catch (error) {
      console.log("setPlayList Error : ", error);
    }
  };
};
//-- 믹스 리스트 GET 요청 --
const getPlayListDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const userIdx = localStorage.getItem("userIdx");
      const res = await apis.getPlayList(userIdx);
      dispatch(get_playList(res));
    } catch (error) {
      console.log("getPlayList Error : ", error);
    }
  };
};

//-- 믹스 리스트 삭제 --
const DeletePlayListDB = (playlistIdx) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(typeof playlistIdx);
      const userIdx = localStorage.getItem("userIdx");
      console.log(userIdx);
      await apis.deletePlayList(playlistIdx, userIdx);
      console.log(playlistIdx);
      dispatch(delete_playList(playlistIdx));
    } catch (error) {
      console.log("deletePlayList Error : ", error);
    }
  };
};

//-- 믹스 리스트 제목 수정 --
const editPlayListDB = (playlistIdx, mixTitle) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(playlistIdx, mixTitle);
      console.log(playlistIdx);
      const userIdx = localStorage.getItem("userIdx");
      await apis.editPlayList(playlistIdx, userIdx, mixTitle);
      // console.log(res);
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
    // [SET_PLAYLIST]: (state, action) =>
    //   produce(state, (draft) => {
    //     if (draft.playList === null) {
    //       let arr = [];
    //       arr.push(action.payload.playList);
    //       draft.playList.push(arr);
    //     } else {
    //       draft.playList.push(action.payload.playList);
    //     }
    //     draft.is_write = action.payload.is_write;
    //   }),
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
        console.log(action.payload.playlistIdx);
        console.log(typeof action.payload.playlistIdx);
        console.log(draft.playList.playlistIdx);
        console.log(typeof draft.playList.playlistIdx);
        const new_playList = draft.playList.filter((l, idx) => {
          return action.payload.playlistIdx !== l.playlistIdx;
        });
        draft.playList = new_playList;
        console.log(new_playList);
        console.log(draft.playList);
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
