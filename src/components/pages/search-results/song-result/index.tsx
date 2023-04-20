import React from "react";
import {useNavigate} from "react-router-dom";

export default function SongResult(props: { song: SpotifyApi.TrackObjectFull }) {

    const navigate = useNavigate()
    const image = props.song.album.images[2].url

    const truncate = (str: string) => {
        return str.slice(0, 20) +
            (str.length > 20 ? "..." : "")
    }

    const trunc_name = truncate(props.song.name)

    let artists = props.song.artists[0].name

    for (let i = 1; i < props.song.artists.length; i++) {
        artists = artists + ", " + props.song.artists[i].name
    }

    const trunc_artists = truncate(artists)

    const handleClick = () => {
        console.log(props.song.uri)
        navigate(`/details/${props.song.uri}`)
    }

    return (
        <div className={'song-result flex justify-around items-center py-4'}
             onClick={() => {handleClick()}}>
            <div className={'flex mr-auto items-center'}>
                <img
                    className={'w-16 h-16'}
                    src={image}
                    alt=""/>
                <div className={'ml-4'}>
                    <p className={'text-left text-sm text-white'}>{trunc_name}</p>
                    <p className={'text-left text-sm text-gray-500'}>{trunc_artists}</p>
                </div>
            </div>
        </div>
    )

}
