import React, {useEffect, useState} from "react";
import Topbar from "../../topbar";
import {useNavigate} from "react-router-dom";
import SongList from "./song-list";
import UserList from "./user-list";
import {GrPrevious, GrNext} from "react-icons/gr";
import {IconContext} from "react-icons";

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