import React from "react";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";

//modules
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
  const dispatch = useDispatch();
  const errMessage = useSelector((store) => store.user.errMessage);

  //-- 아아디, 비밀번호, 비밀번호확인 , 이메일  --
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");

  //-- 오류 메시지 상태저장--
  const [idMessage, setIdMessage] = React.useState("");
  const [pwdMessage, setPwdMessage] = React.useState("");
  const [pwdCheckMessage, setPwdCheckMessage] = React.useState("");

  //-- 유효성 검사 --
  const [isId, setIsId] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPwdCheck, setIsPwdCheck] = React.useState(false);

  //---- 아이디 유효성 검사  ----
  const idCheck = (e) => {
    const idRegExp = /^[a-zA-z0-9]{5,10}$/;
    const idCurrent = e.target.value;
    setId(idCurrent);
    if (!idRegExp.test(idCurrent)) {
      setIdMessage("5글자 이상 10글자 미만으로 입력해주세요.");
      setIsId(false);
    } else {
      setIdMessage("사용 가능한 아이디입니다.");
      setIsId(true);
    }
  };

  //---- 비밀번호 유효성 검사  ----
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    const passwordCurrent = e.target.value;
    setPwd(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPwdMessage("숫자+영문자 조합으로 8~20자리로 입력해주세요!");
      setIsPassword(false);
    } else {
      setPwdMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  };

  //---- 비밀번호 중복 확인  ----
  const onChangePasswordCheck = (e) => {
    const pwdCurrent = e.target.value;
    setPwdCheck(pwdCurrent);
    if (pwd === pwdCurrent) {
      setPwdCheckMessage("비밀번호를 똑같이 입력했어요 : )");
      setIsPwdCheck(true);
    } else {
      setPwdCheckMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
      setIsPwdCheck(false);
    }
  };

  // ---- 회원가입 버튼 클릭 ----
  const signUpClick = () => {
    if (!isId || !isPassword || !isPwdCheck) {
      window.alert("아이디, 패스워드, 이메일을 정확하게  입력해주세요");
      return;
    }
    dispatch(userActions.signupDB(id, pwd));

    //중복 아이디 일 경우
    if (errMessage) {
      setIdMessage("이미 있는 아이디 입니다.");
      setIsId(false);
    }
  };

  return (
    <>
      <Title>회원가입</Title>
      {/* -- 아이디 --  */}
      <div>
        <Input placeholder="아이디" onChange={idCheck} />
        <br />
        {id.length > 0 ? (
          <Span className={`${isId ? "success" : "error"}`}>{idMessage}</Span>
        ) : (
          <Span>영문 대,소문자, 숫자를 포함(5-10자)</Span>
        )}
      </div>
      {/* -- 비밀번호 --  */}
      <div>
        <Input
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
        ></Input>
        <br />
        {pwd.length > 0 ? (
          <Span className={`${isPassword ? "success" : "error"}`}>
            {pwdMessage}
          </Span>
        ) : (
          <Span>영문 대,소문자, 숫자를 포함(8-20자)</Span>
        )}
      </div>
      {/* -- 비밀번호 확인 -- */}
      <div>
        <Input
          type="password"
          placeholder="비밀번호 확인"
          onChange={onChangePasswordCheck}
        ></Input>
        <br />
        {pwd_check.length > 0 ? (
          <Span className={`${isPwdCheck ? "success" : "error"}`}>
            {pwdCheckMessage}
          </Span>
        ) : (
          <Span>영문 대,소문자, 숫자를 포함(8-20자)</Span>
        )}
      </div>
      {/* -- 회원가입 버튼 --*/}
      <Button onClick={signUpClick}>회원가입</Button>
    </>
  );
};

const Title = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  margin: 20px;
`;

const Span = styled.span`
  margin: 10px 25px;
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

export default Signup;
