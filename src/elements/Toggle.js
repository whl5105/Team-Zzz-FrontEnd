import React from "react";
import styled from "styled-components";
import { getMessaging, getToken } from "firebase/messaging";

let isSubscribed = false;
let swRegist = null;
const Toggle = (props) => {
  const messaging = getMessaging();

  getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  }).then(() => {
    swRegist = messaging.swRegistration;
  });

  // Push 초기화
  const initPush = (isSubscribed) => {
    if (isSubscribed) {
      unsubscribe();
    } else {
      subscribe();
    }
    swRegist.pushManager.getSubscription().then(function (subscription) {
      isSubscribed = !(subscription === null); // null 이면 true 이니 !true 가 false 로 해서 isSubscribed 가 false 라는뜻
      if (isSubscribed) {
        console.log("User IS subscribed.");
      } else {
        console.log("User is NOT subscribed.");
      }
    });
  };

  // 알림 구독
  function subscribe() {
    swRegist.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_APPLICATION_SERVER_KEY,
      })
      .then((subscription) => {
        console.log("User is subscribed.");

        isSubscribed = true; // 구독정보를 반아온 경우 구독을 정상적으로 한 상황이므로 true로 변경
      })
      .catch((err) => {
        console.log("Failed to subscribe the user: ", err);
      });
  }

  //알림 구독 취소
  function unsubscribe() {
    swRegist.pushManager
      .getSubscription()
      .then((subscription) => {
        if (subscription) {
          return swRegist.pushManager // 토글시 메세지 안날라오게 하는 방법
            .unsubscribe()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log("Error unsubscribing", error);
      })
      .then(() => {
        console.log("User is unsubscribed.");
        isSubscribed = false;
      });
  }

  return (
    <>
      {props.label}
      <ToggleSwitch className="toggle-switch">
        <CheckBox
          type="checkbox"
          className="checkbox"
          name={props.label}
          id={props.label}
          checked={props.notice}
          onChange={() => {
            props.setNotice(!props.notice);
            initPush(props.notice);
          }}
        />
        <Label className="label" htmlFor={props.label}>
          <Inner className="inner" />
          <Switch className="switch" />
        </Label>
      </ToggleSwitch>
    </>
  );
};

// --- styled-components ---
const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  display: inline-block;
  text-align: left;
  top: -1px;
`;

const CheckBox = styled.input`
  display: none;

  &.checkbox:checked + .label .inner {
    margin-left: 0;
  }

  &.checkbox:checked + .label .switch {
    right: 0px;
  }
`;

const Label = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 0 solid #bbb;
  border-radius: 20px;
`;

const Inner = styled.span`
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;

  &::before,
  &::after {
    float: left;
    width: 50%;
    height: 30px;
    padding: 0;
    line-height: 36px;
    color: #fff;
    font-weight: bold;
    box-sizing: border-box;
  }

  &::before {
    content: "";
    padding-left: 10px;
    background-color: #fbc037;
    color: #fff;
  }

  &::after {
    content: "";
    padding-right: 10px;
    background-color: #bbb;
    color: #fff;
    text-align: right;
  }
`;

const Switch = styled.span`
  display: block;
  width: 20px;
  margin: 5px;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  border: 0 solid #bbb;
  border-radius: 20px;
  transition: all 0.3s ease-in 0s;
`;

export default Toggle;
