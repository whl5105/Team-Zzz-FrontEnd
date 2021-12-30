import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const GET_ASMR = "GETDIARY";

// -- action creators --
const get_asmr = createAction(GET_ASMR, (asmrListInfo) => ({
  asmrListInfo,
}));

// -- initialState --
const initialState = {
  asmrList: [
    {
      categoryIdx: "1",
      categoryName: "전체",
      title: "빗소리",
      asmrUrl: "asmrUrl1",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "2",
      categoryName: "전체",
      title: "빗소리",
      asmrUrl: "asmrUrl2",
      iconUrl: "iconUrl",
    },

    {
      categoryIdx: "3",
      categoryName: "전체",
      title: "빗소리",
      asmrUrl: "asmrUrl3",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "4",
      categoryName: "공간",
      title: "빗소리",
      asmrUrl: "asmrUrl4",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "5",
      categoryName: "전체",
      title: "빗소리",
      asmrUrl: "asmrUrl5",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "61",
      categoryName: "자연",
      title: "빗소리",
      asmrUrl: "asmrUrl6",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "7",
      categoryName: "공간",
      title: "빗소리",
      asmrUrl: "asmrUrl7",
      iconUrl: "iconUrl",
    },
  ],
};

// -- middleware actions --
const getAsmrDB = () => {
  return function (dispatch, getState, { history }) {
    try {
      const response = apis.getAsmr();
      console.log("getAsmrDB response : ", response.data);

      dispatch(get_asmr(response.data));
    } catch (error) {
      console.log("getAsmrDB Error : ", error);
    }
  };
};

// -- reducer --
export default handleActions(
  {
    [GET_ASMR]: (state, action) =>
      produce(state, (draft) => {
        draft.asmrList = action.payload.asmrListInfo;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getAsmrDB,
};

export { actionCreators };
