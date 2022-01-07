// const CACHE_NAME = "zzz";

// // const FILES_TO_CACHE = ["offline.html"];
// const FILES_TO_CACHE = ["/"];
// //install : 캐시를 초기화하고 오프라인을 위한 파일들을 추가
// self.addEventListener("install", (evt) => {
//   evt.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("install");
//       return cache.addAll(FILES_TO_CACHE);
//     })
//   );
// });
// //activate : 더 이상 필요하지 않은 파일을 제거하고 앱이 끝난 후 정리하는데 사용
// self.addEventListener("activate", (evt) => {
//   evt.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(
//         keyList.map((key) => {
//           if (key !== CACHE_NAME) {
//             console.log("Removing old cache", key);
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
// });
// //fetch : 네트워크에서 뭔가를 받아올 때 인터넷에 연결되지 않을 경우 캐시에 저장된 것들을 꺼내는 역할을 한다.
// self.addEventListener("fetch", (evt) => {
//   if (evt.request.mode !== "navigate") {
//     return;
//   }
//   evt.respondWith(
//     fetch(evt.request).catch(() => {
//       return caches.open(CACHE_NAME).then((cache) => {
//         return cache.match(FILES_TO_CACHE);
//       });
//     })
//   );
// });
