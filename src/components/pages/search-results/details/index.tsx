import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import * as service from "../../../services/spotify-services"
import Topbar from "../../../topbar";
import Stat from "./stat";
import ReviewForm from "../../../forms/ReviewForm";
import {addSongmetrics} from "../../../services/songmetrics-services";
import ReviewList from "./review/review-list";
import {getReviewsBySong} from "../../../services/review-services";
import {ReviewProps} from "../../../props/ReviewProps";

export default function Details() {

    const [song, setSong] = useState<SpotifyApi.TrackObjectFull>()
    const [reviews, setReviews] = useState<ReviewProps[]>([])
    const [features, setFeatures] = useState<SpotifyApi.AudioFeaturesResponse>()
    const [loading, setLoading] = useState(true)
    const { uri } = useParams()

    useEffect(() => {

        const fetchSong = async (uri: string) => {
            const response = await service.getSong(uri)
            setSong(response)
        }

        const fetchFeatures = async (uri: string) => {
            const response = await service.getFeatures(uri)
            setFeatures(response)
        }

        const initSongmetrics = async (song_uri: string) => {
            await addSongmetrics(song_uri);
        }

        setLoading(true)
        fetchSong(uri!)
        fetchFeatures(uri!)
        initSongmetrics(uri!);
        setLoading(false)
    }, [])

    useEffect(() => {
        const getReviews = async () => {
            const response = await getReviewsBySong(uri!)
            setReviews(response)
        }

        getReviews()
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
                    <Topbar />
                    <div className={'m-auto w-full lg:w-8/12' +
                        ' bg-spotify-gray p-4 pt-8 text-white'}>
                        <div className={'bg-spotify-dark m-auto px-8' +
                            ' py-8 w-fit'}>
                            <img
                                className={'mx-auto my-2'}
                                src={song?.album.images.at(1)!.url}
                                alt="" />
                            <h1 className={'text-white py-2 font-bold'}>{song?.name}</h1>
                            <h1 className={'text-gray-500'}>{song?.artists.at(0)!.name}</h1>
                            {song?.preview_url == null ? '' : <audio className={'audio-preview m-auto mt-6'} controls>
                                <source src={song?.preview_url} type="audio/mp3" />
                            </audio>}
                        </div>
                        <div className={'w-fit mx-auto md:flex' +
                            ' md:items-center mt-6'}>
                            <Stat title={'Key'}
                                value={toKey(features?.key as number, features?.mode as number)} />
                            <Stat title={'BPM'}
                                value={Math.round(features?.tempo as number)} />
                            <Stat title={'Duration'}
                                value={toISO(features?.duration_ms as number)} />
                        </div>
                        <div className={'my-6'}>
                            <ReviewForm songUri={uri!} />
                        </div>
                        <div>
                            <h1
                                className={`text-white font-medium text-4xl mb-10
                                mt-20 pb-5 m-auto w-fit px-20`}
                                style={{borderBottom: 'gray 1px' +
                                        ' solid'}}>
                                REVIEWS</h1>
                            <div className={'w-full md:w-10/12 2xl:w-7/12' +
                                '  m-auto'}>
                                <ReviewList reviews={reviews} />
                            </div>
                        </div>
                    </div>
                </>
            }
        </>)
}