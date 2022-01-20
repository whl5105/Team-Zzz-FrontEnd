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
  time: {
    sleepChk: false,
    timePA: "AM",
    hour: 12,
    min: 0,
  },
};

const setNoticeDB = (notice, day = "PM", hour = 0, minutes = 0, token) => {
  const pushToken = history.pushtoken;
  hour = hour / 1;
  minutes = minutes / 1;
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.postNotice(
        notice,
        day,
        hour,
        minutes,
        pushToken
      );

      if (token) {
        const res = await apis.location(token);
      }
      const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
      dispatch(setNotice(info));
      // dispatch(updateNoticeDB(notice, day, hour, minutes))
    } catch (error) {
      console.log("noticeDB Error : ", error);
    }
  };
};

const updateNoticeDB = (notice, day = "AM", hour = 1, minutes = 0) => {
  const pushToken = history.pushtoken;
  console.log("1");
  console.log(notice, day, hour, minutes);
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
    apis
      .putNotice(notice, day, hour, (minutes = 50), userIdx, pushToken)
      .then((response) => console.log(response));
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
