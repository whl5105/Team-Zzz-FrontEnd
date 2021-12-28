import React, { useState } from 'react';
import firebase from "firebase/compat/app"
import { getMessaging, getToken } from "firebase/messaging";
import { onMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js";
import Firebase from './Firebase'



const Push = (props) =>{
const [token, setToken] = useState('');
    Firebase();
    const messaging = getMessaging();
    // getToken({vapidKey: "BOM_5YaNgIPP2_0MxLv5Nlei_uLTHWPOtNbRZY2LNdVz2L8Tou--MJBfyMrRZBlFgzpwGa4qnsSxi_4eAxVoxaY"});
    
    //사용자에게 허가를 받아 토큰을 가져옵니다.
    Notification.requestPermission()
    .then(function(result) {
        // console.log(result)
        return getToken(messaging, {vapidKey: 'BOM_5YaNgIPP2_0MxLv5Nlei_uLTHWPOtNbRZY2LNdVz2L8Tou--MJBfyMrRZBlFgzpwGa4qnsSxi_4eAxVoxaY'}); 
    })
    .then(function(token) {
        console.log(token);
        setToken(token);
    })
    .catch(function(err) {
        console.log('fcm error : ', err);
    })
    

    
    onMessage(messaging, (payload)=>{  // 현재 메세지가 안오는데 이유는 모르겠음, localhost라서? 구버전 신버전 차이?

        console.log("Message received. ", payload);
        console.log(payload.notification.title);
        console.log(payload.notification.body);
        
    })
   
    return(<>
    <h1>가져온 토큰:</h1>
    <p>{token}</p>
    </>)
}

export default Push;