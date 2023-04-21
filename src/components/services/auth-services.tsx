//import axios from "axios";
//import { API_BASE } from "./api_consts";
//const AUTH_API = `${API_BASE}/auth`

import { browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export const login = async (credentials: { email: string, password: string }) => {
    //const response = await axios.post(AUTH_API + "/login", credentials);
    //return response.data;
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => { return userCredential.user })
        .catch((err) => console.log(err));
}

export const createUser = async (credentials: { email: string, password: string }) => {
    //const response = await axios.post(AUTH_API + "/createUser", credentials);
    //return response.data;
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => { return userCredential.user })
        .catch((err) => {
            /*
            if (err.code == "auth/email-already-in-use") {
                return -1;
            } else {
                console.log(err);
            }*/
            throw err;
            //console.log(err);
        });
}

export const authState= async () => {
    let uid = "";
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
        }
    })
    return uid;
}