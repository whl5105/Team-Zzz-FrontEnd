import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const SET_WRITE = "SETWRITE";
const GET_ASMR = "GETASMR";
const SET_PLAYLIST = "SETPLAYLIST";
const GET_PLAYLIST = "GETPLAYLIST";
const EDIT_PLAYLIST = "EDITPLAYLIST";
const DELETE_PLAYLIST = "DELETEPLAYLIST";

// -- action creators --
const get_asmr = createAction(GET_ASMR, (asmrListInfo) => ({
  asmrListInfo,
}));

const set_playList = createAction(SET_PLAYLIST, (is_write) => ({
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
//-- 음원 요청 DB --
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

//-- 믹스리스트 생성 DB --
const setPlayListDB = (playLists) => {
  return async function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    try {
      await apis.postPlayList(playLists.mixTitle, playLists.mixList);
      dispatch(set_playList(true));
      dispatch(getPlayListDB(userIdx));
      history.push("/asmr");
    } catch (error) {
      console.log("setPlayListDB Error : ", error);
    }
  };
};

//-- 믹스리스트 요청 DB--
const getPlayListDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const userIdx = localStorage.getItem("userIdx");
      const res = await apis.getPlayList(userIdx);
      dispatch(get_playList(res));
    } catch (error) {
      console.log("getPlayListDB Error : ", error);
    }
  };
};

//-- 믹스리스트 수정 DB --
const editPlayListDB = (playlistIdx, mixTitle) => {
  return async function (dispatch, getState, { history }) {
    try {
      const userIdx = localStorage.getItem("userIdx");
      await apis.editPlayList(playlistIdx, userIdx, mixTitle);
      dispatch(edit_playList(playlistIdx, mixTitle));
    } catch (error) {
      console.log("editPlayListDB Error : ", error);
    }
  };
};
//-- 믹스리스트 삭제 DB --
const DeletePlayListDB = (playlistIdx) => {
  return async function (dispatch, getState, { history }) {
    try {
      const userIdx = localStorage.getItem("userIdx");
      await apis.deletePlayList(playlistIdx, userIdx);
      dispatch(delete_playList(playlistIdx));
    } catch (error) {
      console.log("deletePlayList Error : ", error);
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
        draft.is_write = action.payload.is_write;
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
          return action.payload.playlistIdx !== l.playlistIdx;
        });
        draft.playList = new_playList;
      }),
    [EDIT_PLAYLIST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.playList.findIndex(
          (l) => l.playlistIdx === action.payload.playlistIdx
        );
        draft.playList[idx].mixTitle = action.payload.mixTitle;
        console.log(draft.playList[idx].mixTitle);
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getAsmrDB,
  setPlayListDB,
  getPlayListDB,
  set_write,
  DeletePlayListDB,
  editPlayListDB,
};

export { actionCreators };
