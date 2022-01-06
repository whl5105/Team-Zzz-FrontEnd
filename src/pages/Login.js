import React, { useState } from "react";
import styled from "styled-components";

import { Input } from "../elements";

import { history } from "../redux/configureStore.js";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import reset from "../static/images/icon/reset.svg";

import SingupSuccess from "../components/SingupSuccess";

const Login = () => {
  const first_signup = useSelector((store) => store.user.is_signup);

  React.useEffect(() => {
    console.log(first_signup);
    if (first_signup === true) {
      const timeout = setTimeout(() => {
        dispatch(userActions.firstSignup());
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

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
  const onReset = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: "",
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
    <Container>
      <Title>로그인</Title>
      <InputBox>
        <Input
          resetInput
          placeholder="아이디를 입력해주세요"
          name="id"
          value={id}
          onChange={onChange}
          src={reset}
          alt="resetButton"
          onClick={onReset}
        />
      </InputBox>
      <InputBox>
        <Input
          resetInput
          placeholder="비밀번호를 입력해주세요"
          type="password"
          name="pwd"
          value={pwd}
          onChange={onChange}
          src={reset}
          alt="resetButton"
          onClick={onReset}
        />
      </InputBox>

      {!isState ? (
        <Span className={`${isState ? "success" : "error"}`}>{Message}</Span>
      ) : (
        <Span></Span>
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
          <p>회원가입하기</p>
        </SignUp>
      </div>
      {first_signup ? <SingupSuccess></SingupSuccess> : ""}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 ${({ theme }) => theme.paddings.xxxxl};
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  margin: ${({ theme }) => theme.margins.xxxxl} 0;
`;
const InputBox = styled.div`
  &:nth-child(2) {
    margin-bottom: ${({ theme }) => theme.margins.xxxxl};
  }
`;
const Span = styled.span`
  height: 54px;
  /* margin: 17px 0; */
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  display: flex;
  justify-content: center;
  align-items: center;
  &.success {
    color: #4791ff;
  }
  &.error {
    color: #ff473d;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  background-color: ${({ theme }) => theme.colors.main_1};
`;

const SignUp = styled.div`
  width: 100%;
  margin: 20px auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  box-sizing: border-box;
  cursor: pointer;
  & p {
    display: inline-block;
    position: relative;
    ::before {
      content: "";
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: -4px;
      left: 0;
      z-index: 100;
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export default Login;
