import React from "react";
import SearchBar from "../search";
import {Link} from "react-router-dom";

export default function Topbar() {
    return (
        <div className={"topbar flex w-full items-center bg-spotify-green" +
            " p-4"}>
            <Link className={"inline-block mr-auto ml-4"}
                  to={"/"}>
                <img
                    className={"w-40"}
                    src="https://zeevector.com/wp-content/uploads/Spotify-Black-and-White-Logo.png"
                    alt=""/>
            </Link>
            <div className={"search-wrapper mr-auto"}>
                <SearchBar/>
            </div>
        </div>
    )
}