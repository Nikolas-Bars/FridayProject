import React, {useState} from 'react';
import s from './RestorePassword.module.css'
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SendInstructionsTC, setErrorAC} from "../../Bll/reducers/password-reducer";
import {AppStoreType} from "../../Bll/store";
import preloader from "../../Common/img/Preloader.gif";
import Preloader from "../../Common/Preloader/Preloader";

export const RestorePassword = () => {

    const dispatch = useDispatch()

    const sendSuccess = useSelector<AppStoreType, boolean>(state => state.password.sendSuccess)
    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader
    const error = useSelector<AppStoreType, string>(state => state.password.error)

    const [value, setValue] = useState<string>('')

    const navigate = useNavigate()

    const onChangeHandler = (newValue: string) => {
        setValue(newValue)
        dispatch(setErrorAC(''))
    }

    const message = `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/RestorePassword/$token$'>link</a></div>`

    const onClickHandler = () => {
        // @ts-ignore
        dispatch(SendInstructionsTC({email: value, from: "test-front-admin <kasp2409@mail.ru>", message}))
        console.log(value)
    }




    if (loadingStatus) {
        return <Preloader />
    }


    return (
        <div className={s.main}>
            {sendSuccess && <Navigate to={'/check-email'}/>}
            <div className={s.mainBlock}>
                <div>It-incubator</div>
                <h4>Forgot your password?</h4>
                <SuperInputText type={'email'} onChangeText={onChangeHandler} placeholder={'Email'}
                                className={s.input} error={error && 'Проверьте правильность введенных данных.'}/>

                <div className={s.text}>Enter your email address and we will send you further instructions</div>
                <SuperButton onClick={onClickHandler}>Send Instructions</SuperButton>
                <div className={s.text}>Did you remember your password?</div>
                <span onClick={() => {
                    navigate('/login')
                }}>Try logging in</span>

            </div>
        </div>
    );
};

