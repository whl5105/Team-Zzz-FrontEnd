import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const GET_ASMR = "GETDIARY";
const SET_PLAYLIST = "SETPLAYLIST";

// -- action creators --
const get_asmr = createAction(GET_ASMR, (asmrListInfo) => ({
  asmrListInfo,
}));

const set_playList = createAction(SET_PLAYLIST, (playList) => ({
  playList,
}));

// -- initialState --
const initialState = {
  asmrList: [],
  playList: {},
};

// -- middleware actions --
const getAsmrDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await apis.getAsmr();
      console.log("getAsmrDB response : ", res.data.items);
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
      dispatch(set_playList(res));
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
        draft.playList = action.payload.playList;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getAsmrDB,
  setPlayListDB,
};

export { actionCreators };
