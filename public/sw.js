window.self.addEventListener('install', pEvent => {
    console.log( "서비스워커 설치 함!")
  })
  
  // This allows the web app to trigger skipWaiting via
  // registration.waiting.postMessage({type: 'SKIP_WAITING'})
  window.self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      window.self.skipWaiting();
    }
  });
  
  // Any other custom service worker logic can go here.
  window.self.addEventListener('push', function (event){  // push 이벤트나 service-worker.js 와 접점이 없는거 같다
    console.log('Push ' + event.data.text());
  
    const title = 'My PWA!';
    const options = {
      body: event.data.text()
    };
   
    event.waitUntil(window.self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
  });
  
  window.self.addEventListener('notificationclick', function(event) {
    console.log('Push clicked');
  
    event.notification.close();
  
    event.waitUntil(
      
        window.self.clients.openWindow('http://localhost:3000/')  // 예시로 일단 로컬호스트로 링크 누르면 가지는걸로 해놨다.
    );
  });