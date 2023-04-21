import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as service from "../../../services/services";

export default function UserList() {

    interface User {username: string}

    const searchParams = new URLSearchParams(window.location.search)
    const [results, setResults] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const query = searchParams.get("query")
    const offset = Number(searchParams.get("page"))

    useEffect(() => {

        async function findUsers() {
            setLoading(true)
            // const results = await service.searchSongs(query!, offset)
            const results = {username: "TEST"}
            setResults([results])
            setLoading(false)
        }

        findUsers()
        console.log(results)
    }, [])

    return(
        <div className={'text-white'}>
            {results?.map((s) => s.username)}
        </div>
    )
}