import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --

// -- action creators --

// -- initialState --
const initialState = {
  voiceInfo: [
    {
      day: "1",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },
  ],
};

// -- middleware actions --
const voiceRecordDB = (sound) => {
  return function (dispatch, getState, { history }) {
    console.log(sound);
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
  voiceRecordDB,
};

export { actionCreators };
