import React, {memo, useEffect, useState} from 'react';
import style from "./SearchBarAddPack.module.css";
import {useAppDispatch} from "../../../Bll/store";
import {useDebounce} from "../../features/CustomHooks/useDebounce/useDebounce";
import {setSearchTextAC} from "../../../Bll/reducers/pack-reducer";
import SuperInputText from "../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../Common/c2-SuperButton/SuperButton";
import {Modal} from '../../../Common/Modal/Modal';
import search from '../../../Common/img/search_bar/search.png'


type SearchBarAddPackType = {
    buttonName: string
    ModalComponent: (props: {
        setToggleModal: (toggle: boolean) => void
    }) => JSX.Element
}

export const SearchBarAddPack = memo(({buttonName, ModalComponent}: SearchBarAddPackType) => {

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
        setToggleModal(true)
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
            <Modal
                toggleModal={toggleModal}
            >
                <ModalComponent
                    setToggleModal={setToggleModal}
                />
            </Modal>
        </div>
    )
})