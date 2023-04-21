// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
//const firebaseApp = require("firebase/app");
//const firebaseAuth = require("firebase/auth");
//const firebaseFirestore = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkevvVyxTYcKwK0T_AJHo5JrNFMYPn3yw",
  authDomain: "webdevfinal-f24d8.firebaseapp.com",
  projectId: "webdevfinal-f24d8",
  storageBucket: "webdevfinal-f24d8.appspot.com",
  messagingSenderId: "1097578729050",
  appId: "1:1097578729050:web:7483b4e49f83ad1aee5263"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);