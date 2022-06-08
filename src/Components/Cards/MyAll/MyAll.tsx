import React, {useState} from 'react';

import s from './MyAll.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../Bll/store";
import {setCardsTC, setMyAllAC} from "../../../Bll/reducers/card-reducer";
import {CardsDataType} from "../../../Bll/api";

const MyAll = () => {

    const userId = useSelector<AppStoreType, string>(state=> state.login.id)

    const dispatch = useDispatch<any>()

    let responseData: CardsDataType = {} // от этого будет зависеть все колоды показывать или только мои


    const myAllToggle = (toggle: 'my'|'all') => {
        if(toggle === "my"){
            responseData.user_id = userId
            dispatch(setCardsTC(responseData))
        }else{
            responseData.user_id = ''
            dispatch(setCardsTC(responseData))
        }
    }

    return (
        <div className={s.main}>
            <div className={s.my} onClick={()=>{myAllToggle("my")}}>My</div>
            <div className={s.all} onClick={()=>{myAllToggle("all")}}>All</div>
        </div>
    );
};

export default MyAll;