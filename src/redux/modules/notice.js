import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
// const SET_USER = "SET_USER";
const SET_NOTICE = "SET_NOTICE";
// -- action creators --
// const setUser = createAction(SET_USER, (username) => ({ username }));
const setNotice = createAction(SET_NOTICE, (notice) => ({ notice }));

// -- initialState --
const initialState = {
  // user: null,
  time: {
    sleepChk: true,
    timePA: false,
    hour: 11,
    min: 0,
  },
};

// -- middleware actions --
const noticePopDB = (notice, day = false, hour = 0, minutes = 0) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.postNotice(notice, day, hour, minutes);
      console.log("noticePopDB response : ", response.data);
    } catch (error) {
      console.log("noticeDB Error : ", error);
    }
  };
};

const noticeDB = (notice, day = false, hour = 0, minutes = 0) => {
  return function (dispatch, getState, { history }) {
    const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
    console.log(info);
    dispatch(setNotice(info));
  };
};

// -- reducer --
export default handleActions(
  {
    // [SET_USER]: (state, action) =>
    //   produce(state, (draft) => {
    //   }),
    [SET_NOTICE]: (state, action) =>
      produce(state, (draft) => {
        draft.time = action.payload.notice;
        console.log(action.payload.notice);
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  noticePopDB,
  noticeDB,
};

export { actionCreators };
