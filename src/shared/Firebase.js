// import firebase from "firebase";
import firebase from "firebase/compat/app";

const Firebase = (props) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBHpknHwT99Y6l4OPhZhShtMql4OVzL968",
    authDomain: "push-e53ad.firebaseapp.com",
    projectId: "push-e53ad",
    storageBucket: "push-e53ad.appspot.com",
    messagingSenderId: "496302701496",
    appId: "1:496302701496:web:5c79f13992451572c4ad4d",
    measurementId: "G-PCQK3HYY0G",

    // apiKey: "AIzaSyACNv3mnjYQGw6A0Q08ENgY1K_NTexyvOI",
    // authDomain: "zzz-pwa.firebaseapp.com",
    // projectId: "zzz-pwa",
    // storageBucket: "zzz-pwa.appspot.com",
    // messagingSenderId: "167031359028",
    // appId: "1:167031359028:web:c63f06088b6c5aec6eac61",
    // measurementId: "G-Y1RRKXLCN7",
  };

  firebase.initializeApp(firebaseConfig);
  return <></>;
};

export default Firebase;

// import firebase from "firebase";

// const firebaseConfig = {
//             apiKey: "AIzaSyBHpknHwT99Y6l4OPhZhShtMql4OVzL968",
//             authDomain: "push-e53ad.firebaseapp.com",
//             projectId: "push-e53ad",
//             storageBucket: "push-e53ad.appspot.com",
//             messagingSenderId: "496302701496",
//             appId: "1:496302701496:web:5c79f13992451572c4ad4d",
//             measurementId: "G-PCQK3HYY0G",

// };

// export const firebaseApp = firebase.initializeApp(firebaseConfig);
