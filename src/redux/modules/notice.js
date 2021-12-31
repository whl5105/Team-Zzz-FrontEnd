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
    sleepChk: false,
    timePA: "AM",
    hour: 12,
    min: 0,
  },
};

// -- middleware actions --
const noticePopDB = (notice, day = "PM", hour = 0, minutes = 0) => {
  return async (dispatch, getState, { history }) => {
    try {
      const response = await apis.postNotice(notice, day, hour, minutes);
      console.log("noticePopDB response : ", response);
    } catch (error) {
      console.log("noticeDB Error : ", error);
    }
  };
};

const noticeDB = (notice, day = "AM", hour = 1, minutes = 0) => {
  return function (dispatch, getState, { history }) {
    const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
    console.log(info);
    dispatch(setNotice(info));
    history.push("/mypage");
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
