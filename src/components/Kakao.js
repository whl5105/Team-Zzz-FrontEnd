import React from "react";
import styled from "styled-components";

import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { kakao } from "../static/images/index";

const Kakao = (props) => {
  const dispatch = useDispatch();
  const token = "c51fcbffb9ee44d3b90e755eff2bf5b6";
  const socialLoginSuccess = (res) => {
    console.log("소셜 로그인 성공");
    console.log(res);
    const id = String(res.profile.id);
    console.log(typeof id);
    dispatch(userActions.socialLoginDB(res.profile.id));
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
      token={token}
      onSuccess={(res) => socialLoginSuccess(res)}
      onFailure={(res) => socialLoginFail(res)}
      getProfile={true}
      style={socialLoginStyle}
      onLogout={console.info}
      id="kakao"
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
