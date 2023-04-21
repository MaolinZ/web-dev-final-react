import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/pages/home";
import {BrowserRouter, Navigate} from "react-router-dom";
import {Routes, Route} from "react-router";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Landing from "./components/pages/landing";
import SearchResults from "./components/pages/search-results";
import Details from "./components/pages/search-results/details";
import Profile from './components/pages/Profile';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                    <Route path={"/landing"} element={<Landing/>}/>
                    <Route path={"/search/"}
                           element={<SearchResults/>}/>
                    <Route path={"/details/:uri"} element={<Details/>}/>
                    <Route path={'*'} element={<Navigate to={'/landing'}/>}/>
                    <Route path={"/profile"} element={<Profile/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
