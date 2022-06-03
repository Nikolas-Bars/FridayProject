import React from 'react';
import s from './NewPassword.module.css'
import {useNavigate} from "react-router-dom";


const CheckEmail = () => {

    const navigate = useNavigate()



    return (
        <div className={s.main}>
            <div className={s.container}>
                <h1>Check Email</h1>
                <h4>We’ve sent an Email with instructions to example@mail.com</h4>
            </div>

        </div>
    );
};

export default CheckEmail;