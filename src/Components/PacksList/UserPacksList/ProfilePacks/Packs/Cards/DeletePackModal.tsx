import React, {useState} from 'react';
import s from "./EditPack.module.css";
import closeIcon from "../../../../../../Common/img/delete/delete.png";
import SuperInputText from "../../../../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../../../Common/c2-SuperButton/SuperButton";
import style from "../../../../SearchBar_addPack/AddPack/AddPack.module.css";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {setModalActiveAC} from "../../../../../../Bll/reducers/profile-reducer";

type PropsType = {
    toggleModal: boolean,
    setToggleModal: (toggle: boolean)=>void
    deletePack: ()=>void
}


const DeletePackModal = ({toggleModal, setToggleModal, deletePack}:PropsType) => {

    const dispatch = useDispatch<Dispatch>()

    const onClickCloseModal = () => {
        dispatch(setModalActiveAC(false))
        setToggleModal(false)
    }

    const deletePackHandler =()=>{
        deletePack()
        setToggleModal(false)
        dispatch(setModalActiveAC(false))
    }

    if(!toggleModal){
        return <></>
    }


    return (
        <div className={s.main}>
            <div className={s.header}>
                <div className={s.title}>
                    Delete Pack
                </div>
                <img
                    onClick={onClickCloseModal}
                    src={closeIcon}
                    alt="close"
                />
            </div>

            <div className={s.body}>
                <label>Do you really want to remove Pack Name - Name Pack?
                    All cards will be excluded from this course.</label>
            </div>
            <div className={s.buttons}>
                <SuperButton
                    className={s.addPack__button_cancel}
                    onClick={onClickCloseModal}

                >
                    Cancel
                </SuperButton>
                <SuperButton
                    className={style.addPack__button_save}
                    onClick={deletePackHandler}

                >
                    Delete
                </SuperButton>
            </div>
        </div>
    );
};

export default DeletePackModal;