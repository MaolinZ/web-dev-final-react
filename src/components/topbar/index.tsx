import React from "react";
import SearchBar from "./search";
import {Link} from "react-router-dom";
import NavTab from "./nav-tab";

export default function Topbar() {
    return (
        <div className={"topbar flex w-full items-center bg-spotify-green" +
            " py-3"}>
            <Link className={"inline-block mx-8"}
                  to={"/"}>
                <img
                    className={"w-40"}
                    src="https://zeevector.com/wp-content/uploads/Spotify-Black-and-White-Logo.png"
                    alt=""/>
            </Link>
            <SearchBar/>
            <div className={"ml-auto mr-4"}>
                <ul className={"page-tabs"}>
                    <NavTab label={"Home"} to={"/rooms"}/>
                    <NavTab label={"Profile"} to={"/profile"}/>
                    <NavTab label={"Create Room"} to={"/create"}/>
                </ul>
            </div>
        </div>
    )
}