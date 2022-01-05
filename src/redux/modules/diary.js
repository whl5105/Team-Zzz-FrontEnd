import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
// const SET_PREVIEW_FEEL = "SET_PREVIEW_FEEL";
// const SET_PREVIEW_SLEEP = "SET_PREVIEW_SLEEP";
const GET_DIARY = "GETDIARY";
const ADD_DIARY = "POST_DIARY";
const EDIT_DIARY = "EDIT_DIARY";
const DELETE_DIARY = "POST_DDELETE_DIARYIARY";

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
const edit_diary = createAction(EDIT_DIARY, (diaryListInfo) => ({
  diaryListInfo,
}));
const delete_diary = createAction(DELETE_DIARY, (day) => ({
  day,
}));

// -- initialState --
const initialState = {
  diaryList: [
    // {
    //   day: 1,
    //   feelScore: 1,
    //   sleepScore: 1,
    //   comment: "오늘은 아구찜 먹음",
    // },
    // {
    //   day: 4,
    //   feelScore: 2,
    //   sleepScore: 2,
    //   comment: "오늘은 아구찜 먹음",
    // },
    // {
    //   day: 8,
    //   feelScore: 3,
    //   sleepScore: 3,
    //   comment: "오늘은 아구찜 먹음",
    // },
    // {
    //   day: 6,
    //   feelScore: 4,
    //   sleepScore: 4,
    //   comment: "오늘은 아구찜 먹음",
    // },
    // {
    //   day: 7,
    //   feelScore: 5,
    //   sleepScore: 5,
    //   comment: "오늘은 아구찜 먹음",
    // },
  ],

  sleepAvg: "오늘은 잠을 못주무셨네요",
  modal: true,
};

// -- middleware actions --
const getDiaryDB = (year, month) => {
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    const yearMonth = `${year}-${month}`;

    try {
      const res = apis.getDiary(userIdx, yearMonth);
      console.log("getDiaryDB response : ", res);

      dispatch(get_diary(!res.length > 0 ? [] : res));
    } catch (error) {
      console.log("getDiaryDB Error : ", error);
    }
  };
};
//다이어리 기록 추가
const addDiaryDB = (year, month, diaryListInfo) => {
  return function (dispatch, getState, { history }) {
    const yearMonth = `${year}-${month}`;
    // console.log(diaryListInfo);
    // console.log(typeof diaryListInfo);
    try {
      const res = apis.addDiary(
        yearMonth,
        diaryListInfo.day,
        diaryListInfo.feelScore,
        diaryListInfo.sleepScore,
        diaryListInfo.comment
      );
      console.log("addDiaryDB response : ", res);
      dispatch(add_diary(diaryListInfo));
    } catch (error) {
      console.log("addDiaryDB Error : ", error);
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
      console.log(diaryListInfo);
      const res = apis.editDiaryDB(userIdx, diary_info);
      console.log("editDiaryDB response : ", res);
      dispatch(edit_diary(diaryListInfo));
    } catch (error) {
      console.log("editDiaryDB Error : ", error);
    }
  };
};
//다이어리 삭제
const deleteDiaryDB = (year, month, day) => {
  return function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    const yearMonth = `${year}-${month}`;
    try {
      const res = apis.deleteDiary(userIdx, yearMonth, day);
      console.log("postDiaryDB response : ", res);
      dispatch(delete_diary(day));
    } catch (error) {
      console.log("deleteDiaryDB Error : ", error);
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
    [ADD_DIARY]: (state, action) =>
      produce(state, (draft) => {
        draft.diaryList.push(action.payload.diaryListInfo);
        console.log(action.payload.diaryListInfo);
        draft.modal = false;
      }),
    [EDIT_DIARY]: (state, action) =>
      produce(state, (draft) => {
        // draft.diaryList.push(action.payload.diaryListInfo);
        console.log(typeof action.payload.diaryListInfo.day);
        console.log(typeof draft.diaryList[0].day);
        let idx = draft.diaryList.findIndex(
          (d) => d.day === action.payload.diaryListInfo.day
        );
        draft.diaryList[idx] = {
          ...draft.diaryList[idx],
          ...action.payload.diaryListInfo,
        };
      }),
    [DELETE_DIARY]: (state, action) =>
      produce(state, (draft) => {
        console.log(typeof action.payload.day);
        const new_diaryList = draft.diaryList.filter((d, idx) => {
          return action.payload.day !== d.day;
        });
        draft.diaryList = new_diaryList;
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
  editDiaryDB,
  deleteDiaryDB,
};

export { actionCreators };
