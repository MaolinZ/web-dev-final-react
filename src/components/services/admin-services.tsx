import axios from "axios";
import { AdminProps } from "../props/AdminProps";
import { API_BASE } from "./api_consts";

const ADMIN_API = `${API_BASE}/admins`

export const getAdminById = async (uid: string) => {
    const response = await axios.get(ADMIN_API + `/${uid}`);
    return response.data;
}

export const updateAdmin = async(uid: string, admin: AdminProps) => {
    const response = await axios.post(ADMIN_API + "/update", {uid: uid, admin: admin});
    return response.data;
}

export const getBannedUsers = async(uid: string) => {
    const response = await axios.get(ADMIN_API + `/${uid}/bans`)
    return response.data
}