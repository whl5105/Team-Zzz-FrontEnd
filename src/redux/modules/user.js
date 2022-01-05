import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import apis from "../../shared/api/apis";

// -- actions --
// const SET_USER = "SET_USER";

// -- action creators --
// const setUser = createAction(SET_USER, (username) => ({ username }));

// -- initialState --
const initialState = {
  // user: null,
};

// -- middleware actions --
const loginDB = () => {
  return function (dispatch, getState, { history }) {};
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
  // setUser,
};

export { actionCreators };
