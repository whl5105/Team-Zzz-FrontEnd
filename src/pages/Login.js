import React, { useState, useRef } from "react";

import { history } from "../redux/configureStore.js";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const errMessage = useSelector((store) => store.user.errMessage);
  const [inputs, setInputs] = useState({
    id: "",
    pwd: "",
  });
  const { id, pwd } = inputs;

  // //-- 오류메시지 상태저장--
  const [Message, setMessage] = React.useState("");

  //-- 유효성 검사 --
  const [isState, setIsState] = React.useState(false);

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const loginClick = () => {
    const idRegExp = /^[a-zA-z0-9]{5,10}$/;
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

    if (!idRegExp.test(id) || !pwdRegex.test(pwd)) {
      setMessage("아이디 또는 비밀번호를 다시 확인해주세요.");
      console.log("아이디 비번 틀림 ");
      setIsState(false);
    } else {
      setIsState(true);
      console.log("아이디 비번 확인완료 ");
      dispatch(userActions.loginDB(id, pwd));
    }
  };
  // 서버에서 받아온 요청이 다를 경우
  if (errMessage) {
    setMessage("아이디 또는 비밀번호를 다시 확인해주세요.");
    setIsState(false);
  }

  return (
    <React.Fragment>
      <div>
        <input
          placeholder="아이디"
          name="id"
          value={id}
          onChange={onChange}
        ></input>
      </div>
      <div>
        <input
          placeholder="비밀번호"
          type="password"
          name="pwd"
          value={pwd}
          onChange={onChange}
        ></input>
      </div>
      {!isState && <span>{Message}</span>}
      <div>
        <button type="submit" onClick={loginClick}>
          로그인
        </button>
        <button
          type="submit"
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </button>
      </div>
    </React.Fragment>
  );
};

export default Login;
