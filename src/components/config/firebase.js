// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
//const firebaseApp = require("firebase/app");
//const firebaseAuth = require("firebase/auth");
//const firebaseFirestore = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.REACT_APP_WEB_DEV_FINAL_FIREBASE);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
