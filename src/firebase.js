import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCANmiurgD2cnR5u2OHTK5RTw0jXSlYCLA",
  authDomain: "cashcat-5e39f.firebaseapp.com",
  projectId: "cashcat-5e39f",
  storageBucket: "cashcat-5e39f.firebasestorage.app",
  messagingSenderId: "233243876840",
  appId: "1:233243876840:web:af2b531c94857668d1d85d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
