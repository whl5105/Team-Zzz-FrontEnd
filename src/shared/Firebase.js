// import firebase from "firebase";
import firebase from "firebase/compat/app"

const Firebase =(props) =>{
    const firebaseConfig = {
        apiKey: "AIzaSyBHpknHwT99Y6l4OPhZhShtMql4OVzL968",
        authDomain: "push-e53ad.firebaseapp.com",
        projectId: "push-e53ad",
        storageBucket: "push-e53ad.appspot.com",
        messagingSenderId: "496302701496",
        appId: "1:496302701496:web:5c79f13992451572c4ad4d",
        measurementId: "G-PCQK3HYY0G",
      };
      firebase.initializeApp(firebaseConfig);
    return(<></>)
}



export default Firebase; 