import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../config/firebase";
import { addUser } from "./user-services";

export const login = async (credentials: { email: string, password: string }) => {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    return userCredential.user;
}

export const createUser = async (credentials: { email: string, password: string }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    const user = userCredential.user;
    await addUser(user.uid);
    return user;
}

export const logout = async () => {
    await signOut(auth);
}

export const changeUserEmail = async (email: string) => {
    if (auth.currentUser) {
        const userCredential = await updateEmail(auth.currentUser, email);
        return userCredential;
    }
}

export const changeUserPassword = async (password: string) => {
    if (auth.currentUser) {
        const userCredential = await updatePassword(auth.currentUser, password);
        return userCredential;
    }
}