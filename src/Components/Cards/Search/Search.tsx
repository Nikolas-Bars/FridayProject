import React from 'react';
import SuperInputText from "../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../Common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../Bll/store";
import {setCardsTC, setSearchTextAC} from "../../../Bll/reducers/card-reducer";
import s from './Search.module.css'
import {CardsDataType} from "../../../Bll/api";
import {Dispatch} from "redux";

const Search = () => {

    const dispatch: Dispatch<any> = useDispatch()

    const searchText = useSelector<AppStoreType, string>(state => state.cards.searchText)

    let responseData: CardsDataType = {}

    const setSearchText =(text: string)=>{
        dispatch(setSearchTextAC(text))
    }

    const search = () => {
        if (searchText.trim() !== '') {
            responseData.packName = searchText
            dispatch(setCardsTC(responseData))
        }
    }

    return (
        <div className={s.inputBlock}>
            <SuperInputText  value={searchText} type={'text'} onChangeText={setSearchText}/>
            <SuperButton onClick={search}>search</SuperButton>
        </div>
    );
};

export default Search;