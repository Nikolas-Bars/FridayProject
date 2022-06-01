import React from 'react';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5px'}}>
        <div style={{display: 'flex', height: '30px', width: '700px', justifyContent: 'space-between', padding: '10px', backgroundColor: 'aqua'}}>
            <div><NavLink to={'/'}>Demo</NavLink></div>
            <div><NavLink to={'/RestorePassword'}>Restore Password</NavLink></div>
            <div><NavLink to={'/login'}>Login</NavLink></div>
            <div><NavLink to={'/newpassword'}>New Password</NavLink></div>
            <div><NavLink to={'/profile'}>Profile</NavLink></div>
            <div><NavLink to={'/registration'}>registration</NavLink></div>


        </div>
        </div>
    );
};

export default NavBar;