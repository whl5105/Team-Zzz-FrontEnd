// //웹 앱이 포그라운드 상태일 때 메시지 처리

import { getMessaging, onMessage } from "firebase/messaging";

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
});
