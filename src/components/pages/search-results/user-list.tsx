import React, {useEffect, useState} from "react";
import UserResult from "./user-result";
import {UserProps} from "../../props/UserProps";

export default function UserList(props: { users: UserProps[] }) {

    const {users} = props

    return (
        <>
            {users?.map((user, i) =>
                <div className={'hover:bg-spotify-gray px-4'}>
                    <div
                        className={'result-item flex justify-around items-center' +
                            ' cursor-default'}>
                        <h1 className={'text-white font-bold px-8'}>
                            {i + 1}
                        </h1>
                        <UserResult user={user} key={i}/>
                    </div>
                </div>)}
        </>
    )
}