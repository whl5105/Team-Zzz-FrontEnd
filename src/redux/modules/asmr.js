import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const GET_ASMR = "GETDIARY";
const SET_PLAYLIST = "SETPLAYLIST";
const GET_PLAYLIST = "GETPLAYLIST";
const SET_WRITE = "SETWRITE";

// -- action creators --
const get_asmr = createAction(GET_ASMR, (asmrListInfo) => ({
  asmrListInfo,
}));

const set_playList = createAction(SET_PLAYLIST, () => ({}));

const get_playList = createAction(GET_PLAYLIST, (playList) => ({
  playList,
}));

const set_write = createAction(SET_WRITE, () => ({}));

// -- initialState --
const initialState = {
  asmrList: [],
  playList: [
    {
      mixTitle: "음원 재생한다",
      mix1: { amsr1: "음악1", sound1: "볼륨1", url: "음원 정보1" },
      mix2: { amsr1: "음악2", sound1: "볼륨2", url: "음원 정보2" },
    },
    {
      mixTitle: "음원 재생한다",
      mix1: { amsr1: "음악1", sound1: "볼륨1", url: "음원 정보1" },
      mix2: { amsr1: "음악2", sound1: "볼륨2", url: "음원 정보2" },
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
      // const res = await apis.postPlayList(playLists);
      dispatch(set_playList());
      // dispatch(getPlayListDB());
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
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getAsmrDB,
  setPlayListDB,
  getPlayListDB,
  writeInitial,
};

export { actionCreators };
