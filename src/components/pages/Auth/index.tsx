import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../config/firebase";
import {useNavigate} from "react-router";

export default function Auth() {

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser !== null) {
                navigate('/landing')
            }
        });
    }, []);

    return (
        <div className="home-form">
            <div className={"w-96 mx-auto bg-spotify-gray rounded-md p-5" +
                " mt-10"}>
                <img className={"w-96 mx-auto mb-10"}
                     src={"https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"}/>
                <div className={"w-full"}>
                    <Link
                        className={"flex bg-amber-100 items-center " +
                            "justify-center mb-3 py-2 rounded-full" +
                            " font-sans"}
                        to={"/landing"}>CONTINUE AS GUEST</Link>
                    <div className={"flex items-center justify-center"}>
                        <Link className={"bg-white rounded-full w-full mr-4" +
                            " py-2 px-8"} to={"/login"}>LOGIN</Link>
                        <Link className={"bg-spotify-green rounded-full" +
                            " w-full py-2 px-8"} to={"/signup"}>SIGN UP</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}