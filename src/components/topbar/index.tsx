import React, {useEffect, useState} from "react";
import SearchBar from "./search";
import {Link, useLocation} from "react-router-dom";
import { auth } from "../config/firebase";
import NavTab from "./nav-tab";
import {onAuthStateChanged} from "firebase/auth";
import {logout} from "../services/auth-services";

export default function Topbar() {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setLoggedIn(user !== null)
        });
    }, []);

    return (
        <div className={"topbar flex w-full items-center bg-spotify-green"}>
            <Link className={"inline-block hidden sm:block sm:mx-8"}
                  to={"/"}>
                <img
                    className={"w-40 flex-none"}
                    src="https://zeevector.com/wp-content/uploads/Spotify-Black-and-White-Logo.png"
                    alt=""/>
            </Link>
            <div className={'search-wrapper hidden md:block'}>
                <SearchBar/>
            </div>
            <div className={"mx-auto sm:ml-auto sm:mr-4"}>
                <ul className={"page-tabs"}>
                    <NavTab label={"Home"} to={"/"}/>
                    { loggedIn ?
                        <>
                            <NavTab label={"Profile"} to={`/profile/${auth.currentUser?.uid}`}/>
                            <span onClick={(event) => {
                                logout()
                            }
                            }>
                                <NavTab label={'Logout'} to={''}/>
                            </span>
                        </> :
                        <NavTab label={'Login'} to={'/auth'}/>}

                </ul>
            </div>
        </div>
    )
}