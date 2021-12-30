import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api/apis";
// import { deleteCookie, setCookie } from "../../shared/Cookie";

// -- actions --
const SIGNUP = "SIGNUP";
const SET_USER = "SET_USER";

// -- action creators --
const signup = createAction(SIGNUP, (errMessage) => ({ errMessage }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// -- initialState --
const initialState = {
  user: null,
  errMessage: "",
  is_login: false,
};

// -- middleware actions --
//---- 회원가입 DB ----
export const signupDB =
  (userid, password) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await apis.signup(userid, password);
      console.log(res.result);
      window.alert("회원가입이 완료되었습니다. 로그인 해주세요");
      history.replace("/login");
    } catch (err) {
      console.log(`오류 발생!${err}`);
      dispatch(signup(err.errMessage));
    }
  };
//---- 로그인 DB ----
export const loginDB =
  (userId, password) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await apis.login(userId, password);
      let username = res.data[0].userId;
      // setCookie("token", res.data[1].token, 7);
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
      window.alert(`${username}님 환영합니다`);
      history.replace("/");
    } catch (err) {
      window.alert("없는 회원정보 입니다! 회원가입을 해주세요!");
      console.log(`오류 발생!${err}`);
    }
  };

// -- reducer --
export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.errMessage = action.payload.errMessage;
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
};

export { actionCreators };
