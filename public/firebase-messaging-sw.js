self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
self.addEventListener("push", function (event) {
  const title = event.data.json().notification.title;
  const options = {
    body: event.data.json().notification.body,
    icon: "favicon.ico",
  };

  event.waitUntil(self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow("https://zzzapp.co.kr") // 예시로 일단 로컬호스트로 링크 누르면 가지는걸로 해놨다.
  );
});
