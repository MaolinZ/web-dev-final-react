import React, {useEffect, useState} from "react";
import {ReviewProps} from "../../../../props/ReviewProps";
import {getProfileImageURL} from "../../../../services/user-services";
import {useNavigate} from "react-router";
import {auth} from "../../../../config/firebase";
import {ImCross} from "react-icons/im";
import {deleteReviewById} from "../../../../services/review-services";

export default function Review(props: { review: ReviewProps, isAdmin?: boolean }) {

    const {review, isAdmin} = props

    const [image, setImage] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate()

    const handleDelete = async () => {
        const res = await deleteReviewById(review.uid!, review.song_uri!)
        navigate(0)
    }

    useEffect(() => {
        const getImage = async () => {
            setLoading(true);
            const response = await getProfileImageURL(review.uid!)
            await setImage(response)
            setLoading(false)
        }
        getImage()
    }, [])

    const clickUser = () => {
        navigate(`/profile/${review.uid!}`)
    }

    const canDelete = () => {
        if (auth.currentUser git!== null) {
            return isAdmin || auth.currentUser.uid == review.uid
        }
        return false
    }

    const timeToString= (seconds: number) => {
        const date = new Date(seconds)
        const day = date.toLocaleDateString()
        const time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        return(
            <div>{day + ' ' + time}</div>)
    }

    return (
        <div className={'w-full p-8 bg-spotify-dark '}>
            {loading ? 'Loading...' :
                <div>
                    <div className={'flex items-center mb-4'}>
                        <div className={'text-gray-500 text-sm'}>
                            {timeToString(review.timestamp!)}
                        </div>
                        {canDelete() ?
                            <div
                                className={`ml-auto mr-4 float-right text-gray-300 hover:cursor-pointer hover:text-red-400`}
                                onClick={() => {
                                    handleDelete()
                                }}>
                                <ImCross/>
                            </div> : ''}
                    </div>
                    <div
                        className={'flex items-center mb-8'}>
                        <div className={'flex items-center justify-center'}>
                            <img
                                className={`w-12 h-12 rounded-full bg-white mr-4 hover:cursor-pointer`}
                                src={image ? image : ''}
                                alt=""
                                onClick={clickUser}/>
                            <div>
                                <div
                                    className={`block text-left text-gray-200 hover:text-white hover:cursor-pointer`}
                                    onClick={clickUser}>
                                    {review.username}
                                </div>
                                <div className={'align-text-start flex'}>
                                <span className={'text-sm text-gray-500'}>
                                <>{`${review.liked ? 'liked ' : 'disliked '}`}</>
                            </span>
                                    <span
                                        className={'ml-2 text-gray-500' +
                                            ' hover:text-white text-sm font-bold' +
                                            ' hover:cursor-pointer'}
                                        onClick={() => {
                                            navigate(`/details/${review.song_uri}`)
                                        }}
                                    >{review.song_name}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={'m-2 text-left text-sm lg:text-base' +
                        ' text-gray-300'}>{review.description}</div>
                </div>}
        </div>
    )

}