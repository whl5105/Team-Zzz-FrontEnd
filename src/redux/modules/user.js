import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";

// -- actions --
const SIGNUP = "SIGNUP";
const FIRST_SIGNUP = "FIRST_SIGNUP";
const SET_USER = "SET_USER";
const ERR_SIGNUP = "ERR_SIGNUP";

// -- action creators --
const signup = createAction(SIGNUP);
const firstSignup = createAction(FIRST_SIGNUP);
const setUser = createAction(SET_USER, (user) => ({ user }));
const err_signup = createAction(ERR_SIGNUP, (err) => ({ err }));

// -- initialState --
const initialState = {
  user: {
    userIdx: 1,
    userId: "test01",
    noticeSet: false,
  },
  login_errMessage: "",
  signup_errMessage: "",
  is_login: false,
  is_signup: false,
};

// -- middleware actions --

//---- 회원가입 DB ----
export const signupDB =
  (userId, password) =>
  async (dispatch, getState, { history }) => {
    try {
      await apis.signup(userId, password);
      dispatch(signup());
      history.push("/user/login");
    } catch (err) {
      dispatch(err_signup(err.response.data.errorMessage));
    }
  };

//---- 로그인 DB ----
export const loginDB =
  (userId, password) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await apis.login(userId, password);
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

      history.push("/");
    } catch (err) {
      window.alert(err.response.data.errorMessage);
    }
  };

//---- 소셜 로그인 DB ----
export const socialLoginDB =
  (id) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await apis.kakaoLogin(id);

      localStorage.setItem("userIdx", res.userInfo.userIdx);
      localStorage.setItem("noticeSet", res.userInfo.noticeSet);
      localStorage.setItem("token", res.userInfo.token);

      dispatch(
        setUser({
          userIdx: res.userInfo.userIdx,
          userId: res.userInfo.userId,
          loginCnt: res.userInfo.loginCnt,
          noticeSet: res.userInfo.noticeSet,
        })
      );

      history.push("/");
    } catch (err) {
      window.alert("회원가입에 실패 했습니다! 다시 한번 시도 해주세요");
      console.log("socialLoginDB Error : ", err);
    }
  };

//---- 로그아웃 DB ----
const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("userIdx");
    localStorage.removeItem("token");
    localStorage.removeItem("noticeSet");
    
    alert("로그아웃 되었습니다.");
    history.push("/");
  };
};

// -- reducer --
export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_signup = true;
      }),
    [FIRST_SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_signup = false;
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [ERR_SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.signup_errMessage = action.payload.err;
      }),
  },
  initialState
);

// -- action creator export --
const actionCreators = {
  firstSignup,
  signupDB,
  loginDB,
  logoutDB,
  socialLoginDB,
};

export { actionCreators };
