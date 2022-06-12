import React from 'react';
import {Route, Routes} from "react-router-dom";
import DemoSuperComponents from "../DemoSuperComponents/DemoSuperComponents";
import {Login} from "../Login/Login";
import Notfound from "../NotFound/Notfound";
import Profile from "../Profile/Profile";
import Cards from "../Cards/Cards";
import {Registration} from "../Registration/Registration";
import {RestorePassword} from "../RestorePassword/RestorePassword";
import {CheckEmail} from '../RestorePassword/CheckEmail/CheckEmail';
import {SetNewPassword} from '../RestorePassword/SetNewPassword/SetNewPassword';

function Routess() {

    return (
        <div>
            <Routes>
                <Route path='/' element={<Profile/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/restore' element={<RestorePassword/>}/>
                <Route path="/recover" element={<CheckEmail/>}/>
                <Route path='/set-new-password/:token' element={<SetNewPassword/>}/>
                <Route path='/demo' element={<DemoSuperComponents/>}/>
                <Route path='*' element={<Notfound/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/cards' element={<Cards/>}/>
            </Routes>
        </div>
    );
}

export default Routess;