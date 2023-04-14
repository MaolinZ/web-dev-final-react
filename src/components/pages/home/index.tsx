import {Link} from "react-router-dom";

export default function Home() {

    /*
    Home
        1. Enter as guest
        2. Login / Register Buttons
     */

    return (
        <div className="home-form">
            <img className={"w-96 mx-auto my-10"}
                 src={"https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"}/>
            <div className={"w-96 mx-auto bg-black rounded-md p-6"}>
                <input className={"home-user-input w-full rounded-sm mt-4" +
                    " mb-8" +
                    " py-2 pl-2 border-2"}
                       type={"text"}
                       placeholder={"Enter your name"}/>
                <div className={"w-full"}>
                    <Link
                        className={"flex bg-amber-100 items-center " +
                            "justify-center mb-2 py-2 rounded-full" +
                            " font-sans"}
                        to={"/rooms"}>ENTER AS GUEST</Link>
                    <div className={"flex items-center justify-center pb-4"}>
                        <Link className={"bg-white rounded-full w-full mr-4" +
                            " py-2 px-8"} to={"/login"}>LOGIN</Link>
                        <Link className={"bg-spotify-green rounded-full" +
                            " w-full" +
                            " py-2" +
                            " px-8"} to={"/signup"}>SIGN UP</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}