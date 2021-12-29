import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
// const SET_USER = "SET_USER";

// -- action creators --
// const setUser = createAction(SET_USER, (username) => ({ username }));

// -- initialState --
const initialState = {
  // user: null,
};

// -- middleware actions --
const noticePopDB = (notice, day = false, hour = 0, minutes = 0) => {
  return async function (dispatch, getState, { history }) {
    console.log(notice, day, hour, minutes);

    try{
      const response = await apis.postNotice(notice, day, hour, minutes);
      console.log("noticePopDB response : ", response.data);
    }catch(error){
      console.log("noticeDB Error : ", error)
    }
  };
};

// -- reducer --
export default handleActions(
  {
    // [SET_USER]: (state, action) =>
    //   produce(state, (draft) => {
    //   }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  noticePopDB,
};

export { actionCreators };
