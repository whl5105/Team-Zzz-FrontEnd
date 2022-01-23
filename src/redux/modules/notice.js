import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";
import { history } from "../configureStore";
// -- actions --
const SET_NOTICE = "SET_NOTICE";

// -- action creators --
const setNotice = createAction(SET_NOTICE, (notice) => ({ notice }));

// -- initialState --
const initialState = {
};

// -- API --
const setNoticeDB = (notice, day = "PM", hour = 0, minutes = 0, token) => {
  const pushToken = localStorage.getItem("pushtoken");
  hour = hour / 1;
  minutes = minutes / 1;
  console.log(hour, minutes);
  return async function (dispatch, getState, { history }) {
    try {
      await apis.postNotice(notice, day, hour, minutes, pushToken);
      const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
      dispatch(setNotice(info));
    } catch (error) {
      console.log("noticeDB Error : ", error);
    }
  };
};

const updateNoticeDB = (notice, day = "AM", hour = 1, minutes = 0) => {
  const pushToken = localStorage.getItem("pushtoken");
  hour = hour / 1;
  minutes = minutes / 1;
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
    apis
      .putNotice(notice, day, hour, minutes, userIdx, pushToken)
      .then(() => {});
    dispatch(setNotice(info));
  };
};

const getNoticeDB = () => {
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    apis.getNotice(userIdx).then((response) => {
      const info = {
        sleepChk: response[0].sleepChk,
        timePA: response[0].timePA,
        hour: response[0].hour,
        min: response[0].min,
      };
      dispatch(setNotice(info));
    });
  };
};

// -- reducer --
export default handleActions(
  {
    [SET_NOTICE]: (state, action) =>
      produce(state, (draft) => {
        draft.time = action.payload.notice;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getNoticeDB,
  setNoticeDB,
  updateNoticeDB,
};

export { actionCreators };
