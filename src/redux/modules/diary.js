import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const GET_DIARY = "GETDIARY";

// -- action creators --
const get_diary = createAction(GET_DIARY, (diaryListInfo) => ({
  diaryListInfo,
}));

// -- initialState --
const initialState = {
  diaryList: [
    {
      day: "1",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "4",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },

    {
      day: "5",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "6",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "7",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "9",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "22",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },
    {
      sleepAvg: 20,
    },
  ],
};

// -- middleware actions --
const getDiaryDB = (year, month) => {
  return function (dispatch, getState, { history }) {
    const userIdx = "?";

    try {
      const response = apis.getDiary(userIdx, year, month);
      console.log("getDiaryDB response : ", response.data);

      dispatch(get_diary(response.data));
    } catch (error) {
      console.log("getDiaryDB Error : ", error);
    }
  };
};

// -- reducer --
export default handleActions(
  {
    [GET_DIARY]: (state, action) =>
      produce(state, (draft) => {
        draft.diaryList = action.payload.diaryListInfo;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getDiaryDB,
};

export { actionCreators };
