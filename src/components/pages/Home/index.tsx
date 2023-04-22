import React, {useEffect, useState} from "react";
import SearchBar from "../../topbar/search";
import Topbar from "../../topbar";
import {auth} from "../../config/firebase";
import {getUserById} from "../../services/user-services";
import {onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router";

export default function Home() {
    const nav = useNavigate();
    const [user, setUser] = useState<any>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setLoading(true)
            const response = await getUserById(auth.currentUser?.uid!)
            setUser(response);
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <Topbar></Topbar>
            {!loading && auth.currentUser !== null &&
                <h1 className={'text-white text-4xl text-3xl'}>
                    {`Welcome ` + user.username}</h1>}
        </div>
    )

}