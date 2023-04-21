import React, {useEffect, useState} from "react";
import Topbar from "../../topbar";
import SongResult from "./song-result";
import * as service from "../../../services/services"
import {useNavigate} from "react-router-dom";

export default function SearchResults() {
    const searchParams = new URLSearchParams(window.location.search)
    const [songs, setSongs] = useState<SpotifyApi.SearchResponse>({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const query = searchParams.get("query")
    const offset = Number(searchParams.get("page"))

    useEffect(() => {

        async function fetchSongs() {
            setLoading(true)
            const results = await service.searchSongs(query!, offset)
            setSongs(results)
            setLoading(false)
        }
        fetchSongs()
    }, [])

    const clickPrevious = () => {
        if (offset > 0) {
            searchParams.set('page', (offset - 1).toString())
            navigate(`/search?${searchParams.toString()}`)
            navigate(0)
        }
    }

    const clickNext = () => {
        if (songs.tracks!.items.length == 10) {
            searchParams.set('page', (offset + 1).toString())
            navigate(`/search?${searchParams.toString()}`)
            navigate(0)
        }
    }

    // TODO: Get from database
    const results = () => {
        return (service.searchSongs(query!))
    }

    return (
        <div>
            <Topbar/>
            {loading && <h1>Loading</h1>}
            <div className={'search-results m-auto my-4 w-96' +
                ' bg-spotify-dark'}>
                {songs.tracks?.items.map((s) =>
                    <SongResult song={s}/>)}
            </div>
            <div className={'page-buttons my-10 text-white'}>
                <button className={offset == 0 ? 'bg-spotify-green' +
                    ' text-gray-700' : 'text-white'}
                        onClick={() => {
                            clickPrevious()
                        }}>
                    Previous
                </button>
                Page: {offset + 1}
                <button className={offset == 0 ? 'bg-spotify-green' +
                    ' text-gray-700' : 'text-white'}
                        onClick={() => {
                            clickNext()
                        }}>
                    Next
                </button>
            </div>


        </div>
    )
}