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
const noticePopDB = (notice, day, hour, minutes) => {
  return function (dispatch, getState, { history }) {
    console.log(notice, day, hour, minutes);
    console.log(apis.postNotice(notice, day, hour, minutes));
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
