// app/utils/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT1Pov0x2RZ39tMZR0ukIWsN-zWh7Lpdk",
  authDomain: "ace-dashboard-d2b9b.firebaseapp.com",
  projectId: "ace-dashboard-d2b9b",
  storageBucket: "ace-dashboard-d2b9b.appspot.com",
  messagingSenderId: "787155465274",
  appId: "1:787155465274:web:adcd0fbf652f91f2d7b103",
  measurementId: "G-VYSB4ET10X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { analytics};
export { app, db, auth, googleProvider };