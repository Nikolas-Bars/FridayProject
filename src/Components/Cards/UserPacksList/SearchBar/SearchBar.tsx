import React, {memo, useEffect, useState} from 'react';
import style from "./SearchBar.module.css";
import {useAppDispatch} from "../../../../Bll/store";
import {useDebounce} from "../../../CustomHooks/useDebounce/useDebounce";
import SuperInputText from '../../../../Common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../../Common/c2-SuperButton/SuperButton';
import search from '../../../../Common/img/search_bar/search.png'



export const SearchBar = () => {

    const dispatch = useAppDispatch()

    const [searchPack, setSearchPack] = useState<string>('')

    const debouncedValue = useDebounce<string>(searchPack, 750)

    const changeText = (value: string) => {
        setSearchPack(value)
    }

    // const addNewPack = () => {
    //     dispatch(addPacksTC())
    // }

    // useEffect(() => {
    //     dispatch(setSearchPacksValueAC(debouncedValue))
    // }, [debouncedValue, dispatch])

    return (
        <div className={style.profile__body_inputs_bar}>
            <SuperInputText
                className={style.profile__body_input_search}
                placeholder="Search..."
                value={searchPack}
                onChangeText={changeText}
            />
            <img
                className={style.profile__body_img_search}
                src={search}
                alt="search"/>
        </div>
    )
}