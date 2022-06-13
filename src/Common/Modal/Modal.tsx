import React, {useEffect} from 'react';
import style from './Modal.module.css'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../Bll/store";

type PropsType = {
    active: boolean
    setActive: (value: boolean) => void
    children: React.ReactNode
}

export const Modal = ({active, setActive, children}: PropsType) => {

    const isAuth = useSelector<AppStoreType>(state => state.profile.helpers.isLoggedIn)

    useEffect(() => {
        if (isAuth) {
            setActive(false)
        }
    }, [isAuth, setActive])

    return (
        <div className={active ? `${style.modal} ${style.active}` : style.modal} onClick={() => setActive(false)}>
            <div className={active ? `${style.modal__content} ${style.active}` : style.modal__content}
                 onClick={e => e.stopPropagation()}>
                <div className={style.children}>
                    {children}
                </div>
            </div>
        </div>
    )
}