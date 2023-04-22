import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from "./components/pages/Auth";
import {BrowserRouter, Navigate} from "react-router-dom";
import {Routes, Route} from "react-router";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import SearchResults from "./components/pages/search-results";
import Details from "./components/pages/search-results/details";
import Profile from './components/pages/Profile';

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
    return (
        <div className="App">
            {sizer()}
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path={"/auth"} element={<Auth/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                    <Route path={"/search/"}
                           element={<SearchResults/>}/>
                    <Route path={"/details/:uri"} element={<Details/>}/>
                    <Route path={"/profile/:uid"} element={<Profile/>} />
                    <Route path={'*'} element={<Navigate to={'/'}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
