import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/pages/home";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/signup"} element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
