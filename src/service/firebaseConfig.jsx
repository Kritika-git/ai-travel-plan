// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKX619JmqyRgqRpvBcVoQD17elaQC6Ld4",
  authDomain: "ai-travel-plan-5a8e4.firebaseapp.com",
  projectId: "ai-travel-plan-5a8e4",
  storageBucket: "ai-travel-plan-5a8e4.firebasestorage.app",
  messagingSenderId: "139785297896",
  appId: "1:139785297896:web:464b7682a0092d481bce5d",
  measurementId: "G-DP5YE8QG5Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
//const analytics = getAnalytics(app);