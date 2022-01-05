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

      title: "심장",
      asmrUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B3%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%87%E1%85%B3.mp3",
      // asmrUrl: "1",
      iconUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(jpg)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%A5%E1%84%80%E1%85%AA%E1%86%AB.jpg",
    },
    {
      categoryIdx: "2",
      categoryName: "오브젝트",
      title: "심장",
      asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      // asmrUrl: "1",
      iconUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(jpg)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%A5%E1%84%80%E1%85%AA%E1%86%AB.jpg",
    },

    {
      categoryIdx: "3",
      categoryName: "오브젝트",
      title: "스프링",
      asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      // asmrUrl: "3",
      iconUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(jpg)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%A5%E1%84%80%E1%85%AA%E1%86%AB.jpg",
    },
    {
      categoryIdx: "4",
      categoryName: "네이쳐",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "4",
      iconUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(jpg)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%A5%E1%84%80%E1%85%AA%E1%86%AB.jpg",
    },
    {
      categoryIdx: "5",
      categoryName: "네이쳐",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "5",
      iconUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(jpg)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%A5%E1%84%80%E1%85%AA%E1%86%AB.jpg",
    },
    {
      categoryIdx: "6",
      categoryName: "플레이스",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "6",
      iconUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(jpg)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%A5%E1%84%80%E1%85%AA%E1%86%AB.jpg",
    },
    {
      categoryIdx: "7",
      categoryName: "플레이스",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "7",
      iconUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(jpg)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%A5%E1%84%80%E1%85%AA%E1%86%AB.jpg",
    },
    {
      categoryIdx: "8",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "8",
      iconUrl:
        "https://zzz-asmr-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5(jpg)/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB/%E1%84%83%E1%85%A9%E1%84%89%E1%85%A5%E1%84%80%E1%85%AA%E1%86%AB.jpg",
    },
    {
      categoryIdx: "9",
      categoryName: "플레이스",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      asmrUrl: "9",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "10",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "10",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "11",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "11",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "12",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "12",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "13",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "13",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "14",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "14",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "15",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "15",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "16",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "16",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "17",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "17",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "18",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "18",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "19",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "19",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "20",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "20",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "21",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "21",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "22",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "22",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "23",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "23",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "24",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "24",
      iconUrl: "스프링.jpg",
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
