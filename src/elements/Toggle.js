import React from "react";
import styled from "styled-components";

import firebase from "firebase/compat/app"; //firebase모듈을 import해줘야 합니다.
import { getMessaging, getToken } from "firebase/messaging";

let isSubscribed = false;
let swRegist = null;
console.log(isSubscribed);
const Toggle = (props) => {
  navigator.serviceWorker.ready.then((res) => {
    console.log(res);
    swRegist = res;
  });
  const messaging = getMessaging();

  // Push 초기화
  const initPush = (isSubscribed) => {
    console.log(isSubscribed);
    if (isSubscribed) {
      unsubscribe();
    } else {
      subscribe();
      console.log("dd");
    }

    swRegist.pushManager.getSubscription().then(function (subscription) {
      isSubscribed = !(subscription === null); // null 이면 true 이니 !true 가 false 로 해서 isSubscribed 가 false 라는뜻
      updateSubscription(subscription); // updateSubscription 함수로 구독 정보를 전달

      if (isSubscribed) {
        console.log("User IS subscribed.");
      } else {
        console.log("User is NOT subscribed.");
      }

      updateButton();
    });
  };

  // 알림 구독
  function subscribe() {
    // const applicationServerKey = "BHpAKY7pMnF5to1B-R9DDGRn5w6a5APBojAnwVr1ZyW56w4sPQGqIoCZphWfSHyohcOmKeuvvJHPj8B2KAZT4Ko";
    swRegist.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey:
        process.env.REACT_APP_APPLICATION_SERVER_KEY,
      })
      .then((subscription) => {
        console.log("User is subscribed.");
        updateSubscription(subscription);
        console.log(subscription);
        isSubscribed = true; // 구독정보를 반아온 경우 구독을 정상적으로 한 상황이므로 true로 변경
        updateButton();
      })
      .catch((err) => {
        console.log("Failed to subscribe the user: ", err);
        updateButton();
      });
  }

  //구독 버튼 상태 갱신
  function updateButton() {
    // TODO: 알림 권한 거부 처리

    // const pushButton = document.getElementById("subscribe");
    if (isSubscribed) {
      // pushButton.textContent = "Disable Push Messaging";
    } else {
      // pushButton.textContent = "Enable Push Messaging";
    }
    // pushButton.disabled = false; // true로하면 해당 버튼이 안눌리고 비활성화 된다.
  }

  // 구독 정보 갱신
  function updateSubscription(subscription) {
    // TODO: 구독 정보 서버로 전송

    // let detailArea = document.getElementById("subscription_detail");

    if (subscription) {
      console.log(JSON.stringify(subscription));
      // detailArea.innerText = JSON.stringify(subscription);
      // detailArea.parentElement.classList.remove("hide");
    } else {
      // detailArea.parentElement.classList.add("hide");
    }
  }

  //알림 구독 취소
  function unsubscribe() {
    swRegist.pushManager
      .getSubscription()
      .then((subscription) => {
        console.log(subscription);
        if (subscription) {
          //       swRegist.pushManager     //토글시 메세지 안날라오게 첫번째 방법
          // .subscribe({
          //   userVisibleOnly: true,
          //   applicationServerKey:
          //     "",
          // })

          return swRegist.pushManager // 토글시 메세지 안날라오게 두번째 방법
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
        updateSubscription(null);
        console.log("User is unsubscribed.");
        isSubscribed = false;
        updateButton();
      });
  }

  function urlBase64ToUint8Array(base64String) {
    let padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    let base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    let rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
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
