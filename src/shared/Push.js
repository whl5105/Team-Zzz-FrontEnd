// import React, { useState } from "react";
// import firebase from "firebase/compat/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import {onBackgroundMessage} from "firebase/messaging/sw"
// // import { onMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js";
// import Firebase from "./Firebase";
// import axios from "axios";

// const Push = (props) => {

//     const [token, setToken] = useState("");
//     Firebase();
//     const messaging = getMessaging();
//     // console.log(messaging.vapidKey)
//     // getToken({vapidKey: "BOM_5YaNgIPP2_0MxLv5Nlei_uLTHWPOtNbRZY2LNdVz2L8Tou--MJBfyMrRZBlFgzpwGa4qnsSxi_4eAxVoxaY"});

//     //사용자에게 허가를 받아 토큰을 가져옵니다.
//     Notification.requestPermission()
//       .then(function (result) {
//         // console.log(result)
//         return getToken(messaging, {
//           vapidKey:
//             "BOM_5YaNgIPP2_0MxLv5Nlei_uLTHWPOtNbRZY2LNdVz2L8Tou--MJBfyMrRZBlFgzpwGa4qnsSxi_4eAxVoxaY",
//         });
//       })
//       .then(function (token) {
//         console.log(token);
//         setToken(token);

//         // axios.post('https://fcm.googleapis.com/fcm/send',{ json:{
//         //   'notification':{
//         //     "body" : "새로운글",
//         //     "title": "ㅇㅇ",
//         //     "click_action": "http://localhost:3000"
//         //   }, 'to': token}
//         // }, {headers:{
//         //   'Content-type' : 'application/json',
//         //   'Authorization' : 'key='+'AIzaSyBHpknHwT99Y6l4OPhZhShtMql4OVzL968'
//         // }}).then(res => {console.log(res.text())})

//       })
//       .catch(function (err) {
//         console.log("fcm error : ", err);
//       });

//       // messaging.setBackgroundMessageHandler(function(payload){
//       //   console.log("ddddd")
//       //   const title = "Hello World";
//       //   const option = { body: payload.data.status }
//       //   return window.self.registration.showNotification(title,option);
//       // });

//       onMessage(messaging, (payload) => {
//       // 현재 메세지가 안오는데 이유는 모르겠음, localhost라서? 구버전 신버전 차이?
//       console.log(payload);
//       console.log("Message received. ", payload);
//       console.log(payload.notification.title);
//       console.log(payload.notification.body);
//     });

//     // onBackgroundMessage(messaging, (payload) => {
//     //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     //   // Customize notification here
//     //   const notificationTitle = 'Background Message Title';
//     //   const notificationOptions = {
//     //     body: 'Background Message body.',
//     //     icon: '/firebase-logo.png'
//     //   };

//     //   window.self.registration.showNotification(notificationTitle,
//     //     notificationOptions);
//     // })

//   ///////////////////

//   return (
//     <>
//       <h1>가져온 토큰:</h1>
//       {/* <p>{token}</p> */}
//       <button id="subscribe">
//         subscribe
//       </button>
//       <span id="subscription_detail" style={{ color: "white" }}></span>
//     </>
//   );
// };

// export default Push;
