// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-lms-5f11d.firebaseapp.com",
  projectId: "mern-lms-5f11d",
  storageBucket: "mern-lms-5f11d.appspot.com",
  messagingSenderId: "468364618922",
  appId: "1:468364618922:web:bccf73fe693836aeb334d3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
