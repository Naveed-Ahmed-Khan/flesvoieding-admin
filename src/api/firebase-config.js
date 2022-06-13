// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC2gf5Z-5K6Xx9exgPyJewf7z-W9pwbps",
  authDomain: "flesvoieding.firebaseapp.com",
  projectId: "flesvoieding",
  storageBucket: "flesvoieding.appspot.com",
  messagingSenderId: "363739061494",
  appId: "1:363739061494:web:489580b8c68cdff07360d7",
  measurementId: "G-D5Y1Z6QQQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
