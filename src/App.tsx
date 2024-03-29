import React, {useEffect, useState} from 'react';
import './App.css';
import Auth from "./components/pages/Auth";
import {BrowserRouter, Navigate} from "react-router-dom";
import {Route, Routes} from "react-router";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import SearchResults from "./components/pages/search-results";
import Details from "./components/pages/search-results/details";
import Profile from './components/pages/Profile';
import {auth} from './components/config/firebase';
import {getUserById} from './components/services/user-services';
import {logout} from './components/services/auth-services';
import {onAuthStateChanged} from '@firebase/auth';
import Bans from "./components/pages/bans";

const sizer = () => {

    return (
        <div className={'flex justify-around items-center'}>
            <h1 className={'text-white'}>XS</h1>
            <h1 className={'text-white hidden sm:block'}>SM</h1>
            <h1 className={'text-white hidden md:block'}>MD</h1>
            <h1 className={'text-white hidden lg:block'}>LG</h1>
            <h1 className={'text-white hidden xl:block'}>XL</h1>
            <h1 className={'text-white hidden 2xl:block'}>2XL</h1>
        </div>
    )
}

function App() {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            setLoading(true);
            const currentUser = await getUserById(user?.uid!);
            if (currentUser.isBanned) {
                await logout().then(() => 
                    alert("You are banned! Please contact admins if you think this is an error."
                ));
            }
            setLoading(false);
        })
    }, []);

    return (
        <>
            {!loading ?
                <div className="App">
                    {/*{sizer()}*/}
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path={"/auth"} element={<Auth />} />
                            <Route path={"/login"} element={<Login />} />
                            <Route path={"/signup"} element={<SignUp />} />
                            <Route path={"/search/"}
                                element={<SearchResults />} />
                            <Route path={"/details/:uri"} element={<Details />} />
                            <Route path={"/profile/:uid"} element={<Profile />} />
                            <Route path={"/bans/:uid"} element={<Bans />} />
                            <Route path={'*'} element={<Navigate to={'/'} />} />
                        </Routes>
                    </BrowserRouter>
                </div> : <></>}</>
    );
}

export default App;
