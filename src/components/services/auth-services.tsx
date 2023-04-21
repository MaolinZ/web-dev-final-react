import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../config/firebase";
import { addUser } from "./user-services";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

export const login = async (credentials: { email: string, password: string }) => {
    //const response = await axios.post(AUTH_API + "/login", credentials);
    //return response.data;
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    return userCredential.user;
    /*
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => { return userCredential.user })
        .catch((err) => console.log(err));*/
}

export const createUser = async (credentials: { email: string, password: string }) => {
    //const response = await axios.post(AUTH_API + "/createUser", credentials);
    //return response.data;
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    const user = userCredential.user;
    await addUser(user.uid);
    return user;
    /*
        .then(async (userCredential) => {
            const user = userCredential.user;
            await addUser(user.uid);
            return user;
        })
        .catch((err) => {
            throw err;
        });*/
}

export const uploadProfileImage = async (profileImg: File) => {
    if (auth.currentUser) {
        const storageRef = ref(storage, `/${auth.currentUser.uid}/profile`);
        const uploadTask = await uploadBytesResumable(storageRef, profileImg);
    }
} 

export const getProfileImageURL = async () => {
    if (auth.currentUser) {
        const storageRef = ref(storage, `/${auth.currentUser.uid}/profile`);
        const url = getDownloadURL(storageRef);
        return url;
    }
}