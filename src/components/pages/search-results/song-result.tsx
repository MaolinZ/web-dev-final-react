import React from "react";
import {useNavigate} from "react-router-dom";
import * as Common from '../../../Common'

export default function SongResult(props: { song: SpotifyApi.TrackObjectFull }) {

    const navigate = useNavigate()
    const image = props.song.album.images[2].url
    const trunc_name = Common.truncate(props.song.name)

    let artists = props.song.artists[0].name

    for (let i = 1; i < props.song.artists.length; i++) {
        artists = artists + ", " + props.song.artists[i].name
    }

    const trunc_artists = Common.truncate(artists)

    const clickSong = () => {
        let uri = props.song.uri
        uri = uri.slice(uri.lastIndexOf(':') + 1)
        navigate(`/details/${uri}`)
    }

    return (
        <div className={'flex mr-auto items-center w-full p-4'}
             onClick={() => {clickSong()}}>
            <img
                className={'w-12 h-12'}
                src={image}
                alt=""/>
            <div className={'ml-4'}>
                <p className={'text-left text-sm text-white'}>{trunc_name}</p>
                <p className={'text-left text-sm text-gray-500'}>{trunc_artists}</p>
            </div>
        </div>
    )
}
