import {onAuthStateChanged} from "@firebase/auth";
import {useEffect, useState} from "react";
import {addReview} from "../services/review-services";
import {auth} from "../config/firebase";
import {updateSongmetrics} from "../services/songmetrics-services";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {IconContext} from 'react-icons'
import {IoHeart, IoHeartDislike} from "react-icons/io5";
import {getUserById} from "../services/user-services";
import {UserProps} from "../props/UserProps";
import {getSong} from "../services/spotify-services";
import {SongmetricsProps} from "../props/SongmetricsProps";

export default function ReviewForm(props: { songUri: string }) {
    const nav = useNavigate();
    const [description, setDescription] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState<boolean>(auth.currentUser !== null)
    const [liked, setLiked] = useState<boolean>(true);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (auth.currentUser) {
            const user:UserProps = await getUserById(auth.currentUser.uid)
            const song:SpotifyApi.TrackObjectFull = await getSong(props.songUri)
            const response = await addReview({
                "song_name": song.name,
                "username": user.username,
                "description": description,
                "song_uri": props.songUri,
                "uid": auth.currentUser.uid,
                "liked": liked
            })
            await updateSongmetrics(props.songUri!, {reviews: [response]});
            nav(0);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setLoggedIn(auth.currentUser !== null)
        });
    }, []);

    const form = () => {
        return (
            <form onSubmit={onSubmit}>
                <textarea
                    className={`bg-spotify-dark p-6 w-10/12 lg:w-8/12
                    focus:outline-none`}
                    rows={10}
                    placeholder={'Leave a review'}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}/>
                <div className={'w-fit m-auto'}>
                    <label
                        className={`text-2xl flex items-center justify-center 
                        hover:cursor-pointer hover:text-white my-4`}
                        htmlFor={'like-toggle'}>
                        {liked ? 'Liked' : 'Disliked'}
                        <div className={'inline-block ml-2'}>
                            {liked ?
                                <IconContext.Provider
                                    value={{color: '#ff4d4d', size: '36px'}}
                                >
                                    <IoHeart/>
                                </IconContext.Provider>
                                :
                                <IconContext.Provider
                                    value={{size: '30px'}}
                                >
                                    <IoHeartDislike/>
                                </IconContext.Provider>}
                        </div>
                    </label>
                    <input
                        className={'hidden'}
                        id={'like-toggle'}
                        type="checkbox"
                        defaultChecked={true}
                        onChange={(e) => {
                            setLiked(!liked)
                        }}/>
                    <button
                        className={`text-white rounded-lg bg-spotify-green py-1 px-4`}
                        type="submit">Submit
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className={'text-gray-500 w-full'}>
            {auth.currentUser == null ?
                <Link className={'text-2xl'} to={'/auth'}>Login to
                    review!</Link>
                : form()}
        </div>
    );
}