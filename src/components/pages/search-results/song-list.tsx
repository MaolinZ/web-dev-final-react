import React from "react";
import SongResult from "./song-result";

export default function SongList(props: { songs: SpotifyApi.SearchResponse }) {

    const {songs} = props

    return (
        <>
            {songs.tracks?.items.map((s, i) =>
                <div className={'hover:bg-spotify-gray px-4'} key={i}>
                    <div
                        className={'result-item flex justify-around items-center' +
                            ' cursor-default'}>
                        <h1 className={'text-white font-bold px-8'}>
                            {i + 1}
                        </h1>
                        <SongResult song={s}/>
                    </div>
                </div>)}
        </>
    )
}