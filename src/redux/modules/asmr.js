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
  asmrList: [],
};

// -- middleware actions --
const getAsmrDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const res = await apis.getAsmr();
      console.log("getAsmrDB response : ", res.data.items);

      dispatch(get_asmr(res.data.items));
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
