import axios from "axios";
import { API_BASE } from "./api_consts";
const AUTH_API = `${API_BASE}/auth`

export const login = async (credentials: {email: string, password: string}) => {
    const response = await axios.post(AUTH_API + "/login", credentials);
    return response.data;
}

export const createUser = async (credentials: {email: string, password: string}) => {
    const response = await axios.post(AUTH_API + "/createUser", credentials);
    return response.data;
}