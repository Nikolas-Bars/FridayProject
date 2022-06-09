import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Navigate, useNavigate} from 'react-router-dom';

import styles from './Profile.module.css';
import {AppStoreType} from "../../Bll/store";
import {loginAPI} from "../../Bll/api";
import {changeUserNameInfoAC, changeUserNameTC, checkAuthTC} from '../../Bll/reducers/profile-reducer';
import preloader from "../../Common/img/Preloader.gif";
import Preloader from "../../Common/Preloader/Preloader";


const Profile: FC = () => {


    const auth  = useSelector<AppStoreType, any>(state=> state.login.auth);
    const user = useSelector<AppStoreType, any>(state => state.profile);
    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader
    const userName = useSelector<AppStoreType, string>(state => state.profile.name)

    const [toggleInput, setToggleInput] = useState<boolean>(false)

    const dispatch = useDispatch<any>()

    const navigate = useNavigate()

    const onBlurHandler =()=>{
        dispatch(changeUserNameTC(userName))
        setToggleInput(false)
    }

    const onChangeText =(e: ChangeEvent<HTMLInputElement>)=>{
        dispatch(changeUserNameInfoAC(e.currentTarget.value))
        console.log(userName)
    }

    if (!auth) return <Navigate to="/login"/>;

    if (loadingStatus && !user) {
        return  <Preloader />
    }



    return (
        user && (
            <div className={styles.container}>
                <div className={styles.profile}>
                    <div className={styles.profile_info}>
                        <img src={user.avatar} alt="avatar" className={styles.avatar}/>
                        {toggleInput ? <input autoFocus value={userName} onChange={onChangeText} onBlur={onBlurHandler}/>  : <span onDoubleClick={()=>{setToggleInput(true)}} className={styles.name}>{user.name}</span>}
                        <span className={styles.job}>Frontend Developer</span>
                    </div>
                </div>
            </div>
        )
    );
}

export default Profile;