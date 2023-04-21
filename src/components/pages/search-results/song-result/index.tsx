import React from "react";
import {useNavigate} from "react-router-dom";

export default function SongResult(props: { song: SpotifyApi.TrackObjectFull }) {

    const navigate = useNavigate()
    const image = props.song.album.images[2].url

    const truncate = (str: string) => {
        const maxLength = 32
        return str.slice(0, maxLength) +
            (str.length > maxLength ? "..." : "")
    }

    const trunc_name = truncate(props.song.name)

    let artists = props.song.artists[0].name

    for (let i = 1; i < props.song.artists.length; i++) {
        artists = artists + ", " + props.song.artists[i].name
    }

    const trunc_artists = truncate(artists)

    const clickSong = () => {
        let uri = props.song.uri
        uri = uri.slice(uri.lastIndexOf(':') + 1)
        navigate(`/details/${uri}`)
    }

    return (
        <div className={'hover:bg-spotify-gray px-3'}>
            <div className={'song-result flex justify-around items-center' +
                ' cursor-default py-4 px-10'}
                 onClick={() => {clickSong()}}>
                <div className={'flex mr-auto items-center'}>
                    <img
                        className={'w-12 h-12'}
                        src={image}
                        alt=""/>
                    <div className={'ml-4'}>
                        <p className={'text-left text-sm text-white'}>{trunc_name}</p>
                        <p className={'text-left text-sm text-gray-500'}>{trunc_artists}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
