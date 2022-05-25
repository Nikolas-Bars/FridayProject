import React from 'react';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
          <div>  <NavLink to={'/'} >Demo</NavLink></div>
            <div>  <NavLink to={'/RestorePassword'} >Restore Password</NavLink></div>
                <div><NavLink to={'/login'} >Login</NavLink></div>
                    <div><NavLink to={'/newpassword'} >New Password</NavLink></div>
                        <div><NavLink to={'/profile'} >Profile</NavLink></div>
                            <div><NavLink to={'/registration'} >registration</NavLink></div>


        </div>
    );
};

export default NavBar;