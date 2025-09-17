// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf8sJJEyarSGu3S2GwCU_x8IYzc_PqW-4",
  authDomain: "crochet-project-tracker-a62ba.firebaseapp.com",
  databaseURL: "https://crochet-project-tracker-a62ba-default-rtdb.firebaseio.com",
  projectId: "crochet-project-tracker-a62ba",
  storageBucket: "crochet-project-tracker-a62ba.firebasestorage.app",
  messagingSenderId: "400986894867",
  appId: "1:400986894867:web:c6082cd2f707e783c7c5e6",
  measurementId: "G-8Z64T3XCW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
