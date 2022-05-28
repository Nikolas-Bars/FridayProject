import React, {useState} from 'react';
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import s from "../../Common/HW4.module.css";
import SuperCheckbox from "../../Common/c3-SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {setErrorAC, setLoginAC, setPasswordAC, setRememberMeAC} from "../../Bll/reducers/login-reducer";
import {AppStoreType} from "../../Bll/store";

const Login = () => {



    const loginValue = useSelector<AppStoreType, string>(state => state.login.login)
    const passwordValue = useSelector<AppStoreType, string>(state => state.login.password)
    const errorValue = useSelector<AppStoreType, string>(state => state.login.error)
    const rememberMeValue = useSelector<AppStoreType, boolean>(state => state.login.rememberMe)

    const dispatch = useDispatch()

    const onChangeLoginText =(newValue: string)=>{
        dispatch(setLoginAC(newValue))
        setError('')
    }

    const onChangeLoginPassword =(newPassword: string)=>{
        dispatch(setPasswordAC(newPassword))
        setError('')
    }

    const setRememberMe = (value: boolean) =>{
        dispatch(setRememberMeAC(value))
    }

    const setError = (error: string) =>{
        dispatch(setErrorAC(error))
    }

    const showAlert =()=>{
        if(loginValue.trim() !== ''){
            alert(loginValue)
            setError('')
        } else {
            setError('заполните все поля')
        }
    }

    return (
        <div style={{display: "flex", padding: '20px',  flexDirection: "column", width: '350px', margin: '20px auto', border: '1px solid black', borderRadius: '15px'}}>
            <div style={{fontSize: '20px'}}>Login</div>
            <div style={{display: "flex", flexDirection: "column", width: '250px', margin: '0 auto'}}>

                <SuperInputText type={'email'} placeholder={'Login'} value={loginValue} onChangeText={onChangeLoginText} onEnter={showAlert} spanClassName={s.testSpanError} className={s.testInputClassName}/>
                <SuperInputText type={'password'} placeholder={'Your password'} value={passwordValue} onChangeText={onChangeLoginPassword} onEnter={showAlert} spanClassName={s.testSpanError} className={s.testInputClassName}/>
                {errorValue && <span  style={{padding: '8px', margin: '0 auto', width: '60%', color: 'red', border: '2px solid red', borderRadius: '5px'}}>{errorValue}</span>}

                <SuperCheckbox checked={rememberMeValue} onChangeChecked={setRememberMe}>Remember me</SuperCheckbox>

                <button style={{width: '70px', margin: '10px auto'}}>Submit</button>
            </div>
        </div>
    );
};

export default Login;