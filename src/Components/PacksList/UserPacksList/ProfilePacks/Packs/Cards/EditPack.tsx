import React, {useEffect, useState} from 'react';
import SuperInputText from "../../../../../../Common/c1-SuperInputText/SuperInputText";
import s from './EditPack.module.css'
import closeIcon from "../../../../../../Common/img/delete/delete.png";
import style from "../../../../SearchBar_addPack/AddPack/AddPack.module.css";
import SuperButton from "../../../../../../Common/c2-SuperButton/SuperButton";

type PropsType = {
    packName: string
    setToggleModal: (toggle: boolean) => void
    changePackName: (value: string) => void
}

const EditPack = ({packName, setToggleModal, changePackName}: PropsType) => {

    const [value, setValue] = useState<string>('')

    useEffect(() => {
        setValue(packName)
    }, [packName])

    const onClickCloseModal = () => {
        setToggleModal(false)
    }

    const saveButtonHandler = () => {
        changePackName(value)
        setToggleModal(false)
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