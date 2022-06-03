import React from 'react';
import {NavLink} from "react-router-dom";
import s from './NavBar.module.css'

const NavBar = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5px'}}>
        <div style={{display: 'flex', marginTop: '5px', height: '30px', width: '700px', borderRadius: '5px', justifyContent: 'space-between', padding: '10px', backgroundColor: '#262626'}}>
            <div className={s.nav}><NavLink to={'/demo'}>Demo</NavLink></div>
            <div className={s.nav}><NavLink to={'/check-email'}>Check Email</NavLink></div>
            <div className={s.nav}><NavLink to={'/RestorePassword'}>Restore Password</NavLink></div>
            <div className={s.nav}><NavLink to={'/login'}>Login</NavLink></div>
            <div className={s.nav}><NavLink to={'/newpassword'}>New Password</NavLink></div>
            <div className={s.nav}><NavLink to={'/profile'}>Profile</NavLink></div>
            <div className={s.nav}><NavLink to={'/registration'}>registration</NavLink></div>


        </div>
        </div>
    );
};

export default NavBar;