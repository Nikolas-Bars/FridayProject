import React, {useState} from 'react';
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../Bll/store";
import {setCardsTC, setSearchTextAC} from "../../Bll/reducers/card-reducer";
import s from './Search.module.css'
import {CardsDataType} from "../../Bll/api";
import {Dispatch} from "redux";
import {Simulate} from "react-dom/test-utils";


const Search = () => {

    const dispatch: Dispatch<any> = useDispatch()
    const searchText = useSelector<AppStoreType, string>(state => state.cards.searchText)
    const selectValue = useSelector<AppStoreType, number>(state => state.cards.selectValue)
    const [error, setError] = useState<string>('')

    let responseData: CardsDataType = {
        packName: searchText,
        pageCount: selectValue
    }

    const setSearchText =(text: string)=>{
        dispatch(setSearchTextAC(text))
        setError('')
    }

    const search = () => {
        if (searchText.trim() !== '') {
            responseData.packName = searchText
            dispatch(setCardsTC(responseData))
            dispatch(setSearchTextAC(''))
        }else {
            setError('Field is required!')
        }
    }

    return (
        <div className={s.inputBlock}>
            <SuperInputText error={error} placeholder={"Что ищем?"} value={searchText ? searchText : ''} type={'text'} onChangeText={setSearchText}/>
            <SuperButton onClick={search}>search</SuperButton>
        </div>
    );
};

export default Search;