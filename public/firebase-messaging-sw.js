// importScripts("/__/firebase/9.6.1/firebase-app-compat.js");
// importScripts("/__/firebase/9.6.1/firebase-messaging-compat.js");
// importScripts("/__/firebase/init.js");

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// importScripts("https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js");

// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";

// // This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
self.addEventListener("push", function (event) {
  // push 이벤트나 service-worker.js 와 접점이 없는거 같다
  console.log("Push " + event.data.text());

  const title = "My PWA!";
  const options = {
    body: event.data.text(),
  };

  event.waitUntil(self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
});

self.addEventListener("notificationclick", function (event) {
  console.log("Push clicked");

  event.notification.close();

  event.waitUntil(
    self.clients.openWindow("https://zzzapp.co.kr") // 예시로 일단 로컬호스트로 링크 누르면 가지는걸로 해놨다.
  );
});
