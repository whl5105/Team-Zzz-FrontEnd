
// let appServerPublickey = "BPxeEDTfZR9m1W2QQcpBvaWbD-NAmdvLHcNyoTwXVavTT15AmkA7ZPUTFwlywjUDCL93wCxajQPEwYVqNHaBtSI";
// let isSubsribed = false;
// let swRegist = null;

// navigator.serviceWorker.register('../service-worker.js').then(regist=>{

//     swRegist = regist;
//     console.log(swRegist);

// })

// // Push 초기화
// function initPush () {
//     const pushButton = document.getElementById('subscribe')
//     pushButton.addEventListener('click', () => {
      
//         subscribe();
      
//     });
  
//     swRegist.pushManager.getSubscription()
//       .then(function(subscription) {
//         isSubscribed = !(subscription === null);
//         updateSubscription(subscription);
  
//         if (isSubscribed) {
//           console.log('User IS subscribed.');
//         } else {
//           console.log('User is NOT subscribed.');
//         }
  
//         updateButton();
//       });
//   }


// function urlBase64ToUint8Array(base64String) {
//     var padding = '='.repeat((4 - base64String.length % 4) % 4);
//     var base64 = (base64String + padding)
//         .replace(/\-/g, '+')
//         .replace(/_/g, '/');

//     var rawData = window.atob(base64);
//     var outputArray = new Uint8Array(rawData.length);

//     for (var i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }

// // 알림 구독
// function subscribe () {
//     const applicationServerKey = urlBase64ToUint8Array(appServerPublicKey);
//     swRegist.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: applicationServerKey
//     })
//     .then(subscription => {
//       console.log('User is subscribed.');
//       updateSubscription(subscription);
//       isSubscribed = true;
//       updateButton();
//     })
//     .catch(err => {
//       console.log('Failed to subscribe the user: ', err);
//       updateButton();
//     });
//   }
  