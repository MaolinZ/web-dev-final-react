import React, {useEffect, useState} from "react";
import Topbar from "../../topbar";
import {useNavigate} from "react-router-dom";
import SongList from "./song-list";
import UserList from "./user-list";
import {GrNext, GrPrevious} from "react-icons/gr";
import {IconContext} from "react-icons";
import {UserProps} from "../../props/UserProps";
import {getAllUsers} from "../../services/user-services";
import * as service from "../../services/spotify-services";

export default function SearchResults() {
    const searchParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()

    const query = searchParams.get("query")
    const offset = Number(searchParams.get("page"))
    const type = searchParams.get("type")

    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<UserProps[]>([])
    const [songs, setSongs] = useState<SpotifyApi.SearchResponse>()


    useEffect(() => {
        async function findUsers() {
            const itemCount = 10

            setLoading(true)
            const response: UserProps[] = await getAllUsers()
            const validUsers = response.filter((user) => {
                return !user.isBanned && user.username?.indexOf(query!) !== -1
            })

            const start = (itemCount * offset)

            setUsers(validUsers.slice(start, start + itemCount))
            setLoading(false)
        }

        async function findSongs() {
            setLoading(true)
            const results = await service.searchSongs(query!, offset)
            setSongs(results)
            setLoading(false)
        }

        type === '1' ? findUsers() : findSongs()
    }, [offset])

    const clickPrevious = () => {
        if (offset > 0) {
            searchParams.set('page', (offset - 1).toString())
            navigate(`/search?${searchParams.toString()}`)
        }
    }

    const clickNext = () => {
        if (document.getElementsByClassName('result-item').length == 10) {
            searchParams.set('page', (offset + 1).toString())
            navigate(`/search?${searchParams.toString()}`)
        }
    }

    return (
        <div>
            <Topbar/>
            <>
                <div className={'m-auto my-4 w-100 sm:w-10/12' +
                    ' md:w-7/12 lg:w-5/12' +
                    ' bg-spotify-dark'}>
                    <div className={'search-results m-auto my-4' +
                        ' bg-spotify-dark'}>
                        {!loading ? type === '1' ? <UserList users={users}/>
                            :
                            <SongList songs={songs!}/> : ''}
                    </div>
                </div>
                <div className={'page-buttons flex justify-center' +
                    ' items-center  my-10 text-white'}>
                    <button
                        className={`rounded-full p-3 
                        ${offset == 0 ? 'bg-spotify-gray text-gray-700' +
                            ' hover:cursor-default' :
                            'bg-spotify-green text-white'}`}
                        onClick={() => {
                            clickPrevious()
                        }}>
                        <IconContext.Provider
                            value={{size: '30px'}}>
                            <GrPrevious/>
                        </IconContext.Provider>
                    </button>
                    <h1 className={'font-bold text-3xl mx-10'}>{offset + 1}</h1>
                    <button className={' rounded-full p-3' +
                        ' bg-spotify-green text-white'}
                            onClick={() => {
                                clickNext()
                            }}>
                        <IconContext.Provider
                            value={{size: '30px'}}>
                            <GrNext/>
                        </IconContext.Provider>
                    </button>
                </div>
            </>
        </div>
    )
}