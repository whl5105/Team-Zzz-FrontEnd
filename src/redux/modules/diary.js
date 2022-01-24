import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --

const GET_DIARY = "GETDIARY";
const ADD_DIARY = "ADD_DIARY";
const EDIT_DIARY = "EDIT_DIARY";
const DELETE_DIARY = "POST_DDELETE_DIARYIARY";

// -- action creators --
const get_diary = createAction(GET_DIARY, (yearMonth, diaryInfo) => ({
  yearMonth,
  diaryInfo,
}));
const add_diary = createAction(
  ADD_DIARY,
  (yearMonth, diaryListRes, diaryScoreRes) => ({
    yearMonth,
    diaryListRes,
    diaryScoreRes,
  })
);
const edit_diary = createAction(EDIT_DIARY, (diaryListInfo) => ({
  diaryListInfo,
}));
const delete_diary = createAction(DELETE_DIARY, (diaryIdx) => ({
  diaryIdx,
}));

// -- initialState --
const initialState = {
  diaryList: {},
  modal: true,
};

// -- middleware actions --
// -- 다이어리 생성 DB --
const addDiaryDB = (year, month, diaryListInfo) => {
  return async function (dispatch, getState, { history }) {
    const userIdx = localStorage.getItem("userIdx");
    let yearMonth = "";
    if (month < 10) {
      yearMonth = `${year}0${month}`;
    } else {
      yearMonth = `${year}${month}`;
    }

    try {
      const diaryListRes = await apis.addDiary(
        yearMonth,
        diaryListInfo.day,
        diaryListInfo.feelScore,
        diaryListInfo.sleepScore,
        diaryListInfo.comment
      );
      const diaryScoreRes = await apis.getDiaryScore(userIdx);
      dispatch(add_diary(yearMonth, diaryListRes, diaryScoreRes));
      console.log(diaryListRes);
      // dispatch(getDiaryDB(year, month));

      console.log(diaryScoreRes);
    } catch (error) {
      console.log("addDiaryDB Error : ", error);
    }
  };
};

//-- 다이어리 요청 DB --
const getDiaryDB = (year, month) => {
  return async function (dispatch, getState, { history }) {
    try {
      const userIdx = localStorage.getItem("userIdx");
      let yearMonth = "";
      if (month < 10) {
        yearMonth = `${year}0${month}`;
      } else {
        yearMonth = `${year}${month}`;
      }

      // 다이어리 기록 불러오기
      const diaryListRes = await apis.getDiaryList(userIdx, yearMonth);
      const diaryList = diaryListRes.errorMessage ? [] : diaryListRes;
      // 다이어리 점수 불러오기
      const diaryScoreRes = await apis.getDiaryScore(userIdx);
      const diaryScore = diaryScoreRes.errorMessage
        ? "아직 기록이 없습니다."
        : diaryScoreRes.sleepAvg;

      const diaryInfo = {
        diaryRecord: diaryList,
        diaryScore: diaryScore,
      };

      dispatch(get_diary(yearMonth, diaryInfo));
    } catch (error) {
      console.log("getDiaryDB Error : ", error);
    }
  };
};

// -- 다이어리 수정 DB --
const editDiaryDB = (diaryListInfo) => {
  return function (dispatch, getState, { history }) {
    try {
      apis.editDiaryDB(
        diaryListInfo.diaryIdx,
        diaryListInfo.feelScore,
        diaryListInfo.sleepScore,
        diaryListInfo.comment
      );
      dispatch(edit_diary(diaryListInfo));
    } catch (error) {
      console.log("editDiaryDB Error : ", error);
    }
  };
};

// -- 다이어리 삭제 DB --
const deleteDiaryDB = (diaryIdx) => {
  return function (dispatch, getState, { history }) {
    try {
      apis.deleteDiary(diaryIdx);
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
        draft.diaryList = {
          ...draft.diaryList,
          [action.payload.yearMonth]: action.payload.diaryInfo,
        };
      }),
    [ADD_DIARY]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.diaryListRes);
        console.log(action.payload.diaryScoreRes);
        console.log(action.payload.yearMonth);
        // draft.diaryList[action.payload.yearMonth.diaryRecord].unshift(
        //   action.payload.diaryListRes
        // );
        draft.diaryList = {
          ...draft.diaryList,
          // [action.payload.yearMonth] :
        };
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
