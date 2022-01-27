import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --

const GET_DIARY = "GETDIARY";
const ADD_DIARY = "ADD_DIARY";
const EDIT_DIARY = "EDIT_DIARY";
const DELETE_DIARY = "POST_DELETE_DIARYIARY";

// -- action creators --
const get_diary = createAction(
  GET_DIARY,
  (yearMonth, diaryList, diaryScore) => ({
    yearMonth,
    diaryList,
    diaryScore,
  })
);
const add_diary = createAction(
  ADD_DIARY,
  (yearMonth, diaryListRes, diaryScoreRes, diaryScore) => ({
    yearMonth,
    diaryListRes,
    diaryScoreRes,
    diaryScore,
  })
);
const edit_diary = createAction(
  EDIT_DIARY,
  (yearMonth, diaryListInfo, diaryScore) => ({
    yearMonth,
    diaryListInfo,
    diaryScore,
  })
);
const delete_diary = createAction(
  DELETE_DIARY,
  (yearMonth, diaryIdx, diaryScore) => ({
    yearMonth,
    diaryIdx,
    diaryScore,
  })
);

// -- initialState --
const initialState = {
  diaryList: {},
  sleepAvg: "",
  modal: true,
};

// -- middleware actions --
// -- 다이어리 생성 DB --
const addDiaryDB = (yearMonth, diaryListInfo) => {
  return async function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    try {
      const diaryListRes = await apis.addDiary(
        String(yearMonth),
        diaryListInfo.day,
        diaryListInfo.feelScore,
        diaryListInfo.sleepScore,
        diaryListInfo.comment
      );
      const diaryScoreRes = await apis.getDiaryScore(userIdx);
      const diaryScore = diaryScoreRes.errorMessage
        ? "아직 기록이 없습니다."
        : diaryScoreRes.sleepAvg;
      dispatch(add_diary(yearMonth, diaryListRes, diaryScoreRes, diaryScore));
    } catch (error) {
      console.log("addDiaryDB Error : ", error);
    }
  };
};

//-- 다이어리 요청 DB --
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
      const diaryListRes = await apis.getDiaryList(userIdx, yearMonth);
      const diaryList = diaryListRes.errorMessage ? [] : diaryListRes;

      const diaryScoreRes = await apis.getDiaryScore(userIdx);
      const diaryScore = diaryScoreRes.errorMessage
        ? "아직 기록이 없습니다."
        : diaryScoreRes.sleepAvg;

      dispatch(get_diary(yearMonth, diaryList, diaryScore));
    } catch (error) {
      console.log("getDiaryDB Error : ", error);
    }
  };
};

// -- 다이어리 수정 DB --
const editDiaryDB = (yearMonth, diaryListInfo) => {
  return async function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    try {
      apis.editDiaryDB(
        diaryListInfo.diaryIdx,
        diaryListInfo.feelScore,
        diaryListInfo.sleepScore,
        diaryListInfo.comment
      );
      const diaryScoreRes = await apis.getDiaryScore(userIdx);
      const diaryScore = diaryScoreRes.errorMessage
        ? "아직 기록이 없습니다."
        : diaryScoreRes.sleepAvg;
      dispatch(edit_diary(yearMonth, diaryListInfo, diaryScore));
    } catch (error) {
      console.log("editDiaryDB Error : ", error);
    }
  };
};

// -- 다이어리 삭제 DB --
const deleteDiaryDB = (yearMonth, diaryIdx) => {
  return async function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    try {
      apis.deleteDiary(diaryIdx);
      const diaryScoreRes = await apis.getDiaryScore(userIdx);
      const diaryScore = diaryScoreRes.errorMessage
        ? "아직 기록이 없습니다."
        : diaryScoreRes.sleepAvg;
      dispatch(delete_diary(yearMonth, diaryIdx, diaryScore));
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
        draft.diaryList = {
          ...draft.diaryList,
          [action.payload.yearMonth]: action.payload.diaryList,
        };
        draft.sleepAvg = action.payload.diaryScore;
      }),
    [ADD_DIARY]: (state, action) =>
      produce(state, (draft) => {
        draft.diaryList[action.payload.yearMonth].unshift(
          action.payload.diaryListRes
        );
        draft.sleepAvg = action.payload.diaryScore;
      }),
    [EDIT_DIARY]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.diaryList[action.payload.yearMonth].findIndex(
          (d) => d.diaryIdx === action.payload.diaryListInfo.diaryIdx
        );
        draft.diaryList[action.payload.yearMonth][idx] = {
          ...draft.diaryList[action.payload.yearMonth][idx],
          ...action.payload.diaryListInfo,
        };
        draft.sleepAvg = action.payload.diaryScore;
      }),
    [DELETE_DIARY]: (state, action) =>
      produce(state, (draft) => {
        const new_diaryList = draft.diaryList[action.payload.yearMonth].filter(
          (d, idx) => {
            return action.payload.diaryIdx !== d.diaryIdx;
          }
        );
        draft.diaryList = {
          ...draft.diaryList,
          [action.payload.yearMonth]: new_diaryList,
        };
        draft.sleepAvg = action.payload.diaryScore;
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
