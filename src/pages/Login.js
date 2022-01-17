import React, { useState } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore.js";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import KakaoLogin from "react-kakao-login";

// --- components ---
import { Input } from "../elements";
import Success from "../components/Success";

// --- images ---
import reset from "../static/images/icon/reset.svg";
import kakao from "../static/images/login/kakao.png";

const Login = () => {
  const first_signup = useSelector((store) => store.user.is_signup);

  React.useEffect(() => {
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
      setIsState(false);
    } else {
      setIsState(true);
      dispatch(userActions.loginDB(id, pwd));
    }
  };

  // 서버에서 받아온 요청이 다를 경우
  if (errMessage) {
    setMessage("아이디 또는 비밀번호를 다시 확인해주세요.");
    setIsState(false);
  }

  // 소셜 로그인 성공
  const socialLoginSuccess = (res) => {
    console.log("소셜 로그인 성공");
    console.log(res);
    dispatch(userActions.socialLoginDB(res.profile.id));
  };

  const socialLoginStyle = {
    textAlign: "center",
    padding: "20px",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "500",
    backgroundColor: "#101340",
    border: "none",
    borderSizing: "border-box",
    marginLeft: "31%",
  };

  // 소셜 로그인 실패
  const socialLoginFail = (res) => {
    console.log("소셜 로그인 실패");
    console.log(res);
  };

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
      <Social>or</Social>
      <KakaoLogin
        // rest api 키가 아닌 js 키를 사용해야 합니다.
        jskey={"c51fcbffb9ee44d3b90e755eff2bf5b6"}
        onSuccess={(res) => socialLoginSuccess(res)}
        onFailure={(res) => socialLoginFail(res)}
        // getPofile 속성을 주지 않으면 유저 정보를 받을 수 없습니다.
        getProfile={true}
        style={socialLoginStyle}
      >
        <Icon></Icon>
        카카오 로그인
      </KakaoLogin>

      {/* 회원가입 성공 유저 팝업 */}
      {first_signup ? (
        <Success alt="회원가입 성공" text="회원가입에 성공했습니다"></Success>
      ) : (
        ""
      )}
    </Container>
  );
};

// --- styled-components ---
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
  margin: 20px auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  box-sizing: border-box;
  cursor: pointer;
  & p {
    display: inline-block;
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  }
`;

const Social = styled.div`
  position: relative;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-family: "Roboto", sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.ssmall};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  ::before,
  ::after {
    content: "";
    width: 40%;
    height: 1px;
    position: absolute;
    top: 57%;
    background-color: ${({ theme }) => theme.colors.gray_7};
  }
  ::before {
    left: 0;
  }
  ::after {
    right: 0;
  }
`;

const Icon = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${kakao});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto 10px auto;
  cursor: pointer;
`;

export default Login;
