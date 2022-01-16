importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

const config = {
  apiKey: "AIzaSyD7vx1YcQDmd7Gom-mOGzB_j_oYD4qjR9M",
  authDomain: "pushnotificationtest-9e21c.firebaseapp.com",
  projectId: "pushnotificationtest-9e21c",
  storageBucket: "pushnotificationtest-9e21c.appspot.com",
  messagingSenderId: "1019872102596",
  appId: "1:1019872102596:web:57ec3461348eca0ea1e191",
  measurementId: "G-TFEDXNHVGY"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const title = "hello world";
  const options = {
    body: payload.data.status,
  };
  return self.registration.showNotification(title, options);
});

// const config =  {
//   apiKey: "AIzaSyBHpknHwT99Y6l4OPhZhShtMql4OVzL968",
//   authDomain: "push-e53ad.firebaseapp.com",
//   projectId: "push-e53ad",
//   storageBucket: "push-e53ad.appspot.com",
//   messagingSenderId: "496302701496",
//   appId: "1:496302701496:web:5c79f13992451572c4ad4d",
//   measurementId: "G-PCQK3HYY0G",
// };
// firebase.initializeApp(config);

// self.addEventListener("install", (pEvent) => {
//   console.log("서비스워커 설치 함!");
//   self.skipWaiting();
// });

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
