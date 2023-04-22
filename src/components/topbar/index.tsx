import React, {useEffect, useState} from "react";
import SearchBar from "./search";
import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import NavTab from "./nav-tab";
import {onAuthStateChanged} from "firebase/auth";
import {logout} from "../services/auth-services";

export default function Topbar() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [isXS, setXS] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setLoggedIn(user !== null)
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setXS(window.innerWidth < 640)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })

    return (
        <div className={'topbar w-full bg-spotify-green'}>
            {isXS ? <div className={'search-wrapper sm:hidden pt-4'}>
                <SearchBar/>
            </div> : ''}
            <div className={"flex items-center justify-around"}>
                <Link className={"inline-block hidden md:block md:ml-10"}
                      to={"/"}>
                    <img
                        className={"w-40 flex-none"}
                        src="https://zeevector.com/wp-content/uploads/Spotify-Black-and-White-Logo.png"
                        alt=""/>
                </Link>
                {isXS ? '' : <div className={'search-wrapper hidden sm:block ml-10'}>
                    <SearchBar/>
                </div>}
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
        </div>
    )
}