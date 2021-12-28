import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// -- actions --

// -- action creators --

// -- initialState --
const initialState = {
  diaryList: [
    {
      day: "1",
      feelScore: 5,
      sleepScore: 5,
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "2",
      feelScore: 5,
      sleepScore: 5,
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "3",
      feelScore: 5,
      sleepScore: 5,
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "4",
      feelScore: 5,
      sleepScore: 5,
      comment: "오늘은 아구찜 먹음",
    },
    {
      sleepAvg: "+score7/7",
    },
  ],
};

// -- middleware actions --
//회원가입 middleware

// -- reducer --
export default handleActions({}, initialState);

// -- action creator export --
const actionCreators = {};

export { actionCreators };
