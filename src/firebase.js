import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCF9LG0p_vyjIndWIadGupzb8F621xbugw",
    authDomain: "weblab1-24700.firebaseapp.com",
    projectId: "weblab1-24700",
    storageBucket: "weblab1-24700.appspot.com",
    messagingSenderId: "1027597765283",
    appId: "1:1027597765283:web:80e6787af14361de594d16"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
