// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXux79ipHYb5zffTulpKum3ztsduloql0",
  authDomain: "clean-report-portal-auth.firebaseapp.com",
  projectId: "clean-report-portal-auth",
  storageBucket: "clean-report-portal-auth.firebasestorage.app",
  messagingSenderId: "866760920083",
  appId: "1:866760920083:web:e63db44cd5d302d73703e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);