import React from "react";
import * as Common from "../../../Common"
import {UserProps} from "../../props/UserProps";

export default function UserResult(props: {user: UserProps}) {

    const { username, biography, avatar, songs, followers } = props.user

    const trunc_name = Common.truncate(username!)

    const clickUser = () => {
        return 1
    }

    return(
        <div className={'flex mr-auto items-center w-full p-4'}
             onClick={() => {clickUser()}}>
            <img
                className={'w-12 h-12'}
                src={avatar}
                alt=""/>
            <div className={'ml-4'}>
                <p className={'text-left text-sm text-white'}>{trunc_name}</p>
                <p className={'text-left text-sm text-gray-500'}>Profile</p>
            </div>
        </div>
    )
}