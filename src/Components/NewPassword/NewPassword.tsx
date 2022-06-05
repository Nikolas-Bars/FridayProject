import React, {useState} from 'react';
import s from './NewPassword.module.css'
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SetNewPasswordTC} from "../../Bll/reducers/password-reducer";
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import {AppStoreType} from "../../Bll/store";


const NewPassword = () => {

    const dispatch: any = useDispatch()
    const token = useParams()
    const [newPassword, setNewPassword] = useState<string>('')
    const passwordChanged = useSelector<AppStoreType, boolean>(state => state.password.passwordChanged)

    console.log(token)

    const onClickHandler = () => {
        // @ts-ignore
        dispatch(SetNewPasswordTC({password: newPassword, resetPasswordToken: token.token}))
    }

    const onChangeHandler = (value: string) =>{
        setNewPassword(value)
        console.log(newPassword)
    }

    return (
        <div className={s.main}>
            {passwordChanged && <Navigate to={'/login'} />}
            <div className={s.container}>
                <h1>NewPassword</h1>
                <SuperInputText placeholder={'Password'} type={'password'} value={newPassword} onChangeText={onChangeHandler}/>
                <p>Create new password and we will send you further instructions to email</p>

                <SuperButton onClick={onClickHandler}>Create new password</SuperButton>
            </div>
        </div>
    );
};

export default NewPassword;