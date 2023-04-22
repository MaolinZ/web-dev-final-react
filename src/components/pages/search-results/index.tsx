import React, {useEffect, useState} from "react";
import Topbar from "../../topbar";
import {useNavigate} from "react-router-dom";
import SongList from "./song-list";
import UserList from "./user-list";

export default function SearchResults() {
    const searchParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()

    const offset = Number(searchParams.get("page"))
    const type = searchParams.get("type")

    const clickPrevious = () => {
        if (offset > 0) {
            searchParams.set('page', (offset - 1).toString())
            navigate(`/search?${searchParams.toString()}`)
            navigate(0)
        }
    }

    const clickNext = () => {
        if (document.getElementsByClassName('result-item').length == 10) {
            searchParams.set('page', (offset + 1).toString())
            navigate(`/search?${searchParams.toString()}`)
            navigate(0)
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
                            {type === '1' ? <UserList/> : <SongList/>}
                        </div>
                    </div>
                    <div className={'page-buttons my-10 text-white'}>
                        <button className={offset == 0 ? 'bg-spotify-green' +
                            ' text-gray-700' : 'text-white'}
                                onClick={() => {
                                    clickPrevious()
                                }}>

                        </button>
                        Page: {offset + 1}
                        <button className={offset == 0 ? 'bg-spotify-green' +
                            ' text-gray-700' : 'text-white'}
                                onClick={() => {
                                    clickNext()
                                }}>
                            Next
                        </button>
                    </div>
                </>
        </div>
    )
}