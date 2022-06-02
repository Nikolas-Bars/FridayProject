import React from 'react';
import {Route, Routes} from "react-router-dom";
import DemoSuperComponents from "../DemoSuperComponents/DemoSuperComponents";

import Login from "../Login/Login";
import NewPassword from "../NewPassword/NewPassword";
import Notfound from "../NotFound/Notfound";
import Profile from "../Profile/Profile";
import Registration from "../Registration/registration";
import RestorePassword from "../RestorePassword/RestorePassword";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../Bll/store";

function Routess() {
  const auth = useSelector<AppStoreType, boolean>(state => state.login.auth)
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/demo'} element={<DemoSuperComponents/>}/>
                <Route path={'/RestorePassword'} element={<RestorePassword/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/newpassword'} element={<NewPassword/>}/>
                <Route path={'*'} element={<Notfound/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
            </Routes>
        </div>
    );
}

export default Routess;