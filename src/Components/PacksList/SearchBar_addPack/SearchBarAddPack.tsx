import React, {memo, useEffect, useState} from 'react';
import style from "./SearchBarAddPack.module.css";
import {useAppDispatch} from "../../../Bll/store";
import {useDebounce} from "../../features/CustomHooks/useDebounce/useDebounce";
import {setModalActiveAC} from "../../../Bll/reducers/profile-reducer";
import {setSearchTextAC} from "../../../Bll/reducers/pack-reducer";
import SuperInputText from "../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../Common/c2-SuperButton/SuperButton";
import { Modal } from '../../../Common/Modal/Modal';
import search from '../../../Common/img/search_bar/search.png'
import {AddPack} from "./AddPack/AddPack";


type SearchBarAddPack = {
    buttonName: string
    ModalComponent: React.ComponentType
}

export const SearchBarAddPack = memo(({buttonName, ModalComponent}: SearchBarAddPack) => {

    const dispatch = useAppDispatch()

    const [toggleModal, setToggleModal] = useState<boolean>(false)

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
                {buttonName}
            </SuperButton>
            <Modal>
                <ModalComponent />
            </Modal>
        </div>
    )
})