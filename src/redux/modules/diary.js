import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const SET_PREVIEW_FEEL = "SET_PREVIEW_FEEL";
const SET_PREVIEW_SLEEP = "SET_PREVIEW_SLEEP";

// -- action creators --
const setPreviewFeel = createAction(SET_PREVIEW_FEEL, (preview, score) => ({
  preview,
  score,
}));
const setPreviewSleep = createAction(SET_PREVIEW_SLEEP, (preview, score) => ({
  preview,
  score,
}));

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
      feelScore: "4",
      sleepScore: "4",
      comment: "오늘은 아구찜 먹음",
    },

    {
      day: "8",
      feelScore: "5",
      sleepScore: "5",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "6",
      feelScore: "2",
      sleepScore: "2",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "7",
      feelScore: "1",
      sleepScore: "1",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "9",
      feelScore: "2",
      sleepScore: "2",
      comment: "오늘은 아구찜 먹음",
    },
    {
      day: "22",
      feelScore: "3",
      sleepScore: "3",
      comment: "오늘은 아구찜 먹음",
    },
    {
      sleepAvg: "user not data send",
    },
  ],
  //미리보기
  preview: {
    previewFeel: "0",
    previewSleep: "0",
    previewFeelScore: "0",
    previewSleepScore: "0",
  },
};

// -- middleware actions --
const getDiaryDB = (year, month) => {
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    const yearMonth = `${year}-${month}`;

    try {
      const response = apis.getDiary(userIdx, yearMonth);
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
    [SET_PREVIEW_FEEL]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.previewFeel = action.payload.preview;
        draft.preview.previewFeelScore = action.payload.score;
        console.log(draft.preview.previewFeelScore);
      }),
    [SET_PREVIEW_SLEEP]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.previewSleep = action.payload.preview;
        draft.preview.previewSleepScore = action.payload.score;
        console.log(action.payload.score);
      }),
    [GET_DIARY]: (state, action) =>
      produce(state, (draft) => {
        draft.diaryList = action.payload.diaryListInfo;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  setPreviewFeel,
  setPreviewSleep,
  getDiaryDB,
};

export { actionCreators };
