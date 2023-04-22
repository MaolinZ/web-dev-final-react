import axios from "axios"
import { API_BASE } from "./api_consts";
import { UserProps, UserTemplate } from "../props/UserProps";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const USER_API = `${API_BASE}/users`

export const addUser = async(uid: string) => {
    const userTemplate = UserTemplate;
    userTemplate.username = uid;
    const response = await axios.post(USER_API + "/add", {uid: uid, user: userTemplate});
    return response.data;
}

export const updateUser = async(uid: string, user: UserProps) => {
    const allUsers = await getAllUsers();
    const allUsernames = allUsers.map((u) => {
        return u.username;
    });
    if (!allUsernames.includes(user.username)) { 
        const response = await axios.post(USER_API + "/update", {uid: uid, user: user});
        return response.data;
    } else {
        throw new Error("Username already exists!");
    }
}

export const getUserById = async(uid: string) => {
    const response = await axios.get(USER_API + `/${uid}`);
    return response.data;
}

export const uploadProfileImage = async (uid: string, profileImg: File) => {
    const storageRef = ref(storage, `/${uid}/profile`);
    const uploadTask = await uploadBytesResumable(storageRef, profileImg);
} 

export const getProfileImageURL = async (uid: string) => {
    const storageRef = ref(storage, `/${uid}/profile`);
    const url = getDownloadURL(storageRef);
    return url;
}

export const getAllUsers = async () : Promise<UserProps[]> => {
    const response = await axios.get(USER_API);
    return response.data;
}