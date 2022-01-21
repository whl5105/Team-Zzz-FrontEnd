import React, { useState } from "react";
import styled from "styled-components";

import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore.js";

import { kakao } from "../static/images/index";
import Success from "../components/Success";

const Kakao = (props) => {
  const dispatch = useDispatch();
  const [kakaoLoging, setKakaoLoging] = useState(false);

  const socialLoginSuccess = (res) => {
    console.log("소셜 로그인 성공");
    dispatch(userActions.socialLoginDB(res.profile.id));
    setKakaoLoging(true);
    history.push("/");
  };

  const socialLoginStyle = {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "500",
    backgroundColor: "#101340",
    border: "none",
    borderSizing: "border-box",
    margin: "20px auto",
    width: "100%",
  };

  const socialLoginFail = (res) => {
    console.log("소셜 로그인 실패");
  };

  return (
    <>
      <KakaoLogin
        jsKey={process.env.REACT_APP_JS_KEY}
        onSuccess={(res) => socialLoginSuccess(res)}
        onFailure={(res) => socialLoginFail(res)}
        getProfile={true}
        style={socialLoginStyle}
      >
        <Icon></Icon>
        카카오 로그인
      </KakaoLogin>

      {kakaoLoging && (
        <Success alt="로그인 또는 회원가입 중" text="조금만 기다려 주세요" />
      )}
    </>
  );
};

const Icon = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${kakao});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto 10px auto;
  cursor: pointer;
`;

export default Kakao;
