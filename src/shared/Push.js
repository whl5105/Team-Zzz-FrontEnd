import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { getMessaging, getToken } from "firebase/messaging";
import { onMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js";
import Firebase from "./Firebase";

const Push = (props) => {
  const [token, setToken] = useState("");
  Firebase();
  const messaging = getMessaging();
  // getToken({vapidKey: "BOM_5YaNgIPP2_0MxLv5Nlei_uLTHWPOtNbRZY2LNdVz2L8Tou--MJBfyMrRZBlFgzpwGa4qnsSxi_4eAxVoxaY"});

  //사용자에게 허가를 받아 토큰을 가져옵니다.
  Notification.requestPermission()
    .then(function (result) {
      // console.log(result)
      return getToken(messaging, {
        vapidKey:
          "BOM_5YaNgIPP2_0MxLv5Nlei_uLTHWPOtNbRZY2LNdVz2L8Tou--MJBfyMrRZBlFgzpwGa4qnsSxi_4eAxVoxaY",
      });
    })
    .then(function (token) {
      console.log(token);
      setToken(token);
    })
    .catch(function (err) {
      console.log("fcm error : ", err);
    });

  onMessage(messaging, (payload) => {
    // 현재 메세지가 안오는데 이유는 모르겠음, localhost라서? 구버전 신버전 차이?

    console.log("Message received. ", payload);
    console.log(payload.notification.title);
    console.log(payload.notification.body);
  });

  ////////////////////////

  let appServerPublicKey = "BPxeEDTfZR9m1W2QQcpBvaWbD-NAmdvLHcNyoTwXVavTT15AmkA7ZPUTFwlywjUDCL93wCxajQPEwYVqNHaBtSI";
  let isSubscribed = false;
console.log(isSubscribed);
  let swRegist = null;

  navigator.serviceWorker.register("../service-worker.js").then((regist) => {
    swRegist = regist;
    console.log(swRegist);
  });

  // Push 초기화
  function initPush() {
    // const pushButton = document.getElementById("subscribe");
    // pushButton.addEventListener("click", () => {
        console.log(isSubscribed);
      if (isSubscribed) {

      } else {
        subscribe();
        console.log("dd");
      }
    // }
    // );

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
  }

  // 알림 구독
  function subscribe() {
    const applicationServerKey = urlBase64ToUint8Array(appServerPublicKey);
    swRegist.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then((subscription) => {
        console.log("User is subscribed.");
        updateSubscription(subscription);
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

    const pushButton = document.getElementById("subscribe");
    if (isSubscribed) {
      pushButton.textContent = "Disable Push Messaging";
    } else {
      pushButton.textContent = "Enable Push Messaging";
    }
    pushButton.disabled = false;
  }

  // 구독 정보 갱신
  function updateSubscription(subscription) {}

  //알림 구독 취소
  function unsubscribe() {}

  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  ///////////////////

  return (
    <>
      <h1>가져온 토큰:</h1>
      <p>{token}</p>
      <button id="subscribe" onClick={() => initPush()}>
        subscribe
      </button>
    </>
  );
};

export default Push;
