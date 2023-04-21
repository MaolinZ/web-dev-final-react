import axios from "axios";
import { GametypeProps } from "../props/GametypeProps";
import { API_BASE } from "./api_consts";

const GAMETYPE_API = `${API_BASE}/gametypes`

export const addGametype = async (gametype: GametypeProps) => {
    const response = await axios.post(`${GAMETYPE_API}/add`, gametype);
    return response.data;
}

export const getAllGametypes = async () => {
    const response = await axios.get(`${GAMETYPE_API}`);
    return response.data;
}

export const updateGametype = async (id: string, gametype: GametypeProps) => {
    const response = await axios.post(`${GAMETYPE_API}/update`, {id, gametype})
    return response.data;
}

export const getGameTypeById = async (id: string) => {
    const response = await axios.get(`${GAMETYPE_API}/${id}`);
    return response.data;
}