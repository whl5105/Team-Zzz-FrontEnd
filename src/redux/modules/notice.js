import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const SET_NOTICE = "SET_NOTICE";

// -- action creators --
const setNotice = createAction(SET_NOTICE, (notice) => ({ notice }));

// -- initialState --
const initialState = {};

// -- API --
const setNoticeDB = (notice, day = "PM", hour = 0, minutes = 0, token) => {
  const pushToken = localStorage.getItem("pushtoken");
  hour = hour / 1;
  minutes = minutes / 1;

  return async function (dispatch, getState, { history }) {
    try {
      let timePA = "";

      if (day === "오전") {
        timePA = "AM";
      } else if (day === "오후") {
        timePA = "PM";
      } else {
        timePA = day;
      }

      await apis.postNotice(notice, timePA, hour, minutes, pushToken);
      const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
      dispatch(setNotice(info));
    } catch (error) {
      console.log("noticeDB Error : ", error);
    }
  };
};

const updateNoticeDB = (notice, day = "PM", hour = 1, minutes = 0) => {
  const pushToken = localStorage.getItem("pushtoken");
  hour = hour / 1;
  minutes = minutes / 1;

  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");

    let timePA = "";

    if (day === "오전") {
      timePA = "AM";
    } else if (day === "오후") {
      timePA = "PM";
    } else {
      timePA = day;
    }

    const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };

    apis
      .putNotice(notice, timePA, hour, minutes, userIdx, pushToken)
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
        timePA: response[0].timePA === "AM" ? "오전" : "오후",
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
