import React, {useState} from 'react';
import s from './RestorePassword.module.css'
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import {useNavigate} from "react-router-dom";


const RestorePassword = () => {

    const [value, setValue] = useState<string>('')

    const onChangeHandler = (newValue: string) =>{
        setValue(newValue)
    }

    const onClickHandler =() =>{
        console.log(value)
    }

    const navigate = useNavigate()



    return (
        <div className={s.main}>
        <div className={s.mainBlock}>
            <div>It-incubator</div>
            <h4>Forgot your password?</h4>
            <SuperInputText type={'email'} onChangeText={onChangeHandler} placeholder={'Email'} className={s.input}/>
            <div className={s.text}>Enter your email address and we will send you further instructions </div>
            <SuperButton onClick={onClickHandler}>Send Instructions</SuperButton>
            <span>Did you remember your password?</span>
            <span onClick={()=>{navigate('/login')}}>Try logging in</span>

        </div></div>
    );
};

export default RestorePassword;