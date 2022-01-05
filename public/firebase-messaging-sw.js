
import firebase from "firebase/compat/app"

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}



const config =  { 
    apiKey: "AIzaSyBHpknHwT99Y6l4OPhZhShtMql4OVzL968",
    authDomain: "push-e53ad.firebaseapp.com",
    projectId: "push-e53ad",
    storageBucket: "push-e53ad.appspot.com",
    messagingSenderId: "496302701496",
    appId: "1:496302701496:web:5c79f13992451572c4ad4d",
    measurementId: "G-PCQK3HYY0G"
}; 
firebase.initializeApp(config);