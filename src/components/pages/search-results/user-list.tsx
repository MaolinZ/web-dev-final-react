import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserResult from "./user-result";
import {UserProps} from "../../props/UserProps";
import SongResult from "./song-result";
import {getAllUsers, getProfileImageURL} from "../../services/user-services";

export default function UserList() {

    const tempUser = {
        uid: '1',
        username: "User",
        biography: "bio",
        followers: [],
        songs: [],
        avatar: 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'
    }


    const searchParams = new URLSearchParams(window.location.search)
    const [results, setResults] = useState<UserProps[]>([])
    const [loading, setLoading] = useState(true)

    const query = searchParams.get("query")

    useEffect(() => {
        async function findUsers() {
            setLoading(true)
            const response: UserProps[] = await getAllUsers()
            // const results = [tempUser, tempUser, tempUser, tempUser]
            setResults(response.filter((user) => {
                return user.username?.indexOf(query!) !== -1
            }))
            setLoading(false)
        }
        findUsers()
    }, [])

    return (
        <>
            {loading ? <h1 className={'text-white'}>Loading...</h1> :
                <>
                    {results?.map((user) =>
                        <div className={'hover:bg-spotify-gray px-4'}>
                            <div className={'result-item flex justify-around items-center' +
                                ' cursor-default'}>
                                <UserResult user={user}/>
                            </div>
                        </div>)}
                </>}
        </>
    )
}