import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routess from "./Components/Routes/Routes";
import NavBar from "./Components/NavBar/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Routess/>
        </div>
    );
}

export default App;
