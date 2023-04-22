import React, {useEffect, useState} from "react";
import SongResult from "./song-result";
import {useNavigate} from "react-router-dom";
import * as service from "../../services/spotify-services";

export default function SongList() {

    const searchParams = new URLSearchParams(window.location.search)
    const [results, setResults] = useState<SpotifyApi.SearchResponse>({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const query = searchParams.get("query")
    const offset = Number(searchParams.get("page"))

    useEffect(() => {

        async function fetchSongs() {
            setLoading(true)
            const results = await service.searchSongs(query!, offset)
            setResults(results)
            setLoading(false)
        }

        fetchSongs()
    }, [offset])

    return(
        <>
            {loading ? <h1 className={'text-white'}>Loading...</h1> :
                <>
                    {results.tracks?.items.map((s, i) =>
                        <div className={'hover:bg-spotify-gray px-4'}>
                            <div
                                className={'result-item flex justify-around items-center' +
                                    ' cursor-default'}>
                                <h1 className={'text-white font-bold px-8'}>
                                    {i + 1}
                                </h1>
                                <SongResult song={s}/>
                            </div>
                        </div>)}
                </>}
        </>
    )
}