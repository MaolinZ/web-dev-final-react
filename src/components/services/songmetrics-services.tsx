import axios from "axios"
import { API_BASE } from "./api_consts";
import { SongmetricsProps, SongmetricsTemplate } from "../props/SongmetricsProps";

const SONGMETRICS_API = `${API_BASE}/songmetrics`

export const addSongmetrics = async (song_uri: string) => {
    const songmetricsTemplate = SongmetricsTemplate;
    const response = await axios.post(`${SONGMETRICS_API}/add`, {song_uri: song_uri, songmetrics: songmetricsTemplate});
    return response.data;
}

export const getAllSongmetrics = async () => {
    const response = await axios.get(`${SONGMETRICS_API}`);
    return response.data;
}

export const updateSongmetrics = async (song_uri: string, songmetrics: SongmetricsProps) => {
    const response = await axios.post(`${SONGMETRICS_API}/update`, {song_uri: song_uri, songmetrics: songmetrics})
    return response.data;
}

export const getSongmetricsById = async (song_uri: string) => {
    console.log(`${SONGMETRICS_API}/${song_uri}`)
    const response = await axios.get(`${SONGMETRICS_API}/${song_uri}`);
    return response.data;
}