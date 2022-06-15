import React from 'react';
import s from "./EditPack.module.css";
import closeIcon from "../../../../../../Common/img/delete/delete.png";
import SuperButton from "../../../../../../Common/c2-SuperButton/SuperButton";
import style from "../../../../SearchBar_addPack/AddPack/AddPack.module.css";

type PropsType = {
    setToggleModal: (toggle: boolean)=>void
    deletePack: ()=>void
}


const DeletePackModal = ({setToggleModal, deletePack}:PropsType) => {

    const onClickCloseModal = () => {
        setToggleModal(false)
    }

    const deletePackHandler =()=>{
        deletePack()
        setToggleModal(false)
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