import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const SET_PREVIEW_FEEL = "SET_PREVIEW_FEEL";
const SET_PREVIEW_SLEEP = "SET_PREVIEW_SLEEP";

// -- action creators --
const setPreviewFeel = createAction(SET_PREVIEW_FEEL, (state) => ({
  state,
}));
const setPreviewSleep = createAction(SET_PREVIEW_SLEEP, (state) => ({
  state,
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
  //미리보기
  preview: {
    previewFeel: "0",
    previewSleep: "0",
  },
};

// -- middleware actions --
const noticePopDB = (notice, day = "", hour = "", minutes = "") => {
  return function (dispatch, getState, { history }) {
    console.log(notice, day, hour, minutes);
  };
};

// -- reducer --
export default handleActions(
  {
    [SET_PREVIEW_FEEL]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.previewFeel = action.payload.state;
      }),
    [SET_PREVIEW_SLEEP]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.previewSleep = action.payload.state;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  noticePopDB,
  setPreviewFeel,
  setPreviewSleep,
};

export { actionCreators };
