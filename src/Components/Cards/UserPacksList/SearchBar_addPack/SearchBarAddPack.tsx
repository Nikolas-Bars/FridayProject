import React, {useEffect, useState} from 'react';
import style from "./SearchBarAddPack.module.css";
import {useAppDispatch} from "../../../../Bll/store";
import {useDebounce} from "../../../features/CustomHooks/useDebounce/useDebounce";
import SuperInputText from '../../../../Common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../../Common/c2-SuperButton/SuperButton';
import search from '../../../../Common/img/search_bar/search.png'
import {setSearchTextAC} from "../../../../Bll/reducers/card-reducer";
import {Modal} from '../../../../Common/Modal/Modal';
import {AddPack} from "./AddPack/AddPack";
import {setModalActiveAC} from "../../../../Bll/reducers/profile-reducer";

export const SearchBarAddPack = () => {

    const dispatch = useAppDispatch()

    const [searchPack, setSearchPack] = useState<string>('')

    const debouncedValue = useDebounce<string>(searchPack, 750)

    const changeText = (value: string) => {
        if (value.trim() !== '') {
            setSearchPack(value)
        }
    }

    const onClickOpenModal = () => {
        dispatch(setModalActiveAC(true))
    }

    useEffect(() => {
        dispatch(setSearchTextAC(debouncedValue))
    }, [debouncedValue, dispatch])

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
            <SuperButton
                className={style.profile__body_input_button}
                onClick={onClickOpenModal}
            >
                Add new pack
            </SuperButton>
            <Modal>
                <AddPack />
            </Modal>
        </div>
    )
}