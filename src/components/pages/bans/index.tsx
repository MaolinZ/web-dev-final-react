import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../config/firebase";
import {getUserById} from "../../services/user-services";
import {Navigate} from "react-router-dom";
import UserList from "../search-results/user-list";
import {UserProps} from "../../props/UserProps";
import {getBannedUsers} from "../../services/admin-services";
import Topbar from "../../topbar";
import SongList from "../search-results/song-list";

export default function Bans() {

    const {uid} = useParams()

    const [loggedIn, setLoggedIn] = useState(false)
    const [access, setAccess] = useState(false)
    const [loading, setLoading] = useState(true)
    const [bans, setBans] = useState<UserProps[]>([])

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setLoading(true)
            setLoggedIn(user !== null)
        });
    }, []);

    useEffect(() => {
        const fetchBans = async () => {
            const response = await getBannedUsers(uid!)
            await setBans(response)
        }

        fetchBans()
    }, [loggedIn])

    useEffect(() => {
        const checkAccess = async () => {
            setLoading(true)
            if (loggedIn) {
                const user = await getUserById(auth.currentUser?.uid!)
                setAccess(loggedIn && user.isAdmin && auth.currentUser?.uid === uid)
            }
            setLoading(false)
        }

        checkAccess()
    }, [loggedIn])

    return (
        <>
            <Topbar/>
        {!loading && <div>
            {!access ? <Navigate to={'/'}/> :
                <div className={'w-100 sm:w-10/12' +
                    ' md:w-8/12 xl:w-4/12 m-auto'}>
                    <h1 className={'text-white text-5xl'}>Banned Users</h1>

                    <div className={'m-auto my-4 bg-spotify-dark'}>
                        <div className={'search-results m-auto my-4' +
                            ' bg-spotify-dark'}>
                            <UserList users={bans}/>
                        </div>
                    </div>
            </div>}
        </div>
}
</>

)

}