import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Navigate, useNavigate} from 'react-router-dom';

import styles from './Profile.module.css';
import {AppStoreType} from "../../Bll/store";
import {loginAPI} from "../../Bll/api";
import {checkAuthTC} from '../../Bll/reducers/profile-reducer';
import preloader from "../../Common/img/Preloader.gif";


const Profile: FC = () => {
    const auth  = useSelector<AppStoreType, any>(state=> state.login.auth);
    const user = useSelector<AppStoreType, any>(state => state.profile.info);
    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader
    const dispatch = useDispatch()

    const navigate = useNavigate()

    // useEffect(() => {
    //     // @ts-ignore
    //     dispatch(checkAuthTC());
    // }, [dispatch]);

    if (!auth) return <Navigate to="/login"/>;

    if (loadingStatus) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return (
        user && (
            <div className={styles.container}>
                <div className={styles.profile}>
                    <div className={styles.profile_info}>
                        <img src={user.avatar} alt="avatar" className={styles.avatar}/>
                        <span className={styles.name}>{user.name}</span>
                        <span className={styles.job}>Frontend Developer</span>
                    </div>
                </div>
            </div>
        )
    );
}

export default Profile;