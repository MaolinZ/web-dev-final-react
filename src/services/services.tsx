import axios from "axios"

// TODO: Get access token from db
const ACCESS_TOKEN = 'BQBc9TqSaGuXZqov7l-nFcCEEzbhWo5aOPhAkK2LcGjq3_ELje4k3xwOE316Iqjg6JibmTzAoTbO7AsNsxh_-Hj9XWEqyFx96FNr32RvGc5FAD4ni1ad'

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

export const searchSongs = async (query: string, offset: number = 0, limit: number = 10) => {
    const SPOTIFY_API = ''


    const token = await getToken();
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=${limit}&offset=${offset * limit}`;

    const headers = {
        'Authorization': `Bearer ${token}`,
    };

    const songs = await axios.get(url, {headers})
    return songs
}