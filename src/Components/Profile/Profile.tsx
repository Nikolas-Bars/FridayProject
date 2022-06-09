import React, {ChangeEvent, FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Navigate, useNavigate} from 'react-router-dom';

import styles from './Profile.module.css';
import {AppStoreType} from "../../Bll/store";
import {changeUserNameInfoAC, changeUserNameTC} from '../../Bll/reducers/profile-reducer';
import Preloader from "../../Common/Preloader/Preloader";


const Profile: FC = () => {


    const auth = useSelector<AppStoreType, any>(state => state.login.auth);
    const user = useSelector<AppStoreType, any>(state => state.profile);
    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader
    const userName = useSelector<AppStoreType, string>(state => state.profile.name)

    const [toggleInput, setToggleInput] = useState<boolean>(false)
    const [toggleChangeImageInput, setToggleChangeImageInput] = useState<boolean>(false)
    const [urlNewImage, setUrlNewImage] = useState<string>('')

    const dispatch = useDispatch<any>()

    const onBlurHandler = () => {
        dispatch(changeUserNameTC({name: userName}))
        setToggleInput(false)
    }

    const onBlurHandlerForImage = () => {
        if (urlNewImage !== '') {
            dispatch(changeUserNameTC({avatar: urlNewImage}))
            setToggleChangeImageInput(false)
        }else{
            setToggleChangeImageInput(false)
        }
    }

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeUserNameInfoAC(e.currentTarget.value))
        console.log(userName)
    }

    if (!auth) return <Navigate to="/login"/>;

    if (loadingStatus && !user) {
        return <Preloader/>
    }


    return (
        user && (
            <div className={styles.container}>
                <div className={styles.profile}>

                    <div className={styles.profile_info}>

                        {toggleChangeImageInput ? <div className={styles.inputForImage}><input onChange={(e) => {
                                setUrlNewImage(e.currentTarget.value)
                            }} autoFocus placeholder={"url for new avatar"} onBlur={onBlurHandlerForImage}/></div>
                            : <img onDoubleClick={() => setToggleChangeImageInput(true)} src={user.avatar} alt="avatar"
                                   className={styles.avatar}/>}

                        {toggleInput ?
                            <input autoFocus value={userName} onChange={onChangeText} onBlur={onBlurHandler}/>
                            : <span onDoubleClick={() => {
                                setToggleInput(true)
                            }} className={styles.name}>{user.name}</span>}

                        <span className={styles.job}>Frontend Developer</span>
                    </div>
                </div>
            </div>
        )
    );
}

export default Profile;