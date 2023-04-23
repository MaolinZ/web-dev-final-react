import axios from "axios"
import { API_BASE } from "./api_consts";
import { UserProps, UserTemplate } from "../props/UserProps";
import { auth, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAdminById, updateAdmin } from "./admin-services";

const USER_API = `${API_BASE}/users`

export const addUser = async(uid: string) => {
    const userTemplate = UserTemplate;
    userTemplate.username = uid;
    const response = await axios.post(USER_API + "/add", {uid: uid, user: userTemplate});
    return response.data;
}

export const updateUser = async(uid: string, user: UserProps) => {
    const allUsers = await getAllUsers();
    const filterUsers = allUsers.filter((u) => {
        return u.uid !== uid;
    })
    const allUsernames = filterUsers.map((u) => {
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
    return 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'
    const storageRef = ref(storage, `/${uid}/profile`);
    const url = getDownloadURL(storageRef);
    return url;
}

export const getAllUsers = async () : Promise<UserProps[]> => {
    const response = await axios.get(USER_API);
    return response.data;
}

export const banUser = async(uid: string) => {
    const retrieveAdmin = await getAdminById(auth.currentUser?.uid!);
    console.log(retrieveAdmin);
    const banList = retrieveAdmin.bans;
    banList.push(uid);
    const response = await axios.post(USER_API + "/update", {uid: uid, user: {isBanned: true}})
    await updateAdmin(auth.currentUser?.uid!, {bans: banList})
    return response.data;
}

export const unbanUser = async(uid: string) => {
    const retrieveAdmin = await getAdminById(auth.currentUser?.uid!);
    const banList = retrieveAdmin.bans;
    const newBanList = banList.filter((ban: string) => {
        return ban !== uid;
    });
    const response = await axios.post(USER_API + "/update", {uid: uid, user: {isBanned: false}})
    await updateAdmin(auth.currentUser?.uid!, {bans: newBanList})
    return response.data;
}