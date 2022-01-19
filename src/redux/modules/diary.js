import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const GET_DIARY = "GETDIARY";
const EDIT_DIARY = "EDIT_DIARY";
const DELETE_DIARY = "POST_DDELETE_DIARYIARY";

// -- action creators --
const get_diary = createAction(GET_DIARY, (diaryList, diaryScore) => ({
  diaryList,
  diaryScore,
}));
const edit_diary = createAction(EDIT_DIARY, (diaryListInfo) => ({
  diaryListInfo,
}));
const delete_diary = createAction(DELETE_DIARY, (diaryIdx) => ({
  diaryIdx,
}));

// -- initialState --
const initialState = {
  diaryList: [],
  sleepAvg: "오늘은 잠을 못주무셨네요",
  modal: true,
};

// -- middleware actions --

//-- 기록 가져오기 --
const getDiaryDB = (year, month) => {
  return async function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    let yearMonth = "";
    if (month < 10) {
      yearMonth = `${year}0${month}`;
    } else {
      yearMonth = `${year}${month}`;
    }

    try {
      // 다이어리 기록 불러오기
      const diaryListRes = await apis.getDiaryList(userIdx, yearMonth);
      const diaryList = diaryListRes.errorMessage ? [] : diaryListRes;

      // 다이어리 점수 불러오기
      const diaryScoreRes = await apis.getDiaryScore(userIdx);
      const diaryScore = diaryScoreRes.errorMessage
        ? "아직 기록이 없습니다."
        : diaryScoreRes.sleepAvg;

      dispatch(get_diary(diaryList, diaryScore));
    } catch (error) {
      console.log("getDiaryDB Error : ", error);
    }
  };
};

// -- 추가 --
const addDiaryDB = (year, month, diaryListInfo) => {
  return async function (dispatch, getState, { history }) {
    // console.log(year, month, diaryListInfo);
    let yearMonth = "";
    if (month < 10) {
      yearMonth = `${year}0${month}`;
    } else {
      yearMonth = `${year}${month}`;
    }

    try {
      const res = await apis.addDiary(
        yearMonth,
        diaryListInfo.day,
        diaryListInfo.feelScore,
        diaryListInfo.sleepScore,
        diaryListInfo.comment
      );
      console.log("addDiaryDB response : ", res);
      dispatch(getDiaryDB(year, month));
    } catch (error) {
      console.log("addDiaryDB Error : ", error);
    }
  };
};

// -- 수정 --
const editDiaryDB = (diaryListInfo) => {
  return function (dispatch, getState, { history }) {
    try {
      // console.log(
      //   diaryListInfo.diaryIdx,
      //   diaryListInfo.feelScore,
      //   diaryListInfo.sleepScore,
      //   diaryListInfo.comment
      // );
      const res = apis.editDiaryDB(
        diaryListInfo.diaryIdx,
        diaryListInfo.feelScore,
        diaryListInfo.sleepScore,
        diaryListInfo.comment
      );
      console.log("editDiaryDB response : ", res);
      dispatch(edit_diary(diaryListInfo));
    } catch (error) {
      console.log("editDiaryDB Error : ", error);
    }
  };
};

// -- 삭제 --
const deleteDiaryDB = (diaryIdx) => {
  return function (dispatch, getState, { history }) {
    // console.log(diaryIdx);
    try {
      const res = apis.deleteDiary(diaryIdx);
      console.log("deleteDiaryDB response : ", res);
      dispatch(delete_diary(diaryIdx));
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
        draft.diaryList = action.payload.diaryList;
        draft.sleepAvg = action.payload.diaryScore;
      }),
    [EDIT_DIARY]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.diaryList.findIndex(
          (d) => d.diaryIdx === action.payload.diaryListInfo.diaryIdx
        );
        draft.diaryList[idx] = {
          ...draft.diaryList[idx],
          ...action.payload.diaryListInfo,
        };
      }),
    [DELETE_DIARY]: (state, action) =>
      produce(state, (draft) => {
        // console.log(typeof action.payload.day);
        const new_diaryList = draft.diaryList.filter((d, idx) => {
          return action.payload.diaryIdx !== d.diaryIdx;
        });
        draft.diaryList = new_diaryList;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getDiaryDB,
  addDiaryDB,
  editDiaryDB,
  deleteDiaryDB,
};

export { actionCreators };
