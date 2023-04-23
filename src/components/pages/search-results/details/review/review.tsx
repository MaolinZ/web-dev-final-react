import React, {useEffect, useState} from "react";
import {ReviewProps} from "../../../../props/ReviewProps";
import {getProfileImageURL} from "../../../../services/user-services";
import {useNavigate} from "react-router";
import {auth} from "../../../../config/firebase";
import {ImCross} from "react-icons/im";

export default function Review(props: { review: ReviewProps }, isAdmin:boolean = false) {

    const {review} = props

    const [image, setImage] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate()

    useEffect(() => {
        const getImage = async () => {
            setLoading(true);
            console.log("HEJRE: " + review.uid)
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
        if (auth.currentUser) {
            return isAdmin || auth.currentUser.uid == review.uid
        }
        return false
    }

    const handleDelete = () => {

console.log('12321')
    return(1)
    }


    return (
        <div className={'w-full p-8 bg-spotify-dark '}>
            {loading ? 'Loading...' : <div>
                <div
                    className={'flex items-center mb-8'}>
                    <div className={'flex items-center hover:cursor-pointer'}
                         onClick={() => {
                             clickUser()
                         }}>
                        <img
                            className={'w-12 h-12 rounded-full bg-white mr-4'}
                            src={image ? image : ''}
                            alt=""/>
                        <div className={'text-left font-medium text-white'}>
                            {review.username}
                            <div className={''}>{`${review.liked ? 'liked' : 'disliked'}` +
                                review.song_name}</div>
                        </div>
                    </div>
                    {canDelete() ? <div className={'ml-auto mr-8 float-right' +
                        ' hover:cursor-pointer hover:text-red-400'}
                                        onClick={() => {handleDelete()}}>
                        <ImCross />
                    </div> : ''}
                </div>
                <div className={'ml-2 text-left text-sm lg:text-base' +
                    ' text-gray-500'}>{review.description}</div>

            </div>}
        </div>
    )

}