import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";
import axios from "axios";
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
  return async function (dispatch, getState, { history }) {
    try {
      const response = await apis.postNotice(notice, day, hour, minutes);
      console.log("noticePopDB response : ", response);
      // const info = { sleepChk: response.data[0].sleepChk, timePA: response.data[0].timePA, hour: response.data[0].hour, min: response.data[0].min}
      // dispatch(setNotice(info))
    } catch (error) {
      console.log("noticeDB Error : ", error);
    }
  };
};

const noticeDB = (notice, day = "AM", hour = 1, minutes = 0) => {
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    const Token = localStorage.getItem("token")
    console.log(userIdx)
    const info = { sleepChk: notice, timePA: day, hour: hour, min: minutes };
    axios.put(`http://54.180.109.58:3000/api/notice/${userIdx}`,{notice, day, hour, minutes}, {headers:{
      authorization: `Bearer ${Token}`
    }})
    .then((response)=> console.log(response));
    dispatch(setNotice(info));
    history.push("/mypage");
  };
};

const getNoticeDB = () =>{
  return function (dispatch, getState, {history}){
    const userIdx = localStorage.getItem("userIdx");
    const Token = localStorage.getItem("token")
    axios.get(`http://54.180.109.58:3000/api/notice/${userIdx}`,{headers:{
      authorization: `Bearer ${Token}`
    }})
    .then((response)=> {
      console.log(response.data);
      const info = { sleepChk: response.data[0].sleepChk, timePA: response.data[0].timePA, hour: response.data[0].hour, min: response.data[0].min}
      dispatch(setNotice(info))
    });
  }
}

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
  getNoticeDB,
};

export { actionCreators };
