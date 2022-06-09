import React, {useState} from 'react';
import s from './registration.module.css'
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {RegisterTC} from "../../Bll/reducers/registration-reducer";
import {AppStoreType} from "../../Bll/store";
import {useNavigate} from "react-router-dom";
import {setErrorAC} from "../../Bll/reducers/registration-reducer";

const Registration = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const success = useSelector<AppStoreType, boolean>(state => state.registration.success)
//    const [error, setError] = useState<string>('')
    const error = useSelector<AppStoreType, string | null>(state => state.registration.error)


    const navigate = useNavigate()

    const onChangeEmail =(value: string)=>{
        setEmail(value)
    }

    const onChangePassword =(value: string)=>{
        setPassword(value)
        dispatch(setErrorAC(''))
    }

    const onChangeConfirmPassword =(value: string)=>{
        setConfirmPassword(value)
        dispatch(setErrorAC(''))
    }

    const submit =()=>{

    if(password === confirmPassword) {
        // @ts-ignore
        dispatch(RegisterTC({email, password}))
    }else {
        dispatch(setErrorAC('пароли должны совпадать'))
    }
    }

    success && navigate('/login')

    return (
        <div className={s.main}>
            <div className={s.container}>
            <h2>It-incubator</h2>
            <h4>Sign Up</h4>
            <SuperInputText  type={'email'} onChangeText={onChangeEmail} placeholder={'Email'} className={s.input}/>
            <SuperInputText type={'password'} onChangeText={onChangePassword} placeholder={'password'} className={s.input}/>
            <SuperInputText type={'password'} onChangeText={onChangeConfirmPassword} placeholder={'Confirm password'} className={s.input}/>
            {error && <div className={s.error}>{error}</div>}

            <div style={{display: 'flex', flexDirection: 'row', margin: '0 auto'}}>
                <SuperButton onClick={() => {
                    navigate('/login')
                }}>Cansel</SuperButton><SuperButton onClick={submit}>Register</SuperButton>
            </div>
        </div>
        </div>
    );
};

export default Registration;