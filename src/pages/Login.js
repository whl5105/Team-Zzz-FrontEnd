import React, { useState, useRef } from "react";
import styled from "styled-components";

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
      <Title>로그인</Title>
      <div>
        <Input
          placeholder="아이디"
          name="id"
          value={id}
          onChange={onChange}
        ></Input>
      </div>
      <div>
        <Input
          placeholder="비밀번호"
          type="password"
          name="pwd"
          value={pwd}
          onChange={onChange}
        ></Input>
      </div>
      {!isState && (
        <Span className={`${isState ? "success" : "error"}`}>{Message}</Span>
      )}
      <div>
        <Button type="submit" onClick={loginClick}>
          로그인
        </Button>
        <SignUp
          type="submit"
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입 하기
        </SignUp>
      </div>
    </React.Fragment>
  );
};

const Title = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  margin: 20px;
`;

const Span = styled.span`
  margin: 10px 65px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};

  &.success {
    color: #4791ff;
  }

  &.error {
    color: #ff473d;
  }
`;

const Input = styled.input`
  width: 310px;
  height: 45px;
  padding: 7px;
  border: none;
  border-radius: 8px;
  margin: 10px 23px;
  font-size: ${({ theme }) => theme.fontSizes.small};

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 320px;
  height: 50px;
  border: none;
  border-radius: 8px;
  margin: 15px 24px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  background-color: ${({ theme }) => theme.colors.main_1};
`;

const SignUp = styled.p`
  width: 110px;
  margin: 15px auto;
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid white;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
`;

export default Login;
