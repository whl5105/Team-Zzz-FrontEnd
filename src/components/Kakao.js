import React, { useState } from "react";
import styled from "styled-components";

import KakaoLogin from "react-kakao-login";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { kakao } from "../static/images/index";
import Success from "../components/Success";

const Kakao = (props) => {
  const dispatch = useDispatch();
  const [kakaoLoging, setKakaoLoging] = useState(false);
  // const kakaoKey = process.env.REACT_APP_JS_KEY;
  const kakaoKey = "c51fcbffb9ee44d3b90e755eff2bf5b6";

  React.useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      // JavaScript key를 인자로 주고 SDK 초기화
      window.Kakao.init(kakaoKey);
      // SDK 초기화 여부를 확인하자.
      console.log(window.Kakao.isInitialized());
    }
  }, []);

  const socialLoginSuccess = (res) => {
    setKakaoLoging(true);
    dispatch(userActions.socialLoginDB(res.profile.id));
  };

  const loading = () => {
    const kakaoLoading = setTimeout(() => {
      setKakaoLoging(false);
    }, 2000);

    clearTimeout(kakaoLoading);
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
      <div onClick={loading}>
        <KakaoLogin
          jsKey={kakaoKey}
          onSuccess={(res) => socialLoginSuccess(res)}
          onFailure={(res) => socialLoginFail(res)}
          getProfile={true}
          style={socialLoginStyle}
        >
          <Icon></Icon>
          카카오 로그인
        </KakaoLogin>
      </div>

      {kakaoLoging && (
        <Success isClock alt="loading" text="조금만 기다려주세요" />
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
