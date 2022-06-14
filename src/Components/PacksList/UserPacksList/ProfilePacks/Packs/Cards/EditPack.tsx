import React, {useState} from 'react';
import SuperInputText from "../../../../../../Common/c1-SuperInputText/SuperInputText";
import {setModalActiveAC} from "../../../../../../Bll/reducers/profile-reducer";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import s from './EditPack.module.css'
import closeIcon from "../../../../../../Common/img/delete/delete.png";
import style from "../../../../SearchBar_addPack/AddPack/AddPack.module.css";
import SuperButton from "../../../../../../Common/c2-SuperButton/SuperButton";
import {editPackAC, editPackTC} from "../../../../../../Bll/reducers/pack-reducer";
import {ThunkDispatch} from "redux-thunk";
import {ThunksDispatch} from "../../../../../../Bll/store";

type PropsType = {
    toggleModal: boolean,
    setToggleModal: (toggle: boolean)=>void
    packID: string
}

const EditPack = ({toggleModal, setToggleModal, packID}:PropsType) => {
    console.log(packID)
    const [value, setValue] = useState<string>('')

    const dispatch = useDispatch<ThunksDispatch>()

    const onClickCloseModal = () => {
        dispatch(setModalActiveAC(false))
        setToggleModal(false)

    }

    const saveButtonHandler =()=>{
        dispatch(editPackTC(packID, value))
        dispatch(setModalActiveAC(false))
        setToggleModal(false)
    }

    if(!toggleModal){
        return <></>
    }

    return (
        <div className={s.main}>
            <div className={s.header}>
                <div className={s.title}>
                    Edit Pack
                </div>
                    <img
                        onClick={onClickCloseModal}
                        src={closeIcon}
                        alt="close"
                    />
            </div>

            <div className={s.body}>
                <label>New pack name</label>
                <SuperInputText
                    className={s.input}
                    value={value}
                    onChangeText={setValue}
                    type='text'
                    placeholder='Enter name'
                />
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
                    onClick={saveButtonHandler}

                >
                    Save
                </SuperButton>
            </div>
        </div>
    );
};

export default EditPack;