import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
// const SET_PREVIEW_FEEL = "SET_PREVIEW_FEEL";
// const SET_PREVIEW_SLEEP = "SET_PREVIEW_SLEEP";
const GET_DIARY = "GETDIARY";
const ADD_DIARY = "POST_DIARY";

// -- action creators --
// const setPreviewFeel = createAction(SET_PREVIEW_FEEL, (preview, score) => ({
//   preview,
//   score,
// }));
// const setPreviewSleep = createAction(SET_PREVIEW_SLEEP, (preview, score) => ({
//   preview,
//   score,
// }));
// -- action creators --
const get_diary = createAction(GET_DIARY, (diaryListInfo) => ({
  diaryListInfo,
}));
const add_diary = createAction(ADD_DIARY, (diaryListInfo) => ({
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

  sleepAvg: 20,

  // //미리보기
  // preview: {
  //   previewFeel: "0",
  //   previewSleep: "0",
  //   previewFeelScore: "0",
  //   previewSleepScore: "0",
  // },
};

// -- middleware actions --
const getDiaryDB = (year, month) => {
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    const yearMonth = `${year}-${month}`;

    try {
      const response = apis.getDiary(userIdx, yearMonth);
      console.log("getDiaryDB response : ", response);

      dispatch(get_diary(response));
    } catch (error) {
      console.log("getDiaryDB Error : ", error);
    }
  };
};
//다이어리 기록 추가
const addDiaryDB = (year, month, diaryListInfo) => {
  return function (dispatch, getState, { history }) {
    const yearMonth = `${year}-${month}`;
    //요청보낼 다이어리 리스트
    const diary_info = {
      yearMonth: yearMonth,
      ...diaryListInfo,
    };
    console.log(diaryListInfo);
    try {
      const res = apis.postDiary(diary_info);
      console.log("postDiaryDB response : ", res);
      dispatch(add_diary(diaryListInfo));
      history.replace("/diary");
    } catch (error) {
      console.log("postDiaryDB Error : ", error);
    }
  };
};
//다이어리 편집
const editDiaryDB = (year, month, diaryListInfo) => {
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    const yearMonth = `${year}-${month}`;
    //요청보낼 다이어리 리스트
    const diary_info = {
      yearMonth: yearMonth,
      ...diaryListInfo,
    };
    try {
      const res = apis.postDiary(userIdx, diary_info);
      console.log("postDiaryDB response : ", res);
      dispatch(add_diary(diaryListInfo));
    } catch (error) {
      console.log("postDiaryDB Error : ", error);
    }
  };
};

// -- reducer --
export default handleActions(
  {
    // [SET_PREVIEW_FEEL]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.preview.previewFeel = action.payload.preview;
    //     draft.preview.previewFeelScore = action.payload.score;
    //     console.log(draft.preview.previewFeelScore);
    //   }),
    // [SET_PREVIEW_SLEEP]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.preview.previewSleep = action.payload.preview;
    //     draft.preview.previewSleepScore = action.payload.score;
    //     console.log(action.payload.score);
    //   }),
    [GET_DIARY]: (state, action) =>
      produce(state, (draft) => {
        draft.diaryList = action.payload.diaryListInfo;
      }),
    [ADD_DIARY]: (state, action) =>
      produce(state, (draft) => {
        draft.diaryList.push(action.payload.diaryListInfo);
        console.log(action.payload.diaryListInfo);
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  // setPreviewFeel,
  // setPreviewSleep,
  getDiaryDB,
  addDiaryDB,
};

export { actionCreators };
