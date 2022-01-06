import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

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

// -- middleware actions --
const noticePopDB = (notice, day = "PM", hour = 0, minutes = 0) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.postNotice(notice, day, hour, minutes);
      const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes }
      dispatch(setNotice(info));
    } catch (error) {
      console.log("noticeDB Error : ", error);
    }
  };
};

const noticeDB = (notice, day = "AM", hour = 1, minutes = 0) => {
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    console.log(userIdx)
    const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
    apis.putNotice(notice, day, hour, minutes, userIdx)
    .then((response)=> console.log(response));
    dispatch(setNotice(info));
    history.push("/mypage");
  };
};

const getNoticeDB = () =>{
  return function (dispatch, getState, {history}){
    const userIdx = localStorage.getItem("userIdx");
    apis.getNotice(userIdx)
    .then((response)=> {
      console.log(response);
      const info = { sleepChk: response[0].sleepChk, timePA: response[0].timePA, hour: response[0].hour, min: response[0].min}
      dispatch(setNotice(info))
    });
  }
}

// -- reducer --
export default handleActions(
  {
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
  getNoticeDB,
};

export { actionCreators };
