import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";
import axios from "axios";
// import { deleteCookie, setCookie } from "../../shared/Cookie";

// -- actions --
const SIGNUP = "SIGNUP";
const ERR_SIGNUP = "ERR_SIGNUP";
const SET_USER = "SET_USER";

// -- action creators --
const signup = createAction(SIGNUP);
const err_signup = createAction(ERR_SIGNUP);
const setUser = createAction(SET_USER, (user) => ({ user }));

// -- initialState --
const initialState = {
  user: {
    userIdx: 1,
    userId: "test01",
    noticeSet: false,
  },
  errMessage: "",
  is_login: false,
  is_Signup: true,
};

// -- middleware actions --
//---- 회원가입 DB ----
export const signupDB =
  (userId, password) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await apis.signup(userId, password);
      console.log(res.retult);
      dispatch(signup());
      history.push("/login");
    } catch (err) {
      console.log(`오류 발생!${err}`);
      dispatch(err_signup());
    }
  };
//---- 로그인 DB ----
export const loginDB =
  (userId, password) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await apis.login(userId, password);
      console.log(res);
      // let username = res.data[0].userId;
      //로컬 스토리지 저장
      localStorage.setItem("userIdx", res.userIdx);
      localStorage.setItem("noticeSet", res.noticeSet);
      localStorage.setItem("token", res.token);
      dispatch(
        setUser({
          userIdx: res.userIdx,
          userId: res.userId,
          loginCnt: res.loginCnt,
          noticeSet: res.noticeSet,
        })
      );
      // window.alert(`${username}님 환영합니다`);
      history.replace("/");
    } catch (err) {
      window.alert("없는 회원정보 입니다! 회원가입을 해주세요!");
      console.log(`오류 발생!${err}`);
    }
  };

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    // dispatch(logOut());
    localStorage.removeItem("userIdx");
    localStorage.removeItem("token");
    localStorage.removeItem("noticeSet");
    alert("로그아웃 되었습니다.");
    history.push("/");
    window.location.reload();
  };
};

// -- reducer --
export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_Signup = true;
      }),
    [ERR_SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.errMessage = "중복된 아이디 입니다 ";
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  signupDB,
  loginDB,
  logoutDB,
};

export { actionCreators };
