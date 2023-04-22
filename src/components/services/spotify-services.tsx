import axios from "axios"
import { API_BASE } from "./api_consts"

const SPOTIFY_API = `${API_BASE}/spotify`;

export const searchSongs = async (query: string, offset: number = 0, limit: number = 10) => {
    const response = await axios.get(`${SPOTIFY_API}/searchSongs`, {params : {query: query, offset: offset, limit: limit}});
    return response.data;
}

export const getSong = async (uri: string) => {
    const response = await axios.get(`${SPOTIFY_API}/song/${uri}`);
    return response.data;
}

export const getFeatures = async (uri: string) => {
    const response = await axios.get(`${SPOTIFY_API}/feature/${uri}`);
    return response.data;
}