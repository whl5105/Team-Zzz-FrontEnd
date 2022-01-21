import React from "react";
import styled from "styled-components";

import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { kakao } from "../static/images/index";

const Kakao = (props) => {
  const dispatch = useDispatch();

  const socialLoginSuccess = (res) => {
    console.log("소셜 로그인 성공");
    dispatch(userActions.socialLoginDB(String(res.profile.id)));
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
