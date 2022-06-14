import React, {useEffect} from 'react';
import style from './Modal.module.css'
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../Bll/store";
import {setModalActiveAC} from "../../Bll/reducers/profile-reducer";

type PropsType = {
    children: React.ReactNode
}

export const Modal = ({children}: PropsType) => {

    const active = useSelector<AppStoreType, boolean>(state => state.profile.helpers.activeModal)
    const isAuth = useSelector<AppStoreType, boolean>(state => state.profile.helpers.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuth) {
            dispatch(dispatch(setModalActiveAC(false)))
        }
    }, [isAuth, dispatch])

    return (
        <div className={active ? `${style.modal} ${style.active}` : style.modal}>
            <div className={active ? `${style.modal__content} ${style.active}` : style.modal__content}
                 onClick={e => e.stopPropagation()}>
                <div className={style.children}>
                    {children}
                </div>
            </div>
        </div>
    )
}