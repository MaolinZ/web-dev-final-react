import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
