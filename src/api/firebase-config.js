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
  apiKey: "AIzaSyBaSdWiIrCDLE1eJw4fDIYmmN2QE5YEq0E",
  authDomain: "flesvoiding.firebaseapp.com",
  projectId: "flesvoiding",
  storageBucket: "flesvoiding.appspot.com",
  messagingSenderId: "148693042120",
  appId: "1:148693042120:web:3f96834f81c29b703876fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
