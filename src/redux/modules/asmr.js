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
      categoryName: "네이쳐",
      title: "심장",
      asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      // asmrUrl: "1",
      iconUrl: "공원.jpg",
    },
    {
      categoryIdx: "2",
      categoryName: "오브젝트",
      title: "심장",
      asmrUrl: "1",
      // asmrUrl: "1",
      iconUrl: "심장.jpg",

    },
    {
      categoryIdx: "3",
      categoryName: "오브젝트",

      title: "스프링",
      asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      // asmrUrl: "3",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "4",
      categoryName: "네이쳐",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "4",
      iconUrl: "드라이브.jpg",
    },
    {
      categoryIdx: "5",
      categoryName: "네이쳐",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "5",
      iconUrl: "라디오.jpg",
    },
    {
      categoryIdx: "6",
      categoryName: "네이쳐",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "6",
      iconUrl: "레스토랑.jpg",
    },
    {
      categoryIdx: "7",
      categoryName: "네이쳐",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      asmrUrl: "7",
      iconUrl: "물방울.jpg",
    },
    {
      categoryIdx: "8",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "8",
      iconUrl: "바다.jpg",
    },
    {
      categoryIdx: "9",
      categoryName: "플레이스",
      title: "빗소리",
      // asmrUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      asmrUrl: "9",
      iconUrl: "바람.jpg",
    },
    {
      categoryIdx: "10",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "10",
      iconUrl: "비.jpg",
    },
    {
      categoryIdx: "11",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "11",
      iconUrl: "비행기.jpg",
    },
    {
      categoryIdx: "12",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "12",
      iconUrl: "새.jpg",
    },
    {
      categoryIdx: "13",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "13",
      iconUrl: "스프링.jpg",
    },
    {
      categoryIdx: "14",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "14",
      iconUrl: "시냇물.jpg",
    },
    {
      categoryIdx: "15",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "15",
      iconUrl: "심장.jpg",
    },
    {
      categoryIdx: "16",
      categoryName: "플레이스",
      title: "빗소리",
      asmrUrl: "16",
      iconUrl: "양초.jpg",
    },
    {
      categoryIdx: "17",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "17",
      iconUrl: "오르골.jpg",
    },
    {
      categoryIdx: "18",
      categoryName: "네이쳐",
      title: "빗소리",
      asmrUrl: "18",
      iconUrl: "장작.jpg",
    },
    {
      categoryIdx: "19",
      categoryName: "오브젝트",
      title: "빗소리",
      asmrUrl: "19",
      iconUrl: "지하철.jpg",
    },
    {
      categoryIdx: "20",
      categoryName: "오브젝트",
      title: "빗소리",
      asmrUrl: "20",
      iconUrl: "차.jpg",
    },
    {
      categoryIdx: "21",
      categoryName: "오브젝트",
      title: "빗소리",
      asmrUrl: "21",
      iconUrl: "천둥.jpg",
    },
    {
      categoryIdx: "22",
      categoryName: "오브젝트",
      title: "빗소리",
      asmrUrl: "22",
      iconUrl: "커피.jpg",
    },
    {
      categoryIdx: "23",
      categoryName: "오브젝트",
      title: "빗소리",
      asmrUrl: "23",
      iconUrl: "키보드.jpg",
    },
    {
      categoryIdx: "24",
      categoryName: "오브젝트",
      title: "빗소리",
      asmrUrl: "24",
      iconUrl: "펜.jpg",
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
