import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import * as service from "../../../services/spotify-services"
import Topbar from "../../../topbar";
import Stat from "./stat";

export default function Details() {

    const [song, setSong] = useState<SpotifyApi.TrackObjectFull>()
    const [features, setFeatures] = useState<SpotifyApi.AudioFeaturesResponse>()
    const [loading, setLoading] = useState(true)
    const {uri} = useParams()

    useEffect(() => {
        const fetchSong = async (uri: string) => {
            const response = await service.getSong(uri)
            setSong(response)
        }

        const fetchFeatures = async (uri: string) => {
            const response = await service.getFeatures(uri)
            setFeatures(response)
        }

        setLoading(true)
        fetchSong(uri!)
        fetchFeatures(uri!)
        setLoading(false)
    }, [])

    const toISO = (ms: number) => {
        const start = ms > 6000000 ? 11 : 14
        return ms ? new Date(ms).toISOString().slice(start, 19) : undefined
    }

    const toKey = (pitchClass: number, mode: number) => {

        if (pitchClass == undefined || mode == undefined) {
            return '--'
        }

        if (pitchClass > 11 || pitchClass < 0) {
            return undefined
        }

        const PitchMap = new Map<number, string>()
        PitchMap.set(0, 'C')
        PitchMap.set(1, 'C♯/D♭')
        PitchMap.set(2, 'D')
        PitchMap.set(3, 'D♯/E♭')
        PitchMap.set(4, 'E')
        PitchMap.set(5, 'F')
        PitchMap.set(6, 'F♯/G♭')
        PitchMap.set(7, 'G')
        PitchMap.set(8, 'G♯/A♭')
        PitchMap.set(9, 'A')
        PitchMap.set(10, 'A♯/B♭')
        PitchMap.set(11, 'B')

        return PitchMap.get(pitchClass) + " " + (mode ? 'Major' : 'Minor')
    }

    return (
        <>
            {loading ? <h1 className={'text-white'}>Loading...</h1> :
                <>
                    <Topbar/>
                        <div className={'m-auto w-full lg:w-8/12' +
                            ' bg-spotify-gray p-4 text-white'}>
                            <img
                                className={'mx-auto my-4'}
                                src={song?.album.images.at(1)!.url}
                                alt=""/>
                            <h1 className={'text-white'}>{song?.name}</h1>
                            <h1 className={'text-gray-500'}>{song?.artists.at(0)!.name}</h1>
                            { song?.preview_url == null ? '' :  <audio className={'audio-preview m-auto mt-6'} controls>
                                <source src={song?.preview_url} type="audio/mp3"/>
                            </audio>}
                            <div className={'w-fit mx-auto md:flex' +
                                ' md:items-center'}>
                                <Stat title={'Key'}
                                      value={toKey(features?.key as number, features?.mode as number)}/>
                                <Stat title={'BPM'}
                                      value={Math.round(features?.tempo as number)}/>
                                <Stat title={'Duration'}
                                      value={toISO(features?.duration_ms as number)}/>
                            </div>
                        </div>
                </>
            }
        </>)
}