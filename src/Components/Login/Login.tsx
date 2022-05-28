import React, {useState} from 'react';
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import s from "../../Common/HW4.module.css";
import SuperCheckbox from "../../Common/c3-SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {setLoginAC, setPasswordAC} from "../../Bll/reducers/login-reducer";
import {AppStoreType} from "../../Bll/store";

const Login = () => {

    const [error, setError] = useState<string | undefined>()

    const [checked, setChecked] = useState<boolean>(false)

    const loginValue = useSelector<AppStoreType, string>(state => state.login.login)
    const passwordValue = useSelector<AppStoreType, string>(state => state.login.password)

    const dispatch = useDispatch()

    const onChangeLoginText =(newValue: string)=>{
        dispatch(setLoginAC(newValue))
        setError(undefined)
    }

    const onChangeLoginPassword =(newPassword: string)=>{
        dispatch(setPasswordAC(newPassword))
        setError(undefined)
    }

    const showAlert =()=>{
        if(loginValue.trim() !== ''){
            alert(loginValue)
            setError(undefined)
        } else {
            setError('проверьте правильность введенных данных')
        }
    }

    return (
        <div style={{display: "flex", padding: '20px',  flexDirection: "column", width: '350px', margin: '20px auto', border: '1px solid black', borderRadius: '15px'}}>
            <div style={{fontSize: '20px'}}>Login</div>
            <div style={{display: "flex", flexDirection: "column", width: '250px', margin: '0 auto'}}>

                <SuperInputText type={'email'} placeholder={'Login'} value={loginValue} onChangeText={onChangeLoginText} onEnter={showAlert} spanClassName={s.testSpanError} className={s.testInputClassName}/>
                <SuperInputText type={'password'} placeholder={'Your password'} value={passwordValue} onChangeText={onChangeLoginPassword} onEnter={showAlert} spanClassName={s.testSpanError} className={s.testInputClassName}/>
                {error && <span style={{border: '1px solid red'}}>{error}</span>}

                <SuperCheckbox checked={checked} onChangeChecked={setChecked}>Remember me</SuperCheckbox>

                <button style={{width: '70px', margin: '10px auto'}}>Submit</button>
            </div>
        </div>
    );
};

export default Login;