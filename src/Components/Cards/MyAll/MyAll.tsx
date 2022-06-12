import React, {useState} from 'react';

import s from './MyAll.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../Bll/store";
import {setCardsTC, setMyAllAC} from "../../../Bll/reducers/card-reducer";
import {CardsDataType} from "../../../Bll/api";

const MyAll = () => {

    const userId = useSelector<AppStoreType, string>(state => state.profile._id)

    const selectValue = useSelector<AppStoreType, number>(state => state.cards.selectValue) // количество элементов на одной странице

    const rangeValue = useSelector<AppStoreType, number[]>(state => state.cards.rangeValue)

    const my = useSelector<AppStoreType, boolean>(state => state.cards.myAll)

    const dispatch = useDispatch<any>()

    let responseData: CardsDataType = {
        pageCount: selectValue,
        min: rangeValue[0],
        max: rangeValue[1],
    }


    const myAllToggle = (toggle: 'my' | 'all') => {
        if (toggle === "my" && !my) {
            responseData.user_id = userId
            dispatch(setCardsTC(responseData))
            dispatch(setMyAllAC(true))
        } else if(toggle === "all" && my) {
            responseData.user_id = ''
            dispatch(setCardsTC(responseData))
            dispatch(setMyAllAC(false))
        }
    }

    return (
        <div className={s.main}>
            <div className={s.my} onClick={() => {
                myAllToggle("my")
            }} style={my ? {backgroundColor: 'white', color: 'blue'} : {}}>My
            </div>
            <div className={s.all} onClick={() => {
                myAllToggle("all")
            }} style={my ? {}:{backgroundColor: 'white', color: 'blue'}}>All
            </div>
        </div>
    );
};

export default MyAll;