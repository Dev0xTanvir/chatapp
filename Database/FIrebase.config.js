
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqMiwgZIKgeFPcSaa0pF8c953GhAvyH88",
  authDomain: "mern2404-5da71.firebaseapp.com",
  projectId: "mern2404-5da71",
  storageBucket: "mern2404-5da71.firebasestorage.app",
  messagingSenderId: "630433144017",
  appId: "1:630433144017:web:a27b5cbc72147eabdf79f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth = getAuth(app);
export default auth;