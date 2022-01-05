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
      categoryName: "오브젝트",
      title: "빗소리",
      asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      // asmrUrl: "1",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "2",
      categoryName: "오브젝트",
      title: "빗소리",
      asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      // asmrUrl: "2",
      iconUrl: "iconUrl",
    },

    {
      categoryIdx: "3",
      categoryName: "오브젝트",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "3",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "4",
      categoryName: "네이쳐",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "4",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "5",
      categoryName: "네이쳐",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "5",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "6",
      categoryName: "플레이스",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "6",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "7",
      categoryName: "플레이스",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "7",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "8",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "8",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "9",
      categoryName: "플레이스",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      asmrUrl: "9",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "10",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "10",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "11",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "11",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "12",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "12",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "13",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "13",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "14",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "14",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "15",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "15",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "16",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "16",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "17",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "17",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "18",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "18",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "19",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "19",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "20",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "20",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "21",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "21",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "22",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "22",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "23",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "23",
      iconUrl: "iconUrl",
    },
    {
      categoryIdx: "24",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "24",
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

      dispatch(get_asmr(!response.data ? [] : response.data));
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
        // draft.asmrList = action.payload.asmrListInfo;
        draft.asmrList = state.asmrList;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  getAsmrDB,
};

export { actionCreators };
