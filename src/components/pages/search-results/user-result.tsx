import React, {useEffect, useState} from "react";
import * as Common from "../../../Common"
import {UserProps} from "../../props/UserProps";
import {getProfileImageURL} from "../../services/user-services";
import {useNavigate} from "react-router";

export default function UserResult(props: { user: UserProps }) {

    const {uid, username, biography, songs, followers} = props.user
    const [image, setImage] = useState('https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png')
    const navigate = useNavigate()

    const trunc_name = Common.truncate(username!, 18)

    useEffect(() => {
        const getImage = async () => {
            const response = await getProfileImageURL(uid!)
            setImage(response)
        }
        getImage()
    }, [])

    const clickUser = () => {
        navigate(`/profile/${uid}`)
    }

    return (
        <div className={'flex mr-auto items-center w-full p-4'}
             onClick={() => {
                 clickUser()
             }}>
            <img
                className={'w-12 h-12 rounded-full bg-white'}
                src={image}
                alt=""/>
            <div className={'ml-4'}>
                <p className={'text-left text-sm text-white'}>{trunc_name}</p>
                <p className={'text-left text-sm text-gray-500'}>Profile</p>
            </div>
        </div>
    )
}