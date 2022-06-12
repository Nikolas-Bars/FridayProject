import React from 'react';
import {Route, Routes} from "react-router-dom";
import DemoSuperComponents from "../DemoSuperComponents/DemoSuperComponents";

import {Login} from "../Login/Login";
import NewPassword from "../NewPassword/NewPassword";
import Notfound from "../NotFound/Notfound";
import Profile from "../Profile/Profile";
import Registration from "../Registration/registration";

import {useSelector} from "react-redux";
import {AppStoreType} from "../../Bll/store";
import CheckEmail from "../NewPassword/CheckEmail";
import {RestorePassword} from "../RestorePassword/RestorePassword";
import Cards from "../Cards/Cards";

function Routess() {
  const auth = useSelector<AppStoreType, boolean>(state => state.login.auth)
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/demo'} element={<DemoSuperComponents/>}/>
                <Route path={'/check-email'} element={<CheckEmail/>}/>
                <Route path={'/RestorePassword/'} element={<RestorePassword/>}/>
                <Route path={'/RestorePassword/:token'} element={<NewPassword/>}/>
                <Route path={'/newpassword/'} element={<NewPassword/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'*'} element={<Notfound/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/cards'} element={<Cards />}/>
            </Routes>
        </div>
    );
}

export default Routess;