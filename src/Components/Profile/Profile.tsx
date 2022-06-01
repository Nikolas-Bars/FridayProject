import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Navigate, useNavigate} from 'react-router-dom';

import styles from './Profile.module.css';
import {AppStoreType} from "../../Bll/store";
import {loginAPI} from "../../Bll/api";
import {checkAuthTC} from '../../Bll/reducers/profile-reducer';


const Profile: FC = () => {
    const { isLoggedIn } = useSelector<AppStoreType, any>(state=> state.profile.isLoggedIn);
    const user = useSelector<AppStoreType, any>(state => state.profile.info);
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        debugger
        // @ts-ignore
        dispatch(checkAuthTC());
    }, [dispatch]);

    if (!isLoggedIn) return <div>"Надо залогиниться"</div>
    // <Navigate to="/login"/>;

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
};

export default Profile;