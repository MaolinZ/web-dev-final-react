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
        <div className={"topbar flex w-full items-center bg-spotify-green" +
            " py-3"}>
            <Link className={"inline-block mx-8"}
                  to={"/landing"}>
                <img
                    className={"w-40"}
                    src="https://zeevector.com/wp-content/uploads/Spotify-Black-and-White-Logo.png"
                    alt=""/>
            </Link>
            <SearchBar/>
            <div className={"ml-auto mr-4"}>
                <ul className={"page-tabs"}>
                    <NavTab label={"Home"} to={"/landing"}/>
                    { loggedIn ?
                        <>
                            <NavTab label={"Profile"} to={`/profile/${auth.currentUser?.uid}`}/>
                            <span onClick={(event) => {
                                logout()
                            }
                            }>
                                <NavTab label={'Logout'} to={'/landing/'}/>
                            </span>
                        </> :
                        <NavTab label={'Login'} to={'/'}/>}

                </ul>
            </div>
        </div>
    )
}