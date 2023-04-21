import axios from "axios"

// TODO: Get access token from db
const SPOTIFY_API_BASE = "https://api.spotify.com/v1/"

export const getToken = async () => {

    const headers = {
        'Authorization': `Basic YjY5ZmI2N2Q1MjEwNDgyMjgxYTM3OGViMmJkN2FmZmM6ZjI2MzFmYmJiNDY4NDkxZWFmMjZlODk0MDI4ZTBjNDQ=`,
        'Content-Type': "application/x-www-form-urlencoded"
    }

    const data = {"grant_type": "client_credentials"}

    const response = await axios.post("https://accounts.spotify.com/api/token",
        data, {headers})
    return response.data.access_token
}

const bearerRequest = async (url: string, moreHeaders?: {}) => {
    const token = await getToken();

    const reqURL = SPOTIFY_API_BASE + url

    const headers = {
        'Authorization': `Bearer ${token}`,
    }

    const response = await axios.get(reqURL, {headers})
    return response.data
}

export const searchSongs = async (query: string, offset: number = 0, limit: number = 10) => {

    return bearerRequest(`search?q=${query}&type=track&limit=${limit}&offset=${offset * limit}`)
}

export const getSong = async (uri: string) => {
    const response = await bearerRequest(`tracks/${uri}`)
    return response
}

export const getFeatures = async (uri: string) => {
    const response = await bearerRequest(`audio-features/${uri}`)
    return response
}