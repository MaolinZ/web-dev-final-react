import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserResult from "./user-result";
import {UserProps} from "../../props/UserProps";

export default function UserList() {

    const tempUser = {
        username: "User",
        biography: "bio",
        followers: [],
        songs: [],
        avatar: 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'
    }


    const searchParams = new URLSearchParams(window.location.search)
    const [results, setResults] = useState<UserProps[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const query = searchParams.get("query")
    const offset = Number(searchParams.get("page"))

    useEffect(() => {

        async function findUsers() {
            setLoading(true)
            // const results = await service.searchSongs(query!, offset)
            const results = [tempUser, tempUser, tempUser, tempUser]
            setResults(results)
            setLoading(false)
        }

        findUsers()
        console.log(results)
    }, [])

    return (
        <div className={'text-white'}>
            <div className={'hover:bg-spotify-gray px-4'}>
                {results?.map((user) => <UserResult user={tempUser}/>)}
            </div>
        </div>
    )
}