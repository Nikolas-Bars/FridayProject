import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routess from "./Components/Routes/Routes";
import NavBar from "./Components/NavBar/NavBar";
import {useSelector} from "react-redux";
import {AppStoreType} from "./Bll/store";


function App() {

    const auth = useSelector<AppStoreType, boolean>(state => state.login.auth)

    return (
        <div>
                <div className="App">
                    <NavBar/>
                    <Routess/>
                </div>
        </div>
    );
}

export default App;
