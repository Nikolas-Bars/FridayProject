import React, {useEffect, useState} from 'react';
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import s from "../../Common/HW4.module.css";
import SuperCheckbox from "../../Common/c3-SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {loginTC, setErrorAC, setLoginAC, setPasswordAC, setRememberMeAC} from "../../Bll/reducers/login-reducer";
import {AppStoreType} from "../../Bll/store";
import {Navigate, useNavigate} from "react-router-dom";
import preloader from '../../Common/img/Preloader.gif'
import style from './Login.module.css'

const Login = () => {

    const loginValue = useSelector<AppStoreType, string>(state => state.login.login)
    const passwordValue = useSelector<AppStoreType, string>(state => state.login.password)
    const errorValue = useSelector<AppStoreType, string>(state => state.login.error)
    const rememberMeValue = useSelector<AppStoreType, boolean>(state => state.login.rememberMe)
    const auth = useSelector<AppStoreType, boolean>(state => state.login.auth)
    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onChangeLoginText = (newValue: string) => {
        dispatch(setLoginAC(newValue))
        setError('')
    }

    const onChangeLoginPassword = (newPassword: string) => {
        dispatch(setPasswordAC(newPassword))
        setError('')
    }

    const setRememberMe = (value: boolean) => {
        dispatch(setRememberMeAC(value))
    }

    const setError = (error: string) => {
        dispatch(setErrorAC(error))
    }

    const setLoginData = () => {
        // @ts-ignore
        dispatch(loginTC({email: loginValue, password: passwordValue, rememberMe: rememberMeValue}))

    }


    if (loadingStatus) {
        return <div style={{display: "flex",
            width: '100%',
            height: '100vh',
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: 'white'}}><img src={preloader} alt={'preloader'}/></div>
    }

    return (

        <div className={style.mainBlock}>
        <div className={style.loginContainer}>
            {auth && <Navigate to={'/profile'}/>}
            <div style={{fontSize: '20px', margin: '0 auto'}}>Login</div>
            <div style={{display: "flex", flexDirection: "column", width: '250px', margin: '0 auto'}}>

                <SuperInputText type={'email'} placeholder={'Login'} value={loginValue} onChangeText={onChangeLoginText}
                                onEnter={setLoginData} spanClassName={s.testSpanError}
                                className={s.testInputClassName}/>
                <SuperInputText type={'password'} placeholder={'Your password'} value={passwordValue}
                                onChangeText={onChangeLoginPassword} onEnter={setLoginData}
                                spanClassName={s.testSpanError} className={s.testInputClassName}/>
                {errorValue && <span style={{
                    padding: '8px',
                    margin: '0 auto',
                    width: '80%',
                    color: 'red',
                    border: '2px solid red',
                    borderRadius: '5px'
                }}>{errorValue}</span>}

                <SuperCheckbox checked={rememberMeValue} onChangeChecked={setRememberMe}>Remember me</SuperCheckbox>

                <button style={{margin: '15px auto'}} onClick={setLoginData}>Submit</button>

                <span style={{fontSize: '8px'}} onClick={()=>{navigate('/RestorePassword')}}>Forgot your password?</span>

            </div>
        </div></div>
    );
};

export default Login;