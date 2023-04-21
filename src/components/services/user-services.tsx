import axios from "axios"
import { API_BASE } from "./api_consts";
import { UserProps, UserTemplate } from "../props/UserProps";

const USER_API = `${API_BASE}/users`

export const addUser = async(uid: string) => {
    const userTemplate = UserTemplate;
    userTemplate.username = uid;
    const response = await axios.post(USER_API + "/add", {uid: uid, user: userTemplate});
    return response.data;
}

export const updateUser = async(uid: string, user: UserProps) => {
    const response = await axios.post(USER_API + "/update", {uid: uid, user: user});
    return response.data;
}

export const getUserById = async(uid: string) => {
    const response = await axios.get(USER_API + `/${uid}`);
    return response.data;
}