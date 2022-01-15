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

// firebase.initializeApp({
//   messagingSenderId: "1019872102596", //이곳은 자신의 프로젝트 설정 => 클라우드 메세징 => 발신자ID를 기입
// });
// const messaging = firebase.messaging();
// self.addEventListener("push", function (event) {
//   const payload = event.data.json();
//   const title = payload.notification.title;
//   const options = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//     data: payload.notification.click_action,
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });
// self.addEventListener("notificationclick", function (event) {
//   console.log(event.notification);
//   event.notification.close();
//   event.waitUntil(clients.openWindow(event.notification.data));
// });
