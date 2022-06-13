import React, {useState} from 'react';
import style from "./AddCard.module.css";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../Bll/store";
import {newCardPackTC} from "../../../../Bll/reducers/pack-reducer";
import {setModalActiveAC} from "../../../../Bll/reducers/profile-reducer";
import SuperInputText from "../../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../Common/c2-SuperButton/SuperButton";

export const AddCard = () => {

    const dispatch = useAppDispatch()

    const disableButton = useSelector<AppStoreType, boolean>(state => state.profile.helpers.disableButton)
    const errorMessage = useSelector<AppStoreType, string | null>(state => state.profile.helpers.errorMessage)

    const [newPackName, setNewPackName] = useState<string>('');

    const addNewPack = () => {
        if (newPackName.trim() !== '') {
            dispatch(newCardPackTC(newPackName))
        }
    }

    const onClickCloseModal = () => {
        dispatch(setModalActiveAC(false))
    }

    return (
        <div className={style.addPack}>
            <div className={style.addPack__title}>
                Card info
            </div>
            <div className={style.addPack__body}>
                <label>Question</label>
                <SuperInputText
                    className={style.addPack__input}
                    value={newPackName}
                    onChangeText={setNewPackName}
                    type='text'
                    placeholder='Enter the text'
                />
                <SuperInputText
                    type='file'
                />
            </div>
            <div className={style.addPack__body}>
                <label>Answer</label>
                <SuperInputText
                    className={style.addPack__input}
                    value={newPackName}
                    onChangeText={setNewPackName}
                    type='text'
                    placeholder='Enter the text'
                />
                <SuperInputText
                    type='file'
                />
            </div>
            {
                !errorMessage &&
                <div className={style.fakeDiv}/>
            }
            {
                errorMessage &&
                <div className={style.addPack_server_error}>
                    {errorMessage}
                </div>
            }
            <div className={style.addPack__buttons}>
                <SuperButton
                    className={style.addPack__button_cancel}
                    onClick={onClickCloseModal}
                    disabled={disableButton}
                >
                    Cancel
                </SuperButton>
                <SuperButton
                    className={style.addPack__button_save}
                    onClick={addNewPack}
                    disabled={disableButton}
                >
                    Save
                </SuperButton>
            </div>
        </div>
    )
}